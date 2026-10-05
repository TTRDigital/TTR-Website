import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Building2, Check, Phone, Quote, Stethoscope, Wrench } from "lucide-react";
import { getServiceSummaries, getSiteSettings, getTestimonials } from "@/lib/content";
import { getPostsForService } from "@/lib/blog";
import { servicePages } from "@/lib/data/services";
import { getServicePageData } from "@/lib/cms-pages";
import { isPlaceholder, showPlaceholders } from "@/lib/placeholders";
import { absoluteUrl } from "@/lib/site";
import { PageHero } from "@/components/sections/PageHero";
import { Process } from "@/components/sections/Process";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Placeholder";
import { JsonLd } from "@/components/ui/JsonLd";
import { ServiceMockup } from "@/components/mockups/ServiceMockups";
import { PostCard } from "@/components/blog/PostCard";
import { DarkBody } from "@/components/sections/DarkBody";

export const revalidate = 300;
export const dynamicParams = false;

export function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const page = await getServicePageData(slug, []);
  if (!page) return {};
  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    alternates: { canonical: `/services/${slug}` },
  };
}

export default async function ServicePage(props: PageProps<"/services/[slug]">) {
  const { slug } = await props.params;
  const [settings, services, testimonials, posts] = await Promise.all([
    getSiteSettings(),
    getServiceSummaries(),
    getTestimonials(),
    getPostsForService(slug),
  ]);
  const page = await getServicePageData(slug, testimonials);
  if (!page) notFound();
  const related = page.related.map((r) => services.find((s) => s.slug === r)).filter((s) => !!s);
  const testimonial = page.testimonial;
  const showProofPlaceholder = !!page.proof.placeholder && showPlaceholders;
  const hasProof = !!page.proof.stats?.length || !!testimonial || showProofPlaceholder;

  const audiences = [
    { icon: Stethoscope, title: "Dental practices", text: page.audiences.dental, href: "/dental-marketing", cta: "Dental marketing" },
    { icon: Wrench, title: "Home services", text: page.audiences.homeServices, href: "/home-services-marketing", cta: "Home services marketing" },
    { icon: Building2, title: "Other local businesses", text: page.audiences.other, href: "/contact", cta: "Talk to us" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: page.title,
          serviceType: page.title,
          description: page.intro,
          url: absoluteUrl(`/services/${slug}`),
          areaServed: [{ "@type": "City", name: "Miami" }, { "@type": "Country", name: "United States" }],
          provider: { "@type": "ProfessionalService", "@id": absoluteUrl("/#organization"), name: settings.name },
        }}
      />

      <PageHero
        breadcrumbs={[
          { name: "Services", href: "/services" },
          { name: page.title, href: `/services/${slug}` },
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

      {/* What's included */}
      <section aria-labelledby="included-title" className="section-pad relative border-t border-line">
        <div className="container-page">
          <SectionHeading id="included-title" eyebrow="What's included" title={`Everything you get with ${page.title}.`} />
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

      {/* Long-form explanation */}
      <section aria-labelledby="why-title" className="section-pad relative overflow-hidden">
        <div aria-hidden="true" className="leak -left-40 top-20 h-[460px] w-[460px] opacity-30" />
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="why-title" eyebrow="Why it matters" title={`How ${page.title} grows a local business.`} />
            </div>
          </div>
          <div className="space-y-12 lg:col-span-7 lg:col-start-6">
            {page.body ? <DarkBody value={page.body} /> : page.sections.map((sec) => (
              <article key={sec.heading} data-reveal>
                <h3 className="text-h3 font-semibold">{sec.heading}</h3>
                {sec.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="measure mt-4 text-body">
                    {p}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Process
        data={{
          eyebrow: "Process",
          heading: `How we run ${page.title} for you.`,
          intro: "Clear steps, clear owners and a report every month, so you always know what is happening and why.",
          steps: page.process,
        }}
      />

      {/* Proof */}
      {hasProof ? (
        <section aria-labelledby="proof-title" className="section-pad relative">
          <div className="container-page">
            <SectionHeading id="proof-title" eyebrow="Results" title="Proof, not promises." />
            <div className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-12 lg:gap-5">
              {page.proof.stats?.map((s, i) => (
                <div key={s.label} data-reveal style={{ "--i": i } as React.CSSProperties} className="card rounded-[20px] p-8 lg:col-span-3">
                  <p className="text-gradient font-display text-[clamp(2.5rem,1.8rem+2.6vw,4rem)] font-semibold leading-none tracking-[-0.04em]">{s.value}</p>
                  <p className="mt-3 text-small text-body">{s.label}</p>
                </div>
              ))}
              {testimonial ? (
                <figure data-reveal className="rounded-[20px] border border-violet-400/25 bg-[radial-gradient(100%_100%_at_0%_0%,rgb(110_31_168/0.3),transparent_60%),var(--ink-900)] p-8 lg:col-span-6">
                  <Quote className="h-6 w-6 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                  <blockquote className="mt-4 font-display text-[1.5rem] font-medium leading-snug tracking-[-0.02em] text-hi">
                    <p>&ldquo;{testimonial.quote}&rdquo;</p>
                  </blockquote>
                  <figcaption className="mt-5 text-small text-meta">
                    {[testimonial.name, [testimonial.role, testimonial.company].filter(Boolean).join(", ")].filter(Boolean).join(", ")}
                  </figcaption>
                </figure>
              ) : null}
              {showProofPlaceholder && page.proof.placeholder ? (
                <div data-reveal className="card flex flex-col justify-between gap-6 rounded-[20px] p-8 lg:col-span-12 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-micro font-medium uppercase tracking-[0.18em] text-lavender-200">Client result for {page.title}</p>
                    <p className="mt-3 text-lead text-hi">
                      <Text value={page.proof.placeholder} />
                    </p>
                  </div>
                  {isPlaceholder(page.proof.placeholder) ? <p className="max-w-sm text-small text-meta">Add a real result for this service in /cms. This block hides itself when placeholders are turned off.</p> : null}
                </div>
              ) : null}
            </div>
            <p className="mt-6 text-micro text-meta">Results depend on your market, competition, budget and starting point. We never promise rankings.</p>
          </div>
        </section>
      ) : null}

      {/* Who it's for */}
      <section aria-labelledby="who-title" className="section-pad relative">
        <div className="container-page">
          <SectionHeading id="who-title" eyebrow="Who it's for" title={`${page.title} for businesses that live on calls.`} />
          <ul className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3 lg:gap-5">
            {audiences.map((a, i) => (
              <li key={a.title} data-reveal style={{ "--i": i } as React.CSSProperties}>
                <Link
                  href={a.href}
                  className="group/aud card flex h-full flex-col rounded-[20px] p-8 transition-[transform,border-color] duration-300 ease-out-expo hover:-translate-y-1 hover:border-violet-400/35"
                >
                  <a.icon className="h-6 w-6 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="mt-6 text-[1.375rem] font-semibold tracking-[-0.02em]">{a.title}</h3>
                  <p className="mt-3 text-body">{a.text}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-8 text-small font-medium text-lavender-200">
                    {a.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/aud:-translate-y-0.5 group-hover/aud:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Related services */}
      <section aria-labelledby="related-title" className="section-pad relative border-t border-line">
        <div className="container-page">
          <SectionHeading id="related-title" eyebrow="Works well with" title="Related services." />
          <div className="mt-14 lg:mt-20">
            <ServiceGrid services={related} columns={3} />
          </div>
        </div>
      </section>

      <FaqSection
        data={{ eyebrow: "FAQ", heading: `${page.title} questions, answered.`, items: page.faqs }}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />

      {posts.length ? (
        <section aria-labelledby="posts-title" className="section-pad relative">
          <div className="container-page">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
              <SectionHeading id="posts-title" eyebrow="From the blog" title="Read more about it." />
              <Link href="/blog" className="link-underline shrink-0 text-hi">
                All articles
              </Link>
            </div>
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-5">
              {posts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBand
        variant="form"
        heading={`Ready to grow with ${page.title}?`}
        text="Get a free growth audit. We will show you where your leads are slipping away and what to fix first, whether or not you hire us."
        settings={settings}
        defaultService={page.formService}
      />
    </>
  );
}
