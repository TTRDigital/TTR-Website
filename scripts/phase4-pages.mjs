// Sync About and Contact hero copy and SEO into Sanity so editors change what
// the site shows. Patches only. Client has no token (proxy adds auth).
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19",
  useCdn: false,
});

const res = await client
  .transaction()
  .patch("page-about", (p) =>
    p.set({
      heading: "Meet your new growth partner.",
      intro:
        "TTR Digital Marketing is a digital marketing agency on Brickell Avenue in Miami. Since 2015 we have helped local businesses get found online and turn that attention into calls and booked jobs, with SEO, ads, websites, CRM and AI working together.",
      "seo.title": "About TTR Digital Marketing | Miami Marketing Agency",
      "seo.description":
        "Meet TTR Digital Marketing, a Miami digital marketing agency helping local businesses grow since 2015 with SEO, ads, websites, CRM and AI.",
    }),
  )
  .patch("page-contact", (p) =>
    p.set({
      heading: "Let's talk about growing your business.",
      intro:
        "Call us, stop by our Brickell office or send a quick message. We will get back to you within one business day to set up your free growth audit.",
      "seo.title": "Contact TTR Digital Marketing | Free Growth Audit",
      "seo.description":
        "Call (786) 460-1311 or send a message to book your free growth audit. TTR Digital Marketing, 1000 Brickell Ave Ste 715, Miami, FL.",
    }),
  )
  .commit();
console.log("committed", res.transactionId);
