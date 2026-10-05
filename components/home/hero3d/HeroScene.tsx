"use client";

import { Canvas } from "@react-three/fiber";
import { GrowthCore, type HeroSignals } from "./GrowthCore";

export type SceneTier = "full" | "lite";

/** The live WebGL canvas. Loaded with a dynamic import, home page only. */
export default function HeroScene({
  tier,
  active,
  signals,
  onReady,
  frozenTime,
}: {
  tier: SceneTier;
  active: boolean;
  signals: React.RefObject<HeroSignals>;
  onReady?: () => void;
  frozenTime?: number;
}) {
  const cap = tier === "full" ? 1.5 : 1.25;
  const dpr = Math.min(typeof window === "undefined" ? 1 : window.devicePixelRatio || 1, cap);
  const count = tier === "full" ? 14000 : 6000;

  return (
    <Canvas
      dpr={dpr}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 4.6], fov: 40, near: 0.1, far: 20 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: frozenTime !== undefined }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        // Wait two frames so the first real frame is on screen before fading in.
        requestAnimationFrame(() => requestAnimationFrame(() => onReady?.()));
      }}
      aria-hidden="true"
      style={{ pointerEvents: "none" }}
    >
      <GrowthCore count={count} signals={signals} frozenTime={frozenTime} pixelRatio={dpr} sizeBoost={tier === "full" ? 1 : 1.35} />
    </Canvas>
  );
}
