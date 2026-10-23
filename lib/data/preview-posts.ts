import type { PortableTextBlock } from "@portabletext/react";
import type { Post } from "@/lib/blog";

/*
 * Posts that exist only on Vercel previews (TTR OS, TTR-594): a draft for Kia, and then the client test, to read and
 * leave notes on in the real blog design before anything goes into Sanity. lib/blog.ts adds them only when
 * VERCEL_ENV is "preview", so the live site, its sitemap and its feeds never see them. Once Kia approves, the post
 * moves into Sanity like any other and its entry here is removed.
 *
 * The body is plain Markdown (## and ### headings, paragraphs, "- " lists, **bold** and [links](/path or https://)),
 * turned into the same portable text blocks Sanity stores, so it renders through the site's own components.
 */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };

function spans(text: string, key: () => string, defs: MarkDef[]): Span[] {
  const out: Span[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) out.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] });
    if (m[1]) {
      const k = key();
      defs.push({ _type: "link", _key: k, href: m[2] });
      out.push({ _type: "span", _key: key(), text: m[1], marks: [k] });
    } else out.push({ _type: "span", _key: key(), text: m[3], marks: ["strong"] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  return out;
}

function toBlocks(md: string): PortableTextBlock[] {
  let n = 0;
  const key = () => `p${(n++).toString(36)}`;
  const blocks: PortableTextBlock[] = [];
  for (const raw of md.trim().split(/\n{2,}/)) {
    const lines = raw.trim().split("\n");
    if (lines.every((l) => l.startsWith("- "))) {
      for (const l of lines) {
        const markDefs: MarkDef[] = [];
        blocks.push({ _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1, markDefs, children: spans(l.slice(2), key, markDefs) } as PortableTextBlock);
      }
      continue;
    }
    const h = /^(#{2,3}) (.+)$/.exec(lines[0]);
    const markDefs: MarkDef[] = [];
    const style = h ? (h[1] === "##" ? "h2" : "h3") : "normal";
    const text = h ? h[2] : lines.join(" ");
    blocks.push({ _type: "block", _key: key(), style, markDefs, children: spans(text, key, markDefs) } as PortableTextBlock);
  }
  return blocks;
}

const LSA_VS_GOOGLE_ADS = `
For most home service businesses that answer every call, Local Services Ads are the simpler place to start: you pay for leads, not clicks, and your listing sits at the top of Google with a Google Verified badge. Google Ads search campaigns give you more control over the jobs, areas and pages you pay for, so they fit best alongside Local Services Ads once you know which jobs pay.

## What is the difference between Local Services Ads and Google Ads?

Local Services Ads charge you for leads; Google Ads search campaigns charge you for clicks. That one difference shapes everything else.

A Local Services ad shows your business name, rating and reviews at the top of Google. People call or message you straight from the ad, and Google says plainly: "You're charged for each valid lead you receive through your Local Services ad" ([Google: How leads work](https://support.google.com/localservices/answer/7195435?hl=en)).

A Google Ads search campaign shows a text ad for the searches you choose, and sends people to the page you choose. Google describes cost-per-click bidding as paying "for each click on your ads" ([Google: Cost-per-click](https://support.google.com/google-ads/answer/116495?hl=en)). A click is a visit, not a call, so the page it lands on has to do the rest of the work.

## How do you pay for each one?

With Local Services Ads, Google counts a valid lead when you answer or return a call, when a caller stays on the line for more than 20 seconds on a missed call, or when a customer sends a text, an email or a voicemail ([Google: How leads work](https://support.google.com/localservices/answer/7195435?hl=en)).

- Lead prices vary with your location, the job type, the type of lead and your bidding mode.
- Message leads are "typically priced lower than phone leads, although that is not always the case."
- You set an average weekly budget, and you never spend more than your monthly maximum. Once you reach it, your ad stops showing for the rest of the month unless you raise the budget.

With Google Ads search campaigns, you set a maximum cost per click. Google says that is the most you will typically pay for a click, and you are often charged less ([Google: Cost-per-click](https://support.google.com/google-ads/answer/116495?hl=en)). What a click is worth depends on what happens next: whether the page answers the question, shows the phone number and makes it easy to book.

## What decides who shows up first in Local Services Ads?

Google ranks Local Services Ads on three things: your bid, how likely your ad is to lead to a contact, and the quality of your profile ([Google: About ad rankings](https://support.google.com/localservices/answer/7527305)).

- **Responsiveness.** Google lists your responsiveness to customer inquiries, and notes that missed calls may count against it.
- **Reviews and profile.** Your rating, number of reviews, average response time and high quality images all count. Google says higher quality profiles "may rank higher and may also pay lower costs per lead."
- **Bid.** Your bid is the most you are willing to pay for a lead, though you may pay less.

In practice, this rewards the basics: pick up the phone, reply to messages fast and ask happy customers for reviews. If calls go unanswered while your team is on a job, a missed call text back through a CRM like [GoHighLevel](/services/gohighlevel-crm) keeps the conversation going.

## When do Local Services Ads make the most sense?

Local Services Ads tend to fit when:

- Your team can answer calls and messages during the hours your ad runs.
- Your business is in a category Google offers. Google notes that the Google Verified badge is not available for auto, beauty and dining categories ([Google: Getting started with Local Services Ads](https://support.google.com/localservices/answer/6224841?hl=en)).
- You want leads without building a landing page for every service.
- You already have reviews, or a plan to ask for them.

## When are Google Ads search campaigns the better fit?

Search campaigns tend to fit when you want control that Local Services Ads do not give you:

- Choosing exactly which searches you pay for, such as emergency jobs over routine maintenance, and excluding the ones you do not want.
- Sending people to a page about one specific service, with your own words, photos and offer.
- Advertising a service Local Services Ads do not cover for your business.
- Measuring what happens after the click, from page visits to form fills and calls.

This is where careful setup matters most, because every click costs money whether or not it turns into a job. Our [Google Ads management](/services/google-ads) page explains how TTR builds and runs these campaigns.

## Can you run both at the same time?

Yes. Local Services Ads and search ads show in different places on the results page, and they do different jobs: Local Services Ads for steady calls, search campaigns for the specific jobs and areas you want more of. Both work alongside your Google Business Profile and the map results, which you earn over time with [local SEO](/services/seo) rather than pay for per lead.

If you run a home service business, our [home services marketing](/home-services-marketing) page shows how these channels fit together.

## What happens with leads that are not real customers?

Google says leads that are invalid or low quality at first are not charged, and that charged leads are reassessed, with a credit applied automatically to your balance when a lead turns out to be poor quality, a duplicate or invalid ([Google: How leads work](https://support.google.com/localservices/answer/7195435?hl=en)).

One change to know about: Google no longer credits leads for "job type not serviced" or "geo not serviced" ([Google: Lead credits](https://support.google.com/google-ads/answer/7435486)). That makes it worth setting your job types and service area carefully from the start, so you only receive the leads you can take.

## Frequently asked questions

### Do Local Services Ads cost more than Google Ads?

There is no single answer, because Local Services Ads charge per lead and search ads charge per click, and both vary by location and job. The fair comparison is the cost of a booked job from each, which you can only see by tracking where every job came from.

### Do I need a website for Local Services Ads?

Customers contact you from your Local Services profile on Google, so the ad itself does not send people to a page. A good website still matters for Google Ads search campaigns, for local SEO, and for anyone who looks you up before they call.

### Does answering the phone really change my ranking?

Google lists responsiveness as part of how likely your ad is to lead to a contact, and says missed calls may count against it. Fast replies to messages help too.

### Can I control how much I spend on Local Services Ads?

Yes. You set an average weekly budget, and Google says you will never spend more than your monthly maximum. When you reach it, your ad stops showing until the next month unless you change the budget.

### Which one should I start with?

If you can answer every call and your category is covered, Local Services Ads are usually the simpler start. If you need control over which jobs and areas you pay for, or your service is not covered, start with a search campaign built around one service and one page.

## Sources

- [Google: How leads work (Local Services Ads)](https://support.google.com/localservices/answer/7195435?hl=en)
- [Google: About ad rankings (Local Services Ads)](https://support.google.com/localservices/answer/7527305)
- [Google: Getting started with Local Services Ads, United States](https://support.google.com/localservices/answer/6224841?hl=en)
- [Google: Lead credits for Local Services Ads](https://support.google.com/google-ads/answer/7435486)
- [Google: Cost-per-click (CPC) definition](https://support.google.com/google-ads/answer/116495?hl=en)
`;

/** Preview-only posts, newest first. Never shown on the live site (see lib/blog.ts). */
export const previewPosts: Post[] = [
  {
    slug: "local-services-ads-vs-google-ads",
    title: "Local Services Ads vs Google Ads for Home Service Businesses",
    excerpt:
      "Local Services Ads charge per lead and show a Google Verified badge; Google Ads charge per click and send people to your page. How to choose, and when to run both.",
    publishedAt: "2026-10-23T12:00:00Z",
    updatedAt: "2026-10-23T12:00:00Z",
    categories: [{ title: "Local marketing", slug: "local-marketing" }],
    readingMinutes: 6,
    cover: null,
    body: toBlocks(LSA_VS_GOOGLE_ADS),
    seo: {
      title: "Local Services Ads vs Google Ads: Which to Run First | TTR Digital",
      description:
        "Local Services Ads charge per lead and Google Ads charge per click. How each one ranks, what you pay for, and which a home service business should start with.",
    },
    author: {
      name: "Kia Khamoushi",
      role: "Founder and Chief Business Development Officer",
      bio: null,
      slug: null,
    },
    relatedServices: ["google-ads", "seo"],
  },
];
