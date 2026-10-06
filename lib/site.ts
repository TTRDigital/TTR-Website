/**
 * Public site URL, used for canonical links, the sitemap, schema and Open
 * Graph. Defaults to the main domain (www, the primary domain in Vercel);
 * NEXT_PUBLIC_SITE_URL overrides it.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ttrdigitalmarketing.com").replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
