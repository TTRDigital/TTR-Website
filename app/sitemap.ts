import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/fetch";
import { getAllPosts } from "@/lib/blog";
import { servicePages } from "@/lib/data/services";
import { industryPages } from "@/lib/data/industries";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

type Stamps = {
  home: string | null;
  settings: string | null;
  services: { slug: string; at: string }[];
  niches: { slug: string; at: string }[];
  pages: { slug: string; at: string }[];
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [stamps, posts] = await Promise.all([
    sanityFetch<Stamps>(
      `{
        "home": *[_id == "homePage"][0]._updatedAt,
        "settings": *[_id == "siteSettings"][0]._updatedAt,
        "services": *[_type == "service"]{"slug": slug.current, "at": _updatedAt},
        "niches": *[_type == "nichePage"]{"slug": slug.current, "at": _updatedAt},
        "pages": *[_type == "page"]{"slug": slug.current, "at": _updatedAt}
      }`,
      {},
      ["service", "nichePage", "page", "homePage"],
    ),
    getAllPosts(),
  ]);

  const at = (list: { slug: string; at: string }[] | undefined, slug: string) => {
    const hit = list?.find((x) => x.slug === slug)?.at;
    return hit ? new Date(hit) : undefined;
  };
  const latest = (...dates: (string | null | undefined)[]) => {
    const valid = dates.filter((d): d is string => !!d).sort();
    return valid.length ? new Date(valid[valid.length - 1]) : undefined;
  };
  const entry = (path: string, lastModified: Date | undefined, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });

  return [
    entry("/", latest(stamps?.home, stamps?.settings), 1, "weekly"),
    entry("/services", latest(...(stamps?.services ?? []).map((s) => s.at)), 0.9),
    ...servicePages.map((s) => entry(`/services/${s.slug}`, at(stamps?.services, s.slug), 0.9)),
    ...industryPages.map((p) => entry(`/${p.slug}`, at(stamps?.niches, p.slug), 0.9)),
    entry("/about", at(stamps?.pages, "about"), 0.7),
    entry("/contact", at(stamps?.pages, "contact"), 0.7),
    entry("/blog", latest(...posts.map((p) => p.updatedAt ?? p.publishedAt)), 0.7, "weekly"),
    ...posts.map((p) => entry(`/blog/${p.slug}`, new Date(p.updatedAt ?? p.publishedAt), 0.6)),
    entry("/privacy", at(stamps?.pages, "privacy"), 0.2, "yearly"),
    entry("/terms", at(stamps?.pages, "terms"), 0.2, "yearly"),
  ];
}
