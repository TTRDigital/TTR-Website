import { NextResponse } from "next/server";
import { ghlConfig, ghlWebhookUrl } from "@/lib/ghl";
import { RECAPTCHA_SECRET_NAMES, RECAPTCHA_SITE_KEY_NAMES, recaptchaSecret, recaptchaSiteKey } from "@/lib/recaptcha";

export const dynamic = "force-dynamic";

/**
 * Which integrations this deployment can see. Yes/no and variable NAMES
 * only, never values, so it is safe to open in a browser.
 */
export function GET() {
  const known = [...RECAPTCHA_SITE_KEY_NAMES, ...RECAPTCHA_SECRET_NAMES];
  const lookalikes = Object.keys(process.env)
    .filter((k) => /captcha|turnstile/i.test(k))
    .sort();
  return NextResponse.json(
    {
      environment: process.env.VERCEL_ENV ?? process.env.NODE_ENV,
      captcha: {
        provider: "Google reCAPTCHA v2 checkbox",
        siteKeyFound: !!recaptchaSiteKey(),
        secretKeyFound: !!recaptchaSecret(),
        active: !!recaptchaSiteKey() && !!recaptchaSecret(),
        variablesSeen: lookalikes,
        unrecognisedNames: lookalikes.filter((k) => !known.includes(k)),
      },
      leads: { webhook: !!ghlWebhookUrl(), ghlApi: !!ghlConfig() },
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
