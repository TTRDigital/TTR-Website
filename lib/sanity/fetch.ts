import "server-only";

import { draftMode } from "next/headers";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const apiVersion = "2025-02-19";

/** Default ISR window for all CMS content, in seconds. */
export const REVALIDATE_SECONDS = 300;

/**
 * Draft Mode is on only for someone who opened a signed /api/preview link
 * (a cookie). Outside a request (build time, generateStaticParams, the
 * sitemap) draftMode() is unavailable, so it counts as off there.
 */
async function draftsOn(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled;
  } catch {
    return false;
  }
}

/**
 * Fetch published content from Sanity's API CDN. In Draft Mode it reads the
 * draft version instead, from the live API with SANITY_READ_TOKEN (server
 * side only, never sent to the browser), uncached.
 *
 * - Published reads are cached with ISR (revalidate 300) and tagged so
 *   /api/revalidate can refresh content on publish.
 * - Never throws: returns null on any failure so pages fall back to
 *   lib/content.ts defaults and the site keeps working.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T | null> {
  if (!projectId) return null;

  const token = process.env.SANITY_READ_TOKEN;
  const drafts = !!token && (await draftsOn());
  const search = new URLSearchParams({ query, perspective: drafts ? "drafts" : "published" });
  for (const [key, value] of Object.entries(params)) {
    search.set(`$${key}`, JSON.stringify(value));
  }
  const url = `https://${projectId}.${drafts ? "api" : "apicdn"}.sanity.io/v${apiVersion}/data/query/${dataset}?${search}`;

  try {
    const res = await fetch(
      url,
      drafts
        ? { cache: "no-store", headers: { Authorization: `Bearer ${token}` } }
        : { next: { revalidate: REVALIDATE_SECONDS, tags: ["sanity", ...tags] } },
    );
    if (!res.ok) {
      console.warn(`[sanity] ${res.status} for query tags=${tags.join(",")}`);
      return null;
    }
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch (error) {
    console.warn("[sanity] fetch failed, using fallbacks", error);
    return null;
  }
}
