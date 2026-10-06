import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { HomeContent, ServiceSummary } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/icons";
import { Spotlight } from "@/components/motion/Spotlight";
import { AdsMockup, RankingMockup } from "./Mockups";

/* Desktop placement: two large tiles (SEO, Google Ads) with mockups,
   six compact tiles around them. */
const layout: Record<string, string> = {
  seo: "md:col-span-2 lg:col-span-7 lg:row-span-2 lg:col-start-1 lg:row-start-1",
  "search-everywhere-optimization": "lg:col-span-5 lg:col-start-8 lg:row-start-1",
  "meta-ads": "lg:col-span-5 lg:col-start-8 lg:row-start-2",
  "website-design": "lg:col-span-5 lg:col-start-1 lg:row-start-3",
  "social-media-marketing": "lg:col-span-5 lg:col-start-1 lg:row-start-4",
  "google-ads": "md:col-span-2 lg:col-span-7 lg:row-span-2 lg:col-start-6 lg:row-start-3",
  "gohighlevel-crm": "lg:col-span-6 lg:col-start-1 lg:row-start-5",
  "ai-agents": "lg:col-span-6 lg:col-start-7 lg:row-start-5",
};

const largeCopy: Record<string, { kicker: string; line: string }> = {
  seo: { kicker: "SEO + AI search", line: "Rank in Google and the map pack, and get recommended in AI answers." },
  "google-ads": { kicker: "Google Ads", line: "Show up the moment someone searches, and pay for calls, not wasted clicks." },
};

export function ServicesBento({ intro, services }: { intro: HomeContent["services"]; services: ServiceSummary[] }) {
  return (
    <section aria-labelledby="services-title" className="section-pad relative">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading id="services-title" eyebrow={intro.eyebrow} title={intro.heading} intro={intro.intro} />
          <Link href="/services" data-reveal className="inline-flex min-h-11 shrink-0 items-center self-start text-hi lg:self-auto">
            <span className="link-underline">View all services</span>
          </Link>
        </div>

        <Spotlight className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-5">
          {services.map((s, i) => {
            const large = largeCopy[s.slug];
            return (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                data-spotlight
                data-reveal
                style={{ "--i": i % 4 } as React.CSSProperties}
                className={`spotlight group/tile relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-[linear-gradient(180deg,var(--ink-850),var(--ink-900))] transition-[transform,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-violet-400/35 hover:shadow-[0_24px_60px_-30px_rgb(138_47_208/0.7)] ${
                  layout[s.slug] ?? "lg:col-span-4"
                } ${large ? "p-6 sm:p-8" : "p-6"}`}
              >
                {large ? (
                  <>
                    <div className="relative z-[1] flex items-start justify-between gap-6">
                      <div>
                        <p className="text-micro font-medium uppercase tracking-[0.18em] text-lavender-200">{large.kicker}</p>
                        <h3 className="mt-3 max-w-md text-h3 font-semibold">{s.title === "SEO" ? "SEO and Search Everywhere" : s.title}</h3>
                        <p className="mt-3 max-w-md text-body">{large.line}</p>
                      </div>
                      <TileArrow />
                    </div>
                    <div className="relative z-[1] mt-8 lg:mt-auto lg:pt-8">{s.slug === "seo" ? <RankingMockup /> : <AdsMockup />}</div>
                  </>
                ) : (
                  <div className="relative z-[1] flex h-full flex-col">
                    <div className="flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-white/[0.03] text-violet-300 transition-colors duration-300 group-hover/tile:border-violet-400/50 group-hover/tile:text-lavender-100">
                        <ServiceIcon slug={s.slug} className="h-5 w-5" />
                      </span>
                      <TileArrow />
                    </div>
                    <h3 className="mt-8 text-[1.375rem] font-semibold leading-tight tracking-[-0.02em] lg:mt-auto lg:pt-10">{s.title}</h3>
                    <p className="mt-2 text-small text-body sm:text-body">{s.summary}</p>
                  </div>
                )}
              </Link>
            );
          })}
        </Spotlight>
      </div>
    </section>
  );
}

function TileArrow() {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-meta transition-[color,border-color,transform] duration-300 group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5 group-hover/tile:border-violet-400/50 group-hover/tile:text-hi">
      <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    </span>
  );
}
