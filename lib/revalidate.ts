import "server-only";
import { createHmac, timingSafeEqual } from "node:crypto";
import { isSafePath } from "@/lib/preview";

/*
 * The Sanity webhook signature (the @sanity/webhook format, which TTR OS also sends):
 *   sanity-webhook-signature: t=<unix ms>,v1=<base64url HMAC-SHA256(SANITY_REVALIDATE_SECRET, "<t>.<raw body>")>
 * Checked in constant time. No extra package: the format is small and fixed.
 */
export function signWebhook(secret: string, body: string, t: number): string {
  return `t=${t},v1=${createHmac("sha256", secret).update(`${t}.${body}`).digest("base64url")}`;
}

export function isValidWebhook(secret: string, body: string, header: string | null): boolean {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((p) => p.trim().split("=", 2) as [string, string]));
  const t = parts.t, given = parts.v1;
  if (!t || !/^\d{1,16}$/.test(t) || !given) return false;
  const want = Buffer.from(createHmac("sha256", secret).update(`${t}.${body}`).digest("base64url"));
  const got = Buffer.from(given);
  return want.length === got.length && timingSafeEqual(want, got);
}

export type RevalidatePlan = { tags: string[]; paths: string[] };

/**
 * What to refresh for one webhook body.
 *
 * Every published Sanity read (lib/sanity/fetch.ts) carries the shared "sanity" tag plus the tags its caller passes
 * (the document type, "type:slug" for single pages). Site settings, navigation and the service list show on every
 * page, so the shared "sanity" tag is always refreshed: content is small, and this keeps every page correct. The
 * document id, type and "type:slug" tags are refreshed too, and a safe `path` in the body ("/blog/x") as well.
 */
export function planRevalidate(body: unknown): RevalidatePlan {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const tags = new Set<string>();
  const paths = new Set<string>();
  const id = typeof b._id === "string" ? b._id.replace(/^drafts\./, "") : "";
  if (/^[A-Za-z0-9._-]{1,200}$/.test(id)) tags.add(id);
  const type = typeof b._type === "string" && /^[A-Za-z0-9._-]{1,100}$/.test(b._type) ? b._type : "";
  const slug = typeof b.slug === "string" ? b.slug : (b.slug as { current?: unknown } | undefined)?.current;
  if (type) {
    tags.add(type);
    if (typeof slug === "string" && /^[A-Za-z0-9._-]{1,200}$/.test(slug)) tags.add(`${type}:${slug}`);
  }
  if (typeof b.path === "string" && b.path.length <= 1024 && isSafePath(b.path)) paths.add(b.path);
  if (tags.size || paths.size) tags.add("sanity");
  return { tags: [...tags], paths: [...paths] };
}
