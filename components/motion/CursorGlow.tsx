"use client";

import { useEffect, useRef } from "react";

/**
 * A soft violet glow that trails the pointer over dark sections.
 * Desktop only, hidden over light sections, off for reduced motion.
 */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let visible = false;
    let raf = 0;

    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${(x - 300).toFixed(1)}px, ${(y - 300).toFixed(1)}px, 0)`;
      raf = Math.abs(tx - x) + Math.abs(ty - y) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      const overLight = !!(e.target as Element | null)?.closest?.('[data-surface="light"]');
      const show = !overLight;
      if (show !== visible) {
        visible = show;
        el.style.opacity = show ? "1" : "0";
      }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      visible = false;
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[600px] w-[600px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-500 will-change-transform"
      style={{ background: "radial-gradient(closest-side, rgb(138 47 208 / 0.16), rgb(138 47 208 / 0.05) 50%, transparent)" }}
    />
  );
}
