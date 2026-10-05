"use client";

import { useEffect, useRef } from "react";

/**
 * Server HTML always shows the final number (readable without JS).
 * If the number is still below the fold when JS loads, it is reset to 0
 * and counts up the first time it scrolls into view (Motion is loaded then).
 */
export function CountUp({ to, prefix = "", suffix = "", duration = 1.4 }: { to: number; prefix?: string; suffix?: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fmt = (n: number) => `${prefix}${Math.round(n).toLocaleString("en-US")}${suffix}`;

    // The observer's first callback says whether it is already on screen,
    // so there is no layout read (and no forced reflow) on mount.
    let first = true;
    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          if (entry.isIntersecting) {
            io.disconnect(); // already visible: keep the final number
            return;
          }
          el.textContent = fmt(0);
          return;
        }
        if (!entry.isIntersecting) return;
        io.disconnect();
        // Motion loads only when a counter is about to animate.
        import("motion").then(({ animate }) => {
          const controls = animate(0, to, {
            duration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (v) => {
              el.textContent = fmt(v);
            },
          });
          stop = () => controls.stop();
        });
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
      el.textContent = fmt(to);
    };
  }, [to, prefix, suffix, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {to.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
