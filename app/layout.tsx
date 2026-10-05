import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TTR Digital Marketing | New Website Coming Soon",
  description:
    "TTR Digital Marketing in Miami, FL. Our new website is coming soon. Call (786) 460-1311 or visit us at 1000 Brickell Ave Ste 715, Miami, FL.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6b21a8",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
