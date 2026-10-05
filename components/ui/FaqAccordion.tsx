"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import type { Faq } from "@/lib/content";

/**
 * Accessible accordion (button + aria-expanded). Answers stay in the HTML
 * so search engines and AI crawlers can read them; collapsed panels are
 * visually hidden and removed from the tab order.
 */
export function FaqAccordion({ items, light = false }: { items: Faq[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const base = useId();

  return (
    <ul className={`divide-y border-y ${light ? "divide-line-light border-line-light" : "divide-line border-line"}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <li key={item.question} data-reveal style={{ "--i": Math.min(i, 5) } as React.CSSProperties}>
            <h3 className="font-sans">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className={`group flex w-full items-center justify-between gap-6 py-6 text-left text-[1.125rem] font-medium tracking-[-0.01em] transition-colors sm:text-[1.25rem] ${
                  light ? "text-ink-text hover:text-brand-600" : "text-hi hover:text-lavender-200"
                }`}
              >
                {item.question}
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-[transform,background-color,border-color] duration-300 ease-out-expo ${
                    isOpen ? "rotate-45" : ""
                  } ${light ? (isOpen ? "border-brand-600 bg-brand-600 text-white" : "border-line-light") : isOpen ? "border-violet-400 bg-violet-400/20" : "border-line-strong"}`}
                >
                  <Plus className="h-4 w-4" strokeWidth={1.5} />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity,visibility] duration-300 ease-out-expo ${
                isOpen ? "visible grid-rows-[1fr] opacity-100" : "invisible grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className={`measure pb-7 pr-12 ${light ? "text-ink-body" : "text-body"}`}>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
