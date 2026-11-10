# SEO and speed audit (TTR-1454)

Audit date: November 10, 2026. Live site: https://www.ttrdigitalmarketing.com
Tools: curl (headers and markup), Lighthouse 12 on the live URLs (headless Chromium, simulated slow 4G for mobile, desktop preset), repo review. Google's PageSpeed API refused our calls (daily quota with no API key), so the numbers below are lab Lighthouse runs, not PageSpeed field data. Real-visitor Core Web Vitals need Search Console and Vercel Speed Insights (see "Needs access").

## 1. What is live

- **The live site is this Next.js build on Vercel, not WordPress.** Server header `Vercel`, `x-nextjs-prerender: 1`, `x-matched-path: /`. WordPress paths return 403 or 404 (`/wp-login.php`, `/index.php`, `/wp-content/...`).
- The bare domain and `ttr-website-nu.vercel.app` both 301 or 308 to `https://www.ttrdigitalmarketing.com/`. Good.
- **The live site already says Miami, not D.C. and Virginia.** Schema and `llms.txt` use 1000 Brickell Ave Ste 715, Miami FL 33131 and (786) 460-1311. The words "Virginia", "Fairfax", "D.C.", "(703)" and "(571)" appear nowhere on the home page. These are the defaults from CONTENT-NOTES.md, so they are live but still unconfirmed by Kia (see DECISIONS-FOR-KIA.md).
- Security headers are in place (HSTS with preload, CSP, X-Content-Type-Options, frame options, referrer and permissions policy).
- 100 old WordPress URLs: sampled `/fl/miami-seo/` and `/va/reston-ppc/` give one 301 to the matching service page. `/services/seo/` (trailing slash) gives one 301. An unknown URL returns a real 404.

## 2. Page by page (live)

All 14 indexable pages have one h1, a self-referencing canonical, a title of 41 to 57 characters, a description of 127 to 144 characters and no images missing alt text.

| Page | Title | Words | Schema types |
|---|---|---|---|
| / | Digital Marketing Agency for Local Businesses \| TTR | 2,136 | Organization+ProfessionalService, WebSite, FAQPage |
| /services | Digital Marketing Services for Local Businesses \| TTR | 737 | + BreadcrumbList |
| /services/seo | Local SEO Services \| TTR Digital Marketing | 1,703 | + Service, FAQPage |
| /services/search-everywhere-optimization | Search Everywhere Optimization: Google + AI Search \| TTR | 1,673 | + Service, FAQPage |
| /services/google-ads | Google Ads Management Services \| TTR Digital Marketing | 1,484 | + Service, FAQPage |
| /services/meta-ads | Meta Ads Management: Facebook and Instagram Ads \| TTR | 1,508 | + Service, FAQPage |
| /services/website-design | Website Design for Local Businesses \| TTR | 1,426 | + Service, FAQPage |
| /services/social-media-marketing | Social Media Marketing for Local Businesses \| TTR | 1,463 | + Service, FAQPage |
| /services/gohighlevel-crm | GoHighLevel CRM Setup and Automation \| TTR Digital | 1,435 | + Service, FAQPage |
| /services/ai-agents | AI Agents for Calls, Chat and Booking \| TTR Digital | 1,465 | + Service, FAQPage |
| /dental-marketing | Dental Marketing Agency \| More New Patients \| TTR | 1,279 | + FAQPage |
| /home-services-marketing | Home Services Marketing for HVAC, Plumbing, Roofing \| TTR | 1,336 | + FAQPage |
| /about | About TTR Digital Marketing \| Digital Marketing Agency | 954 | + BreadcrumbList |
| /contact | Contact TTR Digital Marketing \| Free Growth Audit | 841 | + FAQPage |
| /blog | Marketing Blog for Local Business Owners \| TTR Digital | 577 | + BreadcrumbList |

## 3. Speed (Lighthouse on live, November 10)

| Page | Mobile perf | Desktop perf | Mobile LCP | A11y | Best practices | SEO |
|---|---|---|---|---|---|---|
| / | 96 | 100 | 2.5 s | 100 | 100 | 100 |
| /services | 92 | 100 | 3.2 s | 100 | 100 | 100 |
| /services/seo | **88** | 99 | 3.7 s | 100 | 100 | 100 |
| /services/search-everywhere-optimization | 92 | 98 | 3.2 s | 100 | 100 | 100 |
| /services/google-ads | 90 | 100 | 3.5 s | 100 | 100 | 100 |
| /services/meta-ads | 92 | 100 | 3.3 s | 100 | 100 | 100 |
| /services/website-design | 92 | 100 | 3.2 s | 100 | 100 | 100 |
| /services/social-media-marketing | 98 | 95 | 2.3 s | 100 | 100 | 100 |
| /dental-marketing | 91 | 100 | 3.4 s | 100 | 100 | 100 |
| /home-services-marketing | 92 | 100 | 3.2 s | 100 | 100 | 100 |
| /about | 92 | 99 | 3.3 s | 100 (96 desktop) | 100 | 100 |
| /contact | **87** | 100 | 3.8 s | 100 | 100 (**78 desktop**) | 100 |

CLS is 0 on every page and TBT is 70 to 140 ms. These are slightly lower than QA-REPORT.md (which measured a local build); the sandbox is not a clean lab, so treat gaps of 3 to 4 points as noise. Two real misses against the 90 target:

1. **/services/seo (88) and /contact (87) on mobile.** LCP is the cost (3.7 and 3.8 s simulated). Both load the 17 KB render-blocking stylesheet (est. 210 ms) and a 66 KB framework chunk of which 40% is unused on the page. The home page, which scored 96, shows the cost is page-specific, not site-wide.
2. **/contact desktop best practices 78.** The reCAPTCHA iframe loads on page load and sets a third-party cookie, and Chrome logs an "Issues" entry. Loading reCAPTCHA when the visitor first touches the form (focus or scroll to it) removes this and also helps mobile LCP and TBT.
3. **/about desktop accessibility 96.** One contrast flag on the "story" heading words (`mask-word`). This is the heading reveal animation caught mid-fade; fix by making the starting state full contrast.

Lower-priority findings: legacy JavaScript (about 14 KB, a polyfill chunk), cache lifetime of the TTR OS tracker script (1 KB, third party, we cannot change it), 1,035 DOM elements on /services/seo (blog cards at the foot of the page), no preconnect hints.

## 4. SEO findings

**Working well:** one canonical host, clean 301s, HTTPS and HSTS, a generated sitemap with `lastmod`, a robots.txt that welcomes search and AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended and more), `llms.txt` with services, industries and the address, Organization+ProfessionalService+WebSite on every page, Service and FAQPage on service pages, BreadcrumbList sitewide, generated Open Graph images.

**Gaps that hold ranking back, in order of impact:**

1. **Almost no pages to rank with.** 15 indexable URLs. The site targets no city, no law, real estate, or other industry term, and there is nothing for "SEO for ChatGPT" or "Miami" searches beyond one service page. Ranking is a page-count and relevance problem before it is a technical one. See RANK-PLAN.md.
2. **No location in the home or service titles.** "Digital Marketing Agency for Local Businesses | TTR" never says Miami. For an agency selling to nearby businesses and appearing in the map pack, the city belongs in the home title, home h1 area and Local SEO title. Waiting on decision 2 (service area) because it also changes what we claim.
3. **No proof pages.** No case study, team or review pages. The only real proof is the 411% and 688% stats, the 2 to 10 to 15 cases per day quote and the client video, and none of them has a page of its own.
4. **Blog is stale.** Three posts, the newest about 2021 trends (`/blog/digital-marketing-trends-2021-for-local-businesses`). Authored "TTR Digital", not a person. One cover image reused (the site draws generated covers). No post answers an AI-search question.
5. **No Person schema for Kia** (author, founder). Articles are credited to the organization.
6. **Reviews and rating are absent** (no Google rating or count) and the Google Business Profile address may still say Fairfax (decision 2). A mismatch between the Google Business Profile, directories and the site hurts local rankings more than any on-page fix.
7. **Sitemap and llms.txt** only list pages that exist, so they grow automatically as pages are added. Sitemap `changefreq` and `priority` are ignored by Google; harmless.
8. **Old city pages:** 78 URLs all 301 to a service page or the home page, which is the right call for thin duplicates. One refinement: the three old Miami service URLs (`/fl/miami-seo/`, `/fl/miami-ppc/`, `/fl/miami-social-media/`) should 301 to the new Miami pages when those go live, because they are the only old URLs that match a market TTR serves.

## 5. Needs access (not done, not guessed)

- **Search Console and GA4:** impressions, queries, indexed pages and Core Web Vitals field data. Without them there is no baseline for "did it rank". Ask Ben to add the site to Search Console (domain property) and share the export, or give this session read access.
- **Vercel Speed Insights:** real-visitor LCP, INP and CLS (README says it must be switched on once in the Vercel project).
- **Google Business Profile:** current address, phone, categories, rating and review count. A GBP connector is attached to this workspace but needs approval to read it.
- **TTR OS:** the client results that can be proven for case studies.
- **Keyword volumes and rankings:** no rank-tracking or keyword tool is connected. The plan uses search intent and competition reasoning, not volume numbers. Do not treat any priority as a forecast.
