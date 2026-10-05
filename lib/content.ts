import "server-only";
import { sanityFetch } from "@/lib/sanity/fetch";

/* ==========================================================================
   Content layer
   Every page reads through these functions. Sanity values win when present;
   anything missing falls back to the defaults below, so the site never
   breaks when a field is empty.

   Placeholders use the [ALL CAPS] format and render as clearly marked tags.
   Set NEXT_PUBLIC_HIDE_PLACEHOLDERS=true to hide blocks that still contain one.
   ========================================================================== */

export { isPlaceholder, showPlaceholders } from "@/lib/placeholders";

/* ---------- Types ---------- */

export type Faq = { question: string; answer: string };
export type Stat = { value: string; label: string; countTo?: number; prefix?: string; suffix?: string };
export type Step = { title: string; text: string };

export type SiteSettings = {
  name: string;
  phone: string;
  phoneHref: string;
  email: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  hoursText: string;
  mapsUrl: string;
  foundedYear: number;
  googleRating: string | null;
  reviewCount: string | null;
  social: { label: string; href: string; network: "facebook" | "instagram" | "linkedin" }[];
};

export type ServiceSummary = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
};

export type Testimonial = {
  quote: string;
  name: string | null;
  role: string | null;
  company: string | null;
};

export type CaseStudy = {
  client: string;
  industry: string;
  challenge: string;
  result: string;
  metric?: string;
  metricLabel?: string;
};

export type HomeContent = {
  seo: { title: string; description: string };
  hero: { eyebrow: string; heading: string; text: string };
  logos: { heading: string; items: { name: string; src?: string }[] };
  problem: { eyebrow: string; heading: string; broken: Step[]; fixes: Step[] };
  services: { eyebrow: string; heading: string; intro: string };
  searchEverywhere: { eyebrow: string; heading: string; text: string; points: string[]; platforms: string[] };
  results: { eyebrow: string; heading: string; intro: string; stats: Stat[]; cases: CaseStudy[]; footnote: string };
  process: { eyebrow: string; heading: string; intro: string; steps: Step[] };
  industries: {
    eyebrow: string;
    heading: string;
    cards: { href: string; eyebrow: string; title: string; text: string; tags: string[] }[];
    more: string;
  };
  aiCrm: { eyebrow: string; heading: string; text: string; points: Step[] };
  testimonials: { eyebrow: string; heading: string };
  faq: { eyebrow: string; heading: string; items: Faq[] };
  cta: { heading: string; text: string };
};

/* ---------- Fallbacks ---------- */

export const fallbackSettings: SiteSettings = {
  name: "TTR Digital Marketing",
  phone: "(786) 460-1311",
  phoneHref: "tel:+17864601311",
  email: "ttrdigitalmarketingteam@gmail.com",
  street: "1000 Brickell Ave Ste 715",
  city: "Miami",
  region: "FL",
  postalCode: "33131",
  country: "US",
  hoursText: "Monday to Friday, 9 AM to 5 PM",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=TTR+Digital+Marketing%2C+1000+Brickell+Ave+Ste+715%2C+Miami%2C+FL+33131",
  foundedYear: 2015,
  googleRating: "[GOOGLE RATING]",
  reviewCount: "[REVIEW COUNT]",
  social: [
    { network: "facebook", label: "Facebook", href: "https://www.facebook.com/TTRDigitalMarketing/" },
    { network: "instagram", label: "Instagram", href: "https://www.instagram.com/ttrdigitalmarketing/" },
    { network: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/ttr-digital-marketing/" },
  ],
};

/** Canonical order and slugs for the 8 services. */
export const fallbackServices: ServiceSummary[] = [
  {
    slug: "seo",
    title: "SEO",
    shortTitle: "SEO",
    summary: "Show up in Google search and Google Maps when local customers look for what you do.",
  },
  {
    slug: "search-everywhere-optimization",
    title: "Search Everywhere Optimization",
    shortTitle: "Search Everywhere",
    summary: "Be the business that Google, Maps and AI tools like ChatGPT and Gemini recommend.",
  },
  {
    slug: "google-ads",
    title: "Google Ads",
    shortTitle: "Google Ads",
    summary: "Reach people the moment they search for your service, and pay for real leads, not wasted clicks.",
  },
  {
    slug: "meta-ads",
    title: "Meta Ads",
    shortTitle: "Meta Ads",
    summary: "Facebook and Instagram ads that reach the right local people and bring in new leads.",
  },
  {
    slug: "website-design",
    title: "Website Design",
    shortTitle: "Websites",
    summary: "Fast, mobile-friendly websites that rank well and turn visitors into calls.",
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    shortTitle: "Social Media",
    summary: "Consistent, helpful posts that build trust and keep your business top of mind.",
  },
  {
    slug: "gohighlevel-crm",
    title: "GoHighLevel CRM",
    shortTitle: "GoHighLevel CRM",
    summary: "One place for every lead, with automatic text and email follow up so nothing slips.",
  },
  {
    slug: "ai-agents",
    title: "AI Agents",
    shortTitle: "AI Agents",
    summary: "AI assistants that answer calls and chats, qualify leads and book appointments 24/7.",
  },
];

export const fallbackTestimonials: Testimonial[] = [
  {
    quote: "We used to only get 2 cases per day, now we're getting 10 to 15 per day.",
    name: "Chris Aaron",
    role: "CEO",
    company: "Displays & Holders",
  },
  {
    quote:
      "They are professional. They are quick. They are always on top of it and I couldn't be happier with them.",
    name: null,
    role: null,
    company: "TTR Digital client",
  },
];

export const fallbackHome: HomeContent = {
  seo: {
    title: "Miami Digital Marketing Agency for Local Businesses | TTR",
    description:
      "TTR Digital Marketing gets local businesses found on Google, ads and AI search, then turns that traffic into booked calls. Free growth audit.",
  },
  hero: {
    eyebrow: "Miami digital marketing agency",
    heading: "Get found everywhere your customers search.",
    text: "Google, Maps, ads and AI answers like ChatGPT and Gemini. We put your business in front of people ready to buy, then turn those searches into booked calls.",
  },
  logos: {
    heading: "Trusted by local businesses",
    items: [
      { name: "[CLIENT LOGO]" },
      { name: "[CLIENT LOGO]" },
      { name: "[CLIENT LOGO]" },
      { name: "[CLIENT LOGO]" },
      { name: "[CLIENT LOGO]" },
    ],
  },
  problem: {
    eyebrow: "Why leads slip away",
    heading: "Most local businesses lose leads they never see.",
    broken: [
      {
        title: "Invisible in AI answers",
        text: "Customers now ask ChatGPT and Google's AI Overviews who to call. If you are not in that answer, you are not on the list.",
      },
      {
        title: "Ad spend that leaks",
        text: "Broad keywords, slow landing pages and no call tracking burn budget on clicks that never turn into customers.",
      },
      {
        title: "Leads that go cold",
        text: "A missed call or a reply three hours later sends the customer straight to the next business on Google.",
      },
    ],
    fixes: [
      {
        title: "Found everywhere",
        text: "We make your business easy to find and easy to recommend on Google, Maps and AI search.",
      },
      {
        title: "Ads built for calls",
        text: "We run campaigns around calls and booked jobs, and cut the spend that does not bring them.",
      },
      {
        title: "Every lead answered",
        text: "GoHighLevel and AI agents reply to every call, form and message in seconds, day or night.",
      },
    ],
  },
  services: {
    eyebrow: "What we do",
    heading: "One team for everything that makes the phone ring.",
    intro: "Eight services that work as one system. Start with the one you need most and add more as you grow.",
  },
  searchEverywhere: {
    eyebrow: "Search Everywhere Optimization",
    heading: "Your customers don't just Google anymore.",
    text: "They search Google, check the map and ask ChatGPT, Gemini or Perplexity who to call. Search Everywhere Optimization makes your business the clear, trusted answer in all of them.",
    points: [
      "Clear pages with direct answers that AI tools can quote",
      "The same name, address and phone on every listing",
      "Reviews and mentions that build trust with every platform",
      "Monthly checks of where you show up, and where you do not yet",
    ],
    platforms: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "Gemini", "Perplexity"],
  },
  results: {
    eyebrow: "Results",
    heading: "Real numbers from real clients.",
    intro: "We report on calls, leads and booked jobs, not vanity metrics. Here is some of what that work has produced.",
    stats: [
      { value: "411%", countTo: 411, suffix: "%", label: "more organic traffic, year over year" },
      { value: "688%", countTo: 688, suffix: "%", label: "more keywords ranking in Google's top 10" },
      { value: "10-15", label: "cases a day for one client, up from 2" },
      { value: "2015", label: "helping businesses grow since" },
    ],
    cases: [
      {
        client: "Displays & Holders",
        industry: "Growing business",
        challenge: "Stuck at about 2 cases a day.",
        result: "Now 10 to 15 cases a day, in the CEO's own words.",
        metricLabel: "Chris Aaron, CEO",
      },
      {
        client: "[CLIENT NAME]",
        industry: "Dental practice",
        challenge: "[CHALLENGE]",
        result: "[CLIENT RESULT]",
      },
      {
        client: "[CLIENT NAME]",
        industry: "Home services company",
        challenge: "[CHALLENGE]",
        result: "[CLIENT RESULT]",
      },
    ],
    footnote: "Results depend on your market, competition, budget and starting point. We never promise rankings.",
  },
  process: {
    eyebrow: "How we work",
    heading: "A clear plan, then steady progress you can see.",
    intro: "No long onboarding and no mystery. Four steps, and you always know what we are doing and why.",
    steps: [
      {
        title: "Audit",
        text: "We review your website, Google Business Profile, ads, reviews and competitors, and show you where leads are slipping away.",
      },
      {
        title: "Strategy",
        text: "You get a plan built around your goals and budget, with every task tied to calls, form leads or booked jobs.",
      },
      {
        title: "Launch",
        text: "We build and launch in the right order, with call and form tracking in place from day one.",
      },
      {
        title: "Grow",
        text: "Each month you see what we did and what it brought in. Then we put more behind what works.",
      },
    ],
  },
  industries: {
    eyebrow: "Industries",
    heading: "Built for businesses that live on calls and bookings.",
    cards: [
      {
        href: "/dental-marketing",
        eyebrow: "Dental practices",
        title: "More new patients in the chair.",
        text: "Attract the patients you want, from new families to implant and cosmetic cases, and book more of the calls you already get.",
        tags: ["New patient exams", "Implants", "Invisalign", "Emergency visits"],
      },
      {
        href: "/home-services-marketing",
        eyebrow: "Home services",
        title: "More booked jobs for your crews.",
        text: "Steady calls from homeowners nearby, with missed calls answered while your team is out on a job.",
        tags: ["HVAC", "Plumbing", "Roofing", "Electrical", "Landscaping", "Cleaning"],
      },
    ],
    more: "And growing businesses in other industries that depend on calls, forms and appointments.",
  },
  aiCrm: {
    eyebrow: "GoHighLevel CRM and AI agents",
    heading: "Every lead answered in seconds. Day or night.",
    text: "Most businesses do not have a lead problem. They have a follow up problem. We set up GoHighLevel so every call, form and message lands in one pipeline, then add AI agents that answer, ask the right questions and book the appointment.",
    points: [
      { title: "Missed call text back", text: "A missed call gets an instant text, so the customer does not call the next business." },
      { title: "AI chat and voice agents", text: "Answers common questions and qualifies leads around the clock." },
      { title: "Booked into your calendar", text: "Appointments go straight onto your schedule, with reminders." },
      { title: "Review requests", text: "Happy customers get a quick request after every job or visit." },
    ],
  },
  testimonials: {
    eyebrow: "Client words",
    heading: "What working with us feels like.",
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Questions owners ask us.",
    items: [
      {
        question: "How much does digital marketing cost?",
        answer:
          "It depends on what you need. The main factors are your competition, how many services and locations you cover, your starting point and how fast you want to grow. Ad budgets are paid to Google or Meta directly and are separate from our work. After the free audit you get a clear plan and a quote, with no surprises.",
      },
      {
        question: "How long does SEO take to work?",
        answer:
          "Most businesses see movement within the first few months, with steadier growth after that. It depends on your competition, your website and how much work is needed up front. Google Ads can bring calls within the first few weeks, so many clients run both while SEO builds.",
      },
      {
        question: "Do you require long contracts?",
        answer:
          "We explain the terms, the length and how to cancel before you sign anything, in plain English. Ask us on your audit call and we will walk you through the options for your situation.",
      },
      {
        question: "How will I know it's working?",
        answer:
          "You get clear monthly reports in plain English. We track calls, form leads and booked appointments by channel, along with rankings and AI search visibility, so you can see what your money brought in.",
      },
      {
        question: "What is Search Everywhere Optimization?",
        answer:
          "People now search on Google, Google Maps, YouTube and AI tools like ChatGPT, Gemini and Perplexity. Search Everywhere Optimization makes your business easy to find and easy to recommend in all of those places, not just in the classic blue links.",
      },
      {
        question: "Can you promise I will be number one on Google?",
        answer:
          "No honest agency can promise a ranking, because Google and AI tools decide what to show. What we can promise is clear work, clear reporting and a plan focused on the searches that bring you real customers.",
      },
      {
        question: "What kinds of businesses do you work with?",
        answer:
          "Mostly local service businesses. Dental practices and home service companies like HVAC, plumbing, roofing and cleaning are our main focus, along with other small and mid-sized businesses that live on calls and booked appointments.",
      },
      {
        question: "Do you only work with businesses in Miami?",
        answer:
          "Our office is on Brickell Avenue in Miami and many of our clients are in South Florida, but we work with businesses across the United States.",
      },
    ],
  },
  cta: {
    heading: "Ready for more calls and booked jobs?",
    text: "Get a free growth audit. We will show you where your leads are slipping away and how to fix it, whether or not you hire us.",
  },
};

/* ---------- Helpers ---------- */

/** Earlier build used shorter slugs; normalize to the canonical ones. */
const slugAliases: Record<string, string> = {
  websites: "website-design",
  "social-media": "social-media-marketing",
};
export const canonicalServiceSlug = (slug: string) => slugAliases[slug] ?? slug;

const pick = <T,>(value: T | null | undefined, fallback: T): T =>
  value === null || value === undefined || (typeof value === "string" && value.trim() === "") ? fallback : value;

const pickList = <T,>(value: T[] | null | undefined, fallback: T[]): T[] =>
  Array.isArray(value) && value.length > 0 ? value : fallback;

/* ---------- Getters ---------- */

type SanitySettings = Partial<{
  phone: string;
  email: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  hoursText: string;
  mapsUrl: string;
  googleRating: string;
  reviewCount: string;
}>;

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SanitySettings>(
    `*[_id == "siteSettings"][0]{phone, email, street, city, region, postalCode, hoursText, mapsUrl, googleRating, reviewCount}`,
    {},
    ["siteSettings"],
  );
  const f = fallbackSettings;
  const phone = pick(data?.phone, f.phone);
  const digits = phone.replace(/\D/g, "");
  return {
    ...f,
    phone,
    phoneHref: digits.length === 10 ? `tel:+1${digits}` : f.phoneHref,
    email: pick(data?.email, f.email),
    street: pick(data?.street, f.street),
    city: pick(data?.city, f.city),
    region: pick(data?.region, f.region),
    postalCode: pick(data?.postalCode, f.postalCode),
    hoursText: pick(data?.hoursText, f.hoursText),
    mapsUrl: pick(data?.mapsUrl, f.mapsUrl),
    googleRating: pick(data?.googleRating, f.googleRating),
    reviewCount: pick(data?.reviewCount, f.reviewCount),
  };
}

export async function getServiceSummaries(): Promise<ServiceSummary[]> {
  const data = await sanityFetch<{ slug: string; title: string; summary: string }[]>(
    `*[_type == "service" && defined(slug.current)] | order(order asc){"slug": slug.current, title, summary}`,
    {},
    ["service"],
  );
  if (!data?.length) return fallbackServices;
  const bySlug = new Map(data.map((s) => [canonicalServiceSlug(s.slug), s]));
  return fallbackServices.map((f) => {
    const s = bySlug.get(f.slug);
    return { ...f, title: pick(s?.title, f.title), summary: pick(s?.summary, f.summary) };
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await sanityFetch<Testimonial[]>(
    `*[_type == "testimonial" && defined(quote)] | order(order asc){quote, name, role, company}`,
    {},
    ["testimonial"],
  );
  return pickList(data, fallbackTestimonials).map((t) => ({
    quote: t.quote.replace(/(\d+)-(\d+)/g, "$1 to $2"),
    name: t.name ?? null,
    role: t.role ?? null,
    company: t.company ?? null,
  }));
}

type SanityHome = Partial<{
  heroEyebrow: string;
  heroHeading: string;
  heroText: string;
  faqs: Faq[];
  ctaHeading: string;
  ctaText: string;
  seo: { title?: string; description?: string };
}>;

export async function getHomeContent(): Promise<HomeContent> {
  const data = await sanityFetch<SanityHome>(
    `*[_id == "homePage"][0]{heroEyebrow, heroHeading, heroText, faqs[]{question, answer}, ctaHeading, ctaText, seo}`,
    {},
    ["homePage"],
  );
  const f = fallbackHome;
  return {
    ...f,
    seo: {
      title: pick(data?.seo?.title, f.seo.title),
      description: pick(data?.seo?.description, f.seo.description),
    },
    hero: {
      eyebrow: pick(data?.heroEyebrow, f.hero.eyebrow),
      heading: pick(data?.heroHeading, f.hero.heading),
      text: pick(data?.heroText, f.hero.text),
    },
    faq: { ...f.faq, items: pickList(data?.faqs, f.faq.items) },
    cta: {
      heading: pick(data?.ctaHeading, f.cta.heading),
      text: pick(data?.ctaText, f.cta.text),
    },
  };
}
