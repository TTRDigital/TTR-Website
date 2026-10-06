"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { GA_ID, GTM_ID, analyticsEnabled, flushQueuedEvents, track, type TrackEvent } from "@/lib/analytics";

const INTERACTIONS = ["pointerdown", "keydown", "touchstart", "scroll"] as const;
const TRACKED = new Set<string>(["click_to_call", "audit_cta_click", "generate_lead"]);

/**
 * GA4 / GTM load on the first interaction so they never cost page speed.
 * Clicks are tracked by delegation: every tel: link fires click_to_call and
 * any element with data-track="<event>" fires that event.
 */
export function SiteAnalytics() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled) return;
    const start = () => setLoad(true);
    for (const e of INTERACTIONS) window.addEventListener(e, start, { once: true, passive: true, capture: true });
    return () => {
      for (const e of INTERACTIONS) window.removeEventListener(e, start, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (!load || !GA_ID) return;
    // gtag is defined by the GA init script; flush anything queued before it.
    let tries = 0;
    const id = window.setInterval(() => {
      if (window.gtag || ++tries > 50) {
        window.clearInterval(id);
        flushQueuedEvents();
      }
    }, 100);
    return () => window.clearInterval(id);
  }, [load]);

  useEffect(() => {
    if (!analyticsEnabled) return;
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.("a, button, [data-track]");
      if (!el) return;
      const named = el.getAttribute("data-track");
      const href = el.getAttribute("href") ?? "";
      const event = named && TRACKED.has(named) ? (named as TrackEvent) : href.startsWith("tel:") ? "click_to_call" : null;
      if (!event || event === "generate_lead") return;
      track(event, {
        link_url: href || undefined,
        link_text: ((el as HTMLElement).innerText ?? "").trim().replace(/\s+/g, " ").slice(0, 80) || undefined,
        page_path: window.location.pathname,
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!load) return null;
  return (
    <>
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      {GA_ID ? <GoogleAnalytics gaId={GA_ID} /> : null}
    </>
  );
}
