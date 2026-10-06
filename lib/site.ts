/**
 * Public site URL, used for canonical links, the sitemap, schema and Open
 * Graph. Defaults to the main domain; NEXT_PUBLIC_SITE_URL overrides it.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://ttrdigitalmarketing.com").replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
