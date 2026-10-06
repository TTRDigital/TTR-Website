import "server-only";
import type { LeadInput } from "@/lib/lead";
import { slugify } from "@/lib/text";

/* GoHighLevel API v2. Keys come from process.env only. */

const BASE = "https://services.leadconnectorhq.com";
const VERSION = "2021-07-28";

type GhlConfig = { locationId: string; apiKey: string };

export function ghlConfig(): GhlConfig | null {
  const locationId = process.env.GHL_LOCATION_ID;
  const apiKey = process.env.GHL_API_KEY;
  return locationId && apiKey ? { locationId, apiKey } : null;
}

/** E.164 for US numbers; anything else is passed through with a leading +. */
function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return raw.trim().startsWith("+") ? `+${digits}` : digits;
}

async function call<T>(cfg: GhlConfig, path: string, body: unknown): Promise<T> {
  let lastError: unknown;
  // One retry for rate limits, server errors and network failures.
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(`${BASE}${path}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cfg.apiKey}`,
          Version: VERSION,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (res.ok) return (await res.json()) as T;
      const text = await res.text().catch(() => "");
      lastError = new Error(`GoHighLevel ${path} answered ${res.status}: ${text.slice(0, 300)}`);
      if (res.status !== 429 && res.status < 500) break;
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  throw lastError;
}

function noteFor(lead: LeadInput) {
  const lines = [
    "New lead from the website form.",
    "",
    `Service interest: ${lead.service}`,
    `Business: ${lead.business}`,
    lead.website ? `Website: ${lead.website}` : null,
    "",
    "Message:",
    lead.message?.trim() || "(none)",
    "",
    `Page: ${lead.page_url || "(unknown)"}`,
    `Referrer: ${lead.referrer || "(direct)"}`,
  ];
  const utm = (
    [
      ["utm_source", lead.utm_source],
      ["utm_medium", lead.utm_medium],
      ["utm_campaign", lead.utm_campaign],
      ["utm_term", lead.utm_term],
      ["utm_content", lead.utm_content],
      ["gclid", lead.gclid],
      ["fbclid", lead.fbclid],
    ] as const
  ).filter(([, v]) => v);
  if (utm.length) lines.push("", ...utm.map(([k, v]) => `${k}: ${v}`));
  return lines.filter((l) => l !== null).join("\n");
}

/**
 * Upserts the contact, adds the tags (tags endpoint adds without replacing
 * existing ones) and attaches a note. Throws only if the contact itself could
 * not be saved; tag or note failures are logged.
 */
export async function sendLeadToGhl(cfg: GhlConfig, lead: LeadInput) {
  const [firstName, ...rest] = lead.name.trim().split(/\s+/);
  const upsert = await call<{ contact?: { id?: string } }>(cfg, "/contacts/upsert", {
    locationId: cfg.locationId,
    firstName,
    lastName: rest.join(" ") || undefined,
    name: lead.name.trim(),
    email: lead.email.trim(),
    phone: normalizePhone(lead.phone),
    companyName: lead.business.trim(),
    website: lead.website || undefined,
    source: "Website form",
  });
  const contactId = upsert.contact?.id;
  if (!contactId) throw new Error("GoHighLevel upsert returned no contact id");

  const tags = ["website-lead", `service-${slugify(lead.service)}`];
  const results = await Promise.allSettled([
    call(cfg, `/contacts/${contactId}/tags`, { tags }),
    call(cfg, `/contacts/${contactId}/notes`, { body: noteFor(lead) }),
  ]);
  for (const r of results) if (r.status === "rejected") console.error("[lead] GoHighLevel follow-up call failed", r.reason);
  return contactId;
}
