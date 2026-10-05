// Phase 4 content migration. Run with:
//   node --experimental-strip-types --no-warnings scripts/phase4-migrate.mjs
// Writes the site copy into the new Sanity fields. Patches existing
// documents and creates new ones with createIfNotExists. Never deletes.
// The client has no token: the environment's credential proxy adds auth.
import { createClient } from "@sanity/client";
import { servicePages } from "../lib/data/services.ts";
import { industryPages } from "../lib/data/industries.ts";
import { fallbackHome } from "../lib/data/home.ts";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19",
  useCdn: false,
});

let k = 0;
const key = (p = "k") => `${p}${(k++).toString(36)}`;
const steps = (arr) => arr.map((s) => ({ _key: key("s"), _type: "step", title: s.title, text: s.text }));
const faqs = (arr) => arr.map((f) => ({ _key: key("f"), _type: "faqItem", question: f.question, answer: f.answer }));
const stats = (arr) =>
  arr.map((s) => ({ _key: key("t"), _type: "stat", value: s.value, label: s.label, ...(s.countTo ? { countTo: s.countTo } : {}), ...(s.prefix ? { prefix: s.prefix } : {}), ...(s.suffix ? { suffix: s.suffix } : {}) }));
const ref = (id) => ({ _key: key("r"), _type: "reference", _ref: id });

// Existing document IDs (the earlier build used short slugs for two IDs).
const serviceIds = {
  seo: "service-seo",
  "search-everywhere-optimization": "service-search-everywhere-optimization",
  "google-ads": "service-google-ads",
  "meta-ads": "service-meta-ads",
  "website-design": "service-websites",
  "social-media-marketing": "service-social-media",
  "gohighlevel-crm": "service-gohighlevel-crm",
  "ai-agents": "service-ai-agents",
};

// Internal links: first mention of another service in a body becomes a link.
const linkPhrases = [
  ["GoHighLevel", "/services/gohighlevel-crm"],
  ["Search Everywhere Optimization", "/services/search-everywhere-optimization"],
  ["Google Ads", "/services/google-ads"],
  ["Meta Ads", "/services/meta-ads"],
  ["AI agent", "/services/ai-agents"],
  ["website service", "/services/website-design"],
  ["social media marketing service", "/services/social-media-marketing"],
  ["SEO", "/services/seo"],
];

function paragraphBlock(text, linked, selfPath) {
  // Find the earliest phrase in this paragraph that has not been linked yet.
  let best = null;
  for (const [phrase, href] of linkPhrases) {
    if (href === selfPath || linked.has(href)) continue;
    const re = new RegExp(`\\b${phrase}\\b`);
    const m = re.exec(text);
    if (m && (!best || m.index < best.index)) best = { index: m.index, phrase, href };
  }
  const markKey = key("m");
  const children = best
    ? [
        { _key: key("c"), _type: "span", marks: [], text: text.slice(0, best.index) },
        { _key: key("c"), _type: "span", marks: [markKey], text: best.phrase },
        { _key: key("c"), _type: "span", marks: [], text: text.slice(best.index + best.phrase.length) },
      ].filter((c) => c.text)
    : [{ _key: key("c"), _type: "span", marks: [], text }];
  if (best) linked.add(best.href);
  return { _key: key("b"), _type: "block", style: "normal", markDefs: best ? [{ _key: markKey, _type: "link", href: best.href }] : [], children };
}

function sectionsToBody(sections, selfPath) {
  const linked = new Set();
  const out = [];
  for (const sec of sections) {
    out.push({ _key: key("b"), _type: "block", style: "h2", markDefs: [], children: [{ _key: key("c"), _type: "span", marks: [], text: sec.heading }] });
    for (const p of sec.paragraphs) out.push(paragraphBlock(p, linked, selfPath));
  }
  return out;
}

let tx = client.transaction();

/* Services */
for (const s of servicePages) {
  tx = tx.patch(serviceIds[s.slug], (p) =>
    p.set({
      eyebrow: s.eyebrow,
      heading: s.heading,
      intro: s.intro,
      mockup: s.mockup,
      included: steps(s.included),
      body: sectionsToBody(s.sections, `/services/${s.slug}`),
      process: steps(s.process),
      audiences: { _type: "object", dental: s.audiences.dental, homeServices: s.audiences.homeServices, other: s.audiences.other },
      related: s.related.map((r) => ref(serviceIds[r])),
      proofStats: stats(s.proof.stats ?? []),
      ...(s.proof.testimonialIndex === 0 ? { proofTestimonial: { _type: "reference", _ref: "testimonial-1" } } : {}),
      proofResult: s.proof.placeholder ?? "",
      faqs: faqs(s.faqs),
      "seo.title": s.seo.title,
      "seo.description": s.seo.description,
    }),
  );
}

/* Industry pages */
const nicheIds = { "dental-marketing": "niche-dental-marketing", "home-services-marketing": "niche-home-services-marketing" };
for (const n of industryPages) {
  tx = tx.patch(nicheIds[n.slug], (p) =>
    p.set({
      eyebrow: n.eyebrow,
      heading: n.heading,
      intro: n.intro,
      mockup: n.mockup,
      problems: steps(n.pains),
      systemHeading: n.systemHeading,
      systemIntro: n.systemIntro,
      systemItems: n.system.map((x) => ({ _key: key("y"), _type: "systemItem", service: { _type: "reference", _ref: serviceIds[x.slug] }, why: x.why })),
      trades: (n.trades ?? []).map((t) => ({ _key: key("d"), _type: "trade", name: t.name, text: t.text })),
      process: steps(n.month),
      proofResult: n.proofPlaceholder,
      faqs: faqs(n.faqs),
      ctaHeading: n.ctaHeading,
      "seo.title": n.seo.title,
      "seo.description": n.seo.description,
    }),
  );
}

/* Home page */
const h = fallbackHome;
tx = tx.patch("homePage", (p) =>
  p.set({
    logosHeading: h.logos.heading,
    problemEyebrow: h.problem.eyebrow,
    problemHeading: h.problem.heading,
    problemBroken: steps(h.problem.broken),
    problemFixes: steps(h.problem.fixes),
    servicesEyebrow: h.services.eyebrow,
    servicesHeading: h.services.heading,
    servicesIntro: h.services.intro,
    seEyebrow: h.searchEverywhere.eyebrow,
    seHeading: h.searchEverywhere.heading,
    seText: h.searchEverywhere.text,
    sePoints: h.searchEverywhere.points,
    sePlatforms: h.searchEverywhere.platforms,
    resultsEyebrow: h.results.eyebrow,
    resultsHeading: h.results.heading,
    resultsIntro: h.results.intro,
    stats: stats(h.results.stats),
    resultsFootnote: h.results.footnote,
    processEyebrow: h.process.eyebrow,
    processHeading: h.process.heading,
    processIntro: h.process.intro,
    process: steps(h.process.steps),
    industriesEyebrow: h.industries.eyebrow,
    industriesHeading: h.industries.heading,
    industryCards: h.industries.cards.map((c) => ({ _key: key("i"), _type: "industryCard", ...c })),
    industriesMore: h.industries.more,
    aiEyebrow: h.aiCrm.eyebrow,
    aiHeading: h.aiCrm.heading,
    aiText: h.aiCrm.text,
    aiPoints: steps(h.aiCrm.points),
    testimonialsEyebrow: h.testimonials.eyebrow,
    testimonialsHeading: h.testimonials.heading,
    faqEyebrow: h.faq.eyebrow,
    faqHeading: h.faq.heading,
  }),
);

/* Site settings: new fields, badges hidden until confirmed */
const settings = await client.fetch(`*[_id == "siteSettings"][0]{badges}`);
tx = tx.patch("siteSettings", (p) =>
  p.set({
    foundedYear: 2015,
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=TTR+Digital+Marketing%2C+1000+Brickell+Ave+Ste+715%2C+Miami%2C+FL+33131",
    social: [
      { _key: key("n"), _type: "socialLink", network: "facebook", url: "https://www.facebook.com/TTRDigitalMarketing/" },
      { _key: key("n"), _type: "socialLink", network: "instagram", url: "https://www.instagram.com/ttrdigitalmarketing/" },
      { _key: key("n"), _type: "socialLink", network: "linkedin", url: "https://www.linkedin.com/company/ttr-digital-marketing/" },
    ],
    badges: (settings?.badges ?? []).map((b) => ({ ...b, show: false })),
    "defaultSeo.title": "TTR Digital Marketing | Miami Digital Marketing Agency",
    "defaultSeo.description": "TTR Digital Marketing gets local businesses found on Google, ads and AI search, then turns that traffic into booked calls.",
  }),
);

/* New documents (left alone if they already exist) */
tx = tx.createIfNotExists({
  _id: "navigation",
  _type: "navigation",
  headerCtaLabel: "Free audit",
  mainLinks: [
    { _key: key("l"), _type: "linkItem", label: "Results", href: "/#results" },
    { _key: key("l"), _type: "linkItem", label: "About", href: "/about" },
    { _key: key("l"), _type: "linkItem", label: "Blog", href: "/blog" },
  ],
  footerCompanyLinks: [
    { _key: key("l"), _type: "linkItem", label: "About", href: "/about" },
    { _key: key("l"), _type: "linkItem", label: "Results", href: "/#results" },
    { _key: key("l"), _type: "linkItem", label: "Blog", href: "/blog" },
    { _key: key("l"), _type: "linkItem", label: "Contact", href: "/contact" },
    { _key: key("l"), _type: "linkItem", label: "Free growth audit", href: "/contact" },
  ],
});
h.results.cases.forEach((c, i) => {
  tx = tx.createIfNotExists({
    _id: `caseStudy-${i + 1}`,
    _type: "caseStudy",
    client: c.client,
    industry: c.industry,
    challenge: c.challenge,
    result: c.result,
    ...(c.metricLabel ? { attribution: c.metricLabel } : {}),
    order: i + 1,
  });
});
tx = tx.patch("wp-user-3", (p) =>
  p.setIfMissing({
    bio: "The TTR Digital Marketing team writes plain-English guides for local business owners, based on the work we do every day in SEO, ads, CRM and AI.",
  }),
);

const res = await tx.commit();
console.log("committed", res.transactionId, res.results.length, "operations");
