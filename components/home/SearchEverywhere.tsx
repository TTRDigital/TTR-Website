import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { HomeContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/* Platform positions around the central node, in % of the square. */
const spots = [
  { x: 50, y: 9 },
  { x: 88, y: 30 },
  { x: 88, y: 70 },
  { x: 50, y: 91 },
  { x: 12, y: 70 },
  { x: 12, y: 30 },
];

export function SearchEverywhere({ data }: { data: HomeContent["searchEverywhere"] }) {
  return (
    <section aria-labelledby="se-title" className="section-pad relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-dots opacity-50 [mask-image:radial-gradient(60%_60%_at_70%_50%,#000,transparent)]" />
      <div className="container-page grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading id="se-title" eyebrow={data.eyebrow} title={data.heading} intro={data.text} />
          <ul className="mt-10 space-y-4">
            {data.points.map((p, i) => (
              <li key={p} data-reveal style={{ "--i": i } as React.CSSProperties} className="flex gap-3 text-body">
                <Check className="mt-1 h-4 w-4 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                {p}
              </li>
            ))}
          </ul>
          <div data-reveal style={{ "--i": 4 } as React.CSSProperties} className="mt-10">
            <Link
              href="/services/search-everywhere-optimization"
              className="group inline-flex min-h-11 items-center gap-2 font-medium text-hi"
            >
              <span className="link-underline">How Search Everywhere works</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <figure data-reveal data-anim className="se-orbit relative mx-auto aspect-square w-full max-w-[600px]">
            <figcaption className="sr-only">
              TTR at the center, connected to {data.platforms.join(", ")}.
            </figcaption>
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
              <defs>
                <radialGradient id="se-core" cx="50%" cy="50%" r="50%">
                  <stop offset="0" stopColor="#a66bff" stopOpacity="0.55" />
                  <stop offset="1" stopColor="#a66bff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="se-line" x1="0" x2="1">
                  <stop offset="0" stopColor="#c49bff" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#c49bff" stopOpacity="0.15" />
                </linearGradient>
                <radialGradient id="se-packet">
                  <stop offset="0" stopColor="#f3ebff" stopOpacity="1" />
                  <stop offset="0.35" stopColor="#c49bff" stopOpacity="0.8" />
                  <stop offset="1" stopColor="#a66bff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Breathing core glow */}
              <circle cx="50" cy="50" r="30" fill="url(#se-core)" className="se-breathe" />

              {/* Orbit rings turn in alternating directions, each with a satellite */}
              {[
                { r: 18, dur: "26s", dash: "0.5 2.2", rev: true },
                { r: 28, dur: "40s", dash: "1.2 3", rev: false },
                { r: 38, dur: "60s", dash: "0.4 1.6", rev: true },
              ].map((o) => (
                <g key={o.r} className={`se-spin${o.rev ? " se-rev" : ""}`} style={{ "--dur": o.dur } as React.CSSProperties}>
                  <circle cx="50" cy="50" r={o.r} fill="none" stroke="rgb(255 255 255 / 0.09)" strokeWidth="0.22" strokeDasharray={o.dash} />
                  <circle cx="50" cy={50 - o.r} r="0.75" fill="#c49bff" className="se-sat" />
                </g>
              ))}

              {spots.map((s, i) => {
                const mx = 50 + (s.x - 50) * 0.5 + (i % 2 ? 6 : -6);
                const my = 50 + (s.y - 50) * 0.5;
                const d = `M50 50 Q${mx} ${my} ${s.x} ${s.y}`;
                return (
                  <g key={i}>
                    {/* Spoke draws in when the diagram scrolls into view */}
                    <path
                      d={d}
                      pathLength={1}
                      fill="none"
                      stroke="rgb(196 155 255 / 0.3)"
                      strokeWidth="0.3"
                      className="se-spoke"
                      style={{ "--i": i } as React.CSSProperties}
                    />
                    <path
                      d={d}
                      fill="none"
                      stroke="url(#se-line)"
                      strokeWidth="0.45"
                      strokeLinecap="round"
                      strokeDasharray="4 12"
                      className="anim-dash"
                      style={{ animationDelay: `${i * -0.27}s` }}
                    />
                    {/* A lead travels from each platform into TTR */}
                    <circle r="2.2" fill="url(#se-packet)" className="se-packet">
                      <animateMotion
                        dur="2.8s"
                        begin={`${(i * 0.47).toFixed(2)}s`}
                        repeatCount="indefinite"
                        keyPoints="1;0"
                        keyTimes="0;1"
                        calcMode="linear"
                        path={d}
                      />
                    </circle>
                  </g>
                );
              })}
            </svg>

            {/* Center node */}
            <div className="absolute left-1/2 top-1/2 flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
              <span aria-hidden="true" className="anim-pulse absolute inset-0 rounded-full border border-violet-300/40" />
              <span aria-hidden="true" className="anim-pulse absolute inset-0 rounded-full border border-violet-300/30 [animation-delay:-1.2s]" />
              <span className="se-core relative flex h-full w-full items-center justify-center rounded-full bg-[image:var(--grad-brand)] font-display text-[clamp(1rem,3.2vw,1.75rem)] font-semibold tracking-[-0.03em] text-white shadow-[0_0_60px_-4px_rgb(166_107_255/0.8),inset_0_1px_0_rgb(255_255_255/0.25)]">
                TTR
              </span>
            </div>

            {/* Platform labels pop in, then float */}
            <ul aria-hidden="true">
              {data.platforms.map((p, i) => (
                <li
                  key={p}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${spots[i % spots.length].x}%`, top: `${spots[i % spots.length].y}%` }}
                >
                  <span className="se-node block" style={{ "--i": i } as React.CSSProperties}>
                    <span className="se-float flex items-center gap-2 whitespace-nowrap rounded-full border border-line-strong bg-ink-850/95 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.8)] px-3 py-1.5 text-micro font-medium text-hi sm:px-4 sm:py-2 sm:text-small" style={{ animationDelay: `${i * -0.9}s` }}>
                      <span className="se-dot h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_1px_rgb(196_155_255/0.8)]" style={{ animationDelay: `${(i * 0.47).toFixed(2)}s` }} />
                      {p}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </figure>
        </div>
      </div>
    </section>
  );
}
