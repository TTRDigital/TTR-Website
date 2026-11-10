# Claims audit (TTR-1454)

Date: November 10, 2026. Scope: copy in this repo (home, services, industries, About, Contact, schema, `llms.txt`) and the Sanity fields that override it (home stats, SEO service proof stats, testimonials, site settings, badges). **Not audited:** the bodies of the three blog posts in Sanity (they need a read-through).

Proof source used: the TTR OS provable-results list (TTR OS PR #619, `docs/ttr-1454/provable-results.md`, pasted by Ivy). It covers four anonymous clients and weekly rank checks since 2026-10-26 only. **Nothing on the public site is currently backed by it**, and no number from it is published. Status key: **Unproven** (not in TTR OS or the list), **Client's own words** (needs permission), **Opinion** (general statement, not a claim about TTR), **OK** (no proof needed).

## A. Numbers and results

| # | Claim | Where | Status | Recommendation |
|---|---|---|---|---|
| 1 | "411% more organic traffic, year over year" | Home Results, `/services/seo` proof, Sanity testimonial stats | **Unproven.** Not in any TTR OS row; owner unknown | **Hidden by PR #30** (one flag to restore) until Kia says whose it is and shows the source |
| 2 | "688% more keywords in Google's top 10" | Same places | **Unproven** | Hidden by PR #30 |
| 3 | "10 to 15 cases a day for one client, up from 2" (Displays & Holders, Chris Aaron) | Home stats and case card, testimonials, `/services/seo` | **Client's own words.** Displays & Holders is not one of the four clients in the list | Keep only with written permission to name the client and quote. Rename the case card text to show it is a quote, not a measured result |
| 4 | "Real numbers from real clients." (Results heading) | Home | Misleading while the two measured numbers are hidden | Retitle to "Results" until proof pages exist |
| 5 | Video testimonial, "Why Dr. Medi Adili trusts TTR with dental marketing" | Home Results | **Client's own words.** Dr. Adili is not identified in the list | Confirm written permission and that he is a current client |
| 6 | Unnamed testimonial "They are professional. They are quick..." | Testimonials | **Unproven** (no author) | Add name, role and permission, or remove (decision 11) |
| 7 | "Trusted by local businesses" | Home heading (logo row, hidden while there are no logos) | **Unproven** | Do not show until there are logos with permission |

## B. Facts about TTR

| # | Claim | Where | Status | Recommendation |
|---|---|---|---|---|
| 8 | "Since 2015" / founded 2015 | Home hero and stats, About, About meta description, `foundingDate` in schema | **Unproven** in TTR OS. Taken from the old WordPress schema | Kia confirms the year (registration date). If it is the business start, say "since 2015" only if true |
| 9 | Kia spent "more than a decade" running an IT company; "10+ years" | About | **Unproven** (from the old About page) | Kia confirms |
| 10 | "Reply within 1 business day to every audit request" | About card, Contact meta and body | **Unproven** operational promise | Confirm, then measure reply times in GoHighLevel. If not met, soften to "we reply fast" |
| 11 | "100% campaign transparency" | About | Absolute wording, **unproven** | Soften to "You see what we do and what it brought in" |
| 12 | "Free 30-minute audit call, no obligation, no sales pitches" | Contact, FAQs | **Unproven** | Kia confirms the call length and that it stays free |
| 13 | Clients own their ad accounts, website and data | FAQs, `llms.txt` | **Unproven** | Check against contract terms (flagged in CONTENT-NOTES) |
| 14 | Office at 1000 Brickell Ave Ste 715, Miami; hours Mon to Fri 9 to 5 | Footer, schema, `llms.txt` | **Unproven** (decisions 2 and 6) | Kia confirms; match the Google Business Profile |
| 15 | AI agents "24/7" | Services, `llms.txt` | A capability claim, true only per client setup | Keep "after hours" wording, drop "24/7" unless every setup runs that way |

## C. Who we work with

| # | Claim | Where | Status | Recommendation |
|---|---|---|---|---|
| 16 | "Many of our clients run Google Ads at the same time", "Many clients run both" | SEO, Google Ads pages | **Unproven** ("many") | Ask Ivy for the count of clients with both; otherwise say "some" or remove |
| 17 | We help HVAC, plumbing, roofing and other home service companies | Home services page, home, `llms.txt` | **Unproven.** The list has no home services client | Confirm real home services clients, or reword as "we build campaigns for" |
| 18 | "I have built SEO for law firms" | New `/law-firm-marketing` (draft PR #27) | **Unproven.** The list has no law firm. Source is Kia's old bio | Kia confirms, or remove the sentence before go-live |
| 19 | "I have built SEO for dental practices" | New `/miami-dental-marketing`, `/dental-marketing` | Supported in part: the list has 2 dental clients (McLean VA, Royal Palm Beach FL). Neither is in Miami | Fine as worded; do not imply Miami clients |
| 20 | Real estate | New `/real-estate-marketing` | One Miami real estate investment firm in the list; the page is about agents and brokers | Confirm experience with agents and brokerages |

## D. Statements about results timing and AI

| # | Claim | Where | Status | Recommendation |
|---|---|---|---|---|
| 21 | "Most businesses see movement within the first few months" | SEO page, home FAQ | **Unproven.** TTR OS has days of data, not months | Replace with "It depends on your market and where you start. We explain what to expect on the audit call" |
| 22 | Meta Ads "often within the first couple of weeks after launch" | Meta Ads FAQ | **Unproven** | Same softening |
| 23 | AI tools "lean on reviews and mentions heavily", "favor clear pages and recent reviews" | Search Everywhere Optimization | **Opinion** with no source | Soften to "can lean on" or cite a source. Never imply a guaranteed AI mention |
| 24 | "Make your business the clear, trusted answer" in ChatGPT, Gemini and Perplexity | Home | Outcome language | Keep as an aim ("we work to"), never as a promise |

## E. Already compliant

- No ranking guarantees anywhere; FAQs say so plainly.
- No partner badges shown (Google Partner, Meta Business Partner, BBB stay switched off in Sanity), no Google rating, review count or client count (all empty, hidden).
- No `AggregateRating` or `Review` schema.
- The old unverified claims ("thousands of clients", "five-star rated", ISO, GSA and similar) are not on the site.
- Example mockups are labelled "Example view" and use made-up searches.

## F. Rules for every future page
Publish a number only if it is in the provable-results list with keyword, dates and source. Label branded keywords. Show rank changes as days or weeks. No traffic, lead or revenue claim from Search Console that the data does not show (the four clients' 28-day totals are flat or down). No client named without written permission. Kia approves before anything goes live.
