import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PostSummary } from "@/lib/blog";
import { formatDate } from "@/lib/text";
import { GeneratedCover } from "./GeneratedCover";

export function PostCard({ post, light = false, priority = false }: { post: PostSummary; light?: boolean; priority?: boolean }) {
  const category = post.categories[0]?.title;
  return (
    <article
      data-reveal
      className={`group/post relative flex h-full flex-col overflow-hidden rounded-[20px] border transition-[transform,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-violet-400 ${
        light
          ? "border-line-light bg-white hover:shadow-[0_24px_60px_-30px_rgb(14_11_22/0.35)]"
          : "border-line bg-ink-900 hover:border-violet-400/35 hover:shadow-[0_24px_60px_-30px_rgb(138_47_208/0.7)]"
      }`}
    >
      {post.cover ? (
        <div className="relative aspect-[16/10] overflow-hidden">
          <Image
            src={post.cover.url}
            alt={post.cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover/post:scale-[1.03]"
          />
        </div>
      ) : (
        <GeneratedCover slug={post.slug} category={category} />
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className={`text-micro ${light ? "text-ink-meta" : "text-meta"}`}>
          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
          <span aria-hidden="true"> · </span>
          {post.readingMinutes} min read
        </p>
        <h3 className={`mt-3 text-[1.25rem] font-semibold leading-snug tracking-[-0.015em] ${light ? "text-ink-text" : "text-hi"}`}>
          <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {post.title}
          </Link>
        </h3>
        <p className={`mt-3 line-clamp-3 text-small ${light ? "text-ink-body" : "text-body"}`}>{post.excerpt}</p>
        <span className={`mt-auto inline-flex items-center gap-1.5 pt-6 text-small font-medium ${light ? "text-brand-600" : "text-lavender-200"}`}>
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/post:-translate-y-0.5 group-hover/post:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
        </span>
      </div>
    </article>
  );
}
