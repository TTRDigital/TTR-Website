import type { HomeContent } from "@/lib/content";

/* Home page copy (fallbacks). Sanity values win when present. */

export const fallbackHome: HomeContent = {
  seo: {
    title: "Digital Marketing Agency for Local Businesses | TTR",
    description:
      "TTR Digital Marketing gets local businesses found on Google, ads and AI search, then turns that traffic into booked calls. Free growth audit.",
  },
  hero: {
    eyebrow: "Digital marketing agency",
    heading: "Get found everywhere your customers search.",
    text: "Google, Maps, ads and AI answers like ChatGPT and Gemini. We put your business in front of people ready to buy, then turn those searches into booked calls.",
  },
  logos: {
    heading: "Trusted by local businesses",
    items: [
      { name: "[CLIENT LOGO]" },
      { name: "[CLIENT LOGO]" },
      { name: "[CLIENT LOGO]" },
      { name: "[CLIENT LOGO]" },
      { name: "[CLIENT LOGO]" },
    ],
  },
  problem: {
    eyebrow: "Why leads slip away",
    heading: "Most local businesses lose leads they never see.",
    broken: [
      {
        title: "Invisible in AI answers",
        text: "Customers now ask ChatGPT and Google's AI Overviews who to call. If you are not in that answer, you are not on the list.",
      },
      {
        title: "Ad spend that leaks",
        text: "Broad keywords, slow landing pages and no call tracking burn budget on clicks that never turn into customers.",
      },
      {
        title: "Leads that go cold",
        text: "A missed call or a reply three hours later sends the customer straight to the next business on Google.",
      },
    ],
    fixes: [
      {
        title: "Found everywhere",
        text: "We make your business easy to find and easy to recommend on Google, Maps and AI search.",
      },
      {
        title: "Ads built for calls",
        text: "We run campaigns around calls and booked jobs, and cut the spend that does not bring them.",
      },
      {
        title: "Every lead answered",
        text: "GoHighLevel and AI agents reply to every call, form and message in seconds, day or night.",
      },
    ],
  },
  services: {
    eyebrow: "What we do",
    heading: "One team for everything that makes the phone ring.",
    intro: "Eight services that work as one system. Start with the one you need most and add more as you grow.",
  },
  searchEverywhere: {
    eyebrow: "Search Everywhere Optimization",
    heading: "Your customers don't just Google anymore.",
    text: "They search Google, check the map and ask ChatGPT, Gemini or Perplexity who to call. Search Everywhere Optimization makes your business the clear, trusted answer in all of them.",
    points: [
      "Clear pages with direct answers that AI tools can quote",
      "The same name, address and phone on every listing",
      "Reviews and mentions that build trust with every platform",
      "Monthly checks of where you show up, and where you do not yet",
    ],
    platforms: ["Google Search", "Google Maps", "AI Overviews", "ChatGPT", "Gemini", "Perplexity"],
  },
  results: {
    eyebrow: "Results",
    heading: "Real numbers from real clients.",
    intro: "We report on calls, leads and booked jobs, not vanity metrics. Here is some of what that work has produced.",
    stats: [
      { value: "411%", countTo: 411, suffix: "%", label: "more organic traffic, year over year" },
      { value: "688%", countTo: 688, suffix: "%", label: "more keywords ranking in Google's top 10" },
      { value: "10-15", label: "cases a day for one client, up from 2" },
      { value: "2015", label: "helping businesses grow since" },
    ],
    cases: [
      {
        client: "Displays & Holders",
        industry: "Growing business",
        challenge: "Stuck at about 2 cases a day.",
        result: "Now 10 to 15 cases a day, in the CEO's own words.",
        metricLabel: "Chris Aaron, CEO",
      },
      {
        client: "[CLIENT NAME]",
        industry: "Dental practice",
        challenge: "[CHALLENGE]",
        result: "[CLIENT RESULT]",
      },
      {
        client: "[CLIENT NAME]",
        industry: "Home services company",
        challenge: "[CHALLENGE]",
        result: "[CLIENT RESULT]",
      },
    ],
    footnote: "Results depend on your market, competition, budget and starting point. We never promise rankings.",
  },
  process: {
    eyebrow: "How we work",
    heading: "A clear plan, then steady progress you can see.",
    intro: "No long onboarding and no mystery. Four steps, and you always know what we are doing and why.",
    steps: [
      {
        title: "Audit",
        text: "We review your website, Google Business Profile, ads, reviews and competitors, and show you where leads are slipping away.",
      },
      {
        title: "Strategy",
        text: "You get a plan built around your goals and budget, with every task tied to calls, form leads or booked jobs.",
      },
      {
        title: "Launch",
        text: "We build and launch in the right order, with call and form tracking in place from day one.",
      },
      {
        title: "Grow",
        text: "Each month you see what we did and what it brought in. Then we put more behind what works.",
      },
    ],
  },
  industries: {
    eyebrow: "Industries",
    heading: "Built for businesses that live on calls and bookings.",
    cards: [
      {
        href: "/dental-marketing",
        eyebrow: "Dental practices",
        title: "More new patients in the chair.",
        text: "Attract the patients you want, from new families to implant and cosmetic cases, and book more of the calls you already get.",
        tags: ["New patient exams", "Implants", "Invisalign", "Emergency visits"],
      },
      {
        href: "/home-services-marketing",
        eyebrow: "Home services",
        title: "More booked jobs for your crews.",
        text: "Steady calls from homeowners nearby, with missed calls answered while your team is out on a job.",
        tags: ["HVAC", "Plumbing", "Roofing", "Electrical", "Landscaping", "Cleaning"],
      },
    ],
    more: "And growing businesses in other industries that depend on calls, forms and appointments.",
  },
  aiCrm: {
    eyebrow: "GoHighLevel CRM and AI agents",
    heading: "Every lead answered in seconds. Day or night.",
    text: "Most businesses do not have a lead problem. They have a follow up problem. We set up GoHighLevel so every call, form and message lands in one pipeline, then add AI agents that answer, ask the right questions and book the appointment.",
    points: [
      { title: "Missed call text back", text: "A missed call gets an instant text, so the customer does not call the next business." },
      { title: "AI chat and voice agents", text: "Answers common questions and qualifies leads around the clock." },
      { title: "Booked into your calendar", text: "Appointments go straight onto your schedule, with reminders." },
      { title: "Review requests", text: "Happy customers get a quick request after every job or visit." },
    ],
  },
  testimonials: {
    eyebrow: "Client words",
    heading: "What working with us feels like.",
  },
  faq: {
    eyebrow: "FAQ",
    heading: "Questions owners ask us.",
    items: [
      {
        question: "How much does digital marketing cost?",
        answer:
          "It depends on what you need. The main factors are your competition, how many services and locations you cover, your starting point and how fast you want to grow. Ad budgets are paid to Google or Meta directly and are separate from our work. After the free audit you get a clear plan and a quote, with no surprises.",
      },
      {
        question: "How long does SEO take to work?",
        answer:
          "Most businesses see movement within the first few months, with steadier growth after that. It depends on your competition, your website and how much work is needed up front. Google Ads can bring calls within the first few weeks, so many clients run both while SEO builds.",
      },
      {
        question: "Do you require long contracts?",
        answer:
          "We explain the terms, the length and how to cancel before you sign anything, in plain English. Ask us on your audit call and we will walk you through the options for your situation.",
      },
      {
        question: "How will I know it's working?",
        answer:
          "You get clear monthly reports in plain English. We track calls, form leads and booked appointments by channel, along with rankings and AI search visibility, so you can see what your money brought in.",
      },
      {
        question: "What is Search Everywhere Optimization?",
        answer:
          "People now search on Google, Google Maps, YouTube and AI tools like ChatGPT, Gemini and Perplexity. Search Everywhere Optimization makes your business easy to find and easy to recommend in all of those places, not just in the classic blue links.",
      },
      {
        question: "Can you promise I will be number one on Google?",
        answer:
          "No honest agency can promise a ranking, because Google and AI tools decide what to show. What we can promise is clear work, clear reporting and a plan focused on the searches that bring you real customers.",
      },
      {
        question: "What kinds of businesses do you work with?",
        answer:
          "Mostly local service businesses. Dental practices and home service companies like HVAC, plumbing, roofing and cleaning are our main focus, along with other small and mid-sized businesses that live on calls and booked appointments.",
      },
      {
        question: "Can we work together remotely?",
        answer:
          "Yes. Your audit, strategy calls and monthly reports all happen over video, phone and email, so working with us is easy wherever your business is.",
      },
    ],
  },
  cta: {
    heading: "Ready for more calls and booked jobs?",
    text: "Get a free growth audit. We will show you where your leads are slipping away and how to fix it, whether or not you hire us.",
  },
};
