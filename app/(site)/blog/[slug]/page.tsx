import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, Phone } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/blog";
import { getServiceSummaries, getSiteSettings } from "@/lib/content";
import { formatDate, headingsOf } from "@/lib/text";
import { absoluteUrl } from "@/lib/site";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/icons";
import { CtaBand } from "@/components/sections/CtaBand";
import { PortableBody } from "@/components/blog/PortableBody";
import { GeneratedCover } from "@/components/blog/GeneratedCover";
import { PostCard } from "@/components/blog/PostCard";
import { Toc } from "@/components/blog/Toc";

export const revalidate = 300;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};
  const description = post.seo?.description ?? post.excerpt;
  return pageMetadata({
    title: post.seo?.title ?? `${post.title} | TTR Digital`,
    description,
    path: `/blog/${slug}`,
    ogTitle: post.title,
    eyebrow: post.categories[0]?.title ?? "Blog",
    image: post.cover ? { url: post.cover.url, width: post.cover.width, height: post.cover.height, alt: post.cover.alt } : null,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? undefined,
    authors: post.author?.name ? [post.author.name] : undefined,
  });
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const [post, all, settings, services] = await Promise.all([getPost(slug), getAllPosts(), getSiteSettings(), getServiceSummaries()]);
  if (!post) notFound();

  const toc = headingsOf(post.body);
  const category = post.categories[0];
  const related = all
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => Number(b.categories.some((c) => c.slug === category?.slug)) - Number(a.categories.some((c) => c.slug === category?.slug)))
    .slice(0, 3);
  const relatedServices = post.relatedServices.map((s) => services.find((x) => x.slug === s)).filter((s) => !!s);
  const updated = post.updatedAt && post.updatedAt.slice(0, 10) !== post.publishedAt.slice(0, 10) ? post.updatedAt : null;
  const authorName = post.author?.name ?? "TTR Digital";

  const inlineCta = (
    <aside aria-label="Free growth audit" className="my-12 rounded-[20px] border border-brand-600/15 bg-[radial-gradient(120%_120%_at_100%_0%,rgb(110_31_168/0.12),transparent_60%),white] p-6 sm:p-8">
      <p className="font-display text-[1.375rem] font-semibold leading-snug tracking-[-0.02em] text-ink-text">Want this done for your business?</p>
      <p className="mt-2 text-ink-body">Get a free growth audit. We will show you where your leads are slipping away and what to fix first.</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <Button href="/contact" variant="dark" track="audit_cta_click">
          Get a free growth audit
          <ArrowRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
        </Button>
        <a href={settings.phoneHref} data-track="click_to_call" className="inline-flex min-h-12 items-center gap-2 px-2 font-medium text-ink-text hover:text-brand-600">
          <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          {settings.phone}
        </a>
      </div>
    </aside>
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.seo?.description ?? post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.updatedAt ?? post.publishedAt,
          mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
          author: { "@type": "Organization", name: authorName, url: absoluteUrl("/about") },
          publisher: { "@type": "Organization", "@id": absoluteUrl("/#organization"), name: settings.name, logo: { "@type": "ImageObject", url: absoluteUrl("/brand/ttr-logo-on-light.svg") } },
          ...(post.cover ? { image: post.cover.url } : {}),
        }}
      />

      {/* Header */}
      <section aria-labelledby="page-title" className="relative isolate overflow-hidden pb-12 pt-[calc(var(--header-h)+40px)] lg:pb-16">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(70%_80%_at_50%_0%,#000,transparent)]" />
        <div aria-hidden="true" className="leak -z-10 right-[-10%] top-[-30%] h-[520px] w-[520px] opacity-50" />
        <div className="container-page">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              { name: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <div className="mx-auto mt-10 max-w-4xl lg:mt-14">
            {category ? <p className="hero-fade text-micro font-medium uppercase tracking-[0.18em] text-lavender-200">{category.title}</p> : null}
            <h1 id="page-title" className="hero-fade mt-4 text-[clamp(2.25rem,1.5rem+3vw,4rem)] font-semibold leading-[1.05] tracking-[-0.03em]" style={{ "--d": "60ms" } as React.CSSProperties}>
              {post.title}
            </h1>
            <p className="hero-fade mt-6 text-lead text-body" style={{ "--d": "160ms" } as React.CSSProperties}>
              {post.excerpt}
            </p>
            <p className="hero-fade mt-6 flex flex-wrap gap-x-4 gap-y-1 text-small text-meta" style={{ "--d": "220ms" } as React.CSSProperties}>
              <span>By {authorName}</span>
              <span>
                Published <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </span>
              {updated ? (
                <span>
                  Updated <time dateTime={updated}>{formatDate(updated)}</time>
                </span>
              ) : null}
              <span>{post.readingMinutes} min read</span>
            </p>
          </div>
          <div className="hero-fade mx-auto mt-10 max-w-5xl" style={{ "--d": "260ms" } as React.CSSProperties}>
            {post.cover ? (
              <Image src={post.cover.url} alt={post.cover.alt} width={post.cover.width} height={post.cover.height} priority sizes="(min-width: 1024px) 1024px, 100vw" className="h-auto w-full rounded-[24px]" />
            ) : (
              <GeneratedCover slug={post.slug} category={category?.title} size="hero" />
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section data-surface="light" className="surface-light py-16 lg:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-12">
          {toc.length > 1 ? (
            <div className="hidden lg:col-span-3 lg:block">
              <div className="sticky top-28">
                <Toc items={toc} />
              </div>
            </div>
          ) : null}
          <div className={`min-w-0 ${toc.length > 1 ? "lg:col-span-8 lg:col-start-5" : "lg:col-span-8 lg:col-start-3"}`}>
            <article className="max-w-[68ch]">
              <PortableBody value={post.body} insertAfterSecondSection={toc.length >= 3 ? inlineCta : undefined} />
              {toc.length < 3 ? inlineCta : null}
            </article>

            {/* Author box */}
            <aside aria-label="About the author" className="mt-14 flex max-w-[68ch] gap-5 rounded-[20px] border border-line-light bg-white p-6 sm:p-8">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-ink-950">
                <Image src="/icon.svg" alt="" width={36} height={36} className="h-9 w-9" unoptimized />
              </span>
              <div>
                <p className="font-semibold text-ink-text">{authorName}</p>
                <p className="text-small text-ink-meta">{post.author?.role ?? "TTR Digital Marketing team"}</p>
                <p className="mt-3 text-small text-ink-body">
                  {post.author?.bio ??
                    "The TTR Digital Marketing team writes plain-English guides for local business owners, based on the work we do every day in SEO, ads, CRM and AI."}
                </p>
                <Link href="/about" className="mt-3 inline-flex min-h-11 items-center gap-1 text-small font-medium text-brand-600 hover:underline">
                  About TTR
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                </Link>
              </div>
            </aside>

            {relatedServices.length ? (
              <aside aria-labelledby="rel-services" className="mt-10 max-w-[68ch]">
                <h2 id="rel-services" className="text-micro font-medium uppercase tracking-[0.18em] text-ink-meta">
                  Related services
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {relatedServices.map((s) => (
                    <li key={s.slug}>
                      <Link href={`/services/${s.slug}`} className="group flex items-center gap-3 rounded-2xl border border-line-light bg-white p-4 transition-colors hover:border-brand-600/40">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600/10 text-brand-600">
                          <ServiceIcon slug={s.slug} />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-medium text-ink-text">{s.title}</span>
                          <span className="block truncate text-small text-ink-meta">{s.summary}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            ) : null}
          </div>
        </div>

        {related.length ? (
          <div className="container-page mt-20 lg:mt-28">
            <h2 className="text-h3 font-semibold">Keep reading</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} light />
              ))}
            </div>
          </div>
        ) : null}
      </section>

      <CtaBand settings={settings} />
    </>
  );
}
