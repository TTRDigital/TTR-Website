import type { Metadata } from "next";
import { getSiteSettings } from "@/lib/content";
import { getCmsPage } from "@/lib/pages";
import { LegalTemplate } from "@/components/sections/LegalTemplate";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("terms");
  return {
    title: { absolute: page?.seo?.title ?? "Terms of Service | TTR Digital Marketing" },
    description: page?.seo?.description ?? "The terms that apply when you use the TTR Digital Marketing website.",
    alternates: { canonical: "/terms" },
  };
}

export default async function Page() {
  const [page, settings] = await Promise.all([getCmsPage("terms"), getSiteSettings()]);
  return <LegalTemplate page={page} fallbackTitle="Terms of Service" href="/terms" settings={settings} />;
}
