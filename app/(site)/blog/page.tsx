import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts, getCategories } from "@/lib/blog";
import { getSiteSettings } from "@/lib/content";
import { formatDate } from "@/lib/text";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { BlogFilter } from "@/components/blog/BlogFilter";
import { GeneratedCover } from "@/components/blog/GeneratedCover";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Marketing Blog for Local Business Owners | TTR Digital",
  description: "Plain-English guides on SEO, AI search, Google Ads, social media and lead follow up for local business owners, from TTR Digital Marketing.",
  path: "/blog",
  ogTitle: "Plain-English marketing guides for local business owners.",
  eyebrow: "Blog",
});

export default async function BlogPage() {
  const [posts, categories, settings] = await Promise.all([getAllPosts(), getCategories(), getSiteSettings()]);
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        compact
        breadcrumbs={[{ name: "Blog", href: "/blog" }]}
        eyebrow="Blog"
        title="Marketing advice for local business owners."
        intro={<p>Plain-English guides on getting found on Google and AI search, running ads that bring calls and following up so more leads book.</p>}
      />

      <section data-surface="light" aria-label="Articles" className="surface-light py-16 lg:py-24">
        <div className="container-page">
          {featured ? (
            <article className="group/feat relative grid overflow-hidden rounded-[28px] border border-line-light bg-white transition-shadow duration-300 hover:shadow-[0_30px_80px_-40px_rgb(14_11_22/0.45)] lg:grid-cols-2">
              <div className="relative">
                {featured.cover ? (
                  <Image src={featured.cover.url} alt={featured.cover.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
                ) : (
                  <GeneratedCover slug={featured.slug} category={featured.categories[0]?.title} />
                )}
              </div>
              <div className="flex flex-col p-8 sm:p-12">
                <p className="text-micro font-medium uppercase tracking-[0.18em] text-brand-600">Latest article</p>
                <h2 className="mt-4 text-[clamp(1.75rem,1.3rem+1.6vw,2.5rem)] font-semibold leading-tight tracking-[-0.025em]">
                  <Link href={`/blog/${featured.slug}`} className="after:absolute after:inset-0">
                    {featured.title}
                  </Link>
                </h2>
                <p className="mt-4 text-ink-body">{featured.excerpt}</p>
                <p className="mt-6 text-small text-ink-meta">
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time> · {featured.readingMinutes} min read
                </p>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-8 font-medium text-brand-600">
                  Read article
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/feat:-translate-y-0.5 group-hover/feat:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
                </span>
              </div>
            </article>
          ) : (
            <p className="text-ink-body">New articles are on the way.</p>
          )}

          {rest.length ? (
            <div className="mt-16 lg:mt-24">
              <h2 className="text-h3 font-semibold">More articles</h2>
              <div className="mt-8">
                <BlogFilter posts={rest} categories={categories} />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <CtaBand settings={settings} />
    </>
  );
}
