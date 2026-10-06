import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import { siteUrl } from "@/lib/site";

/*
 * Root layout is intentionally bare: the website's styles and chrome live
 * in app/(site)/layout.tsx so the embedded Sanity Studio at /cms loads
 * without them.
 */

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
  weight: ["500", "600"],
});

// Body font is deferred: text paints at once in the metric-matched fallback
// and Inter is applied after the load event (see fontScript), so it never
// competes with the first paint or the hero image. Later pages in the same
// session use it straight away from cache.
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

const interFallback = inter.style.fontFamily.split(",").slice(1).join(",").trim() || "sans-serif";
const fontScript = `(function(){var d=document.documentElement,k="ttr-fonts";function on(){d.setAttribute("data-fonts","");try{sessionStorage.setItem(k,"1")}catch(e){}}try{if(sessionStorage.getItem(k)){on();return}}catch(e){}if(document.readyState==="complete")on();else addEventListener("load",function(){setTimeout(on,0)},{once:true})})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TTR Digital Marketing | Digital Marketing Agency",
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-US"
      className={`${sora.variable} ${inter.variable}`}
      style={{ "--font-inter-fallback": interFallback } as React.CSSProperties}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: fontScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
