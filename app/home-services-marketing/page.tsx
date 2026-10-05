import type { Metadata } from "next";
import { getServiceSummaries, getSiteSettings, getTestimonials } from "@/lib/content";
import { getIndustryPage } from "@/lib/data/industries";
import { IndustryTemplate } from "@/components/sections/IndustryTemplate";

export const revalidate = 300;

const page = getIndustryPage("home-services-marketing")!;

export const metadata: Metadata = {
  title: { absolute: page.seo.title },
  description: page.seo.description,
  alternates: { canonical: "/home-services-marketing" },
};

export default async function Page() {
  const [settings, services, testimonials] = await Promise.all([getSiteSettings(), getServiceSummaries(), getTestimonials()]);
  return <IndustryTemplate page={page} settings={settings} services={services} testimonials={testimonials} />;
}
