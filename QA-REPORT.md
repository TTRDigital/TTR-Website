# QA report (Phase 7)

Measured on a local production build (`npm run build && next start`). Lighthouse 13.5, mobile preset (simulated slow 4G and 4x CPU slowdown), median of 3 runs per page.

## Lighthouse (mobile)

| Page | Perf | A11y | Best practices | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|
| / | 96 | 100 | 100 | 100 | 2.7 s | 0 | 100 ms |
| /services | 96 | 100 | 100 | 100 | 2.6 s | 0 | 70 ms |
| /services/seo | 96 | 100 | 100 | 100 | 2.7 s | 0 | 50 ms |
| /services/search-everywhere-optimization | 95 | 100 | 100 | 100 | 2.9 s | 0 | 70 ms |
| /services/google-ads | 96 | 100 | 100 | 100 | 2.7 s | 0.002 | 50 ms |
| /services/meta-ads | 97 | 100 | 100 | 100 | 2.6 s | 0.002 | 80 ms |
| /services/website-design | 98 | 100 | 100 | 100 | 2.2 s | 0 | 120 ms |
| /services/social-media-marketing | 95 | 100 | 100 | 100 | 2.8 s | 0 | 140 ms |
| /services/gohighlevel-crm | 96 | 100 | 100 | 100 | 2.7 s | 0.003 | 50 ms |
| /services/ai-agents | 96 | 100 | 100 | 100 | 2.7 s | 0.006 | 50 ms |
| /dental-marketing | 95 | 100 | 100 | 100 | 2.8 s | 0.002 | 80 ms |
| /home-services-marketing | 95 | 100 | 100 | 100 | 2.8 s | 0 | 90 ms |
| /about | 96 | 100 | 100 | 100 | 2.7 s | 0 | 50 ms |
| /contact | 96 | 100 | 100 | 100 | 2.7 s | 0 | 50 ms |
| /blog | 96 | 100 | 100 | 100 | 2.7 s | 0.03 | 50 ms |
| /blog/seo-services-pricing | 96 | 100 | 100 | 100 | 2.7 s | 0 | 50 ms |
| /blog/social-media-marketing-strategy | 98 | 100 | 100 | 100 | 2.2 s | 0 | 70 ms |
| /blog/digital-marketing-trends-2021-for-local-businesses | 96 | 100 | 100 | 100 | 2.7 s | 0 | 50 ms |
| /privacy | 96 | 100 | 100 | 100 | 2.7 s | 0.032 | 50 ms |
| /terms | 96 | 100 | 100 | 100 | 2.8 s | 0.001 | 60 ms |
| /thank-you | 96 | 100 | 100 | 69 | 2.8 s | 0.002 | 60 ms |

Targets: Performance 90+ on home and 95+ elsewhere, Accessibility 95+, Best practices 95+, SEO 100, CLS under 0.05. All are met.

Notes:

- `/thank-you` scores SEO 69 on purpose. It is `noindex`, so it never shows up in search after a form is sent.
- **LCP.** Lighthouse estimates LCP at 2.2 to 2.9 s by simulating a slow 4G phone. Measured without throttling, LCP is about 0.2 s on every page, because the largest element is server-rendered text that paints with the first frame. Most of the remaining simulated time is React and the Next.js runtime (about 105 KB gzipped), which every Next.js site loads. Vercel Speed Insights will show real-visitor LCP once traffic arrives.

## Other checks

| Check | Result |
|---|---|
| Sideways scrolling at 375, 390, 768 and 1440 px, all 22 pages, full page height | None |
| Broken links (every internal page crawled, every link checked, external included) | 0 broken |
| Old WordPress URLs (100) | All redirect with one 301 to a page that returns 200 |
| Console errors and CSP violations, all pages | None (the 404 page returns 404 by design) |
| Title under 60 characters, description under 155, one h1, canonical, Open Graph | All pages |
| Keyboard: skip link, visible focus ring, menus open with Enter and close with Escape, mobile menu traps focus and returns it, FAQ toggles, form errors announced and focused | Pass |
| Touch targets of 44 px or more on mobile | Pass (links inside paragraphs excluded) |
| Reduced motion: no 3D canvas, no smooth scroll, no looping animations, all content visible | Pass |

## Fixes made in this phase

- GA4 and Tag Manager code is downloaded only after the first interaction, and not at all when no ID is set.
- The body font (Inter) is applied after the page has loaded, so it no longer delays first paint. Later pages in the same visit use it straight away. This took home from 91 to 96.
- Blog post titles use the same masked word reveal as other pages instead of a fade from transparent, which painted late.
- Breadcrumbs stay on one line, so a font swap can't re-wrap them and shift the page.
- Tap targets raised to 44 px: header logo, breadcrumbs, footer links, contact details and "View all" links.
- Post cards show a focus ring for keyboard users.
- `/services` heading order fixed (a hidden "All services" h2 above the cards).
