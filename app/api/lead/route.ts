import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead";
import { MIN_FILL_MS } from "@/lib/lead-options";

/* Best-effort per-IP rate limit (per server instance). */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
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

  // Spam: honeypot filled or submitted faster than a person could type.
  // Answer "ok" so bots learn nothing, but do not forward the lead.
  if (lead.company_fax || (lead.elapsed_ms !== undefined && lead.elapsed_ms < MIN_FILL_MS)) {
    return NextResponse.json({ ok: true });
  }

  const locationId = process.env.GHL_LOCATION_ID;
  const apiKey = process.env.GHL_API_KEY;
  if (!locationId || !apiKey) {
    console.warn(
      "[lead] GHL_LOCATION_ID / GHL_API_KEY not set. Lead accepted but NOT sent to GoHighLevel. Add both env vars in Vercel to switch it on.",
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  // GoHighLevel delivery is wired up in Phase 5.
  return NextResponse.json({ ok: true, delivered: false });
}
