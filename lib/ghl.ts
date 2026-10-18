import "server-only";
import type { LeadInput } from "@/lib/lead";
import { slugify } from "@/lib/text";
import { SMS_CONSENT, SMS_CONSENT_VERSION } from "@/lib/sms-consent";

/** Who submitted and when, recorded with the SMS consent. */
export type SubmissionMeta = { at: string; ip: string; userAgent: string };

/**
 * The SMS consent record for one submission. Each opt-in is kept separately;
 * the wording is saved only for a box that was ticked, with the version the
 * person saw. Submitting a phone number alone never opts anyone in.
 */
function smsConsent(lead: LeadInput, meta: SubmissionMeta) {
  const version = lead.sms_consent_version || SMS_CONSENT_VERSION;
  const service = lead.sms_consent_service === true;
  const marketing = lead.sms_consent_marketing === true;
  return {
    service,
    marketing,
    fields: {
      sms_consent_service: service ? "yes" : "no",
      sms_consent_marketing: marketing ? "yes" : "no",
      sms_consent_service_text: service ? SMS_CONSENT.service : "",
      sms_consent_marketing_text: marketing ? SMS_CONSENT.marketing : "",
      sms_consent_version: version,
      sms_consent_at: service || marketing ? meta.at : "",
      sms_consent_phone: service || marketing ? normalizePhone(lead.phone) : "",
      sms_consent_page: service || marketing ? lead.page_url || "" : "",
      sms_consent_ip: service || marketing ? meta.ip : "",
      sms_consent_user_agent: service || marketing ? meta.userAgent : "",
    },
  };
}

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

function noteFor(lead: LeadInput, meta: SubmissionMeta) {
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
  const consent = smsConsent(lead, meta);
  lines.push("", `SMS consent (wording version ${consent.fields.sms_consent_version}):`);
  if (!consent.service && !consent.marketing) lines.push("None given. Do not send text messages to this contact.");
  else {
    lines.push(`Recorded ${meta.at} for ${consent.fields.sms_consent_phone} on ${consent.fields.sms_consent_page || "(unknown page)"} from IP ${meta.ip}.`);
    if (consent.service) lines.push(`Service messages: YES. Agreed to: "${SMS_CONSENT.service}"`);
    else lines.push("Service messages: no");
    if (consent.marketing) lines.push(`Marketing messages: YES. Agreed to: "${SMS_CONSENT.marketing}"`);
    else lines.push("Marketing messages: no");
  }
  return lines.filter((l) => l !== null).join("\n");
}

/**
 * "suspected-spam" is added when one spam signal fired, so nothing real is
 * ever lost. "sms-opt-in-service" and "sms-opt-in-marketing" mark the text
 * categories the person ticked; "sms-no-consent" means neither was ticked.
 */
function leadTags(lead: LeadInput, spamCheck: string) {
  const sms = [
    ...(lead.sms_consent_service ? ["sms-opt-in-service"] : []),
    ...(lead.sms_consent_marketing ? ["sms-opt-in-marketing"] : []),
  ];
  return [
    "website-lead",
    `service-${slugify(lead.service)}`,
    ...(sms.length ? sms : ["sms-no-consent"]),
    ...(spamCheck === "ok" ? [] : ["suspected-spam"]),
  ];
}

/** Inbound webhook URL (GoHighLevel workflow trigger). Kept in env: the repo is public. */
export function ghlWebhookUrl(): string | null {
  // Tolerate a value pasted with surrounding quotes or spaces.
  const url = process.env.GHL_WEBHOOK_URL?.trim().replace(/^["']|["']$/g, "").trim();
  return url && /^https?:\/\//.test(url) ? url : null;
}

/** Posts every field of the lead, flat, to the webhook. Throws if it is not accepted. */
export async function sendLeadToWebhook(url: string, lead: LeadInput, meta: SubmissionMeta, spamCheck = "ok") {
  const [firstName, ...rest] = lead.name.trim().split(/\s+/);
  const payload = {
    source: "Website form",
    submitted_at: meta.at,
    name: lead.name.trim(),
    first_name: firstName,
    last_name: rest.join(" "),
    email: lead.email.trim(),
    phone: normalizePhone(lead.phone),
    phone_raw: lead.phone.trim(),
    business_name: lead.business.trim(),
    website: lead.website || "",
    service_interest: lead.service,
    message: lead.message?.trim() || "",
    tags: leadTags(lead, spamCheck),
    spam_check: spamCheck,
    page_url: lead.page_url || "",
    landing_page: lead.landing_page || "",
    referrer: lead.referrer || "",
    utm_source: lead.utm_source || "",
    utm_medium: lead.utm_medium || "",
    utm_campaign: lead.utm_campaign || "",
    utm_term: lead.utm_term || "",
    utm_content: lead.utm_content || "",
    gclid: lead.gclid || "",
    fbclid: lead.fbclid || "",
    ...smsConsent(lead, meta).fields,
  };
  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (res.ok) return;
      lastError = new Error(`Lead webhook answered ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
      if (res.status !== 429 && res.status < 500) break;
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  throw lastError;
}

/**
 * Upserts the contact, adds the tags (tags endpoint adds without replacing
 * existing ones) and attaches a note. Throws only if the contact itself could
 * not be saved; tag or note failures are logged.
 */
export async function sendLeadToGhl(cfg: GhlConfig, lead: LeadInput, meta: SubmissionMeta, spamCheck = "ok") {
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

  const tags = leadTags(lead, spamCheck);
  const results = await Promise.allSettled([
    call(cfg, `/contacts/${contactId}/tags`, { tags }),
    call(cfg, `/contacts/${contactId}/notes`, { body: noteFor(lead, meta) }),
  ]);
  for (const r of results) if (r.status === "rejected") console.error("[lead] GoHighLevel follow-up call failed", r.reason);
  return contactId;
}
