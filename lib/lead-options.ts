/* Zod-free constants shared by the lead form (client) and /api/lead. */

export const serviceOptions = [
  "SEO",
  "Search Everywhere Optimization",
  "Google Ads",
  "Meta Ads",
  "Website Design",
  "Social Media Marketing",
  "GoHighLevel CRM",
  "AI Agents",
  "Not sure yet",
] as const;

export const attributionKeys = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "fbclid",
] as const;

export const ATTRIBUTION_STORAGE_KEY = "ttr_attribution";

/** Minimum time a human needs to fill the form. Faster submits are dropped as bots. */
export const MIN_FILL_MS = 2500;
