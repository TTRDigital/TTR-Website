import { Quote } from "lucide-react";
import type { HomeContent } from "@/lib/content";
import { isPlaceholder, showPlaceholders } from "@/lib/placeholders";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Text } from "@/components/ui/Placeholder";
import { CountUp } from "@/components/motion/CountUp";

export function Results({ data }: { data: HomeContent["results"] }) {
  const cases = data.cases.filter(
    (c) => showPlaceholders || ![c.client, c.challenge, c.result].some((v) => isPlaceholder(v)),
  );

  return (
    <section id="results" aria-labelledby="results-title" className="section-pad relative scroll-mt-24 overflow-hidden">
      <div aria-hidden="true" className="leak left-1/2 top-0 h-[480px] w-[720px] -translate-x-1/2 opacity-35" />
      <div className="container-page relative">
        <SectionHeading id="results-title" eyebrow={data.eyebrow} title={data.heading} intro={data.intro} />

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-line bg-line lg:mt-20 lg:grid-cols-4">
          {data.stats.map((s, i) => (
            <div key={s.label} data-reveal style={{ "--i": i } as React.CSSProperties} className="flex flex-col-reverse justify-end bg-ink-950 p-6 sm:p-8 lg:p-10">
              <dt className="mt-3 text-small text-body">{s.label}</dt>
              <dd className="text-gradient font-display text-[clamp(2.5rem,1.6rem+3.4vw,4.5rem)] font-semibold leading-none tracking-[-0.04em]">
                {s.countTo ? <CountUp to={s.countTo} prefix={s.prefix} suffix={s.suffix} /> : s.value}
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 grid gap-4 md:grid-cols-3 lg:gap-5">
          {cases.map((c, i) => (
            <li
              key={`${c.industry}-${i}`}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="card flex flex-col rounded-[20px] p-6 transition-[transform,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-violet-400/30 sm:p-8"
            >
              <p className="text-micro font-medium uppercase tracking-[0.18em] text-lavender-200">{c.industry}</p>
              <h3 className="mt-3 text-[1.375rem] font-semibold tracking-[-0.02em]">
                <Text value={c.client} />
              </h3>
              <dl className="mt-6 space-y-4 text-small">
                <div>
                  <dt className="text-meta">Challenge</dt>
                  <dd className="mt-1 text-body">
                    <Text value={c.challenge} />
                  </dd>
                </div>
                <div>
                  <dt className="text-meta">Result</dt>
                  <dd className="mt-1 text-hi">
                    <Text value={c.result} />
                  </dd>
                </div>
              </dl>
              {c.metricLabel && !isPlaceholder(c.client) ? (
                <p className="mt-auto flex items-center gap-2 border-t border-line pt-6 text-small text-meta">
                  <Quote className="h-4 w-4 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                  In the words of {c.metricLabel}
                </p>
              ) : (
                <p className="mt-auto flex items-center gap-2 border-t border-line pt-6 text-small text-meta">
                  <Quote className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                  Case study coming soon
                </p>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-micro text-meta">{data.footnote}</p>
      </div>
    </section>
  );
}
