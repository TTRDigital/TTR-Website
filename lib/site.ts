/**
 * Public site URL, used for canonical links, the sitemap, schema and Open
 * Graph. Defaults to the main domain (www, the primary domain in Vercel);
 * NEXT_PUBLIC_SITE_URL overrides it.
 */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.ttrdigitalmarketing.com").replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;

/** Registered legal entity (matches the Twilio A2P brand registration). The brand name is the same. */
export const legalName = "TTR Digital Marketing LLC";
