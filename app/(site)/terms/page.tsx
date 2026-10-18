import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getSiteSettings } from "@/lib/content";
import { getCmsPage } from "@/lib/pages";
import { LegalTemplate } from "@/components/sections/LegalTemplate";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage("terms");
  return pageMetadata({
    title: page?.seo?.title ?? "Terms & Conditions | TTR Digital Marketing",
    description: page?.seo?.description ?? "The terms for using the TTR Digital Marketing website and our SMS program, including how to opt out with STOP and get help with HELP.",
    path: "/terms",
    ogTitle: "Terms & Conditions",
    eyebrow: "Legal",
  });
}

export default async function Page() {
  const [page, settings] = await Promise.all([getCmsPage("terms"), getSiteSettings()]);
  return <LegalTemplate page={page} fallbackTitle="Terms & Conditions" href="/terms" settings={settings} />;
}
