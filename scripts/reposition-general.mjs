// Remove "Miami" positioning from site copy in Sanity (general agency wording).
// Contact details, map and legal addresses are left as they are.
// Patches only; never deletes. Client has no token (proxy adds auth).
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19",
  useCdn: false,
});

const FAQ_Q = "Can we work together remotely?";
const FAQ_A =
  "Yes. Your audit, strategy calls and monthly reports all happen over video, phone and email, so working with us is easy wherever your business is.";

// Exact text swaps inside existing values (path -> [from, to]).
const swaps = {
  homePage: {
    heroEyebrow: ["Miami digital marketing agency", "Digital marketing agency"],
    "seo.title": ["Miami Digital Marketing Agency for Local Businesses | TTR", "Digital Marketing Agency for Local Businesses | TTR"],
  },
  siteSettings: {
    "defaultSeo.title": ["TTR Digital Marketing | Miami Digital Marketing Agency", "TTR Digital Marketing | Digital Marketing Agency"],
  },
  "page-about": {
    intro: ["is a digital marketing agency on Brickell Avenue in Miami.", "is a digital marketing agency for local businesses."],
    "seo.title": ["About TTR Digital Marketing | Miami Marketing Agency", "About TTR Digital Marketing | Digital Marketing Agency"],
    "seo.description": ["a Miami digital marketing agency", "a digital marketing agency"],
  },
  "page-contact": {
    intro: ["Call us, stop by our Brickell office or send a quick message.", "Call us or send a quick message."],
    "seo.description": [
      "Call (786) 460-1311 or send a message to book your free growth audit. TTR Digital Marketing, 1000 Brickell Ave Ste 715, Miami, FL.",
      "Call (786) 460-1311 or send a message to book your free growth audit with TTR Digital Marketing. We reply within one business day.",
    ],
  },
  "service-seo": {
    "seo.title": ["Local SEO Services in Miami | TTR Digital Marketing", "Local SEO Services | TTR Digital Marketing"],
    "seo.description": ["Free SEO audit from our Miami team.", "Free SEO audit from our team."],
  },
  "service-search-everywhere-optimization": {
    "seo.description": ["Search Everywhere Optimization from TTR in Miami.", "Search Everywhere Optimization from TTR."],
  },
  "service-google-ads": {
    "seo.title": ["Google Ads Management in Miami | TTR Digital Marketing", "Google Ads Management Services | TTR Digital Marketing"],
    "seo.description": ["managed by TTR Digital in Miami.", "managed by TTR Digital Marketing."],
  },
  "service-websites": {
    "seo.title": ["Website Design for Local Businesses in Miami | TTR", "Website Design for Local Businesses | TTR"],
    "seo.description": ["Website design from TTR Digital in Miami.", "Website design from TTR Digital Marketing."],
  },
  "service-social-media": { "seo.description": ["Social media marketing from TTR in Miami.", "Social media marketing from TTR."] },
  "service-gohighlevel-crm": { "seo.description": ["CRM and automation services from TTR in Miami.", "CRM and automation services from TTR."] },
  "service-ai-agents": { "seo.description": ["AI automation from TTR in Miami.", "AI automation from TTR."] },
};

// Example searches inside rich text bodies.
const bodySwaps = {
  "niche-dental-marketing": ['"dental implants Miami"', '"dental implants near me"'],
  "service-search-everywhere-optimization": ['"best roofer in Miami"', '"best roofer near me"'],
};

const get = (obj, path) => path.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
let tx = client.transaction();
let count = 0;

for (const [id, fields] of Object.entries(swaps)) {
  const doc = await client.getDocument(id);
  if (!doc) { console.log("missing", id); continue; }
  const set = {};
  for (const [path, [from, to]] of Object.entries(fields)) {
    const cur = get(doc, path);
    if (typeof cur === "string" && cur.includes(from)) set[path] = cur.replace(from, to);
    else console.log("skip (not found)", id, path);
  }
  if (Object.keys(set).length) { tx = tx.patch(id, (p) => p.set(set)); count += Object.keys(set).length; }
}

// Home FAQ about Miami
const home = await client.getDocument("homePage");
const faq = (home?.faqs ?? []).find((f) => /Miami/.test(f.question ?? ""));
if (faq) { tx = tx.patch("homePage", (p) => p.set({ [`faqs[_key=="${faq._key}"].question`]: FAQ_Q, [`faqs[_key=="${faq._key}"].answer`]: FAQ_A })); count += 2; }

for (const [id, [from, to]] of Object.entries(bodySwaps)) {
  const doc = await client.getDocument(id);
  for (const block of doc?.body ?? []) {
    for (const span of block.children ?? []) {
      if (typeof span.text === "string" && span.text.includes(from)) {
        tx = tx.patch(id, (p) => p.set({ [`body[_key=="${block._key}"].children[_key=="${span._key}"].text`]: span.text.replace(from, to) }));
        count++;
      }
    }
  }
}

const res = await tx.commit();
console.log("committed", res.transactionId, count, "field updates");
