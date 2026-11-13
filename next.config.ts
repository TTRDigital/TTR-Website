import type { NextConfig } from "next";
import { redirects } from "./redirects";

const isDev = process.env.NODE_ENV !== "production";

// Feedback Studio (page editor bar) is for Vercel previews only. Production CSP stays exactly as it was.
// The bar script comes from the portal, and its photos come from Vercel Blob (the private store host
// <store>.private.blob.vercel-storage.com is covered by the wildcard).
const isPreview = process.env.VERCEL_ENV === "preview";
const PORTAL_HOST = "https://portal.ttrdigitalmarketing.com";
const previewScript = isPreview ? ` ${PORTAL_HOST}` : "";
const previewConnect = isPreview ? ` ${PORTAL_HOST}` : "";
const previewImg = isPreview ? " https://*.blob.vercel-storage.com" : "";

// Inline scripts are needed for Next's streamed payload and static (ISR)
// pages, which rule out per-request nonces. Third parties are limited to
// Google Analytics / Tag Manager, Vercel Analytics, Sanity images and the
// Google reCAPTCHA on the lead form.
// If you add tags in GTM that load other scripts, add their domains here.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://*.googletagmanager.com https://va.vercel-scripts.com https://www.google.com https://www.gstatic.com https://ttr-portal.vercel.app${previewScript}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data: blob: https://cdn.sanity.io https://i.ytimg.com https://*.google-analytics.com https://*.googletagmanager.com${previewImg}`,
  "font-src 'self' data:",
  `connect-src 'self' https://ttr-portal.vercel.app https://www.google.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://vitals.vercel-insights.com https://va.vercel-scripts.com${previewConnect}`,
  "frame-src 'self' https://www.googletagmanager.com https://www.google.com https://recaptcha.google.com https://www.youtube-nocookie.com",
  "worker-src 'self' blob:",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'self'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [50, 75],
    remotePatterns: [{ protocol: "https", hostname: "cdn.sanity.io" }],
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // The site gets a strict CSP. The studio at /cms talks to many Sanity
      // hosts and is protected by Sanity login instead.
      { source: "/((?!cms).*)", headers: [{ key: "Content-Security-Policy", value: csp }] },
    ];
  },
  // Old WordPress URLs end in a slash. The redirects handle the slash
  // themselves so every old link reaches its new page in a single 301.
  skipTrailingSlashRedirect: true,
  async redirects() {
    return redirects;
  },
};

export default nextConfig;
