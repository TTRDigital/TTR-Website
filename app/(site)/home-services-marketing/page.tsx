import type { Metadata } from "next";
import { getServiceSummaries, getSiteSettings, getTestimonials } from "@/lib/content";
import { getIndustryData } from "@/lib/cms-pages";
import { IndustryTemplate } from "@/components/sections/IndustryTemplate";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getIndustryData("home-services-marketing");
  return {
    title: { absolute: page.seo.title },
    description: page.seo.description,
    alternates: { canonical: "/home-services-marketing" },
  };
}

export default async function Page() {
  const [page, settings, services, testimonials] = await Promise.all([getIndustryData("home-services-marketing"), getSiteSettings(), getServiceSummaries(), getTestimonials()]);
  return <IndustryTemplate page={page} settings={settings} services={services} testimonials={testimonials} />;
}
