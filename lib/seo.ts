import type { Metadata } from "next";

const SITE_NAME = "TTR Digital Marketing";

type SeoInput = {
  title: string;
  description: string;
  path: string;
  /** Short label shown above the title on the share image. */
  eyebrow?: string;
  /** Headline on the share image; defaults to the title without the brand suffix. */
  ogTitle?: string;
  /** A real image (e.g. a Sanity OG image or post cover) instead of the generated one. */
  image?: { url: string; width?: number; height?: number; alt?: string } | null;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

/** Bump OG_VERSION after changing the share image design, so apps that saved an older image fetch it again. */
const OG_VERSION = "2";

export function ogImageUrl(title: string, eyebrow?: string) {
  const q = new URLSearchParams({ title });
  if (eyebrow) q.set("eyebrow", eyebrow);
  q.set("v", OG_VERSION);
  return `/og?${q.toString()}`;
}

/** One place for title, description, canonical, Open Graph and Twitter tags. */
export function pageMetadata(input: SeoInput): Metadata {
  const headline = input.ogTitle ?? input.title.replace(/\s*[|·-]\s*TTR( Digital Marketing)?$/i, "");
  const image = input.image ?? { url: ogImageUrl(headline, input.eyebrow), width: 1200, height: 630, alt: headline };
  return {
    title: { absolute: input.title },
    description: input.description,
    alternates: { canonical: input.path },
    robots: input.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: input.type ?? "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: input.path,
      title: input.title,
      description: input.description,
      images: [image],
      ...(input.type === "article"
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime, authors: input.authors }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [image.url],
    },
  };
}
