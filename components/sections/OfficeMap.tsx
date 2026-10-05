import { ArrowUpRight } from "lucide-react";

/**
 * Stylized map illustration of the Brickell office (not to scale), linking
 * to Google Maps. Inline SVG: no API key, no third-party requests.
 */
export function OfficeMap({ href, address }: { href: string; address: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-anim
      className="group/map relative block overflow-hidden rounded-[24px] border border-line bg-ink-900 transition-[border-color,transform] duration-300 ease-out-expo hover:-translate-y-1 hover:border-violet-400/35"
    >
      <span className="sr-only">Open {address} in Google Maps (opens in a new tab)</span>
      <svg viewBox="0 0 640 400" className="block h-auto w-full" aria-hidden="true">
        <defs>
          <linearGradient id="bay" x1="0" x2="1">
            <stop offset="0" stopColor="#1a1430" />
            <stop offset="1" stopColor="#120f22" />
          </linearGradient>
          <radialGradient id="pin-glow">
            <stop offset="0" stopColor="#a66bff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#a66bff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="640" height="400" fill="#0c0a13" />
        {/* Biscayne Bay */}
        <path d="M470 0 C 450 90, 500 160, 470 240 S 500 360, 480 400 L 640 400 L 640 0 Z" fill="url(#bay)" />
        {/* Miami River */}
        <path d="M0 70 C 120 60, 200 95, 300 80 S 430 50, 470 64" fill="none" stroke="#1d1733" strokeWidth="14" strokeLinecap="round" />
        {/* Street grid */}
        <g stroke="rgb(255 255 255 / 0.07)" strokeWidth="1">
          {Array.from({ length: 12 }, (_, i) => (
            <line key={`h${i}`} x1="0" x2="470" y1={110 + i * 26} y2={104 + i * 26} />
          ))}
          {Array.from({ length: 10 }, (_, i) => (
            <line key={`v${i}`} x1={40 + i * 44} x2={30 + i * 44} y1="90" y2="400" />
          ))}
        </g>
        {/* Brickell Avenue */}
        <path d="M400 90 C 395 180, 410 280, 400 400" fill="none" stroke="rgb(196 155 255 / 0.55)" strokeWidth="3" />
        <text x="410" y="372" fill="rgb(221 200 255 / 0.7)" fontSize="12" fontFamily="var(--font-inter), sans-serif" transform="rotate(-88 410 372)">
          Brickell Ave
        </text>
        <text x="520" y="200" fill="rgb(255 255 255 / 0.28)" fontSize="13" fontFamily="var(--font-inter), sans-serif" letterSpacing="2">
          BISCAYNE BAY
        </text>
        {/* Pin */}
        <circle cx="400" cy="210" r="70" fill="url(#pin-glow)" />
        <circle cx="400" cy="210" r="22" fill="none" stroke="#c49bff" strokeOpacity="0.5" className="anim-pulse" />
        <circle cx="400" cy="210" r="9" fill="#a66bff" stroke="#ede3ff" strokeWidth="3" />
      </svg>
      <span className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 rounded-2xl border border-line-strong bg-ink-950/90 px-4 py-3 text-small">
        <span className="text-hi">{address}</span>
        <span className="inline-flex shrink-0 items-center gap-1 text-lavender-200">
          Google Maps
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/map:-translate-y-0.5 group-hover/map:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </span>
      <span className="absolute right-4 top-4 rounded-full border border-line-strong bg-ink-950/80 px-2.5 py-1 text-[0.6875rem] text-meta">Map illustration</span>
    </a>
  );
}
