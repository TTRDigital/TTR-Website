/**
 * On-brand cover drawn in SVG/CSS (no image weight). Used for posts that
 * have no unique cover image. The pattern is seeded by the slug, so every
 * post gets its own stable variation.
 */
/** Small deterministic PRNG so a slug always draws the same cover. */
function seededRandom(text: string) {
  let seed = [...text].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100000, 7);
  return () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
}

export function GeneratedCover({ slug, category, size = "card" }: { slug: string; category?: string; size?: "card" | "hero" }) {
  const rand = seededRandom(slug);
  const rings = Array.from({ length: 5 }, (_, i) => 18 + i * 14 + rand() * 4);
  const cx = 62 + rand() * 22;
  const cy = 30 + rand() * 30;
  const dots = Array.from({ length: 36 }, () => {
    const a = rand() * Math.PI * 2;
    const r = 10 + rand() * 70;
    return { x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r * 0.62, s: 0.4 + rand() * 1.1, o: 0.25 + rand() * 0.75 };
  });
  const hero = size === "hero";

  return (
    <div
      aria-hidden="true"
      className={`relative isolate overflow-hidden bg-ink-900 ${hero ? "aspect-[21/9] rounded-[24px]" : "aspect-[16/10]"}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(80%_90%_at_80%_20%,rgb(110_31_168/0.75),transparent_65%),radial-gradient(60%_70%_at_0%_100%,rgb(166_107_255/0.25),transparent_70%)]" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
        {rings.map((r, i) => (
          <ellipse key={i} cx={cx} cy={cy} rx={r} ry={r * 0.62} fill="none" stroke="rgb(221 200 255)" strokeOpacity={0.08 + i * 0.03} strokeWidth="0.3" />
        ))}
        {dots.map((d, i) => (
          <circle key={i} cx={d.x} cy={d.y} r={d.s * 0.6} fill="rgb(237 227 255)" fillOpacity={d.o} />
        ))}
        <circle cx={cx} cy={cy} r="6" fill="rgb(166 107 255)" fillOpacity="0.9" />
        <circle cx={cx} cy={cy} r="12" fill="rgb(166 107 255)" fillOpacity="0.18" />
      </svg>
      <div className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 ${hero ? "p-8 sm:p-10" : "p-5"}`}>
        {category ? (
          <span className="w-fit rounded-full border border-white/15 bg-ink-950/60 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-lavender-200 backdrop-blur-sm">
            {category}
          </span>
        ) : null}
      </div>
    </div>
  );
}
