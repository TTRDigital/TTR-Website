import "server-only";

/* Server-side check of a Cloudflare Turnstile token. */

/** First non-empty env var among the names people commonly use. Quotes and spaces are ignored. */
const firstEnv = (names: string[]) => {
  for (const n of names) {
    const v = process.env[n]?.trim().replace(/^["']|["']$/g, "").trim();
    if (v) return v;
  }
  return "";
};

export const TURNSTILE_SITE_KEY_NAMES = [
  "NEXT_PUBLIC_TURNSTILE_SITE_KEY",
  "TURNSTILE_SITE_KEY",
  "NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY",
  "CLOUDFLARE_TURNSTILE_SITE_KEY",
  "NEXT_PUBLIC_TURNSTILE_SITEKEY",
  "TURNSTILE_SITEKEY",
];
export const TURNSTILE_SECRET_NAMES = ["TURNSTILE_SECRET_KEY", "TURNSTILE_SECRET", "CLOUDFLARE_TURNSTILE_SECRET_KEY", "CLOUDFLARE_TURNSTILE_SECRET"];

/** Read at request/render time on the server, so no special build step is needed. */
export const turnstileSiteKey = () => firstEnv(TURNSTILE_SITE_KEY_NAMES);
export const turnstileSecret = () => firstEnv(TURNSTILE_SECRET_NAMES);

export type TurnstileResult =
  | { ok: true }
  | { ok: false; unavailable: boolean; codes: string[] };

export async function verifyTurnstile(token: string, ip: string): Promise<TurnstileResult> {
  const body = new URLSearchParams({ secret: turnstileSecret(), response: token });
  if (ip && ip !== "unknown") body.set("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(6000),
      cache: "no-store",
    });
    if (!res.ok) return { ok: false, unavailable: true, codes: [`http-${res.status}`] };
    const data = (await res.json()) as { success?: boolean; action?: string; "error-codes"?: string[] };
    if (data.success && (!data.action || data.action === "lead_form")) return { ok: true };
    return { ok: false, unavailable: false, codes: data["error-codes"] ?? ["failed"] };
  } catch (err) {
    return { ok: false, unavailable: true, codes: [String(err).slice(0, 80)] };
  }
}
