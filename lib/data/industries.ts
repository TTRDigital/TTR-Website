import type { Faq, Step } from "@/lib/content";
import type { MockupKind } from "@/components/mockups/ServiceMockups";

/* Industry (niche) page copy. Fallbacks until Phase 4 moves them to Sanity. */

export type IndustryPage = {
  slug: string;
  name: string;
  seo: { title: string; description: string };
  eyebrow: string;
  heading: string;
  intro: string;
  mockup: MockupKind;
  painsHeading: string;
  pains: Step[];
  systemHeading: string;
  systemIntro: string;
  system: { slug: string; why: string }[];
  trades?: { name: string; text: string }[];
  month: Step[];
  proofPlaceholder: string;
  faqs: Faq[];
  ctaHeading: string;
};

export const industryPages: IndustryPage[] = [
  {
    slug: "dental-marketing",
    name: "Dental marketing",
    seo: {
      title: "Dental Marketing Agency | More New Patients | TTR",
      description:
        "Dental marketing that brings new patients: local SEO, AI search, Google Ads, Meta Ads and fast follow up with GoHighLevel. Free practice audit.",
    },
    eyebrow: "Dental marketing",
    heading: "Dental marketing that brings more new patients to your chair.",
    intro:
      "We help dental practices attract the patients they want, from new families to implant and cosmetic cases. We get your practice found on Google, Maps and AI search, run ads for the treatments you want more of, and make sure every call and form gets a fast reply so more of those leads book.",
    mockup: "ai-answer",
    painsHeading: "Sound familiar?",
    pains: [
      { title: "Not enough new patients", text: "Your schedule has gaps, and most new patients find a competitor first on Google or Maps." },
      { title: "Ads that cost too much", text: "Clicks are expensive and many leads never book. Spend goes to broad terms instead of the treatments you want." },
      { title: "Missed calls and slow follow up", text: "The front desk is busy with patients. Leads wait hours for a reply and book somewhere else." },
      { title: "Invisible in AI answers", text: "Patients ask ChatGPT and Google's AI for a trusted dentist nearby. Thin websites and few reviews do not get mentioned." },
    ],
    systemHeading: "The TTR system for dental practices.",
    systemIntro: "Six services that work together, each with a clear job. Most practices start with two or three and add more as they grow.",
    system: [
      { slug: "seo", why: "Rank for \"dentist near me\" and your key treatments, and win a spot in the map pack." },
      { slug: "search-everywhere-optimization", why: "Get recommended when patients ask AI tools for a dentist or a specialist nearby." },
      { slug: "google-ads", why: "Treatment-specific campaigns for implants, Invisalign and emergency visits, each with its own page." },
      { slug: "meta-ads", why: "New patient offers and reactivation campaigns for past patients on Facebook and Instagram." },
      { slug: "gohighlevel-crm", why: "Instant replies, reminders that cut no-shows and review requests after every visit." },
      { slug: "ai-agents", why: "Answer after-hours questions and book consults while the front desk focuses on patients." },
    ],
    month: [
      { title: "Every week", text: "Ads checked and tuned, with spend moved toward the treatments that actually book." },
      { title: "Every month", text: "New content, like a treatment page or an FAQ, that answers what patients ask before they call." },
      { title: "Every visit", text: "Google Business Profile updates and an automatic review request after appointments." },
      { title: "Every lead", text: "Follow up reviewed: response times, missed calls and how many leads booked." },
      { title: "Month end", text: "A plain-English report and a short call on what worked and what comes next." },
    ],
    proofPlaceholder: "[DENTAL CLIENT RESULT]",
    faqs: [
      {
        question: "Do you work with single-location and multi-location practices?",
        answer: "Yes. We work with solo practices and groups. Each location gets its own Google Business Profile work and local pages.",
      },
      {
        question: "Can you help with patient reviews?",
        answer: "Yes. We set up automatic review requests after visits, which builds trust and helps your local rankings.",
      },
      {
        question: "Which treatments do you market?",
        answer: "Whatever your practice wants more of. Common ones are new patient exams, implants, Invisalign, veneers, emergency visits and cosmetic dentistry.",
      },
      {
        question: "Do you build treatment landing pages?",
        answer:
          "Yes. Each key treatment gets its own fast page with clear details, reviews and an easy way to call or book, which helps both ads and SEO.",
      },
      {
        question: "How do you track new patients, not just leads?",
        answer:
          "We connect calls and forms to GoHighLevel and, where your setup allows, track which leads booked. You see calls, booked appointments and where they came from.",
      },
      {
        question: "Do you work with specialty practices?",
        answer:
          "Yes. The same approach works for orthodontists, oral surgeons and other specialists, with campaigns built around the treatments and referral sources that matter to you.",
      },
    ],
    ctaHeading: "Ready to fill your schedule with new patients?",
  },
  {
    slug: "home-services-marketing",
    name: "Home services marketing",
    seo: {
      title: "Home Services Marketing for HVAC, Plumbing, Roofing | TTR",
      description:
        "Marketing for home service companies: local SEO, Local Services Ads, Google Ads, Meta Ads and missed-call text back. More calls and booked jobs.",
    },
    eyebrow: "Home services marketing",
    heading: "Home services marketing that keeps your crews booked.",
    intro:
      "We help HVAC, plumbing, roofing, electrical, landscaping, cleaning and other home service companies get more calls from homeowners nearby and book more of them into real jobs. That means winning the map pack, running ads that ring the phone and answering every call, even when your team is out on a job.",
    mockup: "ads",
    painsHeading: "Sound familiar?",
    pains: [
      { title: "Slow seasons and empty days", text: "Work comes in waves. One month you are turning jobs away, the next the schedule has gaps." },
      { title: "Paying for bad leads", text: "Shared leads from lead sellers and wasted clicks cost money and rarely turn into jobs." },
      { title: "Calls missed in the field", text: "Your team is on a roof or under a sink. Calls go to voicemail and the homeowner calls the next company." },
      { title: "Losing to bigger brands", text: "National brands and lead sellers crowd the results. A strong local presence wins jobs in your own area." },
    ],
    systemHeading: "The TTR system for home service companies.",
    systemIntro: "Six services that work together, each with a clear job. Most companies start with the map pack and ads, then add follow up automation.",
    system: [
      { slug: "seo", why: "Win the map pack in your service area for urgent searches like \"AC repair near me\"." },
      { slug: "google-ads", why: "Search and Local Services Ads that put you in front of people who need help right now." },
      { slug: "meta-ads", why: "Seasonal offers like AC tune-ups, roof inspections or gutter cleaning to fill slow weeks." },
      { slug: "search-everywhere-optimization", why: "Get named when homeowners ask AI tools who to call for a leak, an outage or a repair." },
      { slug: "gohighlevel-crm", why: "Missed call text back, estimate follow ups and review requests after every job." },
      { slug: "ai-agents", why: "Pick up calls and book visits while your team is on a job, day or night." },
    ],
    trades: [
      { name: "HVAC", text: "AC repair, installs and maintenance plans." },
      { name: "Plumbing", text: "Emergency calls, water heaters and drains." },
      { name: "Roofing", text: "Repairs, inspections and replacements." },
      { name: "Electrical", text: "Repairs, panels and EV chargers." },
      { name: "Landscaping", text: "Maintenance contracts and installs." },
      { name: "Cleaning", text: "Recurring home and commercial cleaning." },
      { name: "Pest control", text: "One-time treatments and service plans." },
      { name: "Pool service", text: "Weekly service and repairs." },
    ],
    month: [
      { title: "Every week", text: "Ads and Local Services Ads tuned, with budget moved to the jobs and areas that pay best." },
      { title: "Every month", text: "New service or area pages and Google Business Profile posts with real job photos." },
      { title: "Every job", text: "An automatic review request, so your rating keeps climbing in the map pack." },
      { title: "Every call", text: "Missed calls get an instant text back, and we review response times and booking rates." },
      { title: "Month end", text: "A plain-English report on calls, booked jobs and cost per lead, by channel." },
    ],
    proofPlaceholder: "[HOME SERVICES CLIENT RESULT]",
    faqs: [
      {
        question: "Which home service businesses do you work with?",
        answer: "HVAC, plumbing, roofing, electrical, landscaping, cleaning, pest control, pool service, remodeling and similar local service companies.",
      },
      {
        question: "Do you manage Google Local Services Ads?",
        answer: "Yes. For many home service businesses they are one of the best lead sources, and we manage them with your other campaigns.",
      },
      {
        question: "Can you help us get more reviews?",
        answer: "Yes. We set up automatic review requests after each job, which builds trust and helps you rank in Google Maps.",
      },
      {
        question: "Can you help in the slow season?",
        answer:
          "Yes. We plan seasonal campaigns ahead of slow months, like maintenance offers, and use Meta Ads plus text and email to past customers to fill the schedule.",
      },
      {
        question: "How do I know which calls came from marketing?",
        answer: "We set up call tracking numbers and connect them to GoHighLevel, so you can see calls by channel and which ones turned into booked jobs.",
      },
      {
        question: "Do you sell shared leads?",
        answer: "No. We build your own lead flow from your website, your Google presence and your ads, so the leads come only to you.",
      },
    ],
    ctaHeading: "Ready to keep your crews busy?",
  },
];

export const getIndustryPage = (slug: string) => industryPages.find((p) => p.slug === slug) ?? null;
