"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __ttrHydrated?: boolean;
  }
}

/** Tells the inline reveal script that React has hydrated the page. */
export function HydrationSignal() {
  useEffect(() => {
    window.__ttrHydrated = true;
    window.dispatchEvent(new Event("ttr:hydrated"));
  }, []);
  return null;
}
