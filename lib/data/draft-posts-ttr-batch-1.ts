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

const HOW_LONG_SEO = `
SEO usually takes months, not weeks. Google's own guidance for business owners says it typically takes from four months to a year from the time you begin making changes until you start to see the benefits. How long it takes for your business depends on where your website and Google Business Profile start, how many competitors you have and how much work goes in.

## How long does SEO take, according to Google?

Google's page for business owners thinking about hiring an SEO says results take time, "typically from four months to a year from the time you begin making changes until you start to see the benefits" ([Google: Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)). That range comes from Google itself, so be wary of anyone who promises much faster results.

## Why does SEO take so long?

A few steps happen before any change can help you:

- **Google has to find and read your pages again.** Google says crawling "can take anywhere from a few days to a few weeks," and that it cannot predict or guarantee when, or if, a page will be crawled or indexed ([Google: Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)).
- **Google has to compare you with everyone else.** Your pages are weighed against other businesses that want the same searches. In a busy market, that takes longer.
- **Trust builds slowly.** For local results, Google lists prominence as a factor, including reviews and what other sites say about you ([Google: How to improve your local ranking](https://support.google.com/business/answer/7091)). Reviews and mentions grow over months, not days.

## What can move faster?

Some fixes can matter sooner than the full four months to a year, though nothing is guaranteed:

- **Fixing a Google Business Profile** with the wrong category, hours, phone number or address.
- **Removing technical blocks**, such as pages accidentally hidden from Google.
- **Adding a page for a service you offer but never mentioned** on your website.
- **Asking every customer for a review**, so your profile shows steady, recent feedback.

## What slows SEO down?

- A brand new domain with little history.
- A website that changes its addresses (URLs) without redirecting the old ones.
- Pages that are near copies of each other, with only the town name changed.
- Different business names, addresses or phone numbers across the web.
- Stopping and starting the work, so nothing builds on the last month.

## How do I know if SEO is working before rankings move?

Look for signs that come before calls:

- **In Google Search Console:** more of your pages indexed, and more impressions (times you appeared) for searches about your services.
- **In your Google Business Profile:** more views, calls, website clicks and direction requests over time.
- **In your phone and forms:** calls and form leads that came from Google search or Maps, which you can only see if you track them.

Ask for these numbers every month, along with what work was done. Our guide on [tracking calls and form leads](/blog/track-calls-and-form-leads) explains how to set that up.

## Should I run ads while SEO builds?

Many businesses do, because ads can bring calls while SEO is still building. We compare the two in [Google Ads vs SEO for home service companies](/blog/google-ads-vs-seo-for-home-service-companies). Our [local SEO](/services/seo) page explains how TTR plans the work month by month.

## Frequently asked questions

### Can anyone guarantee first place on Google?

No. Google says no one can guarantee a number one ranking on Google ([Google: Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)). Treat a guarantee as a warning sign.

### How long does it take Google to see a new page?

Google says crawling can take from a few days to a few weeks, and it cannot guarantee when or if a page will be indexed. You can ask Google to recrawl a page in Search Console, but that does not make it rank.

### Is local SEO faster than regular SEO?

It can feel faster for some fixes, like correcting a Business Profile, but the same Google range of four months to a year is a fair guide for lasting results.

### What happens if I stop SEO?

The work already done, such as pages and reviews, stays. But competitors keep working, so standing still can mean slipping back over time.

### How often should I hear from my SEO provider?

At least monthly, with what was done and what changed in Search Console, your Business Profile and your leads.

## Sources

- [Google: Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)
- [Google: Ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
- [Google: How to improve your local ranking on Google](https://support.google.com/business/answer/7091)
`;

const TRACK_LEADS = `
If you cannot say where your last ten booked jobs or new patients came from, you cannot tell which marketing is worth the money. Tracking calls and form leads means three things: knowing which channel each lead came from, counting the leads that matter, and checking which of them became real customers.

## Why track calls and form leads at all?

Clicks and visits are easy to count, but they do not pay the bills. A local business needs to know which ads, pages and profiles bring calls and forms, and which of those turn into booked work. Without that, every budget decision is a guess.

## How do you track calls from Google Ads?

Google Ads has call reporting built in. When it is on, Google shows a Google forwarding number in your call ads and call assets and records details such as call length, start time and whether the call connected ([Google Ads: About call reporting](https://support.google.com/google-ads/answer/2454052)).

You can then count calls as conversions. You choose a minimum call length, and every call that lasts at least that long is counted ([Google Ads: About phone call conversion tracking](https://support.google.com/google-ads/answer/6100664)). Pick a length that separates real inquiries from wrong numbers.

Google notes that forwarding numbers belong to Google and can change, so they should not be copied and used outside Google Ads ([Google Ads: Google forwarding number](https://support.google.com/google-ads/answer/2382961)).

## How do you track calls from your website and other channels?

For calls that start on your website, from social media or from print, businesses often use a call tracking service that shows a different number for each source. Things to check before choosing one:

- The number shown on the website should switch back to your main number for anyone who arrives directly.
- Your main business number should stay the same on your Google Business Profile and in directories, so your details match everywhere.
- Calls should be recorded only where the law allows, with the notice your state requires. Ask your provider and your lawyer.

Your Google Business Profile also shows its own performance numbers, including calls and website clicks from the profile.

## How do you track form leads?

The simplest reliable method is to send everyone who submits a form to a thank you page, then count visits to that page as a lead in your analytics and ads. In Google Analytics, you can mark the form submission event as a key event so it shows in your reports.

Make sure every form also lands somewhere your team will see it at once, such as a CRM or a shared inbox. A form that is counted but never answered is still a lost lead.

## Should dental practices be careful with tracking?

Yes. In December 2022, the U.S. Department of Health and Human Services issued guidance on how HIPAA applies to online tracking technologies, such as pixels and analytics tags, used by health care providers. A federal court later vacated part of that guidance in June 2024 ([HHS: Use of online tracking technologies by HIPAA covered entities](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html)). Other parts still apply, and the rules for pages behind a patient login, such as patient portals, are stricter.

Practical habits for practices:

- Do not send patient details, such as names, conditions or treatment, from forms into ad platforms or analytics.
- Keep tracking tags off patient portals and appointment pages that contain health information, unless your vendor signs a business associate agreement.
- Ask your compliance advisor to review your tracking setup.

## How do you know which leads became customers?

Count leads by source, then check what happened to them. A CRM makes this easier: every call and form goes in with its source, and your team marks it booked, quoted, lost or not a fit. Google Ads also lets you import call conversions from another system, which gives you more control over which calls count ([Google Ads: About importing call conversions](https://support.google.com/google-ads/answer/6301373)).

Even without software, asking every new customer "How did you hear about us?" and writing it down is better than nothing.

Our [GoHighLevel CRM](/services/gohighlevel-crm) service sets up lead tracking and follow up in one place, and our [Google Ads management](/services/google-ads) includes call and form tracking.

## Frequently asked questions

### What is a good minimum call length to count as a lead?

It depends on your business. Pick a length that filters out wrong numbers and hang ups, then check a sample of calls to make sure the setting makes sense.

### Will a tracking number hurt my local SEO?

Keep your main number on your Google Business Profile and in directories so your details match everywhere. Tracking numbers that change only for certain website visitors are set up to avoid that problem.

### Can I track leads without a CRM?

Yes, with a thank you page for forms, call reporting for ads and a simple sheet where your team writes the source of every new customer. A CRM makes it faster and more reliable.

### Is it legal to record calls?

Call recording laws differ by state, and some require everyone on the call to agree. Check your state's rules with a lawyer before turning recording on.

### What should a dental practice avoid when tracking leads?

Sending any patient health information to ad platforms or analytics. Keep tracking general, such as "form submitted," and ask your compliance advisor to review the setup.

## Sources

- [Google Ads: About call reporting](https://support.google.com/google-ads/answer/2454052)
- [Google Ads: About phone call conversion tracking](https://support.google.com/google-ads/answer/6100664)
- [Google Ads: Google forwarding number](https://support.google.com/google-ads/answer/2382961)
- [Google Ads: About importing call conversions](https://support.google.com/google-ads/answer/6301373)
- [HHS: Use of online tracking technologies by HIPAA covered entities and business associates](https://www.hhs.gov/hipaa/for-professionals/privacy/guidance/hipaa-online-tracking/index.html)
`;

const META_ADS_LOCAL = `
Meta ads, on Facebook and Instagram, reach people who are not searching for you yet. That makes them different from Google ads, which reach people already searching. For a local business, Meta works best for reaching the right people nearby before they need you, showing off real work, and collecting leads with simple forms.

## How are Meta ads different from Google ads?

On Google, someone types "emergency plumber" or "dentist near me" and your ad answers that search. On Facebook and Instagram, people are scrolling, so your ad has to earn their attention. That changes what works:

- **Google** fits urgent needs, when people are ready to call now.
- **Meta** fits planned purchases and services people think about before they buy, such as a remodel, a new patio or cosmetic dental work, and building familiarity so people remember you when they need you.

## How do you target a local area on Meta?

Meta lets you target people by location, including a radius around an address, and by age and other settings ([Meta for Developers: Basic targeting](https://developers.facebook.com/docs/marketing-api/audiences/reference/basic-targeting)). Keep the area close to where you actually work. Reaching people you cannot serve wastes budget and fills your inbox with leads you have to turn down.

## What makes a good Meta ad for a local business?

- **Real photos and short videos** of your work, team and customers (with their permission). Before and after photos work for many trades.
- **One clear offer or next step**, such as booking a free estimate or a first visit.
- **Plain words that name the service and the area**, so the right people stop scrolling.
- **Proof**, such as your Google rating or years in business, if you can state it accurately.

## Should I use lead forms or send people to my website?

Meta's lead ads let people send their details through a form inside Facebook or Instagram, without leaving the app ([Meta for Developers: Lead ads](https://developers.facebook.com/documentation/ads-commerce/marketing-api/guides/lead-ads)). They are easy to fill in, which brings more leads, but some will be less serious. Sending people to a landing page asks more of them, which tends to bring fewer but more committed leads.

Whichever you use, answer fast. A lead from a form is fresh for minutes, not days. Connecting your forms to a CRM that texts or emails people back right away helps.

## Are there special rules for dental and health ads on Meta?

Yes. Meta's advertising standards say ads must not assert or imply personal attributes, including physical or mental health and medical conditions ([Meta: Advertising Standards, privacy violations and personal attributes](https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/)). For example, "New patients welcome for implant consultations" describes a service. "Are your missing teeth embarrassing you?" implies something about the person reading it.

Meta has also limited the data that some health and wellness advertisers can use to measure and optimize campaigns ([Search Engine Land: Meta ads restrictions for health and wellness campaigns](https://searchengineland.com/meta-ads-restrictions-health-wellness-campaigns-453094)). Practices should also keep patient information out of ad platforms entirely, in line with HIPAA.

## How do you know if Meta ads are working?

Track what happens after the click: leads, calls, booked jobs or appointments. Clicks and likes are easy to get and do not pay the bills. Give a campaign enough time and budget to learn before judging it, and compare the cost of a booked job with your other channels.

Our [Meta ads](/services/meta-ads) page explains how TTR runs Facebook and Instagram campaigns for local businesses.

## Frequently asked questions

### Do Facebook ads work for home service companies?

They can, especially for planned projects and seasonal work, and for staying top of mind. For urgent jobs, search ads usually fit better because people are already looking.

### Can a dental practice advertise on Facebook?

Yes, but the ads must not imply anything about a person's health, and patient information should never go into the ad platform. Describe your services and your practice instead.

### Are lead form leads lower quality?

Lead forms are quick to fill in, so some leads are less serious. Adding a question or two and following up fast both help.

### How far should my ads reach?

Match your real service area. Ads shown to people you cannot serve waste money.

### Should I boost posts or run ads in Ads Manager?

Boosting is quick and simple. Ads Manager gives more control over the audience, the goal and the tracking. For a business that depends on leads, Ads Manager is usually the better tool.

## Sources

- [Meta for Developers: Basic targeting](https://developers.facebook.com/docs/marketing-api/audiences/reference/basic-targeting)
- [Meta for Developers: Lead ads](https://developers.facebook.com/documentation/ads-commerce/marketing-api/guides/lead-ads)
- [Meta: Advertising Standards, privacy violations and personal attributes](https://transparency.meta.com/policies/ad-standards/objectionable-content/privacy-violations-personal-attributes/)
- [Search Engine Land: How to prevent Meta Ads restrictions on health and wellness campaigns](https://searchengineland.com/meta-ads-restrictions-health-wellness-campaigns-453094)
`;

const CHOOSE_AGENCY = `
The right marketing agency explains what it will do, how you will measure it and who owns what, without promising results nobody controls. Before you sign, check who owns your accounts, how you will see results each month, and whether the agency understands businesses like yours.

## What should an agency never promise?

Google is clear on this: "No one can guarantee a #1 ranking on Google." Google also warns about anyone who claims a "special relationship" with Google or offers a "priority submit" to Google ([Google: Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)). The same goes for AI answers: no one controls what ChatGPT or Google's AI says.

An honest agency will talk about the work it will do and the numbers it will report, not guaranteed rankings or a set number of leads.

## What questions should I ask before hiring an agency?

Google suggests interviewing a potential SEO, including asking to see examples of past work and whether they follow Google's guidelines ([Google: Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)). Useful questions for any agency:

- What exactly will you do in the first 90 days, and what will you do every month after that?
- How will you report results, and which numbers will I see?
- Who will work on my account day to day, and how do I reach them?
- Have you worked with businesses like mine, and what did you learn?
- What do you need from me, and how much of my time will it take?
- How long is the contract, and what happens if I want to leave?

A good agency will also ask you questions: what makes your business different, which jobs or patients are most valuable, who your competitors are and how you handle leads today.

## Who should own my accounts?

You should. Your Google Business Profile, Google Ads account, Meta ad account, website, domain name and analytics are business assets.

For Google Business Profile, Google separates owners from managers. Only owners can add or remove people, and a profile has one primary owner ([Google: Manage Business Profile owners and managers](https://support.google.com/business/answer/3403100)). A common, safe setup is that you are the primary owner and the agency is added as a manager or owner, so you can remove access at any time.

The same idea applies to ad accounts and analytics: the account belongs to your business, and the agency gets access to it.

## What should a monthly report show?

A useful report answers three questions in plain words:

- **What did you do?** Pages written, campaigns changed, reviews requested, fixes made.
- **What happened?** Calls, forms and booked jobs or appointments by source, compared with earlier months.
- **What is next?** The plan for the coming month and anything the agency needs from you.

Be wary of reports full of numbers like impressions and likes, with nothing about leads or customers.

## What are the warning signs?

- Guaranteed rankings, guaranteed leads or a "special relationship" with Google or Meta.
- Accounts set up in the agency's name that you cannot access.
- Long contracts with no clear way out and no clear list of work.
- Fake or unverifiable reviews, case studies or badges.
- No interest in what happens to leads after they arrive.

## Should I choose a specialist or a general agency?

An agency that works with businesses like yours already knows your customers, your busy seasons and the rules you work under. For dental practices, that includes how HIPAA affects reviews and tracking. For home services, it includes service areas, emergency calls and seasonal demand. A general agency can still do good work if it takes the time to learn your business.

TTR works with home service companies and dental practices. Our [home services marketing](/home-services-marketing) and [dental marketing](/dental-marketing) pages explain how we work, and you can [contact us](/contact) for a free growth audit.

## Frequently asked questions

### How long should an agency contract be?

There is no single right length. SEO needs months to show results, so very short trials may not be fair. Whatever the length, the work and the way to end the contract should be written down clearly.

### Should I own my Google Ads account?

Yes. Ask for the account to be in your business's name with the agency given access, so your history and data stay with you if you change agencies.

### Can an agency guarantee results?

No one can guarantee rankings, and Google says so. An agency can commit to the work it will do and to reporting results honestly.

### How do I check an agency's claims?

Ask for examples you can verify, talk to a current client if they can arrange it, and check that badges and partnerships they show are current.

### What should I do before switching agencies?

Make sure you have owner access to every account, and a copy of your website, before you give notice.

## Sources

- [Google: Do you need an SEO?](https://developers.google.com/search/docs/fundamentals/do-i-need-seo)
- [Google: Manage Business Profile owners and managers](https://support.google.com/business/answer/3403100)
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

/** All 8 drafts on branch rory/ttr-batch-1 (two weekly sets of 4), newest first. Preview only until Kia approves each one. */
export const ttrBatch1Drafts: Post[] = [
  draft({
    slug: "how-long-does-seo-take",
    title: "How Long Does SEO Take for a Local Business?",
    excerpt:
      "Google says SEO typically takes four months to a year to show benefits. Why it takes that long, what can move sooner, what slows it down and how to tell it is working.",
    publishedAt: "2026-11-27T12:00:00Z",
    categories: [{ title: "SEO", slug: "seo" }],
    md: HOW_LONG_SEO,
    seo: {
      title: "How Long Does SEO Take? What Google Says | TTR Digital",
      description:
        "Google says SEO typically takes four months to a year. What that means for a local business, what can move sooner, and how to tell if SEO is working.",
    },
    relatedServices: ["seo", "search-everywhere-optimization"],
  }),
  draft({
    slug: "track-calls-and-form-leads",
    title: "How to Track Calls and Form Leads for a Local Business",
    excerpt:
      "Know which ads, pages and profiles bring calls and forms, and which become customers. Call reporting, form tracking, CRMs, and what dental practices must watch under HIPAA.",
    publishedAt: "2026-11-27T11:00:00Z",
    categories: [{ title: "CRM and automation", slug: "crm-and-automation" }],
    md: TRACK_LEADS,
    seo: {
      title: "How to Track Calls and Form Leads | TTR Digital",
      description:
        "A plain guide to tracking calls and form leads for local businesses: Google Ads call reporting, form tracking, CRMs and HIPAA cautions for dental practices.",
    },
    relatedServices: ["gohighlevel-crm", "google-ads"],
  }),
  draft({
    slug: "meta-ads-for-local-businesses",
    title: "Meta Ads for Local Businesses: Facebook and Instagram Basics",
    excerpt:
      "Facebook and Instagram ads reach people before they search. How local targeting, lead forms and ad rules work, including what dental practices cannot say in ads.",
    publishedAt: "2026-11-27T10:00:00Z",
    categories: [{ title: "Ads", slug: "ads" }],
    md: META_ADS_LOCAL,
    seo: {
      title: "Meta Ads for Local Businesses: The Basics | TTR Digital",
      description:
        "How Facebook and Instagram ads work for local businesses: targeting your service area, lead forms vs landing pages, and Meta's rules for health ads.",
    },
    relatedServices: ["meta-ads", "gohighlevel-crm"],
  }),
  draft({
    slug: "how-to-choose-a-marketing-agency",
    title: "How to Choose a Marketing Agency for Your Local Business",
    excerpt:
      "What an agency should never promise, the questions to ask before you sign, who should own your accounts, and what a useful monthly report looks like.",
    publishedAt: "2026-11-27T09:00:00Z",
    categories: [{ title: "Local marketing", slug: "local-marketing" }],
    md: CHOOSE_AGENCY,
    seo: {
      title: "How to Choose a Marketing Agency for a Local Business | TTR Digital",
      description:
        "Questions to ask before hiring a marketing agency, who should own your Google and Meta accounts, warning signs, and what a monthly report should show.",
    },
    relatedServices: ["seo", "google-ads"],
  }),
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
