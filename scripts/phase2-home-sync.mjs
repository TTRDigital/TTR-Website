// Phase 2 content sync: patches only, never deletes.
// The client has no token: the environment's credential proxy adds auth.
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19",
  useCdn: false,
});

const faqs = [
  ["How much does digital marketing cost?", "It depends on what you need. The main factors are your competition, how many services and locations you cover, your starting point and how fast you want to grow. Ad budgets are paid to Google or Meta directly and are separate from our work. After the free audit you get a clear plan and a quote, with no surprises."],
  ["How long does SEO take to work?", "Most businesses see movement within the first few months, with steadier growth after that. It depends on your competition, your website and how much work is needed up front. Google Ads can bring calls within the first few weeks, so many clients run both while SEO builds."],
  ["Do you require long contracts?", "We explain the terms, the length and how to cancel before you sign anything, in plain English. Ask us on your audit call and we will walk you through the options for your situation."],
  ["How will I know it's working?", "You get clear monthly reports in plain English. We track calls, form leads and booked appointments by channel, along with rankings and AI search visibility, so you can see what your money brought in."],
  ["What is Search Everywhere Optimization?", "People now search on Google, Google Maps, YouTube and AI tools like ChatGPT, Gemini and Perplexity. Search Everywhere Optimization makes your business easy to find and easy to recommend in all of those places, not just in the classic blue links."],
  ["Can you promise I will be number one on Google?", "No honest agency can promise a ranking, because Google and AI tools decide what to show. What we can promise is clear work, clear reporting and a plan focused on the searches that bring you real customers."],
  ["What kinds of businesses do you work with?", "Mostly local service businesses. Dental practices and home service companies like HVAC, plumbing, roofing and cleaning are our main focus, along with other small and mid-sized businesses that live on calls and booked appointments."],
  ["Do you only work with businesses in Miami?", "Our office is on Brickell Avenue in Miami and many of our clients are in South Florida, but we work with businesses across the United States."],
].map(([question, answer], i) => ({ _key: `hfaq${i + 1}`, _type: "faqItem", question, answer }));

const tx = client
  .transaction()
  .patch("homePage", (p) =>
    p.set({
      heroHeading: "Get found everywhere your customers search.",
      heroText:
        "Google, Maps, ads and AI answers like ChatGPT and Gemini. We put your business in front of people ready to buy, then turn those searches into booked calls.",
      ctaText:
        "Get a free growth audit. We will show you where your leads are slipping away and how to fix it, whether or not you hire us.",
      faqs,
      "seo.title": "Miami Digital Marketing Agency for Local Businesses | TTR",
      "seo.description":
        "TTR Digital Marketing gets local businesses found on Google, ads and AI search, then turns that traffic into booked calls. Free growth audit.",
    }),
  )
  .patch("service-websites", (p) => p.set({ "slug.current": "website-design" }))
  .patch("service-social-media", (p) => p.set({ "slug.current": "social-media-marketing" }));

const res = await tx.commit();
console.log("committed", res.transactionId, res.results.map((r) => `${r.id}:${r.operation}`).join(", "));
