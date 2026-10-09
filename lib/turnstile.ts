import "server-only";

/* Server-side check of a Cloudflare Turnstile token. */

export const turnstileSecret = () => process.env.TURNSTILE_SECRET_KEY || "";

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
