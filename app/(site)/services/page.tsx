import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { ArrowRight, BarChart3, Layers, Sparkles, Zap } from "lucide-react";
import { getServiceSummaries, getSiteSettings } from "@/lib/content";
import { PageHero } from "@/components/sections/PageHero";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { CtaBand } from "@/components/sections/CtaBand";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Digital Marketing Services for Local Businesses | TTR",
  description:
    "SEO, AI search, Google Ads, Meta Ads, websites, social media, GoHighLevel CRM and AI agents. One team that turns searches into booked calls.",
  path: "/services",
  ogTitle: "Digital marketing services that turn searches into booked calls.",
  eyebrow: "Services",
});

const why = [
  { icon: Layers, title: "One team, one system", text: "SEO, ads, your website, your CRM and AI agents work together instead of in separate silos." },
  { icon: BarChart3, title: "Reporting on real outcomes", text: "We report calls, leads and booked jobs in plain English, not just clicks and impressions." },
  { icon: Sparkles, title: "Built for AI search", text: "Every plan helps you show up in Google and in AI answers like ChatGPT, Gemini and AI Overviews." },
  { icon: Zap, title: "Fast follow up included", text: "We connect every channel to instant follow up, so the leads you pay for do not go cold." },
];

export default async function ServicesPage() {
  const [services, settings] = await Promise.all([getServiceSummaries(), getSiteSettings()]);
  return (
    <>
      <PageHero
        breadcrumbs={[{ name: "Services", href: "/services" }]}
        eyebrow="Services"
        title="Digital marketing services that bring calls and booked jobs."
        intro={
          <p>
            TTR Digital Marketing offers eight services for local businesses: SEO, Search Everywhere Optimization, Google Ads, Meta Ads, website design,
            social media marketing, GoHighLevel CRM and AI agents. Each one is built to do two things: get you found by people ready to buy, and turn
            them into booked appointments.
          </p>
        }
        actions={
          <Button href="/contact" size="lg" magnetic track="audit_cta_click">
            Get a free growth audit
            <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          </Button>
        }
      />

      <section aria-label="All services" className="relative pb-24 lg:pb-32">
        <div className="container-page">
          <ServiceGrid services={services} />
        </div>
      </section>

      <section aria-labelledby="why-title" className="section-pad relative border-t border-line">
        <div className="container-page">
          <SectionHeading id="why-title" eyebrow="Why TTR" title="Not sure where to start? That is normal." intro="Most owners do not need everything at once. On your free audit call we look at where leads are slipping away today and recommend the one or two services that will make the biggest difference first." />
          <ul className="mt-14 grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
            {why.map((w, i) => (
              <li key={w.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="bg-ink-950 p-8">
                <w.icon className="h-6 w-6 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-[-0.015em]">{w.title}</h3>
                <p className="mt-2 text-small text-body">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand settings={settings} />
    </>
  );
}
