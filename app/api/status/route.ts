import { NextResponse } from "next/server";
import { ghlConfig, ghlWebhookUrl } from "@/lib/ghl";
import { TURNSTILE_SECRET_NAMES, TURNSTILE_SITE_KEY_NAMES, turnstileSecret, turnstileSiteKey } from "@/lib/turnstile";

export const dynamic = "force-dynamic";

/**
 * Which integrations this deployment can see. Yes/no and variable NAMES
 * only, never values, so it is safe to open in a browser.
 */
export function GET() {
  const known = [...TURNSTILE_SITE_KEY_NAMES, ...TURNSTILE_SECRET_NAMES];
  const lookalikes = Object.keys(process.env)
    .filter((k) => /turnstile|captcha|cloudflare/i.test(k))
    .sort();
  return NextResponse.json(
    {
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
      captcha: {
        siteKeyFound: !!turnstileSiteKey(),
        secretKeyFound: !!turnstileSecret(),
        active: !!turnstileSiteKey() && !!turnstileSecret(),
        variablesSeen: lookalikes,
        unrecognisedNames: lookalikes.filter((k) => !known.includes(k)),
      },
      leads: { webhook: !!ghlWebhookUrl(), ghlApi: !!ghlConfig() },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
