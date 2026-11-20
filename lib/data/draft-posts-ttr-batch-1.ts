import type { Post } from "@/lib/blog";
import { toBlocks } from "@/lib/data/markdown-blocks";

/*
 * TTR content batch 1 (TTR-2487, subtask TTR-2489): preview-only drafts for Kia's review.
 * They are listed in previewPosts (lib/data/code-posts.ts), so they show only on Vercel previews and never on the live site.
 * To publish one after Kia approves it, move its entry to publishedPosts and set its publishedAt to the go-live date.
 *
 * Writing rules: facts only, each one linked to its source; no promised results or rankings; no client names or numbers;
 * plain words; no em dashes.
 */

const AUTHOR: Post["author"] = { name: "Kia Khamoushi", role: "Founder and Chief Business Development Officer", bio: null, slug: null };

const AI_ANSWERS = `
There is no secret switch that puts your business in ChatGPT or in Google's AI answers. Google says there are no extra requirements to appear in AI Overviews or AI Mode, and OpenAI says any public website can appear in ChatGPT search. What these tools can find and trust about you comes from the same places customers look: your website, your Google Business Profile and what other sites say about you.

## How do AI answers pick which local businesses to mention?

AI tools answer a question by reading pages they can reach, then writing a short summary with links. Google says its AI features draw on the same Search systems and the same SEO best practices as regular results ([Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)). In Google's words, there are "no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary."

That means the work that helps you in Google search also helps you in AI answers. A page that clearly says what you do, where you do it and why someone should trust you is easier to quote than a page that says none of those things.

## Do I need a special file or code for AI search?

No. Google's guide to generative AI search says you do not need to create new machine readable files, AI text files, special markup or Markdown versions of your pages to appear ([Google: Optimizing for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). Be careful with anyone who sells an "AI file" as the fix.

What you do need is for the right bots to be allowed in:

- **Google.** Google lists making sure crawling is allowed in your robots.txt file and by your hosting or CDN as a basic step ([Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)).
- **ChatGPT.** OpenAI uses a crawler called OAI-SearchBot for ChatGPT search and recommends allowing it in robots.txt so your site can show in search results. It notes that changes can take about 24 hours to take effect ([OpenAI: Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots)).
- **Training is a separate choice.** OpenAI's GPTBot crawler is the one used for training. Blocking GPTBot is a different decision from blocking OAI-SearchBot ([OpenAI: Publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)).

Some website security tools block bots by default. It is worth asking whoever runs your website to check.

## What should my website say so AI tools understand my business?

Write for the person asking the question, and the AI tools follow. For a local business, that usually means:

- **One clear page per main service**, saying what the service is, who it is for and which towns or neighborhoods you cover.
- **Your business name, address and phone number** written the same way on every page and in your Google Business Profile.
- **Plain answers to the questions customers ask on the phone**, such as how long a job takes, what to expect at a first visit or what happens in an emergency. A short FAQ section works well.
- **Proof a stranger can check**, such as real reviews, licenses, years in business and photos of your own work or team.

Google also asks that structured data match what people can see on the page ([Google: Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)). Markup is a helper, not a substitute for clear words on the page.

## Why does my Google Business Profile matter for AI answers?

For "near me" questions, Google's own local results come from Business Profiles. Google says local results are based mainly on relevance, distance and prominence, and that prominence includes information from across the web, like links, articles and directories, plus your review count and rating ([Google: How to improve your local ranking](https://support.google.com/business/answer/7091)).

So a complete, accurate profile with steady reviews does double duty. Google also says there is no way to request or pay for a better local ranking.

## Can I pay to be recommended by ChatGPT or Google's AI?

Not in the regular answers. Google says you cannot pay for a better local ranking ([Google: How to improve your local ranking](https://support.google.com/business/answer/7091)). Ads can appear near AI results on some platforms, but those are labeled as ads and are separate from the answer itself. Anyone who promises a guaranteed spot in AI answers is promising something no one controls.

## How do I know if AI search is sending me customers?

Google says traffic from AI features is included in your overall Search performance data in Search Console, though it is not shown as a separate line ([Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)). Visits from ChatGPT often show up in Google Analytics as referral traffic from chatgpt.com. The simplest check of all: ask new customers how they found you, and write it down.

If you want help with this, our [Search Everywhere Optimization](/services/search-everywhere-optimization) service covers Google, Maps and AI answers together, and our [local SEO](/services/seo) work covers the website side.

## Frequently asked questions

### Is AI search optimization different from SEO?

Mostly no. Google says the same SEO best practices apply to its AI features. The difference is that clear, direct answers to real questions matter even more, because AI tools quote short passages.

### Should I block AI bots from my website?

That is your choice, but blocking OAI-SearchBot means ChatGPT search cannot read your pages to show them. If you do not want your content used for training, OpenAI says to block GPTBot instead, which is a separate crawler.

### Do I need an llms.txt file?

Google says you do not need AI text files to appear in its generative AI features. It does no harm to have one, but it is not a requirement for Google.

### How long until AI tools mention my business?

There is no set timeline and no guarantee. OpenAI notes that robots.txt changes take about a day to register, but being mentioned depends on what the tools find about you across the web, which builds over time.

### Does my Google Business Profile affect AI answers?

For local questions, Google's results lean on Business Profiles, and Google lists reviews and information from across the web as part of prominence. Keeping your profile complete and accurate is one of the most useful things you can do.

## Sources

- [Google: AI features and your website](https://developers.google.com/search/docs/appearance/ai-features)
- [Google: Optimizing your website for generative AI features on Google Search](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: How to improve your local ranking on Google](https://support.google.com/business/answer/7091)
- [Google: Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [OpenAI: Overview of OpenAI crawlers](https://developers.openai.com/api/docs/bots)
- [OpenAI: Publishers and developers FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)
`;

const GBP_FOR_DENTISTS = `
For a dental practice, the Google Business Profile is often the first thing a new patient sees, before the website. Getting the basics right is mostly about accuracy: the right name, category, hours and photos, steady honest reviews, and replies that never reveal anything about a patient.

## What decides where a dental practice shows up on Google Maps?

Google says local results are based mainly on three things ([Google: How to improve your local ranking](https://support.google.com/business/answer/7091)):

- **Relevance:** how well your profile matches what someone searched for. Complete, detailed information helps Google match you to searches like "emergency dentist" or "dental implants."
- **Distance:** how far you are from the searcher, or from the place named in the search. You cannot change this one.
- **Prominence:** how well known your practice is, including links, articles and directories across the web, and your Google review count and rating.

Google also states that there is no way to request or pay for a better local ranking.

## What should a dental practice fill in first?

Start with the fields that affect relevance and trust:

- **Business name:** your real practice name, as it appears on your sign, website and stationery. Google's guidelines do not allow extra keywords or locations stuffed into the name ([Google: Guidelines for representing your business](https://support.google.com/business/answer/3038177)).
- **Primary category:** the one that best describes the practice as a whole, such as "Dentist" or a specialty like "Orthodontist." Add secondary categories only for things you really offer.
- **Hours:** regular hours plus holiday and special hours, so patients do not drive to a closed office.
- **Services:** list the treatments you provide, in the words patients use.
- **Website link:** point it to your home page or the page for that office, not a generic page.
- **Photos:** your real office, team and front door. Patients like to see where they are going.

## Should each dentist in the practice have their own profile?

Google allows separate profiles for individual practitioners, such as doctors and dentists, who are public facing within their practice ([Google: Guidelines for representing your business](https://support.google.com/business/answer/3038177)). Support staff do not qualify. For a solo practice, Google's guidelines suggest one profile that combines the practice name and the practitioner's name, rather than two profiles that compete with each other.

Before creating practitioner profiles, agree who controls each one. If a dentist leaves, the person who manages the profile decides what happens to it.

## How should a dental practice ask for reviews?

Ask every patient, in the same way, at the same point in the visit. Google's rules for contributed content prohibit offering incentives, such as discounts or free services, in exchange for a review, or for changing or removing a negative one ([Google: Prohibited and restricted content](https://support.google.com/contributionpolicy/answer/7400114)). Google also does not allow businesses to discourage negative reviews or to only ask patients who seem happy.

Simple ways to ask that stay within the rules:

- A short text or email after the visit with your review link.
- A small card at the front desk with a QR code to the review form.
- Training the front desk to mention it at checkout for every patient.

## How do you reply to reviews without breaking HIPAA?

This is where dental practices get into real trouble. The U.S. Department of Health and Human Services has taken action against dental practices that disclosed patient information while replying to online reviews. In one case announced in December 2022, a practice paid $23,000 after its replies included patient names, treatment and insurance details ([HHS: settlement with a dental practice over disclosures in online review replies](https://www.hhs.gov/about/news/2022/12/14/hhs-civil-rights-office-enters-settlement-with-dental-practice-over-disclosures-of-patients-protected-health-information.html)).

Safe habits for every reply:

- Never confirm that the reviewer is a patient, even if they say so themselves.
- Never mention treatment, appointments, insurance, costs or anything from the chart.
- Thank people for feedback in general terms, and invite them to call the office to talk privately.
- Use the same short, careful template for negative reviews, and have one trained person approve them.

## How often should a dental practice update its profile?

Check it at least once a month. Update hours before every holiday, add new photos when the office or team changes, and answer questions people post on the profile. Google lets anyone suggest edits to a profile, so a monthly check also catches changes you did not make.

If you would like help, our [dental marketing](/dental-marketing) page explains how TTR handles Google Business Profiles, local SEO and reviews for practices, and our [local SEO](/services/seo) page covers the work in more detail.

## Frequently asked questions

### Can I add "best dentist" or my city to my business name on Google?

No. Google's guidelines say your name should match your real-world name, as on your signage. Adding keywords or locations that are not part of your real name breaks the guidelines and can get the profile suspended.

### Can I offer a discount to patients who leave a review?

No. Google prohibits incentives in exchange for reviews. Ask every patient the same way instead, with no reward attached.

### Can I reply to a negative review that tells only half the story?

You can reply, but do not confirm the person is a patient or discuss their care. HHS has penalized practices for disclosing patient information in review replies. Keep it general and invite them to call the office.

### Should every dentist in my practice have a profile?

Google allows profiles for public facing practitioners. Whether it helps depends on how your practice is set up. A solo practice is usually better with one combined profile.

### Does posting on my Google Business Profile help?

Posts let you share news, offers and updates where patients already look. Google does not say posts change rankings, so treat them as a way to inform patients, not as a ranking trick.

## Sources

- [Google: How to improve your local ranking on Google](https://support.google.com/business/answer/7091)
- [Google: Guidelines for representing your business on Google](https://support.google.com/business/answer/3038177)
- [Google: Prohibited and restricted content (Maps user contributed content)](https://support.google.com/contributionpolicy/answer/7400114)
- [HHS: Civil rights office enters settlement with dental practice over disclosures of patients' protected health information (Dec 14, 2022)](https://www.hhs.gov/about/news/2022/12/14/hhs-civil-rights-office-enters-settlement-with-dental-practice-over-disclosures-of-patients-protected-health-information.html)
`;

const ADS_VS_SEO = `
Google Ads and SEO are not competitors. Ads put you in front of searchers today, for as long as you keep paying. SEO builds a presence in the free results and on Google Maps that keeps working when you are not paying per click, but it takes longer to build. Most home service companies end up using both, and the right starting point depends on how soon you need calls and how much you can spend.

## What is the difference between Google Ads and SEO?

**Google Ads** shows a text ad for the searches you choose. With cost per click bidding, you pay "for each click on your ads" ([Google: Cost-per-click](https://support.google.com/google-ads/answer/116495?hl=en)). Ads are labeled as sponsored, and when the budget stops, the ads stop.

**SEO** (search engine optimization) is the work that helps your website and Google Business Profile show up in the free results and on the map. You do not pay Google for those spots. Google says there is no way to request or pay for a better local ranking ([Google: How to improve your local ranking](https://support.google.com/business/answer/7091)), so you earn them with a useful website, an accurate profile and a good reputation.

## How fast does each one work?

Ads can start showing as soon as a campaign is approved, which makes them the faster way to test which jobs and areas bring calls.

SEO is slower. Google's own page for business owners thinking about hiring an SEO says it typically takes from four months to a year from the time you begin making changes until you start to see the benefits ([Google: Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)). That is not a guarantee in either direction. It depends on your market, your competitors and the state of your website when you start.

## What does each one cost?

With ads, you control a daily budget, and every click costs money whether or not it becomes a job. What a click is worth depends on what happens next: whether your landing page answers the question, shows the phone number and makes it easy to book.

With SEO, you pay for the work, not for each visit. The work includes your service pages, your Google Business Profile, reviews and technical fixes. The cost does not grow with every visitor, but the payoff takes longer to arrive and is not guaranteed.

## When should a home service company start with Google Ads?

Ads tend to make sense first when:

- You need calls this month, for example a new company or a new service area.
- You want to push specific jobs, such as emergency repairs or replacements, over routine work.
- You need to learn which searches turn into booked jobs before investing in pages for them.
- Your website is new and has little history with Google.

If you are in a category Google covers, also look at Local Services Ads, which charge per lead instead of per click. We compare the two in [Local Services Ads vs Google Ads](/blog/local-services-ads-vs-google-ads).

## When should a home service company focus on SEO?

SEO tends to pay off when:

- You plan to serve the same area for years, so long term visibility is worth building.
- You want calls from the map results, where customers compare ratings and reviews.
- Your ad costs keep rising and you want a second source of calls that does not stop when the budget does.
- You already have reviews and real work to show, which give Google and customers reasons to trust you.

## Can I use Google Ads and SEO together?

Yes, and they help each other. Ads show you which searches and services bring booked jobs, which tells you which pages to build for SEO. A strong service page helps both: it gives the free results something worth showing, and it gives your ad clicks a better place to land.

Whatever you choose, track where every call and form comes from, so you can compare the cost of a booked job from each channel instead of guessing.

Our [Google Ads management](/services/google-ads) and [local SEO](/services/seo) pages explain how TTR runs each one, and our [home services marketing](/home-services-marketing) page shows how they fit together.

## Frequently asked questions

### Is SEO free?

The clicks are free, the work is not. You pay in time or in an agency's fee for the pages, profile updates, reviews and fixes that earn the free spots.

### Do Google Ads help my SEO rankings?

No. Paying for ads does not change your free rankings. Google says you cannot pay for a better local ranking. Ads do give you data about which searches bring jobs, which can guide your SEO work.

### How long does SEO take for a home service business?

Google says it typically takes four months to a year from the time you begin making changes until you start to see the benefits. Some changes, like fixing a broken Business Profile, can matter sooner, but there is no guaranteed timeline.

### What happens if I stop running ads?

Your ads stop showing, and the calls from them stop with them. That is why many companies build SEO alongside ads, so they are not relying on one source.

### Which should I start with if my budget is small?

If you need calls now, a small, tightly focused search campaign for your most profitable job is a common start. If you can wait, putting the money into your Google Business Profile, reviews and one strong service page builds something that lasts.

## Sources

- [Google: Cost-per-click (CPC) definition](https://support.google.com/google-ads/answer/116495?hl=en)
- [Google: How to improve your local ranking on Google](https://support.google.com/business/answer/7091)
- [Google: Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)
`;

const LOCAL_LANDING_PAGE = `
A good local landing page answers three questions in the first few seconds: do you do the job I need, do you do it where I live, and how do I reach you. Everything else on the page, from reviews to photos to FAQs, is there to make the visitor trust that answer enough to call.

## What is a local landing page?

A local landing page is a page built for one service in one area, such as "water heater repair in your city" or "dental implants at your office." It is where people land from an ad, from Google search or from your Google Business Profile. Because it is focused on one thing, it can answer one person's question better than a general home page can.

## What should be at the top of the page?

The top of the page, before anyone scrolls, should say:

- **The service**, in the words customers use, as the main heading.
- **The area you serve**, named plainly: the city, county or neighborhoods.
- **A phone number that dials on a tap**, and one clear button, such as "Book a visit" or "Get a quote."
- **One reason to trust you**, such as your Google rating, years in business or a license number.

Google's advice for ad landing pages points the same way: choose a page that closely matches your ad and keywords, and make it clearly organized and easy to navigate ([Google Ads: Optimize your ads and landing pages](https://support.google.com/google-ads/answer/6238826)).

## What content builds trust on a local page?

Google recommends useful, original information about what you offer, and gives reviews from real customers as one example ([Google Ads: Optimize your ads and landing pages](https://support.google.com/google-ads/answer/6238826)). For a local business, that usually means:

- **Real reviews** from real customers, with first names or initials if they agreed to it.
- **Photos of your own work, team and trucks or office**, not stock photos.
- **What happens next**, step by step: the call, the visit, the quote, the job.
- **Licenses, insurance and guarantees** you actually offer, stated plainly.
- **Answers to common questions**, like how soon you can come out or what a first visit includes.

Avoid claims you cannot back up. "Best in town" means little to a reader. A rating, a license number or a clear warranty means more.

## How should the page work on a phone?

Most local searches happen on phones, often in a hurry. Google's Ads help suggests checking your site's mobile friendliness and speed, with simple navigation and easy ways to contact you ([Google Ads: Optimize your ads and landing pages](https://support.google.com/google-ads/answer/6238826)).

- Keep the phone number and main button visible without hunting for them.
- Keep forms short. Ask only what you need to call someone back.
- Use text large enough to read without zooming.
- Make sure the page loads quickly on a normal mobile connection. Large images are the usual reason pages are slow.

## Does a local landing page need special code?

It helps, but it is not the main thing. Google supports LocalBusiness structured data, which can tell search engines your business hours, address and other details ([Google: Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)). Google asks that markup match what is visible on the page, and it only helps if the page itself is clear.

Also make sure your business name, address and phone number match your Google Business Profile exactly. Mismatched details make it harder for people and search engines to be sure they have the right business.

## How many landing pages does a local business need?

Start with one page for each main service you want more of, and add area pages only where you can say something real about that area, such as jobs you have done there or details of how you serve it. Pages that are copies of each other with only the town name swapped do little for readers.

## How do you know if a landing page is working?

Track the calls and forms that come from the page. Count booked jobs or appointments, not only clicks. If a page gets visits but no calls, look at the top of the page first: the heading, the phone number and the button.

Our [website design](/services/website-design) service builds local pages like these, and our [Google Ads management](/services/google-ads) uses them so ad clicks land somewhere that makes calling easy.

## Frequently asked questions

### Can my home page work as my landing page?

It can, but a home page has to talk about everything you do. A page for one service in one area matches what a searcher asked for more closely, which helps both visitors and ads.

### How long should a local landing page be?

Long enough to answer the questions a customer asks before calling, and no longer. Put the essentials at the top, and the details, reviews and FAQs further down for people who want them.

### Should I put prices on my landing page?

Only if you can state them accurately. Many service businesses explain what affects the price and how to get a quote instead.

### Do I need a separate page for every town I serve?

No. Build area pages only where you have something specific and true to say. Near duplicate pages with only the town name changed are not useful to readers.

### What is the most common mistake on local landing pages?

A page that never clearly says what the business does and where. If a visitor cannot tell within a few seconds, they go back to Google and call someone else.

## Sources

- [Google Ads: Optimize your ads and landing pages](https://support.google.com/google-ads/answer/6238826)
- [Google: Local business (LocalBusiness) structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
`;

const words = (md: string) => md.split(/\s+/).filter(Boolean).length;
const minutes = (md: string) => Math.max(1, Math.round(words(md) / 225));

type Draft = Omit<Post, "body" | "readingMinutes" | "author" | "cover" | "updatedAt"> & { md: string };

const draft = ({ md, ...p }: Draft): Post => ({
  ...p,
  updatedAt: p.publishedAt,
  readingMinutes: minutes(md),
  cover: null,
  body: toBlocks(md),
  author: AUTHOR,
});

/** Batch 1 drafts, newest first. Preview only until Kia approves each one. */
export const ttrBatch1Drafts: Post[] = [
  draft({
    slug: "get-your-business-in-chatgpt-and-google-ai-answers",
    title: "How a Local Business Shows Up in ChatGPT and Google AI Answers",
    excerpt:
      "There is no special file or trick for AI answers. What Google and OpenAI actually say about being found in AI Overviews, AI Mode and ChatGPT search, and what a local business can do about it.",
    publishedAt: "2026-11-20T12:00:00Z",
    categories: [{ title: "AI search", slug: "ai-search" }],
    md: AI_ANSWERS,
    seo: {
      title: "How to Show Up in ChatGPT and Google AI Answers | TTR Digital",
      description:
        "What Google and OpenAI say about appearing in AI Overviews, AI Mode and ChatGPT search, and the practical steps a local business can take, with sources.",
    },
    relatedServices: ["search-everywhere-optimization", "seo"],
  }),
  draft({
    slug: "google-business-profile-for-dentists",
    title: "Google Business Profile Basics for Dental Practices",
    excerpt:
      "How Google ranks practices on the map, what to fill in first, practitioner profiles, asking for reviews within Google's rules, and replying to reviews without breaking HIPAA.",
    publishedAt: "2026-11-20T11:00:00Z",
    categories: [{ title: "Local marketing", slug: "local-marketing" }],
    md: GBP_FOR_DENTISTS,
    seo: {
      title: "Google Business Profile for Dentists: The Basics | TTR Digital",
      description:
        "A plain guide for dental practices: how Google ranks the map, which fields matter, practitioner profiles, review rules and HIPAA-safe review replies.",
    },
    relatedServices: ["seo", "search-everywhere-optimization"],
  }),
  draft({
    slug: "google-ads-vs-seo-for-home-service-companies",
    title: "Google Ads vs SEO for Home Service Companies",
    excerpt:
      "Ads bring calls while you pay; SEO builds free visibility that takes months. How each one works, what each costs, and when a home service company should start with one or the other.",
    publishedAt: "2026-11-20T10:00:00Z",
    categories: [{ title: "Local marketing", slug: "local-marketing" }],
    md: ADS_VS_SEO,
    seo: {
      title: "Google Ads vs SEO for Home Service Companies | TTR Digital",
      description:
        "How Google Ads and SEO differ in speed, cost and control, and how a home service company can decide which to start with, or how to run both.",
    },
    relatedServices: ["google-ads", "seo"],
  }),
  draft({
    slug: "local-landing-page-checklist",
    title: "What a Good Local Landing Page Needs",
    excerpt:
      "A local landing page has seconds to show the service, the area and how to reach you. A plain checklist for the top of the page, trust, mobile, code and tracking.",
    publishedAt: "2026-11-20T09:00:00Z",
    categories: [{ title: "Websites", slug: "websites" }],
    md: LOCAL_LANDING_PAGE,
    seo: {
      title: "Local Landing Page Checklist for Service Businesses | TTR Digital",
      description:
        "What a local landing page needs to turn visitors into calls: a clear heading, service area, tap-to-call, real reviews, a fast mobile page and tracking.",
    },
    relatedServices: ["website-design", "google-ads"],
  }),
];
