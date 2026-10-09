import "server-only";

/*
 * Google reCAPTCHA v3 (score based). The site key is public and built in;
 * the secret key comes from the environment only (this repository is public).
 */

/** Public site key for www.ttrdigitalmarketing.com (safe to publish). */
const DEFAULT_SITE_KEY = "6Lc5J-ctAAAAAJuaTV1APWFGEOFny47Uwf_4rmDV";

const firstEnv = (names: string[]) => {
  for (const n of names) {
    const v = process.env[n]?.trim().replace(/^["']|["']$/g, "").trim();
    if (v) return v;
  }
  return "";
};

export const RECAPTCHA_SITE_KEY_NAMES = ["RECAPTCHA_SITE_KEY", "NEXT_PUBLIC_RECAPTCHA_SITE_KEY", "GOOGLE_RECAPTCHA_SITE_KEY"];
export const RECAPTCHA_SECRET_NAMES = ["RECAPTCHA_SECRET_KEY", "RECAPTCHA_SECRET", "GOOGLE_RECAPTCHA_SECRET_KEY"];

export const recaptchaSiteKey = () => firstEnv(RECAPTCHA_SITE_KEY_NAMES) || DEFAULT_SITE_KEY;
export const recaptchaSecret = () => firstEnv(RECAPTCHA_SECRET_NAMES);

/** Score at or above this passes cleanly; between FLAG and PASS the lead is delivered flagged; below FLAG it is blocked. */
const PASS = 0.5;
const FLAG = 0.3;

export type RecaptchaResult =
  | { verdict: "pass" }
  | { verdict: "flag"; note: string }
  | { verdict: "block"; note: string };

export async function verifyRecaptcha(token: string, ip: string): Promise<RecaptchaResult> {
  const body = new URLSearchParams({ secret: recaptchaSecret(), response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);
  let data: { success?: boolean; score?: number; action?: string; "error-codes"?: string[] };
  try {
    const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    if (!res.ok) return { verdict: "flag", note: `reCAPTCHA unavailable (HTTP ${res.status})` };
    data = await res.json();
  } catch {
    return { verdict: "flag", note: "reCAPTCHA unavailable" };
  }

  const codes = data["error-codes"] ?? [];
  // A wrong secret is our configuration problem, not the visitor's: never lose the lead for it.
  if (codes.some((c) => c.includes("secret"))) {
    console.error("[lead] reCAPTCHA secret key is invalid. Check RECAPTCHA_SECRET_KEY in Vercel.", codes.join(","));
    return { verdict: "flag", note: "reCAPTCHA misconfigured" };
  }
  if (!data.success) return { verdict: "block", note: `reCAPTCHA rejected (${codes.join(",") || "failed"})` };
  if (data.action && data.action !== "lead_form") return { verdict: "block", note: `reCAPTCHA wrong action (${data.action})` };

  const score = typeof data.score === "number" ? data.score : 1;
  if (score >= PASS) return { verdict: "pass" };
  if (score >= FLAG) return { verdict: "flag", note: `low reCAPTCHA score ${score}` };
  return { verdict: "block", note: `reCAPTCHA score ${score}` };
}
