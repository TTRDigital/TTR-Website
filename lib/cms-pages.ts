import type { PortableTextBlock } from "@portabletext/react";
import { sanityFetch } from "@/lib/sanity/fetch";
import { getServicePage, type ServicePage } from "@/lib/data/services";
import { getIndustryPage, type IndustryPage } from "@/lib/data/industries";
import type { Faq, Step, Testimonial } from "@/lib/content";
import type { MockupKind } from "@/components/mockups/ServiceMockups";

/* Service and industry pages: Sanity wins field by field, lib/data fills gaps. */

const pick = <T,>(value: T | null | undefined, fallback: T): T =>
  value === null || value === undefined || (typeof value === "string" && value.trim() === "") ? fallback : value;

const pickList = <T,>(value: T[] | null | undefined, fallback: T[]): T[] =>
  Array.isArray(value) && value.length > 0 ? value : fallback;

const mockups: MockupKind[] = ["ranking", "ads", "ai-answer", "meta", "website", "social", "crm", "agent"];
const pickMockup = (value: string | null | undefined, fallback: MockupKind): MockupKind =>
  mockups.includes(value as MockupKind) ? (value as MockupKind) : fallback;

const steps = (arr: Partial<Step>[] | null | undefined) =>
  (arr ?? []).filter((s): s is Step => !!s?.title && !!s?.text).map((s) => ({ title: s.title, text: s.text }));
const faqs = (arr: Partial<Faq>[] | null | undefined) =>
  (arr ?? []).filter((f): f is Faq => !!f?.question && !!f?.answer).map((f) => ({ question: f.question, answer: f.answer }));

/* ---------- Services ---------- */

export type ServicePageData = ServicePage & {
  body: PortableTextBlock[] | null;
  testimonial: Testimonial | null;
};

type SanityService = Partial<{
  title: string;
  eyebrow: string;
  heading: string;
  intro: string;
  mockup: string;
  included: Partial<Step>[];
  body: PortableTextBlock[];
  process: Partial<Step>[];
  audiences: Partial<{ dental: string; homeServices: string; other: string }>;
  related: (string | null)[];
  proofStats: { value: string; label: string }[];
  proofTestimonial: { quote: string; name?: string; role?: string; company?: string } | null;
  proofResult: string;
  faqs: Partial<Faq>[];
  seo: Partial<{ title: string; description: string }>;
}>;

export async function getServicePageData(slug: string, fallbackTestimonials: Testimonial[]): Promise<ServicePageData | null> {
  const base = getServicePage(slug);
  if (!base) return null;
  const doc = await sanityFetch<SanityService | null>(
    `*[_type == "service" && slug.current in $slugs][0]{
      title, eyebrow, heading, intro, mockup, included, body, process, audiences,
      "related": related[]->slug.current,
      proofStats, "proofTestimonial": proofTestimonial->{quote, name, role, company},
      proofResult, faqs, seo
    }`,
    { slugs: [slug, ...legacySlugs(slug)] },
    ["service", `service:${slug}`],
  );
  const d = doc ?? {};
  const related = (d.related ?? []).map((r) => (r ? canonical(r) : null)).filter((r): r is string => !!r && r !== slug);
  const fallbackTestimonial = base.proof.testimonialIndex !== undefined ? (fallbackTestimonials[base.proof.testimonialIndex] ?? null) : null;
  const t = d.proofTestimonial;
  return {
    ...base,
    title: pick(d.title, base.title),
    seo: { title: pick(d.seo?.title, base.seo.title), description: pick(d.seo?.description, base.seo.description) },
    eyebrow: pick(d.eyebrow, base.eyebrow),
    heading: pick(d.heading, base.heading),
    intro: pick(d.intro, base.intro),
    mockup: pickMockup(d.mockup, base.mockup),
    included: pickList(steps(d.included), base.included),
    process: pickList(steps(d.process), base.process),
    audiences: {
      dental: pick(d.audiences?.dental, base.audiences.dental),
      homeServices: pick(d.audiences?.homeServices, base.audiences.homeServices),
      other: pick(d.audiences?.other, base.audiences.other),
    },
    related: pickList(related, base.related),
    proof: {
      stats: pickList((d.proofStats ?? []).filter((s) => s?.value && s?.label), base.proof.stats ?? []),
      placeholder: pick(d.proofResult, base.proof.placeholder ?? ""),
    },
    faqs: pickList(faqs(d.faqs), base.faqs),
    body: Array.isArray(d.body) && d.body.length ? d.body : null,
    testimonial: t?.quote
      ? { quote: t.quote.replace(/(\d+)-(\d+)/g, "$1 to $2"), name: t.name ?? null, role: t.role ?? null, company: t.company ?? null }
      : fallbackTestimonial,
  };
}

const aliases: Record<string, string> = { websites: "website-design", "social-media": "social-media-marketing" };
const canonical = (s: string) => aliases[s] ?? s;
const legacySlugs = (s: string) => Object.entries(aliases).filter(([, v]) => v === s).map(([k]) => k);

/* ---------- Industry pages ---------- */

type SanityNiche = Partial<{
  title: string;
  eyebrow: string;
  heading: string;
  intro: string;
  mockup: string;
  problems: Partial<Step>[];
  systemHeading: string;
  systemIntro: string;
  systemItems: { slug: string | null; why: string | null }[];
  trades: { name: string | null; text: string | null }[];
  process: Partial<Step>[];
  proofResult: string;
  faqs: Partial<Faq>[];
  ctaHeading: string;
  seo: Partial<{ title: string; description: string }>;
}>;

export async function getIndustryData(slug: string): Promise<IndustryPage> {
  const base = getIndustryPage(slug);
  if (!base) throw new Error(`Unknown industry page: ${slug}`);
  const doc = await sanityFetch<SanityNiche | null>(
    `*[_type == "nichePage" && slug.current == $slug][0]{
      eyebrow, heading, intro, mockup, problems, systemHeading, systemIntro,
      "systemItems": systemItems[]{"slug": service->slug.current, why},
      trades, process, proofResult, faqs, ctaHeading, seo
    }`,
    { slug },
    ["nichePage", `nichePage:${slug}`],
  );
  const d = doc ?? {};
  const system = (d.systemItems ?? [])
    .filter((x): x is { slug: string; why: string } => !!x.slug && !!x.why)
    .map((x) => ({ slug: canonical(x.slug), why: x.why }));
  const trades = (d.trades ?? []).filter((x): x is { name: string; text: string } => !!x.name && !!x.text);
  return {
    ...base,
    seo: { title: pick(d.seo?.title, base.seo.title), description: pick(d.seo?.description, base.seo.description) },
    eyebrow: pick(d.eyebrow, base.eyebrow),
    heading: pick(d.heading, base.heading),
    intro: pick(d.intro, base.intro),
    mockup: pickMockup(d.mockup, base.mockup),
    pains: pickList(steps(d.problems), base.pains),
    systemHeading: pick(d.systemHeading, base.systemHeading),
    systemIntro: pick(d.systemIntro, base.systemIntro),
    system: pickList(system, base.system),
    trades: base.trades ? pickList(trades, base.trades) : trades.length ? trades : undefined,
    month: pickList(steps(d.process), base.month),
    proofPlaceholder: pick(d.proofResult, base.proofPlaceholder),
    faqs: pickList(faqs(d.faqs), base.faqs),
    ctaHeading: pick(d.ctaHeading, base.ctaHeading),
  };
}
