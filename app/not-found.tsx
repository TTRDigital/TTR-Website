import type { Metadata } from "next";
import { PageFinder } from "@/components/sections/PageFinder";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section aria-labelledby="nf-title" className="relative overflow-hidden pb-24 pt-[calc(var(--header-h)+48px)] lg:pb-32">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-50 [mask-image:radial-gradient(60%_60%_at_50%_30%,#000,transparent)]" />
      <div className="container-page text-center">
        {/* Lost signal: a radar sweep looking for the page */}
        <div aria-hidden="true" data-anim className="nf-radar relative mx-auto h-56 w-56 sm:h-64 sm:w-64">
          <span className="absolute inset-0 rounded-full border border-violet-300/20" />
          <span className="absolute inset-[18%] rounded-full border border-violet-300/20" />
          <span className="absolute inset-[36%] rounded-full border border-violet-300/25" />
          <span className="nf-sweep absolute inset-0 rounded-full" />
          <span className="nf-blip absolute left-[68%] top-[30%] h-2.5 w-2.5 rounded-full bg-lavender-100 shadow-[0_0_14px_3px_rgb(196_155_255/0.9)]" />
          <span className="absolute inset-0 flex items-center justify-center font-display text-[3.5rem] font-semibold tracking-[-0.05em] text-gradient sm:text-[4.25rem]">404</span>
        </div>
        <h1 id="nf-title" className="mx-auto mt-10 max-w-2xl text-h2 font-semibold">
          This page took a wrong turn.
        </h1>
        <p className="measure mx-auto mt-5 text-lead text-body">
          The link may be old or the page may have moved. Search below or jump to one of our main pages.
        </p>
        <div className="mt-10">
          <PageFinder />
        </div>
      </div>
    </section>
  );
}
