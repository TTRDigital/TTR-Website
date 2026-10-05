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
        <ol className={`flex flex-wrap items-center gap-1.5 text-small ${light ? "text-ink-meta" : "text-meta"}`}>
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={light ? "text-ink-text" : "text-hi"}>
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className="link-underline hover:text-hi">
                      {c.name}
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
