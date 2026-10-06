/* Small HTML/SVG UI mockups used as visuals. Decorative, so hidden from
   assistive tech. Animations play once when the parent reveals. */

export function RankingMockup() {
  return (
    <div aria-hidden="true" data-anim className="mock relative rounded-2xl border border-line bg-ink-950/70 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-violet-400 shadow-[0_0_10px_2px_rgb(166_107_255/0.7)]" />
          <span className="text-micro font-medium text-hi">Local visibility</span>
        </div>
        <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.6875rem] text-meta">Example view</span>
      </div>

      <svg viewBox="0 0 320 120" className="mt-4 h-auto w-full overflow-visible">
        <defs>
          <linearGradient id="rk-area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#a66bff" stopOpacity="0.35" />
            <stop offset="1" stopColor="#a66bff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="rk-line" x1="0" x2="1">
            <stop offset="0" stopColor="#6e1fa8" />
            <stop offset="1" stopColor="#ddc8ff" />
          </linearGradient>
        </defs>
        {[20, 50, 80, 110].map((y) => (
          <line key={y} x1="0" x2="320" y1={y} y2={y} stroke="rgb(255 255 255 / 0.06)" strokeDasharray="2 4" />
        ))}
        <path className="mock-area" d="M0 104 C40 100 60 96 90 86 S150 70 180 52 S250 26 320 12 L320 120 L0 120 Z" fill="url(#rk-area)" />
        <path
          className="mock-draw"
          d="M0 104 C40 100 60 96 90 86 S150 70 180 52 S250 26 320 12"
          fill="none"
          stroke="url(#rk-line)"
          strokeWidth="2.5"
          strokeLinecap="round"
          pathLength={1}
        />
        <circle className="mock-dot" cx="320" cy="12" r="4.5" fill="#ede3ff" />
        <circle className="mock-dot anim-pulse" cx="320" cy="12" r="9" fill="none" stroke="#c49bff" strokeOpacity="0.6" />
      </svg>

      <ul className="mt-4 space-y-2">
        {[
          ["dentist near me", "Map pack"],
          ["emergency AC repair", "Top 3"],
          ["best plumber near me", "AI answer"],
        ].map(([q, tag], i) => (
          <li
            key={q}
            className="mock-row flex items-center justify-between rounded-lg border border-line bg-white/[0.02] px-3 py-2"
            style={{ "--r": i } as React.CSSProperties}
          >
            <span className="truncate text-micro text-body">{q}</span>
            <span className="ml-3 shrink-0 rounded-full bg-violet-400/15 px-2 py-0.5 text-[0.6875rem] font-medium text-lavender-200">{tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AdsMockup() {
  const bars = [28, 36, 32, 48, 56, 64, 78];
  return (
    <div aria-hidden="true" data-anim className="mock relative space-y-3">
      <div className="flex items-center gap-2 rounded-full border border-line bg-ink-950/70 px-4 py-2.5">
        <svg viewBox="0 0 24 24" className="h-4 w-4 text-meta" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="6" />
          <path d="m20 20-4.5-4.5" />
        </svg>
        <span className="text-micro text-body">
          ac repair near me<span className="mock-caret ml-0.5 inline-block h-3 w-px translate-y-0.5 bg-lavender-200" />
        </span>
      </div>

      <div className="mock-row rounded-2xl border border-violet-400/25 bg-ink-950/70 p-4" style={{ "--r": 0 } as React.CSSProperties}>
        <div className="flex items-center gap-2 text-[0.6875rem] text-meta">
          <span className="font-medium text-hi">Sponsored</span>
          <span>yourcompany.com</span>
        </div>
        <p className="mt-1.5 font-display text-[0.9375rem] leading-snug text-lavender-200">24/7 AC repair near you. Same-day service.</p>
        <p className="mt-1 text-micro text-meta">Licensed local techs. Upfront quotes. Book online or call now.</p>
        <div className="mt-3 flex gap-2">
          <span className="rounded-full bg-[image:var(--grad-brand)] px-3 py-1 text-[0.6875rem] font-medium text-white">Call now</span>
          <span className="rounded-full border border-line-strong px-3 py-1 text-[0.6875rem] text-body">Book online</span>
        </div>
      </div>

      <div className="mock-row rounded-2xl border border-line bg-ink-950/70 p-4" style={{ "--r": 1 } as React.CSSProperties}>
        <div className="flex items-center justify-between">
          <span className="text-micro font-medium text-hi">Calls from ads</span>
          <span className="rounded-full border border-line-strong px-2 py-0.5 text-[0.6875rem] text-meta">Example view</span>
        </div>
        <div className="mt-4 flex h-20 items-end gap-2">
          {bars.map((h, i) => (
            <span
              key={i}
              className="mock-bar flex-1 rounded-t-md bg-gradient-to-t from-brand-600/60 to-violet-300"
              style={{ height: `${h}%`, "--b": i } as React.CSSProperties}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
