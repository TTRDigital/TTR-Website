/*
 * 301 redirects from the old WordPress site. The full list of old URLs and
 * where each one goes is in REDIRECTS.md. Each source matches with or
 * without the trailing slash WordPress used, so old links take one hop.
 */

type Redirect = { source: string; destination: string; statusCode: 301 };

const STATES = "al|ca|dc|fl|ga|il|ma|md|ny|pa|va";

const map: [string, string][] = [
  // Pages
  ["/about-us", "/about"],
  ["/about-kia", "/about"],
  ["/contact-us", "/contact"],
  ["/audit", "/contact"],
  ["/digital-marketing-referral-program", "/contact"],
  ["/thank-you-free-audit", "/thank-you"],
  ["/privacy-policy", "/privacy"],
  ["/terms-of-service", "/terms"],
  ["/sitemap", "/"],
  ["/testing-page", "/"],
  // Old service pages
  ["/digital-marketing-services", "/services"],
  ["/digital-marketing-services/seo", "/services/seo"],
  ["/digital-marketing-services/ppc", "/services/google-ads"],
  ["/digital-marketing-services/social-media", "/services/social-media-marketing"],
  ["/digital-marketing-services/health-care", "/dental-marketing"],
  ["/digital-marketing-services/automotive", "/services"],
  ["/digital-marketing-services/insurance", "/services"],
  // WordPress system URLs that search engines have indexed
  ["/sitemap_index.xml", "/sitemap.xml"],
  ["/page-sitemap.xml", "/sitemap.xml"],
  ["/post-sitemap.xml", "/sitemap.xml"],
  ["/category-sitemap.xml", "/sitemap.xml"],
  ["/wp-sitemap.xml", "/sitemap.xml"],
  ["/feed", "/blog"],
  ["/blog/feed", "/blog"],
  ["/category/:slug*", "/blog"],
  ["/tag/:slug*", "/blog"],
  ["/author/:slug*", "/about"],
  // Slugs from the earlier build of this site
  ["/services/websites", "/services/website-design"],
  ["/services/social-media", "/services/social-media-marketing"],
  // Old city pages: one service page per channel, the city in the slug is dropped
  [`/:state(${STATES})/:city([a-z-]+)-seo`, "/services/seo"],
  [`/:state(${STATES})/:city([a-z-]+)-ppc`, "/services/google-ads"],
  [`/:state(${STATES})/:city([a-z-]+)-social-media`, "/services/social-media-marketing"],
  [`/:state(${STATES})/:city([a-z-]+)-digital-marketing`, "/"],
  // Old state hub pages
  [`/:state(${STATES})`, "/"],
];

export const redirects: Redirect[] = [
  ...map.map(([source, destination]) => ({ source: `${source}{/}?`, destination, statusCode: 301 as const })),
  // Any other old URL with a trailing slash (blog posts keep their slugs)
  { source: "/:path+/", destination: "/:path+", statusCode: 301 },
];
