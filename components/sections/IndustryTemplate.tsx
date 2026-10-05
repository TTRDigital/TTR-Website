import Link from "next/link";
import { ArrowRight, ArrowUpRight, Phone, X } from "lucide-react";
import type { IndustryPage } from "@/lib/data/industries";
import type { ServiceSummary, SiteSettings, Testimonial } from "@/lib/content";
import { isPlaceholder, showPlaceholders } from "@/lib/placeholders";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/icons";
import { Text } from "@/components/ui/Placeholder";
import { Spotlight } from "@/components/motion/Spotlight";
import { ServiceMockup } from "@/components/mockups/ServiceMockups";

type Props = {
  page: IndustryPage;
  settings: SiteSettings;
  services: ServiceSummary[];
  testimonials: Testimonial[];
};

/** Shared layout for the dental and home services pages. */
export function IndustryTemplate({ page, settings, services, testimonials }: Props) {
  const system = page.system.map((s) => ({ ...s, service: services.find((x) => x.slug === s.slug) })).filter((s) => s.service);
  const showProof = showPlaceholders || !isPlaceholder(page.proofPlaceholder);
  const quote = testimonials[1];

  return (
    <>
      <PageHero
        breadcrumbs={[{ name: page.name, href: `/${page.slug}` }]}
        eyebrow={page.eyebrow}
        title={page.heading}
        intro={<p>{page.intro}</p>}
        actions={
          <>
            <Button href="#audit" size="lg" magnetic track="audit_cta_click">
              Get a free growth audit
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
            </Button>
            <Button href={settings.phoneHref} size="lg" variant="secondary">
              <Phone className="h-4 w-4 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
              Call {settings.phone}
            </Button>
          </>
        }
        visual={<ServiceMockup kind={page.mockup} />}
      />

      {/* Pain points */}
      <section aria-labelledby="pains-title" className="section-pad relative border-t border-line">
        <div className="container-page">
          <SectionHeading id="pains-title" eyebrow="The problem" title={page.painsHeading} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
            {page.pains.map((p, i) => (
              <li key={p.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="card rounded-[20px] p-6 sm:p-8">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong text-meta">
                  <X className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-2 text-small text-body">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The system */}
      <section aria-labelledby="system-title" className="section-pad relative overflow-hidden">
        <div aria-hidden="true" className="leak -right-40 top-10 h-[520px] w-[520px] opacity-35" />
        <div className="container-page">
          <SectionHeading id="system-title" eyebrow="What we do about it" title={page.systemHeading} intro={page.systemIntro} />
          <Spotlight className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
            {system.map(({ slug, why, service }, i) => (
              <Link
                key={slug}
                href={`/services/${slug}`}
                data-spotlight
                data-reveal
                style={{ "--i": i % 3 } as React.CSSProperties}
                className="spotlight group/tile relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-[linear-gradient(180deg,var(--ink-850),var(--ink-900))] p-6 transition-[transform,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-violet-400/35 sm:p-8"
              >
                <div className="relative z-[1] flex items-center justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line-strong bg-white/[0.03] text-violet-300">
                    <ServiceIcon slug={slug} className="h-5 w-5" />
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-meta transition-[color,transform] duration-300 group-hover/tile:-translate-y-0.5 group-hover/tile:translate-x-0.5 group-hover/tile:text-hi" strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3 className="relative z-[1] mt-8 text-[1.25rem] font-semibold tracking-[-0.015em]">{service!.title}</h3>
                <p className="relative z-[1] mt-2 text-small text-body">{why}</p>
              </Link>
            ))}
          </Spotlight>
        </div>
      </section>

      {page.trades ? (
        <section aria-labelledby="trades-title" className="relative pb-16 lg:pb-24">
          <div className="container-page">
            <h2 id="trades-title" data-reveal className="font-sans text-micro font-medium uppercase tracking-[0.18em] text-meta">
              Trades we work with
            </h2>
            <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-4">
              {page.trades.map((t, i) => (
                <li key={t.name} data-reveal style={{ "--i": i % 4 } as React.CSSProperties} className="bg-ink-950 p-5 sm:p-6">
                  <p className="font-display text-[1.125rem] font-semibold text-hi">{t.name}</p>
                  <p className="mt-1 text-small text-meta">{t.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <Process
        data={{
          eyebrow: "A typical month",
          heading: "What working together looks like.",
          intro: "Steady, visible work every week, and a clear report at the end of every month.",
          steps: page.month,
        }}
      />

      {showProof ? (
        <section aria-labelledby="proof-title" className="section-pad relative">
          <div className="container-page">
            <SectionHeading id="proof-title" eyebrow="Proof" title="Results from businesses like yours." />
            <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2 lg:gap-5">
              <div data-reveal className="card rounded-[20px] p-8">
                <p className="text-micro font-medium uppercase tracking-[0.18em] text-lavender-200">Client result</p>
                <p className="mt-4 text-lead text-hi">
                  <Text value={page.proofPlaceholder} />
                </p>
              </div>
              {quote ? (
                <figure data-reveal style={{ "--i": 1 } as React.CSSProperties} className="rounded-[20px] border border-violet-400/25 bg-[radial-gradient(100%_100%_at_0%_0%,rgb(110_31_168/0.3),transparent_60%),var(--ink-900)] p-8">
                  <blockquote className="font-display text-[1.375rem] font-medium leading-snug tracking-[-0.02em] text-hi">
                    <p>&ldquo;{quote.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-5 text-small text-meta">{quote.name ?? quote.company ?? "TTR Digital client"}</figcaption>
                </figure>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <FaqSection
        data={{ eyebrow: "FAQ", heading: `${page.name} questions, answered.`, items: page.faqs }}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />

      <CtaBand variant="form" heading={page.ctaHeading} settings={settings} defaultService="Not sure yet" />
    </>
  );
}
