// Privacy Policy and Terms & Conditions for Twilio A2P 10DLC registration.
// Rewrites the body of the two legal pages in Sanity (page-privacy, page-terms).
// Patches only; never deletes. Client has no token (proxy adds auth).
//
// Inline formatting in the text below: **bold** and [label](url).
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-02-19",
  useCdn: false,
});

const LEGAL = "TTR Digital Marketing LLC";
// The support email must be a @ttrdigitalmarketing.com address. None is confirmed
// is hello@ (confirmed by Kia), override with BUSINESS_EMAIL=name@ttrdigitalmarketing.com if needed.
const EMAIL = process.env.BUSINESS_EMAIL?.trim() || "hello@ttrdigitalmarketing.com";
if (!/^[^\s@]+@ttrdigitalmarketing\.com$/i.test(EMAIL)) {
  console.error("BUSINESS_EMAIL must be a @ttrdigitalmarketing.com address. This script changes the live CMS pages.");
  process.exit(1);
}
const PHONE = "(786) 460-1311";
const PHONE_HREF = "tel:+17864601311";
const ADDRESS = "1000 Brickell Ave Ste 715, Miami, FL 33131";
const UPDATED = "November 8, 2026";

let n = 0;
const key = () => `a2p${(n++).toString(36)}`;

/** One portable text block from a line with **bold** and [label](url). */
function block(text, style = "normal", listItem) {
  const children = [];
  const markDefs = [];
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;
  let last = 0;
  let m;
  const span = (t, marks = []) => t && children.push({ _type: "span", _key: key(), text: t, marks });
  while ((m = re.exec(text))) {
    span(text.slice(last, m.index));
    if (m[1]) span(m[1], ["strong"]);
    else {
      const k = key();
      markDefs.push({ _type: "link", _key: k, href: m[3] });
      span(m[2], [k]);
    }
    last = m.index + m[0].length;
  }
  span(text.slice(last));
  const b = { _type: "block", _key: key(), style, markDefs, children };
  if (listItem) Object.assign(b, { listItem, level: 1 });
  return b;
}

/** Lines starting "## " are headings, "- " bullets, anything else a paragraph. */
const body = (lines) => lines.map((l) => (l.startsWith("## ") ? block(l.slice(3), "h2") : l.startsWith("- ") ? block(l.slice(2), "normal", "bullet") : block(l)));

const contactLines = [
  `${LEGAL} (doing business as TTR Digital Marketing)`,
  `Address: ${ADDRESS}`,
  `Email: [${EMAIL}](mailto:${EMAIL})`,
  `Phone: [${PHONE}](${PHONE_HREF})`,
];

const privacy = body([
  "## Who we are",
  `TTR Digital Marketing is the business name of ${LEGAL}, a digital marketing agency. We provide SEO, AI search optimization, Google Ads, Meta Ads, website design, social media marketing, GoHighLevel CRM setup and AI agents for businesses. In this policy, "we", "us" and "our" mean ${LEGAL}.`,
  "## Information we collect through our forms",
  "When you fill out a form on this website, we collect:",
  "- Your name, phone number, email address and business name.",
  "- Your website address, the service you are interested in and any message you write, if you give them.",
  "- Your mobile phone number, if you enter one as your phone number, and your text message choice: whether you ticked the optional text message box. When you tick it, we also record the date and time, the page you were on, the phone number you entered, the exact consent wording and its version, and your IP address and browser type, as a record of your consent.",
  "- How you found us: the first page you visited, the website that sent you, and any campaign tags in the link (such as UTM, gclid or fbclid values).",
  "## Information collected automatically",
  "Like most websites, our servers and service providers receive basic technical data when you visit, such as your IP address, browser and device type, the pages you view and the time of your visit.",
  "## How we use your information",
  "- To reply to your inquiry, schedule a consultation and provide the services you ask for.",
  "- To send text messages, but only if you ticked the optional text message box (see Mobile Numbers and Text Messages below).",
  "- To call or email you about your request.",
  "- To understand how our website is used and improve it.",
  "- To protect our forms from spam and abuse.",
  "- To keep records we need for legal, tax and compliance reasons, including records of SMS consent and opt-outs.",
  "## Mobile Numbers and Text Messages",
  "When you enter a mobile phone number on our forms, we collect it so we can reply to your inquiry. If you also tick the optional text message box, TTR Digital Marketing will use your mobile number to send you text messages about your inquiry and our services. Message frequency varies. Message and data rates may apply. Reply STOP to cancel or HELP for help.",
  "Giving us your phone number on a form does not sign you up for text messages. The text message box is optional and is never ticked for you, and you can send the form without ticking it. Consent is not a condition of purchase.",
  "**Mobile information is not shared with third parties or affiliates for marketing purposes.** We do not sell, rent or share your mobile number, text message opt-in data or consent with third parties or affiliates, or with lead generators, for their marketing or promotional purposes. We may disclose information to service providers only as needed to operate and deliver our messaging program, and they may use it only for that purpose.",
  "## Service providers that process your information",
  "We use these providers to run our website and business. They process information on our behalf and only as needed to provide their service to us:",
  "- **TTR OS:** our own business system. It stores form submissions and consent records.",
  "- **Twilio:** delivers our text messages to mobile carriers.",
  "- **Vercel:** hosts this website and provides Vercel Web Analytics and Speed Insights.",
  "- **Google reCAPTCHA:** the \"I'm not a robot\" check on our forms. It is subject to the [Google Privacy Policy](https://policies.google.com/privacy) and [Terms of Service](https://policies.google.com/terms).",
  "## How we share information",
  "We do not sell your personal information. We share it only with the service providers listed above, as needed to run our business and deliver our services, and when the law requires it, for example to answer a valid legal request. Mobile numbers, SMS opt-in data and consent are never shared with anyone for their own marketing or promotional purposes, as described in SMS Communications above.",
  "## Cookies and analytics",
  "We use Vercel Web Analytics to count page views and see which pages are popular. It does not use cookies and does not identify you personally. Vercel Speed Insights measures how fast our pages load.",
  "Google reCAPTCHA may set cookies and collect device and browser information to tell people from bots when you use our forms.",
  "We keep how you found us (your first page, the referring website and campaign tags) in your browser's session storage until you close the tab, so it can be sent with your form. We do not use advertising cookies or tracking pixels. If that changes, we will update this policy first.",
  "You can block or delete cookies in your browser settings. The forms may not work without the reCAPTCHA check.",
  "## How long we keep information",
  "We keep form submissions for as long as we need them to work with you and for our business records. We keep SMS consent and opt-out records for as long as you are subscribed and for as long as afterwards as we need them to show that we had your consent.",
  "## Your choices",
  "- **Text messages:** reply STOP to any message to opt out, or HELP for assistance.",
  "- **Email:** use the unsubscribe link in any marketing email.",
  "- **Your information:** you can ask us to show you, correct or delete the personal information we hold about you by contacting us below. We may keep records the law requires us to keep, such as your SMS opt-out.",
  "## Security",
  "We use reputable providers and limit access to your information to people who need it. No method of sending or storing data online is completely secure, but we work to protect your information.",
  "## Children",
  "This website and our text messages are not meant for children under 13, and we do not knowingly collect their information.",
  "## Changes to this policy",
  "We may update this policy from time to time. The date at the top shows when it last changed.",
  "## Contact us about privacy",
  "Questions or requests about your privacy or your text messages? Contact us:",
  ...contactLines.map((l) => `- ${l}`),
]);

const terms = body([
  "## About us",
  `This website is run by ${LEGAL}, which does business as TTR Digital Marketing ("we", "us" or "our"). By using this website you agree to these terms. If you do not agree, please do not use the site.`,
  "## Information on this site",
  "The content on this site is for general information only. It is not legal, financial or professional advice for your specific situation. Marketing results depend on many factors outside our control, and past results do not promise future results.",
  "## Our services",
  "Any services we provide are covered by a separate written agreement between you and TTR Digital Marketing. If that agreement conflicts with these terms, the agreement wins.",
  "## Calls and emails",
  "When you send us a form, we may call or email you about your request. Sending a form does not sign you up for text messages; see the SMS Terms below.",
  "## SMS Terms",
  "**Program name:** TTR Digital Marketing.",
  "By ticking the optional text message box on our forms, you agree to receive text messages from TTR Digital Marketing about your inquiry and our services. Ticking the box is your choice and is not needed to send a form or to buy from us. Consent is not a condition of purchase.",
  "**Message frequency:** varies.",
  "**Costs:** message and data rates may apply.",
  "**Cancel:** reply STOP at any time to cancel. You may get one message confirming that you are unsubscribed.",
  "**Help:** reply HELP for help.",
  `**Support:** email [${EMAIL}](mailto:${EMAIL}) or call [${PHONE}](${PHONE_HREF}).`,
  "**Carriers:** carriers are not liable for delayed or undelivered messages.",
  "Mobile information is not shared with third parties or affiliates for marketing purposes. See our [Privacy Policy](/privacy-policy) for how we handle personal information.",
  "## Intellectual property",
  "The text, graphics, logos and other content on this site belong to TTR Digital Marketing or its licensors. Please do not copy them without permission.",
  "## Links to other sites",
  "We may link to other websites. We are not responsible for their content or privacy practices.",
  "## Limitation of liability",
  "This site is provided as is. To the extent allowed by law, TTR Digital Marketing is not liable for any damages that come from using this site.",
  "## Changes",
  "We may update these terms from time to time. The date at the top shows when they last changed.",
  "## Contact",
  ...contactLines.map((l) => `- ${l}`),
]);

const tx = client
  .transaction()
  .patch("page-privacy", (p) =>
    p.set({
      title: "Privacy Policy",
      heading: "Privacy Policy",
      intro: `How ${LEGAL} collects, uses and protects the information you share on this website, including text message consent. Last updated ${UPDATED}.`,
      body: privacy,
      "seo.title": "Privacy Policy | TTR Digital Marketing",
      "seo.description": "How TTR Digital Marketing LLC collects, uses and protects your information, including SMS consent. We never sell or share your mobile number for marketing.",
    }),
  )
  .patch("page-terms", (p) =>
    p.set({
      title: "Terms & Conditions",
      heading: "Terms & Conditions",
      intro: `These terms apply to your use of the TTR Digital Marketing website and our SMS program. Last updated ${UPDATED}.`,
      body: terms,
      "seo.title": "Terms & Conditions | TTR Digital Marketing",
      "seo.description": "Terms for the TTR Digital Marketing website and SMS program. Reply STOP to opt out of texts or HELP for help.",
    }),
  );

const res = await tx.commit();
console.log("Patched", res.documentIds.join(", "));
