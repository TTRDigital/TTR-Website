"use client";

import { useState } from "react";
import type { Category, PostSummary } from "@/lib/blog";
import { PostCard } from "./PostCard";

/** Category filter + grid. All posts are in the HTML; filtering is instant. */
export function BlogFilter({ posts, categories }: { posts: PostSummary[]; categories: Category[] }) {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? posts.filter((p) => p.categories.some((c) => c.slug === active)) : posts;
  const options = [{ title: "All", slug: null as string | null }, ...categories.map((c) => ({ title: c.title, slug: c.slug as string | null }))];

  return (
    <>
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {options.map((o) => {
          const pressed = active === o.slug;
          return (
            <button
              key={o.title}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(o.slug)}
              className={`min-h-11 rounded-full border px-5 text-small font-medium transition-colors ${
                pressed ? "border-ink-text bg-ink-text text-white" : "border-line-light bg-white text-ink-body hover:border-ink-meta hover:text-ink-text"
              }`}
            >
              {o.title}
            </button>
          );
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "article" : "articles"}
      </p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((p) => (
          <PostCard key={p.slug} post={p} light />
        ))}
      </div>
    </>
  );
}
