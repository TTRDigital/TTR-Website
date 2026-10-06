import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "@/components/ui/JsonLd";

export type Crumb = { name: string; href: string };

/** Visible breadcrumb trail plus BreadcrumbList schema. Home is added automatically. */
export function Breadcrumbs({ items, light = false }: { items: Crumb[]; light?: boolean }) {
  const all: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.name,
            item: absoluteUrl(c.href),
          })),
        }}
      />
      <nav aria-label="Breadcrumb" className="hero-fade" style={{ "--d": "0ms" } as React.CSSProperties}>
        <ol className={`flex min-w-0 items-center gap-1.5 whitespace-nowrap text-small ${light ? "text-ink-meta" : "text-meta"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              // One line only: a wrap that changes when the web font loads would shift the page.
              <li key={c.href} className={`flex items-center gap-1.5 ${last ? "min-w-0" : "shrink-0"}`}>
                {last ? (
                  <span aria-current="page" className={`truncate ${light ? "text-ink-text" : "text-hi"}`}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="inline-flex min-h-11 items-center hover:text-hi">
                      <span className="link-underline">{c.name}</span>
                    </Link>
                    <ChevronRight className="h-3.5 w-3.5 opacity-60" strokeWidth={1.5} aria-hidden="true" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
