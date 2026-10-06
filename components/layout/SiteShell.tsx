import { ViewTransition, type ReactNode } from "react";
import { getNavigation, getServiceSummaries, getSiteSettings } from "@/lib/content";
import { revealScript } from "@/lib/reveal-script";
import { siteSchema } from "@/lib/schema";
import { JsonLd } from "@/components/ui/JsonLd";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { AttributionCapture } from "@/components/forms/AttributionCapture";
import { HydrationSignal } from "@/components/motion/HydrationSignal";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Vercel Analytics and Speed Insights only exist on Vercel deployments.
const onVercel = !!process.env.VERCEL;

/** Header, footer and site-wide behaviors. Used by the site layout and the 404 page. */
export async function SiteShell({ children }: { children: ReactNode }) {
  const [settings, services, nav] = await Promise.all([getSiteSettings(), getServiceSummaries(), getNavigation()]);
  return (
    <>
      <JsonLd data={siteSchema(settings)} />
      <a
        href="#main"
        className="sr-only z-[100] rounded-full bg-hi px-5 py-3 font-medium text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>
      <Header services={services} mainLinks={nav.mainLinks} ctaLabel={nav.headerCtaLabel} phone={settings.phone} phoneHref={settings.phoneHref} />
      <ViewTransition>
        <main id="main" tabIndex={-1} className="page-fade relative outline-none">
          {children}
        </main>
      </ViewTransition>
      <Footer settings={settings} services={services} nav={nav} />
      <CursorGlow />
      <SmoothScroll />
      <AttributionCapture />
      <HydrationSignal />
      <SiteAnalytics />
      {onVercel ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}
      <div aria-hidden="true" className="grain" />
      <script dangerouslySetInnerHTML={{ __html: revealScript }} />
    </>
  );
}
