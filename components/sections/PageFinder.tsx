"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";

const pages = [
  { href: "/", title: "Home", hint: "Start over" },
  { href: "/services", title: "All services", hint: "SEO, ads, websites, CRM and AI" },
  { href: "/services/seo", title: "SEO", hint: "Google search and the map pack" },
  { href: "/services/search-everywhere-optimization", title: "Search Everywhere Optimization", hint: "Google and AI search" },
  { href: "/services/google-ads", title: "Google Ads", hint: "Calls from paid search" },
  { href: "/services/meta-ads", title: "Meta Ads", hint: "Facebook and Instagram ads" },
  { href: "/services/website-design", title: "Website design", hint: "Fast sites that convert" },
  { href: "/services/social-media-marketing", title: "Social media marketing", hint: "Trust before the call" },
  { href: "/services/gohighlevel-crm", title: "GoHighLevel CRM", hint: "Follow up on every lead" },
  { href: "/services/ai-agents", title: "AI agents", hint: "Answer and book 24/7" },
  { href: "/dental-marketing", title: "Dental marketing", hint: "More new patients" },
  { href: "/home-services-marketing", title: "Home services marketing", hint: "More booked jobs" },
  { href: "/about", title: "About TTR", hint: "Who we are" },
  { href: "/blog", title: "Blog", hint: "Guides and advice" },
  { href: "/contact", title: "Contact and free audit", hint: "Talk to us" },
];

/** A small search-style list of the main pages, filtered as you type. */
export function PageFinder() {
  const [q, setQ] = useState("");
  const id = useId();
  const term = q.trim().toLowerCase();
  const results = term ? pages.filter((p) => `${p.title} ${p.hint}`.toLowerCase().includes(term)) : pages.slice(0, 7);

  return (
    <div className="glass-dense mx-auto max-w-xl rounded-[24px] p-2 text-left">
      <label htmlFor={id} className="sr-only">
        Search the main pages
      </label>
      <div className="flex items-center gap-3 rounded-2xl border border-line-strong bg-ink-950/60 px-4">
        <Search className="h-5 w-5 shrink-0 text-meta" strokeWidth={1.5} aria-hidden="true" />
        <input
          id={id}
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Try SEO, ads or dental"
          autoComplete="off"
          className="min-h-12 w-full bg-transparent text-base text-hi outline-none placeholder:text-meta"
        />
      </div>
      <ul aria-live="polite" className="mt-2 max-h-[340px] overflow-y-auto" data-lenis-prevent>
        {results.length ? (
          results.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="group flex min-h-12 items-center justify-between gap-4 rounded-xl px-4 py-2.5 transition-colors hover:bg-white/[0.06]">
                <span>
                  <span className="block text-hi">{p.title}</span>
                  <span className="block text-small text-meta">{p.hint}</span>
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-meta group-hover:text-hi" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </li>
          ))
        ) : (
          <li className="px-4 py-3 text-small text-meta">
            No match. Try{" "}
            <Link href="/contact" className="link-underline text-hi">
              contacting us
            </Link>{" "}
            instead.
          </li>
        )}
      </ul>
    </div>
  );
}
