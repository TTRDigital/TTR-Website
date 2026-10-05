import Image from "next/image";
import type { HomeContent } from "@/lib/content";
import { isPlaceholder, showPlaceholders } from "@/lib/placeholders";

/**
 * Client logos. Six or more: one slow marquee that pauses on hover.
 * Fewer: a static row. None (and placeholders hidden): nothing.
 */
export function LogoRow({ logos }: { logos: HomeContent["logos"] }) {
  const items = logos.items.filter((l) => showPlaceholders || !isPlaceholder(l.name));
  if (!items.length) return null;
  const marquee = items.length >= 6;

  const renderItem = (l: { name: string; src?: string }, i: number, hidden = false) => (
    <li key={`${l.name}-${i}`} aria-hidden={hidden || undefined} className="flex h-12 shrink-0 items-center justify-center px-4 sm:px-6">
      {l.src ? (
        <Image src={l.src} alt={hidden ? "" : l.name} width={140} height={40} className="h-8 w-auto opacity-70 grayscale transition-opacity hover:opacity-100" />
      ) : (
        <span className="rounded-md border border-dashed border-cyan-400/50 px-3 py-1.5 font-mono text-micro text-cyan-400">{l.name}</span>
      )}
    </li>
  );

  return (
    <section aria-label={logos.heading} className="relative border-y border-line bg-ink-950 py-10">
      <div className="container-page flex flex-col items-center gap-6 lg:flex-row lg:gap-12">
        <p className="shrink-0 text-micro uppercase tracking-[0.18em] text-meta">{logos.heading}</p>
        {marquee ? (
          <div className="group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
            <ul data-marquee className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
              {items.map((l, i) => renderItem(l, i))}
              {items.map((l, i) => renderItem(l, i + items.length, true))}
            </ul>
          </div>
        ) : (
          <ul className="flex w-full flex-wrap items-center justify-center gap-y-2 lg:flex-nowrap lg:justify-between">{items.map((l, i) => renderItem(l, i))}</ul>
        )}
      </div>
    </section>
  );
}
