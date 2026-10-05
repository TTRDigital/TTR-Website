"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ComponentType } from "react";
import type { HeroSignals } from "./GrowthCore";
import type { SceneTier } from "./HeroScene";

type SceneComponent = ComponentType<{
  tier: SceneTier;
  active: boolean;
  signals: React.RefObject<HeroSignals>;
  onReady?: () => void;
}>;

type Tier = SceneTier | "poster";

/** Decide how much 3D this device should get. */
function detectTier(): Tier {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const nav = navigator as Navigator & { deviceMemory?: number; connection?: { saveData?: boolean } };
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  if (reduced || nav.connection?.saveData || cores <= 2 || memory <= 2) return "poster";
  try {
    const c = document.createElement("canvas");
    if (!c.getContext("webgl2") && !c.getContext("webgl")) return "poster";
  } catch {
    return "poster";
  }
  const small = window.matchMedia("(max-width: 767px)").matches;
  if (small || cores <= 4 || memory <= 4) return "lite";
  return "full";
}

/**
 * Hero visual: a static poster renders immediately in the same box the
 * canvas will use (zero layout shift). The WebGL scene loads later:
 * on desktop after the page is idle, on phones after the first touch or
 * scroll. Then the canvas cross-fades in over the poster.
 */
export function HeroVisual({ posterSrc, heroId }: { posterSrc: string; heroId: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const signals = useRef<HeroSignals>({ scroll: 0, px: 0, py: 0 });
  const [tier, setTier] = useState<SceneTier | null>(null);
  const [Scene, setScene] = useState<SceneComponent | null>(null);
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  /* Schedule the 3D load. */
  useEffect(() => {
    const t = detectTier();
    if (t === "poster") return;
    let cancelled = false;

    const load = () => {
      if (cancelled) return;
      import("./HeroScene").then((m) => {
        if (cancelled) return;
        setTier(t);
        setScene(() => m.default as SceneComponent);
      });
    };

    if (t === "full") {
      const idle = () =>
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(load, { timeout: 2500 })
          : setTimeout(load, 1200);
      if (document.readyState === "complete") idle();
      else window.addEventListener("load", idle, { once: true });
      return () => {
        cancelled = true;
        window.removeEventListener("load", idle);
      };
    }

    // Lite (phones and modest hardware): wait for real engagement.
    const events = ["pointerdown", "touchstart", "scroll", "keydown", "wheel"] as const;
    const onEngage = () => {
      events.forEach((e) => window.removeEventListener(e, onEngage));
      load();
    };
    events.forEach((e) => window.addEventListener(e, onEngage, { passive: true, once: true }));
    return () => {
      cancelled = true;
      events.forEach((e) => window.removeEventListener(e, onEngage));
    };
  }, []);

  /* Feed pointer and scroll progress to the scene without re-rendering. */
  useEffect(() => {
    if (!Scene) return;
    const hero = document.getElementById(heroId);
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      signals.current.px = (e.clientX / window.innerWidth) * 2 - 1;
      signals.current.py = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      signals.current.scroll = Math.min(1, Math.max(0, -r.top / (r.height * 0.85)));
    };
    onScroll();
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [Scene, heroId]);

  /* Pause when off screen or the tab is hidden. */
  useEffect(() => {
    const el = boxRef.current;
    if (!el || !Scene) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { rootMargin: "80px" });
    io.observe(el);
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [Scene]);

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className="hero-orb pointer-events-none absolute [mask-image:radial-gradient(closest-side,#000_72%,transparent)]"
    >
      <Image
        src={posterSrc}
        alt=""
        fill
        priority
        fetchPriority="high"
        quality={50}
        sizes="(min-width: 1024px) 56vw, (min-width: 640px) 92vw, 88vw"
        className={`object-contain transition-opacity duration-[900ms] ease-out-expo ${ready ? "opacity-0" : "opacity-100"}`}
      />
      {Scene && tier ? (
        <div className={`absolute inset-0 transition-opacity duration-[900ms] ease-out-expo ${ready ? "opacity-100" : "opacity-0"}`}>
          <Scene tier={tier} active={inView && tabVisible} signals={signals} onReady={() => setReady(true)} />
        </div>
      ) : null}
    </div>
  );
}
