import type { HomeContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

/**
 * Four steps: horizontal on desktop, vertical on mobile. The progress line
 * fills as you scroll (CSS scroll-driven animation, no JS). Browsers
 * without support, and reduced motion, show the full line.
 */
export function Process({ data }: { data: HomeContent["process"] }) {
  return (
    <section aria-labelledby="process-title" className="section-pad relative">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={data.eyebrow} title={data.heading} intro={data.intro} />

        <div className="relative mt-14 lg:mt-24">
          {/* Track + fill: vertical on mobile, horizontal on desktop */}
          <div aria-hidden="true" className="absolute bottom-6 left-[19px] top-6 w-px bg-line-strong lg:bottom-auto lg:left-0 lg:right-0 lg:top-[19px] lg:h-px lg:w-auto">
            <div className="process-fill h-full w-full bg-gradient-to-b from-violet-300 via-violet-400 to-brand-600 shadow-[0_0_12px_rgb(166_107_255/0.8)] lg:bg-gradient-to-r" />
          </div>

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {data.steps.map((step, i) => (
              <li key={step.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="relative flex gap-6 lg:block">
                <span className="relative z-[1] flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-400/50 bg-ink-950 font-display text-small font-semibold text-lavender-100 shadow-[0_0_0_6px_var(--ink-950),0_0_24px_-4px_rgb(166_107_255/0.8)]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="lg:mt-8 lg:pr-4">
                  <h3 className="text-h3 font-semibold">{step.title}</h3>
                  <p className="mt-3 text-body">{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
