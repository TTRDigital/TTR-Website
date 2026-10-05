/** Public site URL, used for canonical links, schema and Open Graph. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttr-website-nu.vercel.app").replace(/\/$/, "");

export const absoluteUrl = (path = "/") => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
