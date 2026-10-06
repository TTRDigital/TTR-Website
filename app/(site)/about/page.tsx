import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import { ArrowRight, BarChart3, Clock, Eye, Layers, MapPin, Phone, Sparkles } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { getCmsPage } from "@/lib/pages";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { OfficeMap } from "@/components/sections/OfficeMap";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { SocialIcon } from "@/components/ui/icons";

export const revalidate = 300;

const fallbackSeo = {
  title: "About TTR Digital Marketing | Miami Marketing Agency",
  description:
    "Meet TTR Digital Marketing, a Miami digital marketing agency helping local businesses grow since 2015 with SEO, ads, websites, CRM and AI.",
};

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("about");
  return pageMetadata({
    title: cms?.seo?.title || fallbackSeo.title,
    description: cms?.seo?.description || fallbackSeo.description,
    path: "/about",
    ogTitle: cms?.heading || "Meet your new growth partner.",
    eyebrow: "About TTR",
  });
}

const different = [
  { icon: BarChart3, title: "Outcomes over vanity metrics", text: "We measure success in calls, booked jobs and new patients, and that is what our reports show." },
  { icon: Eye, title: "100% campaign transparency", text: "You always know what we are doing, why we are doing it and what it brought in." },
  { icon: Layers, title: "One team, one system", text: "SEO, ads, websites, CRM and AI agents are planned together, so nothing falls between vendors." },
  { icon: Sparkles, title: "Built for the AI search era", text: "We help you show up in Google and in AI answers, not just in the classic blue links." },
];

const values = [
  { title: "Honesty first", text: "We never promise rankings, and we tell you when something is not working. Straight answers build better plans." },
  { title: "Plain English", text: "No jargon and no mystery. If we cannot explain what we are doing simply, we should not be doing it." },
  { title: "Speed matters", text: "Fast replies to you, and fast replies to your leads. In local business, the first to answer often wins." },
  { title: "You own it", text: "Your ad accounts, your website, your CRM data. Everything we build for you belongs to you." },
];

export default async function AboutPage() {
  const [settings, cms] = await Promise.all([getSiteSettings(), getCmsPage("about")]);
  const address = `${settings.street}, ${settings.city}, ${settings.region} ${settings.postalCode}`;

  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "About", href: "/about" }]}
        eyebrow="About TTR"
        title={cms?.heading || "Meet your new growth partner."}
        intro={
          <p>
            {cms?.intro ||
              `TTR Digital Marketing is a digital marketing agency on Brickell Avenue in Miami. Since ${settings.foundedYear} we have helped local businesses get found online and turn that attention into calls and booked jobs, with SEO, ads, websites, CRM and AI working together.`}
          </p>
        }
        actions={
          <Button href="/contact" size="lg" magnetic track="audit_cta_click">
            Get a free growth audit
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        }
        visual={
          <dl className="glass grid grid-cols-2 gap-px overflow-hidden rounded-[24px]">
            {[
              { k: `Since ${settings.foundedYear}`, v: "Helping local businesses grow" },
              { k: "Brickell, Miami", v: "Our office on Brickell Avenue" },
              { k: "8 services", v: "One team, one system" },
              { k: "1 business day", v: "To reply to every audit request" },
            ].map((f) => (
              <div key={f.k} className="flex flex-col-reverse bg-ink-950/40 p-6">
                <dt className="mt-2 text-small text-meta">{f.v}</dt>
                <dd className="font-display text-[1.375rem] font-semibold tracking-[-0.02em] text-hi">{f.k}</dd>
              </div>
            ))}
          </dl>
        }
      />

      {/* Story + mission */}
      <section aria-labelledby="story-title" className="section-pad relative border-t border-line">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="story-title" eyebrow="Our story" title="Built by business owners, for business owners." />
          </div>
          <div className="space-y-6 text-lead text-body lg:col-span-6 lg:col-start-7">
            <p data-reveal>
              We are not your average agency. We come from a small business background ourselves. Our founder spent more than a decade running an IT
              company before turning his search engine know-how toward helping other owners grow.
            </p>
            <p data-reveal>
              That shaped how we work. We know how little time owners have for marketing, and how much every lead matters. So we keep things simple: clear
              plans, honest reporting and work that shows up as calls and booked jobs.
            </p>
            <div data-reveal className="rounded-[20px] border border-violet-400/25 bg-[radial-gradient(100%_100%_at_0%_0%,rgb(110_31_168/0.3),transparent_60%),var(--ink-900)] p-6 sm:p-8">
              <p className="text-micro font-medium uppercase tracking-[0.18em] text-lavender-200">Our mission</p>
              <p className="mt-3 font-display text-[1.375rem] font-medium leading-snug tracking-[-0.02em] text-hi">
                Help local businesses grow their profit with marketing that brings measurable results: more calls, more booked jobs and more new patients.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What makes TTR different */}
      <section aria-labelledby="different-title" className="section-pad relative overflow-hidden">
        <div aria-hidden="true" className="leak -left-40 top-10 h-[480px] w-[480px] opacity-30" />
        <div className="container-page">
          <SectionHeading id="different-title" eyebrow="What makes us different" title="What you can expect from TTR." />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-5">
            {different.map((d, i) => (
              <li key={d.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="card rounded-[20px] p-6 sm:p-8">
                <d.icon className="h-6 w-6 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-[-0.015em]">{d.title}</h3>
                <p className="mt-2 text-small text-body">{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" data-surface="light" className="surface-light section-pad relative">
        <div className="container-page">
          <SectionHeading id="values-title" eyebrow="Our values" title="How we work, every day." light />
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line-light bg-line-light sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {values.map((v, i) => (
              <li key={v.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="bg-paper-50 p-8">
                <span className="font-display text-small font-semibold text-brand-600">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[1.375rem] font-semibold tracking-[-0.02em]">{v.title}</h3>
                <p className="mt-2 text-ink-body">{v.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby="team-title" className="section-pad relative">
        <div className="container-page">
          <SectionHeading id="team-title" eyebrow="Leadership" title="The people behind your growth." />
          <article data-reveal className="mt-14 grid gap-8 rounded-[24px] border border-line bg-ink-900 p-6 sm:grid-cols-[auto_1fr] sm:p-10 lg:mt-20">
            <Image
              src="/team/kia-khamoushi.webp"
              alt="Kia Khamoushi, founder of TTR Digital Marketing"
              width={160}
              height={160}
              className="h-32 w-32 rounded-full border border-line-strong object-cover sm:h-40 sm:w-40"
            />
            <div>
              <h3 className="text-h3 font-semibold">Kia Khamoushi</h3>
              <p className="mt-1 text-small text-lavender-200">Founder and Chief Business Development Officer</p>
              <p className="measure mt-5 text-body">
                After more than a decade as owner and CEO of a successful IT company, Kia now uses deep search engine know-how to help other business owners
                grow. He has built SEO strategies for law firms, dental and healthcare practices, real estate, technology companies and many more. As a
                business owner himself, Kia knows how little time owners have for marketing, and how much it matters to get it right.
              </p>
              <a
                href="https://www.linkedin.com/in/kia-kham/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-11 items-center gap-2 text-small font-medium text-hi hover:text-lavender-200"
              >
                <SocialIcon network="linkedin" className="h-4 w-4" />
                Connect with Kia on LinkedIn
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Office */}
      <section aria-labelledby="office-title" className="section-pad relative border-t border-line">
        <div className="container-page grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="office-title"
              eyebrow="Our office"
              title="Based in Brickell, working across the US."
              intro="Our office is on Brickell Avenue in Miami. Many of our clients are in South Florida, and we work with local businesses across the United States."
            />
            <ul className="mt-10 space-y-4 text-body">
              <li data-reveal className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                {address}
              </li>
              <li data-reveal className="flex gap-3">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                {settings.hoursText}
              </li>
              <li data-reveal className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                <a href={settings.phoneHref} data-track="click_to_call" className="link-underline text-hi">
                  {settings.phone}
                </a>
              </li>
            </ul>
          </div>
          <div data-reveal className="lg:col-span-7">
            <OfficeMap href={settings.mapsUrl} address={address} />
          </div>
        </div>
      </section>

      <CtaBand settings={settings} heading="Let's grow your business together." />
    </>
  );
}
