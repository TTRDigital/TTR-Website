import type { ReactNode } from "react";
import { Eyebrow, MaskedWords } from "@/components/ui/SectionHeading";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

type Props = {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  visual?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
};

/**
 * Hero for inner pages. Plain HTML with CSS-only entrance animations so it
 * is readable before any JavaScript runs. Optional visual on the right.
 */
export function PageHero({ eyebrow, title, intro, breadcrumbs, actions, visual, children, compact = false }: Props) {
  return (
    <section
      aria-labelledby="page-title"
      className={`relative isolate overflow-hidden pt-[calc(var(--header-h)+40px)] ${compact ? "pb-12 lg:pb-16" : "pb-16 lg:pb-24"}`}
    >
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(70%_80%_at_60%_0%,#000,transparent)]" />
      <div aria-hidden="true" className="leak -z-10 right-[-10%] top-[-20%] h-[560px] w-[560px] opacity-60" />

      <div className="container-page">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <div className={`grid gap-12 ${visual ? "lg:grid-cols-12 lg:items-center lg:gap-10" : ""} ${breadcrumbs ? "mt-10 lg:mt-14" : ""}`}>
          <div className={visual ? "lg:col-span-7" : "max-w-4xl"}>
            {eyebrow ? (
              <div className="hero-fade" style={{ "--d": "40ms" } as React.CSSProperties}>
                <Eyebrow>{eyebrow}</Eyebrow>
              </div>
            ) : null}
            <h1 id="page-title" className="hero-words mt-5 text-[clamp(2.5rem,1.6rem+3.6vw,5rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
              <MaskedWords text={title} />
            </h1>
            {intro ? (
              <div className="hero-fade mt-6 max-w-[40rem] text-lead text-body lg:mt-8" style={{ "--d": "320ms" } as React.CSSProperties}>
                {intro}
              </div>
            ) : null}
            {actions ? (
              <div className="hero-fade mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-10" style={{ "--d": "420ms" } as React.CSSProperties}>
                {actions}
              </div>
            ) : null}
            {children}
          </div>
          {visual ? (
            <div className="hero-fade lg:col-span-5" style={{ "--d": "300ms" } as React.CSSProperties}>
              {visual}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
