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
import { fallbackHome } from "@/lib/data/home";
export { fallbackHome };

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
  /** Partner badges an editor switched on in /cms. Empty until confirmed. */
  badges: { name: string; url: string }[];
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
  badges: [],
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
  foundedYear: number;
  googleRating: string;
  reviewCount: string;
  social: { network: SiteSettings["social"][number]["network"]; url: string }[];
  badges: { name: string; url: string | null }[];
}>;

const socialLabels: Record<string, string> = { facebook: "Facebook", instagram: "Instagram", linkedin: "LinkedIn" };

export async function getSiteSettings(): Promise<SiteSettings> {
  const data = await sanityFetch<SanitySettings>(
    `*[_id == "siteSettings"][0]{
      phone, email, street, city, region, postalCode, hoursText, mapsUrl, foundedYear, googleRating, reviewCount,
      social[]{network, url},
      "badges": badges[show == true]{name, "url": image.asset->url}
    }`,
    {},
    ["siteSettings"],
  );
  const f = fallbackSettings;
  const phone = pick(data?.phone, f.phone);
  const digits = phone.replace(/\D/g, "");
  const social = (data?.social ?? [])
    .filter((x) => x?.url && x.network in socialLabels)
    .map((x) => ({ network: x.network, href: x.url, label: socialLabels[x.network] }));
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
    foundedYear: pick(data?.foundedYear, f.foundedYear),
    googleRating: pick(data?.googleRating, f.googleRating),
    reviewCount: pick(data?.reviewCount, f.reviewCount),
    social: social.length ? social : f.social,
    badges: (data?.badges ?? []).filter((b) => b?.url).map((b) => ({ name: b.name, url: b.url as string })),
  };
}

export type Navigation = { mainLinks: { label: string; href: string }[]; headerCtaLabel: string; footerCompanyLinks: { label: string; href: string }[] };

export const fallbackNavigation: Navigation = {
  mainLinks: [
    { label: "Results", href: "/#results" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  headerCtaLabel: "Free audit",
  footerCompanyLinks: [
    { label: "About", href: "/about" },
    { label: "Results", href: "/#results" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
    { label: "Free growth audit", href: "/contact" },
  ],
};

export async function getNavigation(): Promise<Navigation> {
  const data = await sanityFetch<Partial<Navigation>>(
    `*[_id == "navigation"][0]{"mainLinks": mainLinks[]{label, href}, headerCtaLabel, "footerCompanyLinks": footerCompanyLinks[]{label, href}}`,
    {},
    ["navigation"],
  );
  const f = fallbackNavigation;
  return {
    mainLinks: pickList(data?.mainLinks?.filter((l) => l?.label && l?.href), f.mainLinks),
    headerCtaLabel: pick(data?.headerCtaLabel, f.headerCtaLabel),
    footerCompanyLinks: pickList(data?.footerCompanyLinks?.filter((l) => l?.label && l?.href), f.footerCompanyLinks),
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

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const data = await sanityFetch<(CaseStudy & { attribution?: string })[]>(
    `*[_type == "caseStudy" && defined(client)] | order(order asc){client, industry, challenge, result, attribution}`,
    {},
    ["caseStudy"],
  );
  const list: CaseStudy[] = (data ?? []).map((c) => ({
    client: c.client,
    industry: c.industry ?? "",
    challenge: c.challenge ?? "",
    result: c.result ?? "",
    metricLabel: c.attribution ?? undefined,
  }));
  return pickList(list, fallbackHome.results.cases);
}

export async function getClientLogos(): Promise<{ name: string; src?: string }[]> {
  const data = await sanityFetch<{ name: string; src: string | null }[]>(
    `*[_type == "clientLogo" && defined(logo.asset)] | order(order asc){name, "src": logo.asset->url}`,
    {},
    ["clientLogo"],
  );
  const list = (data ?? []).filter((l) => l.src).map((l) => ({ name: l.name, src: l.src as string }));
  return pickList(list, fallbackHome.logos.items);
}

type SanityHome = Partial<{
  heroEyebrow: string;
  heroHeading: string;
  heroText: string;
  logosHeading: string;
  problemEyebrow: string;
  problemHeading: string;
  problemBroken: Step[];
  problemFixes: Step[];
  servicesEyebrow: string;
  servicesHeading: string;
  servicesIntro: string;
  seEyebrow: string;
  seHeading: string;
  seText: string;
  sePoints: string[];
  sePlatforms: string[];
  resultsEyebrow: string;
  resultsHeading: string;
  resultsIntro: string;
  stats: Stat[];
  resultsFootnote: string;
  processEyebrow: string;
  processHeading: string;
  processIntro: string;
  process: Step[];
  industriesEyebrow: string;
  industriesHeading: string;
  industryCards: HomeContent["industries"]["cards"];
  industriesMore: string;
  aiEyebrow: string;
  aiHeading: string;
  aiText: string;
  aiPoints: Step[];
  testimonialsEyebrow: string;
  testimonialsHeading: string;
  faqEyebrow: string;
  faqHeading: string;
  faqs: Faq[];
  ctaHeading: string;
  ctaText: string;
  seo: { title?: string; description?: string };
}>;

const stepsOf = (list: Step[] | undefined) => list?.filter((x) => x?.title).map((x) => ({ title: x.title, text: x.text ?? "" }));

export async function getHomeContent(): Promise<HomeContent> {
  const [data, cases, logos] = await Promise.all([
    sanityFetch<SanityHome>(`*[_id == "homePage"][0]`, {}, ["homePage"]),
    getCaseStudies(),
    getClientLogos(),
  ]);
  const f = fallbackHome;
  const d = data ?? {};
  return {
    seo: { title: pick(d.seo?.title, f.seo.title), description: pick(d.seo?.description, f.seo.description) },
    hero: { eyebrow: pick(d.heroEyebrow, f.hero.eyebrow), heading: pick(d.heroHeading, f.hero.heading), text: pick(d.heroText, f.hero.text) },
    logos: { heading: pick(d.logosHeading, f.logos.heading), items: logos },
    problem: {
      eyebrow: pick(d.problemEyebrow, f.problem.eyebrow),
      heading: pick(d.problemHeading, f.problem.heading),
      broken: pickList(stepsOf(d.problemBroken), f.problem.broken),
      fixes: pickList(stepsOf(d.problemFixes), f.problem.fixes),
    },
    services: { eyebrow: pick(d.servicesEyebrow, f.services.eyebrow), heading: pick(d.servicesHeading, f.services.heading), intro: pick(d.servicesIntro, f.services.intro) },
    searchEverywhere: {
      eyebrow: pick(d.seEyebrow, f.searchEverywhere.eyebrow),
      heading: pick(d.seHeading, f.searchEverywhere.heading),
      text: pick(d.seText, f.searchEverywhere.text),
      points: pickList(d.sePoints, f.searchEverywhere.points),
      platforms: pickList(d.sePlatforms, f.searchEverywhere.platforms).slice(0, 6),
    },
    results: {
      eyebrow: pick(d.resultsEyebrow, f.results.eyebrow),
      heading: pick(d.resultsHeading, f.results.heading),
      intro: pick(d.resultsIntro, f.results.intro),
      stats: pickList(d.stats?.filter((x) => x?.value), f.results.stats),
      cases,
      footnote: pick(d.resultsFootnote, f.results.footnote),
    },
    process: {
      eyebrow: pick(d.processEyebrow, f.process.eyebrow),
      heading: pick(d.processHeading, f.process.heading),
      intro: pick(d.processIntro, f.process.intro),
      steps: pickList(stepsOf(d.process), f.process.steps),
    },
    industries: {
      eyebrow: pick(d.industriesEyebrow, f.industries.eyebrow),
      heading: pick(d.industriesHeading, f.industries.heading),
      cards: pickList(d.industryCards?.filter((c) => c?.title && c?.href).map((c) => ({ ...c, tags: c.tags ?? [] })), f.industries.cards),
      more: pick(d.industriesMore, f.industries.more),
    },
    aiCrm: { eyebrow: pick(d.aiEyebrow, f.aiCrm.eyebrow), heading: pick(d.aiHeading, f.aiCrm.heading), text: pick(d.aiText, f.aiCrm.text), points: pickList(stepsOf(d.aiPoints), f.aiCrm.points) },
    testimonials: { eyebrow: pick(d.testimonialsEyebrow, f.testimonials.eyebrow), heading: pick(d.testimonialsHeading, f.testimonials.heading) },
    faq: {
      eyebrow: pick(d.faqEyebrow, f.faq.eyebrow),
      heading: pick(d.faqHeading, f.faq.heading),
      items: pickList(d.faqs?.filter((x) => x?.question && x?.answer), f.faq.items),
    },
    cta: { heading: pick(d.ctaHeading, f.cta.heading), text: pick(d.ctaText, f.cta.text) },
  };
}
