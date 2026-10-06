import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getHomeContent, getServiceSummaries, getSiteSettings, getTestimonials } from "@/lib/content";
import { Hero } from "@/components/home/Hero";
import { LogoRow } from "@/components/home/LogoRow";
import { ProblemPromise } from "@/components/home/ProblemPromise";
import { ServicesBento } from "@/components/home/ServicesBento";
import { SearchEverywhere } from "@/components/home/SearchEverywhere";
import { Results } from "@/components/home/Results";
import { Process } from "@/components/sections/Process";
import { Industries } from "@/components/home/Industries";
import { AiCrm } from "@/components/home/AiCrm";
import { Testimonials } from "@/components/home/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";
import { CtaBand } from "@/components/sections/CtaBand";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomeContent();
  return pageMetadata({
    title: home.seo.title,
    description: home.seo.description,
    path: "/",
    ogTitle: "Get found everywhere your customers search.",
    eyebrow: "Miami digital marketing agency",
  });
}

export default async function HomePage() {
  const [home, settings, services, testimonials] = await Promise.all([
    getHomeContent(),
    getSiteSettings(),
    getServiceSummaries(),
    getTestimonials(),
  ]);

  return (
    <>
      <Hero hero={home.hero} settings={settings} />
      <LogoRow logos={home.logos} />
      <ProblemPromise problem={home.problem} />
      <ServicesBento intro={home.services} services={services} />
      <SearchEverywhere data={home.searchEverywhere} />
      <Results data={home.results} />
      <Process data={home.process} />
      <Industries data={home.industries} />
      <AiCrm data={home.aiCrm} />
      <Testimonials data={home.testimonials} items={testimonials} />
      <FaqSection data={home.faq} phone={settings.phone} phoneHref={settings.phoneHref} />
      <CtaBand variant="form" heading={home.cta.heading} text={home.cta.text} settings={settings} />
    </>
  );
}
