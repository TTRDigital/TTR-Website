# Decisions for Kia (answer once)

For Ben to put in front of Kia. Each line has my recommended default, and what it does to ranking. Until Kia answers, the live site uses the "Live now" column. Nothing below has been guessed into a new page: pages that depend on a decision are written so the answer can be swapped in one place (site settings in `/cms`).

Source: CONTENT-NOTES.md section 1, plus new questions from the ranking work.

## A. Blocks ranking: answer first

| # | Question | Live now | Recommended default | Effect on ranking |
|---|---|---|---|---|
| 1 | **Canonical phone number** | (786) 460-1311 everywhere | Keep (786) 460-1311. Use tracked numbers only for ads, never in schema | Google matches the site phone against the Google Business Profile and directories. A different number on the profile, in schema or in old listings splits trust signals. The old site used (703) 775-1397 and (571) 370-9191, so old listings probably still show them: update or remove these. |
| 2 | **Office location** | 1000 Brickell Ave Ste 715, Miami FL 33131 | Miami only. Change the Google Business Profile and about 40 directory listings (Yelp Fairfax and others) from Fairfax to Miami | The biggest local-ranking factor we control. If the profile says Fairfax and the site says Miami, neither ranks well. If TTR keeps a real, staffed Fairfax office, say so and we build both as separate locations. |
| 3 | **Service area and target markets** | "United States" in schema, Miami in the footer | Primary: Miami and South Florida. Secondary: remote work for any US local business. Drop D.C. and Virginia as a focus unless Kia wants to keep serving it | Decides which city pages we build. Local pages for a city with no office and no clients read as doorway pages and can hurt. The old 78 pages were this mistake. |
| 4 | **Home page and Local SEO title with "Miami"** | No city in titles | Yes. "Miami Digital Marketing Agency ..." in the home title and the SEO service title | The head term "digital marketing agency Miami" is the single highest-value local query for TTR. Needs decision 2 first. |
| 5 | **Partner badges** (Google Partner, Meta Business Partner, BBB, GSA, ISO) | All hidden | Keep hidden. Show Google Partner, Meta Business Partner and BBB only with a screenshot or listing link proving each is current. Drop GSA, ISO, IACRB and SOC for good | A false badge is a trust and legal risk, and an AI search tool that cannot verify it will not repeat it. A proven badge helps conversion, not rankings. |
| 6 | **Kia's title** | Not shown | "Kia Khamoushi, Founder" on pages, and "Founder and Chief Business Development Officer" only on the About page | Person schema, bylines and the About page need one consistent title. Search and AI tools cross-check it against LinkedIn. |
| 7 | **Business email** | ttrdigitalmarketingteam@gmail.com | A domain address such as hello@ttrdigitalmarketing.com | A Gmail address on a business site weakens trust and email deliverability. Not a ranking factor on its own. |
| 8 | **Hours** | Mon to Fri, 9 AM to 5 PM | Keep | Must match the Google Business Profile exactly. |

## B. Proof we may publish

| # | Question | Recommended default | Effect |
|---|---|---|---|
| 9 | **Who do the 411% organic traffic and 688% more top-10 keywords belong to?** The old site printed them next to two testimonials without naming the client | Confirm the client, the time frame and the data source (Search Console or TTR OS). Publish as a case study only with client permission | Real, named, provable results are the strongest content a service business can have and the thing AI tools quote. Unnamed percentages are not a claim we can defend. |
| 10 | **Permission to name clients and show logos** | Ask the 3 to 5 best-known clients, in writing | Case study pages and client logos are the proof pages in the rank plan. Without permission they are anonymous ("a Miami dental practice"). |
| 11 | **The unnamed second testimonial** | Get a name, role and company, or remove | An unattributed quote is ignored by search and AI tools. |
| 12 | **Google rating and review count** | Pull from the Google Business Profile after decision 2, and show only real numbers | Review count and recency are a top local-pack factor. If the count is small, a plan to ask recent clients for reviews is worth more than any page. |
| 13 | **Which results from TTR OS can we prove?** | Ben pulls 3 to 5 clients with before and after numbers (calls, leads, booked jobs, rankings) and the date range | Every case study and every "results" block depends on this. I will not write a number that is not on that list. |

## C. Content and structure

| # | Question | Recommended default | Effect |
|---|---|---|---|
| 14 | **Blog author** (posts say "TTR Digital") | Kia, with bio, photo and LinkedIn | A named expert author is a quality signal for Google and AI answers. Kia's 10+ years in IT plus SEO for law, dental and real estate is the story. |
| 15 | **Higher-resolution headshot of Kia** (current one is 212 px) | 800x800 or larger | Needed for bylines and Person schema. |
| 16 | **Industries to build first** | Dental and home services (live), then law firms and real estate (first batch), then HVAC, plumbing, roofing, orthodontists, personal injury | These are Kia's strongest backgrounds. Confirm there is client experience in each, because the pages claim "we work with". |
| 17 | **Pricing and contract terms** | No prices. State the real contract terms (month to month or minimum, notice period) | Answers a top question buyers ask and a common AI-answer topic ("how much does SEO cost in Miami"). We can publish ranges only if Kia gives them. |
| 18 | **Service slugs and old 301s** | Keep current slugs. Send the three old Miami URLs to the new Miami pages | Keeps link value from the only old pages that match a market TTR serves. |
| 19 | **Referral program page** (old "$750 per referral") | Keep the 301 to /contact unless the program still runs | A live paid-referral offer can be a conversion path. Not a ranking matter. |
| 20 | **Legal text** (privacy, terms) still marked starter text | Lawyer review before more pages go live | Not a ranking factor, a risk item. |

## D. Access Ben needs to give

- Google Search Console (domain property) and GA4 read access.
- Google Business Profile read access.
- TTR OS read access for the proven results list (decision 13).
- Sanity write token as an environment secret for the person who publishes new posts (never in the repo).
