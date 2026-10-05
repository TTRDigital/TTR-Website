import "server-only";
import type { PortableTextBlock } from "@portabletext/react";
import { sanityFetch } from "@/lib/sanity/fetch";

export type CmsPage = {
  title: string;
  heading: string | null;
  intro: string | null;
  body: PortableTextBlock[];
  seo: { title?: string; description?: string } | null;
  updatedAt: string;
};

export async function getCmsPage(slug: string): Promise<CmsPage | null> {
  return sanityFetch<CmsPage>(
    `*[_type == "page" && slug.current == $slug][0]{title, heading, intro, "body": coalesce(body, []), seo, "updatedAt": _updatedAt}`,
    { slug },
    ["page", `page:${slug}`],
  );
}
