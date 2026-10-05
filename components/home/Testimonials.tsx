import { Quote } from "lucide-react";
import type { HomeContent, Testimonial } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

function Attribution({ t }: { t: Testimonial }) {
  const who = [t.name, [t.role, t.company].filter(Boolean).join(", ")].filter(Boolean);
  return (
    <figcaption className="mt-8 flex items-center gap-4">
      <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-[image:var(--grad-brand)] font-display text-small font-semibold text-white">
        {(t.name ?? t.company ?? "C").slice(0, 1)}
      </span>
      <span className="text-small">
        <span className="block font-medium text-hi">{who[0] ?? "Client"}</span>
        {who[1] ? <span className="block text-meta">{who[1]}</span> : null}
      </span>
    </figcaption>
  );
}

/** Works for 1 to 6 quotes: the first is featured, the rest fill a grid. */
export function Testimonials({ data, items }: { data: HomeContent["testimonials"]; items: Testimonial[] }) {
  if (!items.length) return null;
  const [featured, ...rest] = items.slice(0, 6);
  const restCols = rest.length >= 3 ? "lg:grid-cols-3" : rest.length === 2 ? "md:grid-cols-2" : "";

  return (
    <section aria-labelledby="testimonials-title" className="section-pad relative overflow-hidden">
      <div className="container-page">
        <SectionHeading id="testimonials-title" eyebrow={data.eyebrow} title={data.heading} />

        <div className={`mt-14 grid gap-4 lg:mt-20 lg:gap-6 ${rest.length === 1 ? "lg:grid-cols-12" : ""}`}>
          <figure
            data-reveal
            className={`relative overflow-hidden rounded-[28px] border border-violet-400/20 bg-[radial-gradient(100%_100%_at_0%_0%,rgb(110_31_168/0.35),transparent_55%),linear-gradient(180deg,var(--ink-850),var(--ink-900))] p-8 sm:p-12 ${
              rest.length === 1 ? "lg:col-span-7" : ""
            }`}
          >
            <Quote className="h-8 w-8 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
            <blockquote className="mt-6 font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.5rem)] font-medium leading-[1.2] tracking-[-0.02em] text-hi">
              <p>&ldquo;{featured.quote}&rdquo;</p>
            </blockquote>
            <Attribution t={featured} />
          </figure>

          {rest.length ? (
            <div className={`grid gap-4 lg:gap-6 ${rest.length === 1 ? "lg:col-span-5" : restCols}`}>
              {rest.map((t, i) => (
                <figure key={i} data-reveal style={{ "--i": i + 1 } as React.CSSProperties} className="card flex flex-col rounded-[24px] p-8">
                  <Quote className="h-6 w-6 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                  <blockquote className="mt-5 text-lead text-hi">
                    <p>&ldquo;{t.quote}&rdquo;</p>
                  </blockquote>
                  <div className="mt-auto">
                    <Attribution t={t} />
                  </div>
                </figure>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
