// Rewrites internal links that still use the earlier service slugs. Patch only.
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19",
  useCdn: false,
});

const map = { "/services/websites": "/services/website-design", "/services/social-media": "/services/social-media-marketing" };
const docs = await client.fetch(`*[defined(body) && count(body[].markDefs[href in $old]) > 0]{_id, body}`, { old: Object.keys(map) });
let tx = client.transaction();
for (const d of docs) {
  let n = 0;
  const body = d.body.map((b) => ({
    ...b,
    markDefs: (b.markDefs ?? []).map((m) => (map[m.href] ? (n++, { ...m, href: map[m.href] }) : m)),
  }));
  console.log(`${d._id}: ${n} link(s)`);
  tx = tx.patch(d._id, (p) => p.set({ body }));
}
if (docs.length) console.log("committed", (await tx.commit()).transactionId);
