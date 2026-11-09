import "server-only";
import type { LeadInput } from "@/lib/lead";
import { SMS_CONSENT_FULL_TEXT, SMS_CONSENT_VERSION } from "@/lib/sms-consent";
import { TTR_SITE_KEY } from "@/lib/ttr-site-key";

/** Who submitted and when, recorded with the SMS consent. */
export type SubmissionMeta = { at: string; ip: string; userAgent: string };

/** TTR OS site form endpoint. Same host the website tracker script comes from. */
const FORM_URL = process.env.TTR_OS_FORM_URL?.trim() || "https://ttr-portal.vercel.app/api/site/form";

/** E.164 for US numbers; anything else is passed through with a leading +. */
function normalizePhone(raw: string) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return raw.trim().startsWith("+") ? `+${digits}` : digits;
}

/**
 * Sends one lead to TTR OS, form-encoded: k = site key, p = page path,
 * r = referrer, u = full landing URL, and every field as f_<name>. The SMS
 * consent travels with the lead: yes/no, when, which page, the exact wording
 * and its version. Consent details are empty unless the box was ticked, so a
 * phone number alone never opts anyone in. Throws if TTR OS does not accept it.
 */
export async function sendLeadToTtrOs(lead: LeadInput, meta: SubmissionMeta, spamCheck = "ok") {
  if (!TTR_SITE_KEY) throw new Error("TTR OS site key is off (NEXT_PUBLIC_TTR_SITE_KEY=off)");
  const given = lead.sms_consent === true;
  let path = "/";
  try {
    path = new URL(lead.page_url || "https://x/").pathname;
  } catch {
    /* keep "/" */
  }
  const fields: Record<string, string> = {
    name: lead.name.trim(),
    email: lead.email.trim(),
    phone: normalizePhone(lead.phone),
    phone_raw: lead.phone.trim(),
    business: lead.business.trim(),
    website: lead.website || "",
    service: lead.service,
    message: lead.message?.trim() || "",
    spam_check: spamCheck,
    submitted_at: meta.at,
    utm_source: lead.utm_source || "",
    utm_medium: lead.utm_medium || "",
    utm_campaign: lead.utm_campaign || "",
    utm_term: lead.utm_term || "",
    utm_content: lead.utm_content || "",
    gclid: lead.gclid || "",
    fbclid: lead.fbclid || "",
    sms_consent: given ? "yes" : "no",
    sms_consent_at: given ? lead.sms_consent_at || meta.at : "",
    sms_consent_page: given ? lead.sms_consent_page || lead.page_url || "" : "",
    sms_consent_text: given ? SMS_CONSENT_FULL_TEXT : "",
    sms_consent_version: lead.sms_consent_version || SMS_CONSENT_VERSION,
    sms_consent_phone: given ? normalizePhone(lead.phone) : "",
    sms_consent_ip: given ? meta.ip : "",
  };
  const body = new URLSearchParams({
    k: TTR_SITE_KEY,
    p: path,
    r: lead.referrer || "",
    u: lead.landing_page || lead.page_url || "",
  });
  for (const [key, value] of Object.entries(fields)) body.set(`f_${key}`, value.slice(0, 2000));

  let lastError: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const res = await fetch(FORM_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
        signal: AbortSignal.timeout(8000),
        cache: "no-store",
      });
      if (res.ok) return;
      lastError = new Error(`TTR OS answered ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
      if (res.status !== 429 && res.status < 500) break;
    } catch (err) {
      lastError = err;
    }
    await new Promise((r) => setTimeout(r, 600));
  }
  throw lastError;
}
