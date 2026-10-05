"use client";

import { useEffect } from "react";
import { lenisStore } from "@/lib/lenis-store";

/**
 * Lenis smooth scroll with gentle settings. Loaded after the page is
 * interactive, desktop pointers only, and never with reduced motion.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (reduced.matches || !fine.matches) return;

    let destroyed = false;
    let raf = 0;
    let cleanup = () => {};

    import("lenis").then(({ default: Lenis }) => {
      if (destroyed) return;
      const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 }, autoRaf: false });
      lenisStore.set(lenis);
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      const onReduced = () => reduced.matches && lenis.destroy();
      reduced.addEventListener("change", onReduced);
      cleanup = () => {
        reduced.removeEventListener("change", onReduced);
        cancelAnimationFrame(raf);
        lenis.destroy();
        lenisStore.set(null);
      };
    });

    return () => {
      destroyed = true;
      cleanup();
    };
  }, []);

  return null;
}
