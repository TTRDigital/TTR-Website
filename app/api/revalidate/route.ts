import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { _type?: string; slug?: { current?: string } | string };

/**
 * Sanity publish webhook. Set it up in sanity.io/manage (see README):
 * POST https://<site>/api/revalidate, projection {_type, slug},
 * secret = SANITY_REVALIDATE_SECRET. Without the secret this route is off.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return NextResponse.json({ ok: false, message: "Webhook secret is not configured" }, { status: 503 });

  try {
    const { isValidSignature, body } = await parseBody<WebhookPayload>(req, secret, true);
    if (!isValidSignature) return NextResponse.json({ ok: false, message: "Invalid signature" }, { status: 401 });
    if (!body?._type) return NextResponse.json({ ok: false, message: "Missing _type" }, { status: 400 });

    const slug = typeof body.slug === "string" ? body.slug : body.slug?.current;
    const tags = [body._type, ...(slug ? [`${body._type}:${slug}`] : []), "sanity"];
    // Settings, navigation and services appear on every page, so the shared
    // "sanity" tag is always cleared. Content is small; this keeps it simple.
    for (const tag of tags) revalidateTag(tag, { expire: 0 });
    return NextResponse.json({ ok: true, revalidated: tags });
  } catch (err) {
    console.error("Revalidate webhook failed", err);
    return NextResponse.json({ ok: false, message: "Error" }, { status: 500 });
  }
}
