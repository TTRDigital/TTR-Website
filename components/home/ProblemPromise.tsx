import { Check, X } from "lucide-react";
import type { HomeContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProblemPromise({ problem }: { problem: HomeContent["problem"] }) {
  return (
    <section aria-labelledby="problem-title" className="section-pad relative overflow-hidden">
      <div aria-hidden="true" className="leak -right-40 top-20 h-[420px] w-[420px] opacity-30" />
      <div className="container-page">
        <SectionHeading id="problem-title" eyebrow={problem.eyebrow} title={problem.heading} />

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2 lg:gap-6">
          <div data-reveal className="card rounded-[24px] p-6 sm:p-10">
            <h3 className="font-sans text-micro font-medium uppercase tracking-[0.18em] text-meta">What is broken</h3>
            <ul className="mt-8 space-y-8">
              {problem.broken.map((item, i) => (
                <li key={item.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line-strong text-meta">
                    <X className="h-3.5 w-3.5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-[1.25rem] font-medium tracking-[-0.01em] text-hi">{item.title}</span>
                    <span className="mt-2 block text-body">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div
            data-reveal
            style={{ "--i": 1 } as React.CSSProperties}
            className="relative overflow-hidden rounded-[24px] border border-violet-400/25 bg-[radial-gradient(120%_90%_at_100%_0%,rgb(110_31_168/0.42),transparent_60%),linear-gradient(180deg,var(--ink-850),var(--ink-900))] p-6 sm:p-10"
          >
            <h3 className="font-sans text-micro font-medium uppercase tracking-[0.18em] text-lavender-200">What TTR does about it</h3>
            <ul className="mt-8 space-y-8">
              {problem.fixes.map((item, i) => (
                <li key={item.title} data-reveal style={{ "--i": i + 1 } as React.CSSProperties} className="flex gap-4">
                  <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[image:var(--grad-brand)] text-white shadow-[0_0_20px_-2px_rgb(166_107_255/0.7)]">
                    <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-display text-[1.25rem] font-medium tracking-[-0.01em] text-hi">{item.title}</span>
                    <span className="mt-2 block text-body">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
