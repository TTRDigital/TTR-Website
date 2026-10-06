import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceSummaries, getSiteSettings, getTestimonials } from "@/lib/content";
import { getIndustryData } from "@/lib/cms-pages";
import { IndustryTemplate } from "@/components/sections/IndustryTemplate";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getIndustryData("dental-marketing");
  return pageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: "/dental-marketing",
    ogTitle: page.heading,
    eyebrow: page.eyebrow,
  });
}

export default async function Page() {
  const [page, settings, services, testimonials] = await Promise.all([getIndustryData("dental-marketing"), getSiteSettings(), getServiceSummaries(), getTestimonials()]);
  return <IndustryTemplate page={page} settings={settings} services={services} testimonials={testimonials} />;
}
