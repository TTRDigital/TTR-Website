# Rank plan: ttrdigitalmarketing.com

Status: draft for Kia. Markets are written as **Miami and South Florida first**, which is the only location every source agrees on. If Kia confirms other markets (DECISIONS-FOR-KIA.md, items 2 and 3), add rows to the city table and nothing else changes.

Rules for every item: written in Kia's voice, plain and friendly, no em dashes, no prices unless Kia gives them, no guarantees or ranking promises, no result unless TTR OS can prove it, no invented reviews or badges. Byline Kia. Every page goes to a Vercel preview first, Kia approves, then it goes live.

There is no keyword tool connected, so targets are chosen by search intent and fit, not volume. Add volumes once Search Console and a rank tracker are connected.

## 1. Targets by intent

| Intent | Example searches | Page type | Page | Status |
|---|---|---|---|---|
| **Agency (brand and head term)** | digital marketing agency Miami, TTR Digital Marketing | Home | `/` | Live. Add "Miami" to title after decision 4 |
| **Service** | local SEO services, Google Ads management, Meta ads management, GoHighLevel setup, AI agents for business | Service page | `/services/*` (8) | Live |
| **AI search** | SEO for ChatGPT, how to get recommended by ChatGPT, AI search optimization, Gemini and Google AI Overviews SEO | Service page plus guides | `/services/search-everywhere-optimization` plus posts | Service live, guides in calendar |
| **City plus service** | SEO company Miami, Google Ads agency Miami, Miami social media marketing | City page | `/miami-seo`, `/miami-google-ads`, later `/miami-social-media-marketing` | First two in batch 1 |
| **City plus industry** | dentist marketing Miami, law firm marketing Miami, real estate marketing Miami | City and industry page | `/miami-dental-marketing`, later others | Dental in batch 1 |
| **Industry** | dental marketing agency, law firm marketing, real estate marketing, HVAC marketing, roofing marketing, plumber marketing | Industry page | `/dental-marketing`, `/home-services-marketing` (live); `/law-firm-marketing`, `/real-estate-marketing` (batch 1) | See calendar |
| **Question (top of funnel)** | how much does SEO cost in Miami, how long does SEO take, how to rank in the map pack | Blog post | `/blog/*` | Calendar |
| **Proof and trust** | TTR Digital Marketing reviews, SEO case study dentist | Case study, About, Team | `/case-studies/*`, `/about` | Needs decisions 9 to 13 |

Guardrails against doorway pages: one city page needs its own local detail (the real office, neighborhoods, how people there search, local examples), at least 600 unique words and a reason to exist. If we cannot write that for a city, we do not build it. No city pages for places with no office and no client.

## 2. Content calendar: 36 items in 12 weeks

P = page, B = blog post, C = case study (only after the client and numbers are approved from TTR OS). Week 1 is the first batch in this PR series.

| Week | Item 1 | Item 2 | Item 3 |
|---|---|---|---|
| 1 | P `/miami-seo` | P `/law-firm-marketing` | P `/real-estate-marketing` |
| 2 | P `/miami-google-ads` | P `/miami-dental-marketing` | B How to get your business recommended by ChatGPT and Gemini |
| 3 | B How much does SEO cost in Miami? (ranges only if Kia supplies them, otherwise what drives the cost) | B What is Search Everywhere Optimization? | P `/hvac-marketing` |
| 4 | P `/personal-injury-lawyer-marketing` | B How to show up in Google Maps in Miami | C Case study 1: the 411% and 688% client (if confirmed) |
| 5 | P `/roofing-marketing` | B Does llms.txt help you show up in AI answers? (honest answer, with what we do and do not know) | B Local SEO checklist for a dental practice |
| 6 | P `/plumber-marketing` | P `/miami-social-media-marketing` | B Google Ads or SEO: which first for a Miami service business? |
| 7 | P `/orthodontist-marketing` | B How lawyers get found in Google and in AI answers | C Case study 2 (dental, if available) |
| 8 | P `/real-estate-agent-marketing` | B Missed calls cost jobs: text back and AI receptionist for home services | B Google Business Profile: what to fix first |
| 9 | P `/miami-web-design` | B How to read your SEO report: calls, not rankings | B What to ask before you hire an SEO company |
| 10 | P `/electrician-marketing` | B Meta ads vs Google Ads for local businesses | C Case study 3 (home services, if available) |
| 11 | P `/med-spa-marketing` (only if Kia has client experience) | B How AI agents answer your phone without sounding robotic | B Reviews: how to ask, and what Google allows |
| 12 | P `/miami-gohighlevel-crm` | B 90 days of working with TTR: what a month looks like | B Refresh and re-publish the best 3 earlier posts with new data |

Cadence rules: a new page ships to a preview first, never straight to production. Each week ends with a short report: pages shipped, pages indexed (Search Console), queries gained. If a page is not indexed after 3 weeks, fix it before building more of that type.

## 3. Internal linking map

Hubs (link to everything below them): Home, `/services`, `/blog`.

| From | Link to | Anchor idea |
|---|---|---|
| Home | `/miami-seo`, `/law-firm-marketing`, `/real-estate-marketing`, `/dental-marketing`, `/home-services-marketing` | The industry cards and "Miami" line |
| `/services/seo` | `/miami-seo`, industry pages, the "how much does SEO cost" post | "SEO in Miami" |
| `/services/search-everywhere-optimization` | The ChatGPT and Gemini guide, `llms.txt` post | "get recommended by ChatGPT" |
| `/services/google-ads` | `/miami-google-ads`, "Google Ads or SEO first" post | "Google Ads in Miami" |
| `/miami-seo` | `/services/seo`, `/miami-google-ads`, `/miami-dental-marketing`, Maps post | "our SEO service" |
| `/miami-dental-marketing` | `/dental-marketing` (up), `/services/seo`, `/services/google-ads` | "dental marketing" |
| Industry pages | The 6 services they use, their city page, matching posts | Service names |
| Every blog post | The one service page it supports and one related post | Plain text, not "click here" |
| Every case study | The service it proves and the industry page | "see how we do SEO for dentists" |
| Footer | Industries, Miami pages, About, Contact | Static |

Rule: every new page gets at least 3 links in from live pages in the same PR, and links out to its service pages. Orphan pages are not allowed.

## 4. Proof pages

Allowed to publish today (verified on the old and current site):
- Testimonial: "We used to only get 2 cases per day, now we're getting 10-15 per day." Chris Aaron, CEO, Displays & Holders.
- 411% organic traffic year over year and 688% more keywords in the top 10, client and period to be confirmed (decision 9).
- The client video testimonial now on the home page.
- Founded 2015. Kia: 10+ years running an IT company, then SEO for law, dental, healthcare, real estate, tech and government contractors.

Everything else is `[PLACEHOLDER]` and stays hidden. Case study template: situation, what we did, what changed (numbers with date range and source), what the client said, link to the service. Ben pulls the numbers from TTR OS; the page shows only what is on that list, and names the client only with permission.

## 5. FAQ and schema

- Every page gets 4 to 6 real questions people ask, answered in the first sentence, as visible FAQ text plus FAQPage schema (already built into the templates). No FAQ that is not on the page.
- Service pages: `Service` + `ProfessionalService` (live). City pages: `ProfessionalService` with `areaServed` set to the city and the real address. Industry pages: `Service` with `audience`. Posts: `Article` with author `Person` (Kia) and `sameAs` LinkedIn. About: `Person` for Kia. `BreadcrumbList` everywhere (live).
- Do not add `Review` or `AggregateRating` until real reviews are on the page and Google allows it for the page type. No fake star ratings.

## 6. Technical backlog (separate small PRs)

1. reCAPTCHA loads on first interaction with the form (fixes /contact best practices and mobile LCP).
2. Heading reveal starts at full contrast (about page accessibility).
3. Trim the render-blocking stylesheet and the unused framework chunk on service pages (mobile 88 to 90+).
4. Person schema for Kia on About and as author on posts.
5. Redirect the three old Miami URLs to the new Miami pages when they go live.
6. After decision 4: add Miami to the home and SEO titles.
7. Keep a log of every back-end SEO change in `docs/seo/CHANGELOG.md`, with the revert step, per the October 28 rule.
