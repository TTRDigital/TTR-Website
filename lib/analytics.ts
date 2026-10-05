type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Sends an event to GTM (dataLayer) and/or GA4 (gtag) when they are loaded. */
export function track(event: "generate_lead" | "click_to_call" | "audit_cta_click", params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer?.push({ event, ...params });
    window.gtag?.("event", event, params);
  } catch {
    /* never let analytics break the page */
  }
}
