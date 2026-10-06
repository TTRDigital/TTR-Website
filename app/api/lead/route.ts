import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead";
import { MIN_FILL_MS } from "@/lib/lead-options";
import { ghlConfig, ghlWebhookUrl, sendLeadToGhl, sendLeadToWebhook } from "@/lib/ghl";

/* Best-effort per-IP rate limit (per server instance). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please call us instead." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the form.", fields: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const lead = parsed.data;

  // Spam: drop only when both signals agree (hidden field filled AND sent
  // faster than a person can type). One signal alone can be autofill or a
  // fast typist, so that lead is delivered with a "suspected-spam" tag.
  const trapFilled = !!lead.hp_ttr;
  const tooFast = lead.elapsed_ms !== undefined && lead.elapsed_ms < MIN_FILL_MS;
  if (trapFilled && tooFast) {
    console.warn("[lead] Dropped as spam (hidden field filled and sent in", lead.elapsed_ms, "ms)", lead.email);
    return NextResponse.json({ ok: true });
  }
  const spamCheck = trapFilled ? "suspect: hidden field filled" : tooFast ? `suspect: sent in ${lead.elapsed_ms} ms` : "ok";

  const webhookUrl = ghlWebhookUrl();
  const cfg = ghlConfig();
  if (!webhookUrl && !cfg) {
    console.warn(
      "[lead] No delivery configured. Lead accepted but NOT sent anywhere. Add GHL_WEBHOOK_URL (or GHL_LOCATION_ID + GHL_API_KEY) in Vercel.",
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  // Webhook and API run side by side; the lead counts as saved if either works.
  const jobs: { name: string; run: Promise<unknown> }[] = [];
  if (webhookUrl) jobs.push({ name: "webhook", run: sendLeadToWebhook(webhookUrl, lead, spamCheck) });
  if (cfg) jobs.push({ name: "api", run: sendLeadToGhl(cfg, lead, spamCheck) });
  const results = await Promise.allSettled(jobs.map((j) => j.run));
  results.forEach((r, i) => {
    if (r.status === "rejected") console.error(`[lead] GoHighLevel ${jobs[i].name} delivery failed`, r.reason);
  });

  if (results.some((r) => r.status === "fulfilled")) {
    console.info("[lead] Delivered via", jobs.filter((_, i) => results[i].status === "fulfilled").map((j) => j.name).join(" + "), spamCheck === "ok" ? "" : `(${spamCheck})`);
    return NextResponse.json({ ok: true, delivered: true });
  }
  // Nothing saved the lead. Tell the visitor so they can call instead of
  // believing a lost lead went through.
  return NextResponse.json({ ok: false, error: "We could not send your request. Please call us instead." }, { status: 502 });
}
