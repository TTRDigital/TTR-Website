"use client";

import { useEffect, useState } from "react";

/** Table of contents that highlights the section being read. */
export function Toc({ items }: { items: { id: string; text: string }[] }) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="text-small">
      <p className="text-micro font-medium uppercase tracking-[0.18em] text-ink-meta">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-line-light">
        {items.map((i) => (
          <li key={i.id}>
            <a
              href={`#${i.id}`}
              aria-current={active === i.id ? "location" : undefined}
              className={`-ml-px block border-l-2 py-1.5 pl-4 transition-colors ${
                active === i.id ? "border-brand-600 font-medium text-ink-text" : "border-transparent text-ink-meta hover:text-ink-text"
              }`}
            >
              {i.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
