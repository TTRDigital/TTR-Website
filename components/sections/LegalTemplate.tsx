import type { CmsPage } from "@/lib/pages";
import { PageHero } from "@/components/sections/PageHero";
import { PortableBody } from "@/components/blog/PortableBody";
import { TriangleAlert } from "lucide-react";

/** Simple, readable layout for legal pages. */
export function LegalTemplate({ page, fallbackTitle, href, settings }: { page: CmsPage | null; fallbackTitle: string; href: string; settings: { phone: string; phoneHref: string; email: string } }) {
  const title = page?.heading ?? page?.title ?? fallbackTitle;
  return (
    <>
      <PageHero compact breadcrumbs={[{ name: fallbackTitle, href }]} title={title} intro={page?.intro ? <p>{page.intro}</p> : undefined} />
      <section data-surface="light" className="surface-light py-16 lg:py-24">
        <div className="container-page">
          <div className="mx-auto max-w-[68ch]">
            <p role="note" className="flex gap-3 rounded-2xl border border-amber-700/20 bg-amber-50 p-5 text-small text-amber-950">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
              <span>
                <strong className="font-semibold">Starter text.</strong> This page is a plain-English starting point and must be reviewed by a lawyer before
                it is relied on.
              </span>
            </p>
            <div className="mt-12">
              {page?.body?.length ? (
                <PortableBody value={page.body} />
              ) : (
                <p className="text-ink-body">
                  This page is being updated. For questions, call{" "}
                  <a className="font-medium text-brand-600 underline" href={settings.phoneHref}>
                    {settings.phone}
                  </a>{" "}
                  or email{" "}
                  <a className="font-medium text-brand-600 underline" href={`mailto:${settings.email}`}>
                    {settings.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
