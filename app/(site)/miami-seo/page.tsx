import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getServiceSummaries, getSiteSettings, getTestimonials } from "@/lib/content";
import { getLocationPage } from "@/lib/data/locations";
import { LocationTemplate, author } from "@/components/sections/LocationTemplate";

export const revalidate = 300;

const page = getLocationPage("miami-seo")!;

export function generateMetadata(): Metadata {
  return pageMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: page.path,
    ogTitle: page.heading,
    eyebrow: page.eyebrow,
    type: "article",
    publishedTime: page.datePublished,
    modifiedTime: page.dateModified,
    authors: [author.name],
  });
}

export default async function Page() {
  const [settings, services, testimonials] = await Promise.all([getSiteSettings(), getServiceSummaries(), getTestimonials()]);
  return <LocationTemplate page={page} settings={settings} services={services} testimonial={testimonials[0] ?? null} />;
}
