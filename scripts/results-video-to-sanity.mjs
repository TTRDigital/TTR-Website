// Copy the Results video testimonial into the home page document in Sanity,
// so it can be edited in Studio > Home page > Proof.
// setIfMissing only: never overwrites a value an editor has entered.
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19",
  useCdn: false,
});

const res = await client
  .patch("homePage")
  .setIfMissing({
    resultsVideoUrl: "https://www.youtube.com/watch?v=ZH0ZslLyzdg",
    resultsVideoTitle: "Why Dr. Medi Adili trusts TTR with dental marketing.",
    resultsVideoPerson: "Dr. Medi Adili",
    resultsVideoBusiness: "Ideal Dental Solutions",
  })
  .commit();
console.log("Patched", res._id, {
  resultsVideoUrl: res.resultsVideoUrl,
  resultsVideoTitle: res.resultsVideoTitle,
  resultsVideoPerson: res.resultsVideoPerson,
  resultsVideoBusiness: res.resultsVideoBusiness,
});
