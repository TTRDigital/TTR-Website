import type { Faq, Step } from "@/lib/content";
import type { MockupKind } from "@/components/mockups/ServiceMockups";

/* City plus service pages (Miami). Copy lives here, like the service and industry pages. */

export type LocationPage = {
  slug: string;
  path: string;
  /** Short name for breadcrumbs. */
  name: string;
  /** Service page this one supports, and the service name for schema and the form. */
  serviceSlug: "seo" | "google-ads";
  serviceName: string;
  formService: "SEO" | "Google Ads";
  seo: { title: string; description: string };
  eyebrow: string;
  heading: string;
  intro: string;
  mockup: MockupKind;
  /** Dates for the byline and schema. Keep dateModified current when the copy changes. */
  datePublished: string;
  dateModified: string;
  answerHeading: string;
  answer: string[];
  includedHeading: string;
  included: Step[];
  processHeading: string;
  process: Step[];
  fitHeading: string;
  fit: { name: string; text: string }[];
  /** Show the real SEO testimonial. Only pages with a verified proof point set this. */
  showTestimonial: boolean;
  /** The other Miami page, linked as "related". */
  relatedPath: string;
  relatedTitle: string;
  relatedText: string;
  faqs: Faq[];
  ctaHeading: string;
  ctaText: string;
};

export const locationPages: LocationPage[] = [
  {
    slug: "miami-seo",
    path: "/miami-seo",
    name: "Miami SEO",
    serviceSlug: "seo",
    serviceName: "SEO",
    formService: "SEO",
    seo: {
      title: "Miami SEO for Local Service Businesses | TTR Digital",
      description:
        "Local SEO in Miami for service businesses: Google Maps, service pages and reviews, from a team based in Brickell. Start with a free audit.",
    },
    eyebrow: "Miami SEO",
    heading: "Miami SEO for local service businesses that live on calls.",
    intro:
      "Local SEO is the work that helps your business show up on Google and Google Maps when someone in Miami searches for what you do. Our office is on Brickell Avenue, and we help local service businesses like dental practices, HVAC, plumbing, roofing and electrical companies turn those searches into phone calls and booked jobs.",
    mockup: "ranking",
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
    answerHeading: "What SEO means for a Miami service business.",
    answer: [
      "When an air conditioner stops working or someone needs a dentist nearby, they usually search on their phone and call one of the first businesses they see. Those spots are the short list of businesses with pins on Google Maps and the first few search results. SEO is how you earn a place there without paying for every click.",
      "Miami is a busy market, and many businesses compete for the same searches. That makes the basics matter more: a complete Google Business Profile, a clear page for every service and area you cover, honest reviews and a website that loads quickly on a phone.",
      "We do not promise rankings, because nobody can. What we do is fix what is holding you back, build what is missing and report on calls and forms every month, so you can see whether the work is paying off.",
    ],
    includedHeading: "What Miami SEO with TTR includes.",
    included: [
      { title: "SEO audit and roadmap", text: "We check your website, your Google Business Profile and the businesses ahead of you, then rank every fix by how much it should help." },
      { title: "Google Business Profile", text: "Categories, services, service areas, photos and posts kept complete and current, so you can compete for the map listings." },
      { title: "Service and neighborhood pages", text: "A clear page for each service and each area you actually serve, for example Brickell, Coral Gables or Doral, written for real customers." },
      { title: "Reviews", text: "A simple way to ask happy customers for reviews, and a plan for replying to the ones you receive." },
      { title: "Consistent business details", text: "Your name, address and phone number matched across Google, Apple Maps, Yelp and the directories that matter." },
      { title: "Plain-English reporting", text: "A monthly report on calls, forms and search visibility, with what we did and what comes next." },
    ],
    processHeading: "How we run Miami SEO for you.",
    process: [
      { title: "Audit", text: "We review your site, your profile, your reviews and who is showing up for your services in Miami today." },
      { title: "Plan", text: "You get a short roadmap tied to the services and neighborhoods you most want to grow." },
      { title: "Build", text: "We fix the foundation first, then add the pages, profile updates and review requests that are missing." },
      { title: "Report", text: "Every month you see calls, forms and visibility in plain English, and we adjust the plan together." },
    ],
    fitHeading: "Who Miami SEO is for.",
    fit: [
      { name: "Dental practices", text: "Treatment and new patient pages." },
      { name: "HVAC", text: "Repair, install and maintenance searches." },
      { name: "Plumbing", text: "Emergency and everyday service searches." },
      { name: "Roofing", text: "Repair, inspection and replacement searches." },
      { name: "Electrical", text: "Repairs, panels and upgrades." },
      { name: "Other local services", text: "If customers call you, we can help." },
    ],
    showTestimonial: true,
    relatedPath: "/miami-google-ads",
    relatedTitle: "Google Ads for Miami service businesses",
    relatedText: "SEO builds steady visibility over time. Google Ads can bring calls while that work grows. Many businesses use both.",
    faqs: [
      {
        question: "How long does Miami SEO take?",
        answer:
          "It depends on where you start, how much competition you have and how much needs fixing. We do the foundation first, and content and reviews build over time. We will not promise a date or a ranking, but you will see calls and forms in your monthly report.",
      },
      {
        question: "Will you get me to number one on Google?",
        answer:
          "No honest agency can promise that. Rankings change, and Google decides them. We focus on the things in your control: a complete profile, helpful pages, good reviews and a fast site, and we report on the calls they bring.",
      },
      {
        question: "Where is TTR based?",
        answer: "Our office is at 1000 Brickell Ave, Suite 715, Miami, FL 33131. We are open Monday to Friday, 9 AM to 5 PM.",
      },
      {
        question: "What does Miami SEO cost?",
        answer: "It depends on your goals, your market and how much work is needed. We explain plans and pricing in plain English on the free audit call.",
      },
      {
        question: "Do I own my website and accounts?",
        answer: "Yes. You own your website, your Google accounts and your data. We work inside them for you.",
      },
    ],
    ctaHeading: "Ready for more calls from Miami searches?",
    ctaText:
      "Get a free growth audit. We will show you where your leads are slipping away and what to fix first, whether or not you hire us.",
  },
  {
    slug: "miami-google-ads",
    path: "/miami-google-ads",
    name: "Miami Google Ads",
    serviceSlug: "google-ads",
    serviceName: "Google Ads",
    formService: "Google Ads",
    seo: {
      title: "Google Ads Management for Miami Service Businesses | TTR",
      description:
        "Google Ads for Miami service businesses: Search, Local Services Ads and Performance Max, tracked by calls. Start with a free growth audit.",
    },
    eyebrow: "Miami Google Ads",
    heading: "Google Ads for Miami service businesses that want booked calls.",
    intro:
      "Google Ads put your business at the top of Google the moment someone in Miami searches for what you offer. We build and manage Search, Local Services Ads and Performance Max campaigns from our office on Brickell Avenue, and we measure the work by calls and booked jobs, not just clicks.",
    mockup: "ads",
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
    answerHeading: "How Google Ads work for a Miami service business.",
    answer: [
      "With Search ads you choose the words people type, and you pay when someone clicks your ad. For urgent jobs, like a leaking pipe or a broken air conditioner, those searchers are often ready to call right away. Local Services Ads work a little differently: they are priced per lead instead of per click.",
      "In a busy market like Miami, clicks can get expensive quickly. The answer is control: tight keyword groups, negative keywords that block searches that never buy, an ad and a page matched to each service, and call tracking so we know which ads bring phone calls.",
      "We cannot promise a cost per lead or a number of calls. We can promise honest tracking and a monthly report that shows spend, calls and forms, so you can decide what to do next. You own your ad account.",
    ],
    includedHeading: "What Miami Google Ads with TTR includes.",
    included: [
      { title: "Account audit or clean setup", text: "We review what you have and find the waste, or build a new account the right way from day one." },
      { title: "Keyword strategy", text: "Tight keyword groups around the services you want, plus negative keywords that block clicks that never buy." },
      { title: "Ads and matching pages", text: "Ads written for each service, sent to a page that matches, so visitors see what they searched for." },
      { title: "Local Services Ads and Performance Max", text: "We help you decide which campaign types fit your business, and set them up and manage them for you." },
      { title: "Call and form tracking", text: "We track calls and form leads, so you see what the ads actually bring, not only how many people clicked." },
      { title: "Weekly checks, monthly report", text: "Spend and search terms reviewed every week, and a plain-English report each month with what changed and why." },
    ],
    processHeading: "How we run Miami Google Ads for you.",
    process: [
      { title: "Goals and audit", text: "We agree on the services you want more of and review any account you already have." },
      { title: "Build and track", text: "We set up campaigns, matching pages and call tracking before any money is spent." },
      { title: "Launch and learn", text: "Campaigns go live, and the first weeks are used to learn which searches bring real calls." },
      { title: "Tune and report", text: "We move spend toward what works, cut what does not, and report every month." },
    ],
    fitHeading: "Who Miami Google Ads is for.",
    fit: [
      { name: "Dental practices", text: "New patient and treatment searches." },
      { name: "HVAC", text: "Repair and install searches." },
      { name: "Plumbing", text: "Urgent and everyday service searches." },
      { name: "Roofing", text: "Repair and replacement searches." },
      { name: "Electrical", text: "Repairs, panels and upgrades." },
      { name: "Other local services", text: "If customers call you, we can help." },
    ],
    showTestimonial: false,
    relatedPath: "/miami-seo",
    relatedTitle: "Miami SEO for local service businesses",
    relatedText: "Ads can bring calls now. SEO builds steady visibility over time, so you rely less on paid clicks. Many businesses use both.",
    faqs: [
      {
        question: "How much should I spend on Google Ads in Miami?",
        answer:
          "It depends on your services, your market and how many calls you want. We talk through a starting budget on the free audit call.",
      },
      {
        question: "What is the difference between Search ads and Local Services Ads?",
        answer:
          "Search ads appear when someone types a search you chose, and you pay per click. Local Services Ads appear at the top for certain local services, and you pay per lead. We help you decide which fit your business.",
      },
      {
        question: "How soon will I get calls?",
        answer:
          "Ads can start once campaigns and tracking are live. The first weeks are for learning which searches bring real calls, so we review results weekly and tune from there. We do not promise a number of calls.",
      },
      {
        question: "Who owns the ad account?",
        answer: "You do. We work inside your account, and you can see everything in it at any time.",
      },
      {
        question: "Where is TTR based?",
        answer: "Our office is at 1000 Brickell Ave, Suite 715, Miami, FL 33131. We are open Monday to Friday, 9 AM to 5 PM.",
      },
    ],
    ctaHeading: "Ready for more booked calls from Miami searches?",
    ctaText:
      "Get a free growth audit. We will show you where your leads are slipping away and what to fix first, whether or not you hire us.",
  },
];

export const getLocationPage = (slug: string) => locationPages.find((p) => p.slug === slug);
