# TTR Digital Marketing: Content Notes (Phase 1)

Research date: October 5, 2026.
Sources: the live WordPress site (ttrdigitalmarketing.com, read with a headless browser through its SiteGround bot check) and the existing Sanity dataset (`production`).

---

## 1. Decisions needed before Phase 2

These items conflict between the spec, the live site and Sanity. Each one has a default I will use unless you tell me otherwise.

| # | Question | What I found | My default |
|---|----------|--------------|------------|
| 1 | **Which phone number is canonical?** | Live site header, footer and schema all use **(703) 775-1397**. The "Free audit" buttons dial **(571) 370-9191**. Only the old Miami city page shows **(786) 460-1311**. Spec and Sanity use (786) 460-1311. | (786) 460-1311 everywhere, `tel:+17864601311`. |
| 2 | **Office location and service area** | Live site says "works with local businesses around the D.C. and Virginia area". Schema address: **10565 Fairfax Blvd, 2nd floor, Fairfax, VA 22030**. The old Miami page lists **150 SE 2nd Ave, Suite 300, Miami FL 33131**. Spec: **1000 Brickell Ave Ste 715, Miami, FL 33131**. | Brickell address only. **SEO note:** the Google Business Profile linked from the old schema (`maps.google.com/?cid=7675445311706593415`) and about 40 directory listings (Yelp Fairfax, etc.) still show the Fairfax address. Update the Google Business Profile to Miami, or local rankings will see conflicting address and phone details. |
| 3 | **Partner badges** | Live site shows Google Partner, Facebook Marketing Partner, BBB, GSA Contract Holder and ISO logos. The About page claims "ISO 9001:2008, IACRB, SOC Type II, GSA". Sanity has Google Partner, Meta Business Partner and BBB stored as `badges`. | **Hide all badges** until you confirm which are current. I'll add an on/off toggle per badge in `/cms`. I recommend dropping GSA, ISO, IACRB and SOC for good: they read as copied from an IT company and can't be backed up for a marketing agency. |
| 4 | **Business email** | No email on the live site. Sanity has `ttrdigitalmarketingteam@gmail.com`. | Use it for now, editable in `/cms`. I recommend a domain address (e.g. hello@ttrdigitalmarketing.com) for a premium look and better email deliverability. |
| 5 | **Kia's title** | About page: "Chief Business Development Officer". Schema: "Owner", "CEO", "founder", full name "Kiarash Khamoushi". Page title: "CEO and Founder". | "Kia Khamoushi, Founder and Chief Business Development Officer". Please confirm. |
| 6 | **Hours** | Old Miami page and Sanity: Mon to Fri, 9 AM to 5 PM. Old schema: 10 AM to 5 PM. | Mon to Fri, 9 AM to 5 PM. |
| 7 | **Service slugs** | Sanity uses `websites` and `social-media`. Spec uses `website-design` and `social-media-marketing`. | Use the spec slugs. In Phase 4 I'll patch the two slugs in place (no deletes), update internal links inside Sanity content and add 301s from the short slugs. |
| 8 | **Industry page type name** | Sanity stores the dental and home services pages as `nichePage`. Spec asks for `industryPage`. A document's type can't be renamed without deleting it. | Keep the schema name `nichePage` and label it "Industry page" in the studio, so the existing documents are reused and nothing is deleted. |
| 9 | **78 old city/state landing pages** | `/fl/miami-seo/`, `/va/reston-ppc/`, `/ny/new-york-social-media/` and so on, across 11 states and DC. Thin, mostly duplicate content, aimed at DC/VA. | 301 each one to the matching new service page (pattern-based, see section 7). If any of them still brings real leads, tell me and I can add a location page template later. |
| 10 | **Referral program page** (`/digital-marketing-referral-program/`, "$750 per referral") | Not in the spec. Its testimonial ("Mia Maison") uses a stock photo. | 301 to `/contact`. Tell me if the program is still running and you want a page for it. |
| 11 | **Calendly** | Kia's page links to `calendly.com/ttrdigital/15min`. | Leave it out. The spec's conversion paths are phone and audit form. I can add a "Book a time" link if you want one. |

---

## 2. What the current site has

**Brand**
- Logo: wordmark "TTR DIGITAL" with an angular "TT" mark (`/wp-content/uploads/2019/12/ttrdigital-marketing-icon.png`, 1000x126 PNG, black and purple; a white version also exists). There is no vector (SVG) logo. **I need an SVG logo** for a sharp header. Until then I'll rebuild the wordmark as SVG from the PNG, and it should be checked against the original.
- Colors sampled from the logo: **#87348D** (main purple), mark gradient **#6A3091 → #8F2A8F**, black **#040608**. Theme CSS also uses **#6D3584**, **#521442** (deep plum) and **#ECD4F6** (lavender).
  - Planned palette (Phase 2): primary purple around #6E1FA8 to #7B2E9E (bridging the spec and the logo), electric violet about #A35BFF for glow, lavender #E9D5FF / #ECD4F6 for text accents, ink #07060B. Cyan (#5EE6F0 range) only for charts.
- Founded: **2015** (old schema `foundingDate`, and "In business since 2015" in Sanity).
- Social: Facebook `facebook.com/TTRDigitalMarketing`, Instagram `instagram.com/ttrdigitalmarketing`, LinkedIn `linkedin.com/company/ttr-digital-marketing`. The old schema also lists Twitter/X `twitter.com/ttrdigital` (unverified, possibly inactive) and Yelp (Fairfax listing).
- Kia Khamoushi: LinkedIn `linkedin.com/in/kia-kham`. Headshot exists but is only 212x211 px.

**Pages (100 URLs in the WordPress sitemaps)**
- Core: home, about-us, about-kia, contact-us, audit, thank-you, thank-you-free-audit, privacy-policy, terms-of-service, sitemap, testing-page, digital-marketing-referral-program.
- Services: `/digital-marketing-services/` plus `seo`, `ppc`, `social-media`, and industry pages `health-care`, `automotive`, `insurance`.
- 78 location pages under `/al/ /ca/ /dc/ /fl/ /ga/ /il/ /ma/ /md/ /ny/ /pa/ /va/`.
- Blog: `/blog/` and 3 posts (see below).

**Old site copy**
- Tone: generic agency copy ("marketing wizards", "top leaders in SEO", "serving thousands of clients", "five-star rated"). These claims are **not verified, so I will not reuse them**.
- Useful and true-sounding ideas worth keeping: free 30-minute audit call; website review; competitor reverse-engineering; technical issues review; conversion assessment; "No sales pitches"; "100% campaign transparency"; "Friendly team of experts"; "Customer-oriented"; "Creative and holistic solutions"; the Research / Strategy / Results process.
- Kia's story: ran an IT company for 10+ years, taught himself SEO, built SEO for law, dental, healthcare, real estate, tech, government contractors and more.

**Real proof found on the live home page** (verified in the page HTML, not just in Sanity)
- Testimonial: *"We used to only get 2 cases per day, now we're getting 10-15 per day."* Chris Aaron, CEO, Displays & Holders.
- Stats shown next to the testimonials: **411%** increase in organic traffic year over year; **688%** increase in keywords ranking in the top 10.
- Second testimonial, **no name**: *"They are professional. They are quick. They are always on top of it and I couldn't be happier with them."*
- The photos beside both testimonials are **stock photos** and will not be used.
- Not found: a Google rating widget, review count, client logos, case study pages, team page, awards.

---

## 3. What is already in Sanity (project `y2g7jhit`, dataset `production`)

| Type | Count | Notes |
|------|-------|-------|
| `siteSettings` | 1 | Phone, email, street, city, region, postal code, hours, 3 badges (Google Partner, Meta Business Partner, BBB). `clientLogos` is empty. No logo, no social links, no default SEO. |
| `homePage` | 1 | Eyebrow, heading, text, 3 hero points, 3 stats (411%, 688%, "10 to 15 new cases a day"), 3 process steps, 6 FAQs, CTA heading and text, SEO. |
| `service` | 8 | seo, search-everywhere-optimization, google-ads, meta-ads, websites, social-media, gohighlevel-crm, ai-agents. Each has heading, intro, summary, 6 benefits, 4 process steps, 2 to 3 FAQs, 3 related services, body text and SEO. |
| `nichePage` | 2 | dental-marketing, home-services-marketing. Heading, intro, 3 problems, 4 process steps, 6 services, 3 to 4 FAQs, body, SEO. |
| `page` | 4 | about, contact, privacy, terms. |
| `post` | 3 | Slugs match WordPress exactly. Rewritten, cleaner bodies. All three share one cover image. |
| `author` | 1 | "TTR Digital". |
| `category` | 1 | "Uncategorized". |
| `testimonial` | 2 | Chris Aaron (with the 411% and 688% stats attached) and the unnamed one. |
| image assets | 4 | Blog cover `TTR-DM-SEO-process.png`, Google Partner, Meta Partner and BBB badges. |

**Write test:** passed. I set `siteSettings.hoursText` to its current value: authenticated, accepted, new revision, no content change.

**Issues to fix during the Phase 4 migration (patches only, nothing deleted)**
1. **Merged headings.** Most `body` fields store a heading and its paragraph inside one `h2` block, e.g. `[h2] "Why Meta Ads work for local businesses Most people in your area scroll..."`. I'll split them into a proper `h2` plus a paragraph.
2. **Service bodies are short** (2 to 3 sections each). Each service page needs 600+ words of unique copy, so I'll write new sections and keep the existing ones.
3. **Blog SEO titles still say 2021** ("SEO Services Pricing in 2021...", "Effective Social Media Marketing Strategies for 2021"). The post bodies were already updated, so I'll refresh the titles and descriptions to match. Slugs stay the same.
4. **Missing types** the spec needs: `navigation`, `caseStudy`, `faq`, `clientLogo` and the new `homePage` sections. I'll add the schemas and fill them from the content above.
5. Category "Uncategorized" only. I'll suggest categories (SEO, Ads, AI Search, CRM and Automation) and assign the 3 posts. You can rename them.

---

## 4. Hero headline options (pick one, or mix)

Eyebrow for all three: **Miami digital marketing agency**

**Option A: "Get found everywhere your customers search."**
Sub: *Google, Maps, ads and AI answers like ChatGPT and Gemini. We put your business in front of people ready to buy, then turn those searches into booked calls.*

**Option B: "Be the business Google and AI recommend."**
Sub: *More people now ask Google, Maps and ChatGPT who to call. We make sure the answer is you, and we follow up every lead fast so it becomes a booked job.*

**Option C: "From first search to booked job."**
Sub: *We get local businesses found on Google, in ads and in AI search, then use GoHighLevel and AI agents to answer, follow up and book every lead.*

My pick: **A**. It's the clearest about the outcome, works at 120px without awkward wrapping, and leads naturally into the "Search Everywhere" section.

Hero trust row (only true items): "Since 2015" · "Brickell, Miami office" · Google rating **[GOOGLE RATING]** (hidden until filled) · partner badges (hidden until confirmed, see decision 3).

---

## 5. Placeholders that need your real information

Every placeholder renders as a clearly marked tag on the preview, e.g. `[CLIENT RESULT]`, and **is hidden on the live site when empty** wherever hiding is possible. Each one will be editable in `/cms`.

**Global / trust**
- [ ] `[GOOGLE RATING]` and `[REVIEW COUNT]`: Google Business Profile star rating and number of reviews (Settings → Site settings).
- [ ] `[CLIENT COUNT]`: number of clients served, only if you can stand behind it (Settings → Site settings).
- [ ] Confirm which partner badges are current (decision 3).
- [ ] Logo as SVG (dark and light versions).
- [ ] Google Maps link for the Brickell office or your Google Business Profile URL.
- [ ] Social links to confirm: Facebook, Instagram, LinkedIn. Any YouTube, TikTok or X?

**Client logos (home logo row)**
- [ ] **None exist.** The old "partner" row was badges, not clients. With fewer than 6 logos the section shows a static row; with 0 it's hidden. Add logos plus client permission in Proof → Client logos.

**Results section (home)**
- Real: 411% organic traffic YoY · 688% more top-10 keywords · from 2 to 10 to 15 cases a day · founded 2015.
- [ ] Please confirm **which client the 411% and 688% belong to**. Sanity attaches them to Chris Aaron / Displays & Holders. The old site showed them in the same block but didn't say whose they were.
- [ ] Case study 2: `[CLIENT TYPE]`, `[CHALLENGE]`, `[RESULT]`. Ideally a dental practice.
- [ ] Case study 3: `[CLIENT TYPE]`, `[CHALLENGE]`, `[RESULT]`. Ideally a home services company.

**Testimonials**
- [ ] Name, role and company for the second testimonial ("They are professional. They are quick..."), or permission to show it as "Verified client".
- [ ] Any extra real testimonials (Google reviews you're allowed to quote work well).

**Service pages, "Results / proof" block (one per service)**
- [ ] SEO: real numbers exist (411% / 688%). Confirm they can be used here.
- [ ] Search Everywhere Optimization: `[CLIENT RESULT]`, e.g. "now mentioned in ChatGPT answers for X".
- [ ] Google Ads: `[CLIENT RESULT]`, e.g. cost per lead or calls per month.
- [ ] Meta Ads: `[CLIENT RESULT]`
- [ ] Website Design: `[CLIENT RESULT]` and, if possible, a real site you built that can be shown.
- [ ] Social Media Marketing: `[CLIENT RESULT]`
- [ ] GoHighLevel CRM: `[CLIENT RESULT]`, e.g. response time or booking rate.
- [ ] AI Agents: `[CLIENT RESULT]`

**Industry pages**
- [ ] Dental proof: `[DENTAL CLIENT RESULT]` and a dental testimonial if available.
- [ ] Home services proof: `[HOME SERVICES CLIENT RESULT]` and a home services testimonial if available.

**About page**
- [ ] Higher-resolution headshot of Kia (at least 800x800). The current one is 212 px.
- [ ] Kia's confirmed title (decision 5).
- [ ] Other team members (name, role, photo). The team section only shows people you add.
- [ ] Optional: a real office or team photo. The design works without one.

**Blog**
- [ ] Author: posts are credited to "TTR Digital". Should they be credited to Kia, with bio and photo?
- [ ] Unique cover images per post. All 3 share one image now. I can make on-brand abstract covers if you'd like.

**Legal**
- [ ] Privacy Policy and Terms are starter text from the earlier build. They'll be marked "Starter text, to be reviewed by a lawyer" until a lawyer approves them.

**Environment variables (not needed yet)**
- `GHL_LOCATION_ID`, `GHL_API_KEY`, `NEXT_PUBLIC_GA_ID` and/or `NEXT_PUBLIC_GTM_ID`, `SANITY_REVALIDATE_SECRET`. Everything works without them.

---

## 6. Content rules I'll follow

- Plain, confident, friendly tone. Short sentences. Outcomes first (calls, booked jobs, new patients).
- No em dashes, no prices, no guarantees, no invented numbers, reviews, badges or team members.
- Every page answers its main question in the first paragraph.
- Things I won't reuse from the old site: "thousands of clients", "five-star rated", "top leaders", "Virginia's best SEO company", the ISO/IACRB/SOC/GSA certifications, the "54% more effective" PPC claim, and the stock-photo testimonials.

---

## 7. Proposed redirects (built and listed in REDIRECTS.md in Phase 6)

| Old URL | New URL |
|---------|---------|
| `/about-us/`, `/about-kia/` | `/about` |
| `/contact-us/`, `/audit/`, `/digital-marketing-referral-program/` | `/contact` |
| `/thank-you-free-audit/` | `/thank-you` |
| `/privacy-policy/` | `/privacy` |
| `/terms-of-service/` | `/terms` |
| `/sitemap/`, `/testing-page/` | `/` |
| `/digital-marketing-services/` | `/services` |
| `/digital-marketing-services/seo/` | `/services/seo` |
| `/digital-marketing-services/ppc/` | `/services/google-ads` |
| `/digital-marketing-services/social-media/` | `/services/social-media-marketing` |
| `/digital-marketing-services/health-care/` | `/dental-marketing` |
| `/digital-marketing-services/automotive/`, `/insurance/` | `/services` |
| `/:state/` (11 state hubs) | `/` |
| `/:state/:city-seo/` | `/services/seo` |
| `/:state/:city-ppc/` | `/services/google-ads` |
| `/:state/:city-social-media/` | `/services/social-media-marketing` |
| `/:state/:city-digital-marketing/` | `/` |
| `/blog/:slug/` | `/blog/:slug` (same slug, trailing slash removed) |
| `/services/websites`, `/services/social-media` (earlier build slugs) | `/services/website-design`, `/services/social-media-marketing` |

<details>
<summary>Full list of the 100 old URLs</summary>

```
/
/audit/
/about-kia/
/digital-marketing-referral-program/
/thank-you/
/thank-you-free-audit/
/testing-page/
/sitemap/
/privacy-policy/
/terms-of-service/
/about-us/
/fl/orlando-digital-marketing/
/il/schaumburg-digital-marketing/
/al/
/al/birmingham-seo/
/ca/
/ca/san-francisco-ppc/
/ca/san-francisco-social-media/
/fl/aventura-ppc/
/fl/miami-ppc/
/fl/orlando-ppc/
/fl/aventura-seo/
/fl/orlando-seo/
/fl/aventura-social-media/
/fl/miami-social-media/
/fl/orlando-social-media/
/ga/
/ga/atlanta-ppc/
/ga/atlanta-seo/
/ga/atlanta-social-media/
/il/
/il/chicago-ppc/
/il/schaumburg-ppc/
/il/chicago-seo/
/il/chicago-social-media/
/il/schaumburg-social-media/
/ma/
/ma/boston-ppc/
/ma/boston-seo/
/ma/boston-social-media/
/ny/
/ny/new-york-ppc/
/ny/new-york-seo/
/ny/new-york-social-media/
/pa/
/pa/philadelphia-ppc/
/pa/philadelphia-social-media/
/md/
/md/chevy-chase-ppc/
/md/chevy-chase-seo/
/md/chevy-chase-social-media/
/digital-marketing-services/automotive/
/digital-marketing-services/health-care/
/digital-marketing-services/insurance/
/va/fairfax-ppc/
/va/arlington-ppc/
/va/herndon-ppc/
/va/mclean-ppc/
/va/reston-ppc/
/va/fairfax-seo/
/va/arlington-seo/
/va/herndon-seo/
/va/mclean-seo/
/va/reston-seo/
/va/arlington-social-media/
/va/fairfax-social-media/
/va/herndon-social-media/
/va/mclean-social-media/
/va/reston-social-media/
/dc/
/dc/washington-ppc/
/dc/washington-seo/
/dc/washington-social-media/
/va/reston-digital-marketing/
/digital-marketing-services/ppc/
/digital-marketing-services/seo/
/digital-marketing-services/social-media/
/va/
/ca/san-francisco-seo/
/pa/philadelphia-seo/
/ga/atlanta-digital-marketing/
/fl/miami-seo/
/fl/
/dc/washington-dc-digital-marketing/
/il/schaumburg-seo/
/fl/miami-digital-marketing/
/va/mclean-digital-marketing/
/ca/san-francisco-digital-marketing/
/fl/aventura-digital-marketing/
/il/chicago-digital-marketing/
/va/herndon-digital-marketing/
/md/chevy-chase-digital-marketing/
/pa/philadelphia-digital-marketing/
/va/arlington-digital-marketing/
/va/fairfax-digital-marketing/
/contact-us/
/blog/
/blog/seo-services-pricing/
/blog/social-media-marketing-strategy/
/blog/digital-marketing-trends-2021-for-local-businesses/
```

</details>

---

## 8. Phase 2 updates

**Sanity changes made (patches only, nothing deleted)**
- `homePage`: hero heading set to option A, new hero text, new CTA text, 8 FAQs (adds cost factors, contracts and reporting), SEO title shortened to under 60 characters.
- `service-websites` slug changed to `website-design`, `service-social-media` slug changed to `social-media-marketing`. 301 redirects from the old paths are in `next.config.ts`.

**New items to confirm**
- [ ] FAQ "Do you require long contracts?": the answer is written to stay neutral ("we explain the terms, the length and how to cancel before you sign"). Tell me your actual contract terms (month to month, minimum term, notice period) and I will make it specific.
- [ ] Lead form consent line: "By sending this form you agree we may contact you by phone, text or email about your request." Have it checked alongside the privacy policy, especially for SMS (A2P 10DLC) compliance in GoHighLevel.
- [ ] The example UI mockups (rankings chart, ad preview, lead pipeline) are labelled "Example view" and use made-up names. They are illustrations, not client data.

---

## 9. Phase 3 updates

**Sanity changes made (patches and new documents only, nothing deleted)**
- Fixed the merged heading + paragraph blocks in 16 documents (61 blocks): all 8 services, both industry pages, about, privacy, terms and the 3 posts. Headings were matched by exact text, not guessed.
- Created 3 blog categories (SEO and AI search, Social media, Local marketing) and assigned the posts. The old "Uncategorized" category still exists, unassigned.
- Refreshed the 3 post SEO titles and descriptions that still said "2021". Slugs unchanged.
- Updated 7 internal links that pointed at the old `/services/websites` and `/services/social-media` slugs.

**Where page copy lives right now**
- Service pages (`lib/data/services.ts`) and industry pages (`lib/data/industries.ts`) use new, longer copy written for this build (600+ words each). Phase 4 moves this into Sanity so it is editable in `/cms`.
- Blog posts and the privacy/terms pages render from Sanity today.

**New items to confirm**
- [ ] Blog covers: the 3 posts shared one clip-art illustration, so the site now draws an on-brand generated cover per post. Upload a unique image to any post in `/cms` and it will be used instead.
- [ ] About page "at a glance" card says "1 business day to reply to every audit request" (from the earlier contact copy). Confirm that is still your promise.
- [ ] About page lists Kia only. Add other team members (name, role, photo) if you want a fuller team section.
- [ ] Service FAQ "Who owns the website?" and "Who owns the data?" answer "you do". Confirm this matches your contracts.
- [ ] Per-service results: every service page except SEO shows a `[CLIENT RESULT]` block. Dental and home services pages show `[DENTAL CLIENT RESULT]` and `[HOME SERVICES CLIENT RESULT]`.
