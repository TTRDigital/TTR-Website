import "server-only";
import type { PortableTextBlock } from "@portabletext/react";
import { sanityFetch } from "@/lib/sanity/fetch";
import { canonicalServiceSlug } from "@/lib/content";
import { sanityImage, type SanityImageRef } from "@/lib/sanity/image";
import { previewPosts, publishedPosts } from "@/lib/data/code-posts";

/** Posts kept in code: approved ones everywhere, drafts for review only on Vercel previews, never on the live site. */
const codePosts = (): Post[] => [...publishedPosts, ...(process.env.VERCEL_ENV === "preview" ? previewPosts : [])];

export type Category = { title: string; slug: string };

export type PostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  updatedAt: string | null;
  categories: Category[];
  readingMinutes: number;
  cover: { url: string; width: number; height: number; alt: string } | null;
};

export type Post = PostSummary & {
  body: PortableTextBlock[];
  seo: { title?: string; description?: string } | null;
  author: { name: string; role: string | null; bio: string | null; slug: string | null } | null;
  relatedServices: string[];
};

type RawPost = Omit<PostSummary, "readingMinutes" | "cover"> & {
  words: number;
  mainImage: SanityImageRef | null;
  sharedCover: boolean;
};

const listProjection = `
  "slug": slug.current,
  title,
  "excerpt": coalesce(excerpt, ""),
  publishedAt,
  updatedAt,
  "categories": categories[]->{title, "slug": slug.current},
  "words": length(string::split(pt::text(body), " ")),
  mainImage,
  // Several posts sharing one image means it is a generic placeholder, not a real cover.
  "sharedCover": count(*[_type == "post" && mainImage.asset._ref == ^.mainImage.asset._ref]) > 1
`;

function toSummary(p: RawPost): PostSummary {
  const img = p.sharedCover ? null : sanityImage(p.mainImage);
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt,
    publishedAt: p.publishedAt,
    updatedAt: p.updatedAt ?? null,
    categories: (p.categories ?? []).filter((c) => c?.slug),
    readingMinutes: Math.max(1, Math.round((p.words || 0) / 225)),
    cover: img,
  };
}

export async function getAllPosts(): Promise<PostSummary[]> {
  const data = await sanityFetch<RawPost[]>(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc){${listProjection}}`,
    {},
    ["post"],
  );
  const fromCode: PostSummary[] = codePosts().map((p) => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, publishedAt: p.publishedAt,
    updatedAt: p.updatedAt, categories: p.categories, readingMinutes: p.readingMinutes, cover: p.cover }));
  const codeSlugs = new Set(fromCode.map((p) => p.slug));
  return [...fromCode, ...(data ?? []).map(toSummary).filter((p) => !codeSlugs.has(p.slug))].sort((a, b) =>
    (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""),
  );
}

export async function getPost(slug: string): Promise<Post | null> {
  const fromCode = codePosts().find((p) => p.slug === slug);
  if (fromCode) return fromCode;
  const data = await sanityFetch<
    RawPost & {
      body: PortableTextBlock[];
      seo: Post["seo"];
      author: Post["author"];
      relatedServices: string[] | null;
    }
  >(
    `*[_type == "post" && slug.current == $slug][0]{
      ${listProjection},
      body,
      seo,
      "author": author->{name, role, bio, "slug": slug.current},
      "relatedServices": relatedServices[]->slug.current
    }`,
    { slug },
    ["post", `post:${slug}`],
  );
  if (!data) return null;
  return {
    ...toSummary(data),
    body: data.body ?? [],
    seo: data.seo ?? null,
    author: data.author ?? null,
    relatedServices: (data.relatedServices ?? []).filter(Boolean).map(canonicalServiceSlug),
  };
}

export async function getCategories(): Promise<Category[]> {
  const data = await sanityFetch<Category[]>(
    `*[_type == "category" && count(*[_type == "post" && references(^._id)]) > 0] | order(title asc){title, "slug": slug.current}`,
    {},
    ["category", "post"],
  );
  const all = [...(data ?? [])];
  for (const c of codePosts().flatMap((p) => p.categories)) if (!all.some((x) => x.slug === c.slug)) all.push(c);
  return all.sort((a, b) => a.title.localeCompare(b.title));
}

/** Posts that list a given service as related. */
export async function getPostsForService(serviceSlug: string): Promise<PostSummary[]> {
  const aliases = serviceSlug === "website-design" ? ["website-design", "websites"] : serviceSlug === "social-media-marketing" ? ["social-media-marketing", "social-media"] : [serviceSlug];
  const data = await sanityFetch<RawPost[]>(
    `*[_type == "post" && count((relatedServices[]->slug.current)[@ in $aliases]) > 0] | order(publishedAt desc)[0...3]{${listProjection}}`,
    { aliases },
    ["post"],
  );
  return (data ?? []).map(toSummary);
}

export { formatDate } from "@/lib/text";
