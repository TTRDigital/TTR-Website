import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { ViewTransition } from "react";
import "./globals.css";
import { getServiceSummaries, getSiteSettings } from "@/lib/content";
import { revealScript } from "@/lib/reveal-script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { CursorGlow } from "@/components/motion/CursorGlow";
import { AttributionCapture } from "@/components/forms/AttributionCapture";
import { HydrationSignal } from "@/components/motion/HydrationSignal";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["500", "600"],
});

// Body font is not preloaded: text paints at once with a metric-matched
// fallback, which keeps bandwidth free for the hero poster (LCP).
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ttr-website-nu.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TTR Digital Marketing | Miami Digital Marketing Agency",
    template: "%s | TTR Digital Marketing",
  },
  description:
    "TTR Digital Marketing gets local businesses found on Google, ads and AI search, then turns that traffic into booked calls.",
  applicationName: "TTR Digital Marketing",
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07060b",
  colorScheme: "dark",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [settings, services] = await Promise.all([getSiteSettings(), getServiceSummaries()]);

  return (
    <html lang="en-US" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-full bg-hi px-5 py-3 font-medium text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Header services={services} phone={settings.phone} phoneHref={settings.phoneHref} />
        <ViewTransition>
          <main id="main" tabIndex={-1} className="page-fade relative outline-none">
            {children}
          </main>
        </ViewTransition>
        <Footer settings={settings} services={services} />
        <CursorGlow />
        <SmoothScroll />
        <AttributionCapture />
        <HydrationSignal />
        <div aria-hidden="true" className="grain" />
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
      </body>
    </html>
  );
}
