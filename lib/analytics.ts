type Params = Record<string, string | number | undefined>;
export type TrackEvent = "generate_lead" | "click_to_call" | "audit_cta_click";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    __ttrEvents?: [TrackEvent, Params][];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || "";
export const analyticsEnabled = !!(GA_ID || GTM_ID);

/**
 * Sends an event to GTM (dataLayer) and GA4 (gtag). The tags load on the
 * first interaction, so GA events fired before gtag exists are queued and
 * flushed by the loader. GTM reads earlier dataLayer pushes on its own.
 */
export function track(event: TrackEvent, params: Params = {}) {
  if (typeof window === "undefined" || !analyticsEnabled) return;
  try {
    if (GTM_ID) {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...params });
    }
    if (GA_ID) {
      if (window.gtag) window.gtag("event", event, params);
      else (window.__ttrEvents ??= []).push([event, params]);
    }
  } catch {
    /* never let analytics break the page */
  }
}

export function flushQueuedEvents() {
  const queue = window.__ttrEvents;
  if (!queue?.length || !window.gtag) return;
  window.__ttrEvents = [];
  for (const [event, params] of queue) window.gtag("event", event, params);
}
