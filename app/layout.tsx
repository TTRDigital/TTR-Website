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

// Body font is not preloaded: text paints at once with a metric-matched
// fallback, which keeps bandwidth free for the hero poster (LCP).
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-US" className={`${sora.variable} ${inter.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
