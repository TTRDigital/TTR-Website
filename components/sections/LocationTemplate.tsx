import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Phone, Quote } from "lucide-react";
import type { ServiceSummary, SiteSettings, Testimonial } from "@/lib/content";
import type { LocationPage } from "@/lib/data/locations";
import { absoluteUrl } from "@/lib/site";
import { formatDate } from "@/lib/text";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceMockup } from "@/components/mockups/ServiceMockups";

type Props = {
  page: LocationPage;
  settings: SiteSettings;
  services: ServiceSummary[];
  testimonial: Testimonial | null;
};

/** The named TTR expert shown in the byline and in the schema. */
export const author = {
  name: "Kia Khamoushi",
  title: "Founder and Chief Business Development Officer",
  photo: "/team/kia-khamoushi.webp",
  linkedin: "https://www.linkedin.com/in/kia-kham/",
};

/** Layout for "service in Miami" pages. Copy comes from lib/data/locations.ts. */
export function LocationTemplate({ page, settings, services, testimonial }: Props) {
  const service = services.find((s) => s.slug === page.serviceSlug);
  const url = absoluteUrl(page.path);
  const personId = absoluteUrl("/about#kia-khamoushi");

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `${url}#webpage`,
              url,
              name: page.seo.title,
              description: page.seo.description,
              inLanguage: "en-US",
              datePublished: page.datePublished,
              dateModified: page.dateModified,
              isPartOf: { "@id": absoluteUrl("/#website") },
              author: { "@id": personId },
              about: { "@id": `${url}#service` },
            },
            {
              "@type": "Person",
              "@id": personId,
              name: author.name,
              jobTitle: author.title,
              url: absoluteUrl("/about"),
              image: absoluteUrl(author.photo),
              sameAs: [author.linkedin],
              worksFor: { "@id": absoluteUrl("/#organization") },
            },
            {
              "@type": "Service",
              "@id": `${url}#service`,
              name: `${page.serviceName} in Miami`,
              serviceType: page.serviceName,
              description: page.intro,
              url,
              areaServed: { "@type": "City", name: "Miami", containedInPlace: { "@type": "State", name: "Florida" } },
              provider: { "@id": absoluteUrl("/#organization") },
            },
          ],
        }}
      />

      <PageHero
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: page.name, href: page.path },
        ]}
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

      {/* Byline */}
      <section aria-label="About the author" className="border-t border-line py-8">
        <div className="container-page">
          <div className="flex items-center gap-4">
            <Image src={author.photo} alt={`${author.name}, founder of TTR Digital Marketing`} width={56} height={56} className="h-14 w-14 rounded-full border border-line-strong object-cover" />
            <p className="text-small text-meta">
              <span className="block text-body">
                By{" "}
                <Link href="/about" className="font-medium text-hi hover:text-lavender-200">
                  {author.name}
                </Link>
                , {author.title}
              </span>
              <span className="block">
                Published <time dateTime={page.datePublished}>{formatDate(page.datePublished)}</time>
                {page.dateModified !== page.datePublished ? (
                  <>
                    {" "}
                    · Updated <time dateTime={page.dateModified}>{formatDate(page.dateModified)}</time>
                  </>
                ) : null}
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Direct answer */}
      <section aria-labelledby="answer-title" className="section-pad relative overflow-hidden">
        <div aria-hidden="true" className="leak -left-40 top-20 h-[460px] w-[460px] opacity-30" />
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="answer-title" eyebrow="The short answer" title={page.answerHeading} />
            </div>
          </div>
          <div className="space-y-6 lg:col-span-7 lg:col-start-6">
            {page.answer.map((p) => (
              <p key={p.slice(0, 24)} data-reveal className="measure text-body">
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What's included */}
      <section aria-labelledby="included-title" className="section-pad relative border-t border-line">
        <div className="container-page">
          <SectionHeading id="included-title" eyebrow="What's included" title={page.includedHeading} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
            {page.included.map((item, i) => (
              <li key={item.title} data-reveal style={{ "--i": i % 3 } as React.CSSProperties} className="card flex flex-col rounded-[20px] p-6 sm:p-8">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-400/15 text-violet-300">
                  <Check className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-[-0.015em]">{item.title}</h3>
                <p className="mt-2 text-body">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Process data={{ eyebrow: "Process", heading: page.processHeading, intro: "Clear steps and a report every month, so you always know what is happening and why.", steps: page.process }} />

      {/* Who it's for */}
      <section aria-labelledby="fit-title" className="relative pb-16 lg:pb-24">
        <div className="container-page">
          <h2 id="fit-title" data-reveal className="font-sans text-micro font-medium uppercase tracking-[0.18em] text-meta">
            {page.fitHeading}
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-3">
            {page.fit.map((t, i) => (
              <li key={t.name} data-reveal style={{ "--i": i % 3 } as React.CSSProperties} className="bg-ink-950 p-5 sm:p-6">
                <p className="font-display text-[1.125rem] font-semibold text-hi">{t.name}</p>
                <p className="mt-1 text-small text-meta">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Proof: only where a real, verified result exists */}
      {page.showTestimonial && testimonial ? (
        <section aria-labelledby="proof-title" className="section-pad relative">
          <div className="container-page">
            <SectionHeading id="proof-title" eyebrow="Results" title="Proof, not promises." />
            <figure data-reveal className="mt-14 rounded-[20px] border border-violet-400/25 bg-[radial-gradient(100%_100%_at_0%_0%,rgb(110_31_168/0.3),transparent_60%),var(--ink-900)] p-8 lg:mt-20 lg:max-w-3xl">
              <Quote className="h-6 w-6 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
              <blockquote className="mt-4 font-display text-[1.5rem] font-medium leading-snug tracking-[-0.02em] text-hi">
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>
              <figcaption className="mt-5 text-small text-meta">
                {[testimonial.name, [testimonial.role, testimonial.company].filter(Boolean).join(", ")].filter(Boolean).join(", ")}
              </figcaption>
            </figure>
            <p className="mt-6 text-micro text-meta">Results depend on your market, competition, budget and starting point. We never promise rankings.</p>
          </div>
        </section>
      ) : null}

      {/* Related pages */}
      <section aria-labelledby="related-title" className="section-pad relative border-t border-line">
        <div className="container-page">
          <SectionHeading id="related-title" eyebrow="Related" title="Keep exploring." />
          <ul className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-2 lg:gap-5">
            <li>
              <Link
                href={page.relatedPath}
                className="group/rel card flex h-full flex-col rounded-[20px] p-8 transition-[transform,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-violet-400/35"
              >
                <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em]">{page.relatedTitle}</h3>
                <p className="mt-3 text-body">{page.relatedText}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-small font-medium text-lavender-200">
                  Read more
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/rel:-translate-y-0.5 group-hover/rel:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
            </li>
            <li>
              <Link
                href={`/services/${page.serviceSlug}`}
                className="group/rel card flex h-full flex-col rounded-[20px] p-8 transition-[transform,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-violet-400/35"
              >
                <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em]">{service?.title ?? page.serviceName} services</h3>
                <p className="mt-3 text-body">{service?.summary ?? "See everything included, how we work and common questions."}</p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-small font-medium text-lavender-200">
                  See the full service
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/rel:-translate-y-0.5 group-hover/rel:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </Link>
            </li>
          </ul>
          <p className="mt-8 text-body">
            Also see our{" "}
            <Link href="/home-services-marketing" className="link-underline font-medium text-hi">
              home services marketing
            </Link>{" "}
            and{" "}
            <Link href="/dental-marketing" className="link-underline font-medium text-hi">
              dental marketing
            </Link>{" "}
            pages.
          </p>
        </div>
      </section>

      <FaqSection data={{ eyebrow: "FAQ", heading: `${page.name} questions, answered.`, items: page.faqs }} phone={settings.phone} phoneHref={settings.phoneHref} />

      <CtaBand variant="form" heading={page.ctaHeading} text={page.ctaText} settings={settings} defaultService={page.formService} />
    </>
  );
}
