// Phase 3 content fixes. Patches and creates only; never deletes.
// 1. Splits body blocks where the earlier import merged a heading and its
//    paragraph into one h2 block. Headings are listed explicitly per block.
// 2. Adds real blog categories and assigns posts.
// 3. Refreshes post SEO titles/descriptions that still referenced 2021.
// The client has no token: the environment's credential proxy adds auth.
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19",
  useCdn: false,
});

const headings = {
  "niche-dental-marketing": { k38: "Show up when patients search", k3g: "Ads for the treatments you want", k3o: "Turn more calls into booked visits" },
  "niche-home-services-marketing": { k3w: "Win the map pack in your service area", k41: "Ads that ring the phone", k49: "Book more of the calls you already get" },
  "page-about": { k4h: "Who we are", k4x: "Leadership", k51: "What we do" },
  "page-privacy": { k67: "Information we collect", k69: "How we use it", k6b: "How we store and share it", k6d: "Cookies", k6f: "Your choices", k6h: "Children", k6j: "Contact" },
  "page-terms": { k6l: "Using this website", k6n: "Information on this site", k6p: "Our services", k6r: "Text messages and calls", k6t: "Intellectual property", k6v: "Links to other sites", k6x: "Limitation of liability", k6z: "Changes", k71: "Contact" },
  "service-ai-agents": { k2t: "Never miss a lead after hours", k2v: "Built on your CRM", k30: "Great for busy offices" },
  "service-gohighlevel-crm": { k2d: "Why follow up speed matters", k2f: "Works with your marketing" },
  "service-google-ads": { kr: "Ads that match what people search", kt: "Landing pages matter as much as ads", k11: "Ads and SEO work better together" },
  "service-meta-ads": { k16: "Why Meta Ads work for local businesses", k18: "Speed to lead is everything", k1g: "Build trust with good content" },
  "service-search-everywhere-optimization": { kc: "Why classic SEO is not enough anymore", kh: "What AI tools look for", kj: "Great for local service businesses" },
  "service-seo": { k0: "Local SEO for businesses that live on calls", k2: "SEO that also works for AI search", k7: "Pair it with ads for faster results" },
  "service-social-media": { k20: "Social proof that helps every other channel", k28: "Content that answers real questions" },
  "service-websites": { k1l: "Speed and clarity win", k1n: "Built for search from the start", k1v: "Connected to your follow up" },
  "wp-post-10174": { k75: "1. Pick two or three platforms", k77: "2. Know what you want people to do", k7l: "4. Stay consistent", k7n: "5. Reply fast", k7s: "6. Boost what works with ads", k7x: "Want help?" },
  "wp-post-1709": { k9j: "Local search is still where customers start", k9o: "Search moved beyond Google's blue links", k9t: "Video and social proof matter more", k9y: "Speed to lead wins jobs", ka6: "Track calls, not just clicks", ka8: "Where to start" },
  "wp-post-9966": { k92: "Red flags to watch for", k94: "How to judge the value", k96: "Get a clear plan for your business" },
};

function splitBody(id, body) {
  const map = headings[id] ?? {};
  const out = [];
  let changed = 0;
  for (const block of body) {
    const heading = map[block._key];
    const first = block.children?.[0];
    if (block._type !== "block" || block.style !== "h2" || !heading || !first?.text?.startsWith(heading + " ")) {
      out.push(block);
      continue;
    }
    changed++;
    out.push({ ...block, markDefs: [], children: [{ ...first, _key: first._key + "h", marks: [], text: heading }] });
    out.push({
      ...block,
      _key: block._key + "p",
      style: "normal",
      children: [{ ...first, text: first.text.slice(heading.length + 1) }, ...block.children.slice(1)],
    });
  }
  return { out, changed };
}

const docs = await client.fetch(`*[_id in $ids]{_id, body}`, { ids: Object.keys(headings) });
let tx = client.transaction();
for (const doc of docs) {
  const { out, changed } = splitBody(doc._id, doc.body ?? []);
  console.log(`${doc._id}: split ${changed} block(s)`);
  if (changed) tx = tx.patch(doc._id, (p) => p.set({ body: out }));
}

const categories = [
  { _id: "category-seo-ai-search", title: "SEO and AI search", slug: "seo-ai-search", description: "Getting found on Google, Maps and AI answers." },
  { _id: "category-social-media", title: "Social media", slug: "social-media", description: "Social media and Meta Ads for local businesses." },
  { _id: "category-local-marketing", title: "Local marketing", slug: "local-marketing", description: "Strategy, trends and follow up for local businesses." },
];
for (const c of categories) {
  tx = tx.createIfNotExists({ _id: c._id, _type: "category", title: c.title, slug: { _type: "slug", current: c.slug }, description: c.description });
}
const ref = (id) => ({ _key: id, _type: "reference", _ref: id });
tx = tx
  .patch("wp-post-9966", (p) =>
    p.set({
      categories: [ref("category-seo-ai-search")],
      "seo.title": "How Much Does SEO Cost? What Drives SEO Pricing | TTR",
      "seo.description": "What drives the cost of SEO, what good SEO work should include, and the red flags to watch for before you hire an SEO agency.",
    }),
  )
  .patch("wp-post-10174", (p) =>
    p.set({
      categories: [ref("category-social-media")],
      "seo.title": "Social Media Strategy for Local Businesses | TTR",
      "seo.description": "A simple social media plan for local businesses: pick the right platforms, post what customers care about and turn followers into calls.",
    }),
  )
  .patch("wp-post-1709", (p) =>
    p.set({
      categories: [ref("category-local-marketing"), ref("category-seo-ai-search")],
      "seo.title": "Local Marketing Trends: What Held Up Since 2020 | TTR",
      "seo.description": "We first wrote about local marketing trends in 2020. Here is what held up, what changed with AI search and what to focus on now.",
    }),
  );

const res = await tx.commit();
console.log("committed", res.transactionId, res.results.length, "operations");
