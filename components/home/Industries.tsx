import Link from "next/link";
import { ArrowRight, ArrowUpRight, Stethoscope, Wrench } from "lucide-react";
import type { HomeContent } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons = [Stethoscope, Wrench];

export function Industries({ data }: { data: HomeContent["industries"] }) {
  return (
    <section aria-labelledby="industries-title" className="section-pad relative overflow-hidden">
      <div className="container-page">
        <SectionHeading id="industries-title" eyebrow={data.eyebrow} title={data.heading} />

        <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2 lg:gap-6">
          {data.cards.map((card, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Link
                key={card.href}
                href={card.href}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className="group/ind relative flex min-h-[420px] flex-col overflow-hidden rounded-[28px] border border-line bg-ink-900 p-8 transition-[transform,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_30px_80px_-40px_rgb(138_47_208/0.8)] sm:p-10 lg:min-h-[520px]"
              >
                <div
                  aria-hidden="true"
                  className={`absolute inset-0 -z-0 opacity-80 transition-opacity duration-500 group-hover/ind:opacity-100 ${
                    i === 0
                      ? "bg-[radial-gradient(90%_70%_at_100%_0%,rgb(110_31_168/0.5),transparent_60%)]"
                      : "bg-[radial-gradient(90%_70%_at_0%_0%,rgb(110_31_168/0.5),transparent_60%)]"
                  }`}
                />
                <div aria-hidden="true" className="absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
                <div className="relative flex items-start justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line-strong bg-white/[0.04] text-lavender-200">
                    <Icon className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-meta transition-[color,border-color,transform] duration-300 group-hover/ind:-translate-y-0.5 group-hover/ind:translate-x-0.5 group-hover/ind:border-violet-400/50 group-hover/ind:text-hi">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </div>
                <div className="relative mt-auto pt-16">
                  <p className="text-micro font-medium uppercase tracking-[0.18em] text-lavender-200">{card.eyebrow}</p>
                  <h3 className="mt-4 max-w-md font-display text-[clamp(1.75rem,1.2rem+1.8vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.03em]">
                    {card.title}
                  </h3>
                  <p className="mt-4 max-w-md text-body">{card.text}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label={`${card.eyebrow} we work with`}>
                    {card.tags.map((t) => (
                      <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-micro text-body">
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            );
          })}
        </div>

        <p data-reveal className="mt-8 flex flex-col gap-3 text-body sm:flex-row sm:items-center sm:gap-4">
          {data.more}
          <Link href="/contact" className="group inline-flex min-h-11 items-center gap-2 font-medium text-hi">
            <span className="link-underline">Talk to us</span>
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  );
}
