import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/content";
import { getCmsPage } from "@/lib/pages";
import { LegalTemplate } from "@/components/sections/LegalTemplate";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("privacy");
  return pageMetadata({
    title: page?.seo?.title ?? "Privacy Policy | TTR Digital Marketing",
    description: page?.seo?.description ?? "How TTR Digital Marketing collects, uses and protects the information you share on our website.",
    path: "/privacy",
    ogTitle: "Privacy Policy",
    eyebrow: "Legal",
  });
}

export default async function Page() {
  const [page, settings] = await Promise.all([getCmsPage("privacy"), getSiteSettings()]);
  return <LegalTemplate page={page} fallbackTitle="Privacy Policy" href="/privacy" settings={settings} />;
}
