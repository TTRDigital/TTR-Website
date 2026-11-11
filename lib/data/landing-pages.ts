import type { IndustryPage } from "@/lib/data/industries";

/*
 * Batch 1 of the ranking plan (docs/seo/RANK-PLAN.md): two Miami service pages,
 * two industry pages and one Miami industry page. Written in Kia's voice.
 * No prices, no guarantees, no client results: the proof block stays hidden
 * until a real result is added in /cms. Items that depend on open decisions
 * (docs/seo/DECISIONS-FOR-KIA.md) read the address and phone from site settings.
 */

const UPDATED = "2026-11-10";

const geoServices = [
  { slug: "seo", why: "Show up in Google search and the Maps pack for the searches your customers type in." },
  { slug: "search-everywhere-optimization", why: "Get named when people ask ChatGPT, Gemini and Google's AI who to call." },
  { slug: "google-ads", why: "Pay to be on top for the searches that already have a buyer behind them." },
  { slug: "website-design", why: "A fast, clear site that turns a visit into a call." },
  { slug: "gohighlevel-crm", why: "Every call and form lands in one place and gets a quick reply." },
  { slug: "ai-agents", why: "Answer the phone and chat after hours and book the appointment." },
];

export const landingPages: IndustryPage[] = [
  /* ---------------------------------------------------------------- Miami SEO */
  {
    slug: "miami-seo",
    name: "Miami SEO",
    seo: {
      title: "SEO Company in Miami for Local Businesses | TTR",
      description: "Miami SEO from a Brickell agency: Google Maps, local search and AI answers like ChatGPT. Plain reports, no guarantees. Free audit.",
    },
    eyebrow: "Miami SEO company",
    heading: "SEO for Miami businesses that want the phone to ring.",
    intro:
      "We help Miami businesses show up when people nearby search for what they sell. That means Google search, the Maps pack and now AI answers from ChatGPT and Gemini. We work on the things that move the needle for a local business, report in plain English and never promise a ranking.",
    mockup: "ranking",
    mockupQueries: [["roof repair Miami", "Map pack"], ["family lawyer Miami", "Top 3"], ["best dentist Brickell", "AI answer"]],
    painsHeading: "Sound familiar?",
    pains: [
      { title: "Competitors rank above you", text: "You search your own service in Miami and the same three companies show up. You are on page two." },
      { title: "Maps pack is a mystery", text: "Your Google Business Profile is half filled in, the reviews are thin and nobody has touched it in months." },
      { title: "An agency you cannot understand", text: "Reports full of impressions and keywords, and no answer to the only question: did the phone ring?" },
      { title: "Invisible in AI answers", text: "People ask ChatGPT or Gemini for the best company near them. If your name never comes up, you lose that call." },
    ],
    systemHeading: "How we do SEO in Miami.",
    systemIntro: "Local SEO is a handful of jobs done well and kept up every month. Here is where we start.",
    system: geoServices,
    tradesHeading: "Miami areas we know",
    trades: [
      { name: "Brickell and Downtown", text: "Offices, condos and professional services." },
      { name: "Coral Gables", text: "Dental, legal and boutique retail." },
      { name: "Miami Beach", text: "Hospitality, wellness and visitors." },
      { name: "Wynwood and Midtown", text: "Creative, food and fast-moving brands." },
      { name: "Doral and Kendall", text: "Family services and home trades." },
      { name: "Aventura", text: "Medical, legal and luxury services." },
      { name: "Coconut Grove", text: "Neighborhood shops and restaurants." },
      { name: "Hialeah and Homestead", text: "Home services and local shops." },
    ],
    sections: [
      {
        heading: "What local SEO actually means in Miami",
        paragraphs: [
          "Miami is crowded. Almost every service you can name has dozens of companies fighting for the same few spots at the top of Google. The businesses that win are not always the biggest. They are the ones whose Google Business Profile is complete, whose website answers the question in the first sentence and whose customers leave honest reviews.",
          "Many people here search in English, Spanish or a mix of both. If your customers do too, we plan pages and profile details for those searches instead of treating Spanish as an afterthought.",
        ],
      },
      {
        heading: "Where we start",
        paragraphs: [
          "Every project starts with a free audit call. We look at your Google Business Profile, your site speed, your service pages, your reviews and the three or four competitors who keep beating you, then tell you what we would fix first and why.",
          "From there the work is steady. We fix what is broken, write the pages you are missing, build the local signals Google looks for and track calls, not just rankings. I started in IT and taught myself SEO, so I explain the technical parts in words a business owner can use.",
        ],
      },
      {
        heading: "What we will not do",
        paragraphs: [
          "We will not promise page one or a ranking date. Nobody can honestly do that, because Google decides and the results depend on your competition. We will tell you what we are doing, what we expect to change and how we will measure it, and we send a plain report every month.",
        ],
      },
    ],
    month: [
      { title: "Week one", text: "Audit, fixes to your Google Business Profile and a list of the pages and problems we will tackle first." },
      { title: "Every month", text: "New or improved pages for the services and Miami areas that matter most, plus Google Business Profile updates." },
      { title: "Every review", text: "A simple way to ask happy customers for a review, so your rating and count keep growing." },
      { title: "Every lead", text: "Calls and forms tracked, so you can see what SEO is sending you." },
      { title: "Month end", text: "A plain-English report and a short call on what worked and what comes next." },
    ],
    proofPlaceholder: "[MIAMI SEO CLIENT RESULT]",
    faqs: [
      { question: "How long does SEO take in Miami?", answer: "It depends on your competition and where you start. Fixes to a Google Business Profile can help within weeks. New pages usually need a few months to settle. We explain what to expect on the audit call and never promise a date." },
      { question: "Do you guarantee page one?", answer: "No. Nobody can honestly guarantee a ranking. We promise clear work, honest reporting and a focus on calls and leads." },
      { question: "Can you help me show up in ChatGPT and Gemini?", answer: "Yes. AI tools lean on the same signals as good SEO: clear pages, a complete business profile, consistent details and real reviews. We also check that AI crawlers can read your site. See our Search Everywhere Optimization service." },
      { question: "Do you work with businesses outside Miami?", answer: "Yes. Our office is in Brickell and we work with local businesses across the country. Local SEO still starts with the area your customers are in." },
      { question: "Do I own my website and my data?", answer: "Yes. You own your website, your Google Business Profile and your data. We ask for access to work on them." },
      { question: "What does it cost?", answer: "It depends on your market and goals. We explain plans and terms in plain English on the free audit call, so there are no surprises." },
    ],
    ctaHeading: "Want to know where your Miami business stands?",
    related: [
      { label: "SEO service", href: "/services/seo", text: "What is included in our local SEO work." },
      { label: "Google Ads in Miami", href: "/miami-google-ads", text: "Be on top today while SEO builds." },
      { label: "Search Everywhere Optimization", href: "/services/search-everywhere-optimization", text: "Get recommended by ChatGPT, Gemini and Google." },
    ],
    byline: true,
    updated: UPDATED,
  },

  /* ---------------------------------------------------------- Miami Google Ads */
  {
    slug: "miami-google-ads",
    name: "Miami Google Ads",
    seo: {
      title: "Google Ads Agency in Miami | Calls, Not Clicks | TTR",
      description: "Google Ads management for Miami businesses. Search and Local Services Ads built to bring calls and booked work. Plain reports. Free audit.",
    },
    eyebrow: "Miami Google Ads agency",
    heading: "Google Ads for Miami businesses, built around calls.",
    intro:
      "We run Google Ads for Miami businesses that want phone calls and booked work, not a long list of clicks. We build campaigns around the searches that already have a buyer behind them, send people to a page that makes the next step easy and report the numbers that matter.",
    mockup: "ads",
    painsHeading: "Sound familiar?",
    pains: [
      { title: "Clicks that never call", text: "The ad budget is gone every month and the phone is quiet. Nobody can tell you which clicks were worth it." },
      { title: "Expensive Miami keywords", text: "Popular terms cost a lot here. Without a plan, broad targeting burns money on people who will never buy." },
      { title: "Leads that go cold", text: "A form comes in, nobody replies for hours, and the buyer calls the next company." },
      { title: "No idea what is working", text: "The account is a black box. You cannot see which campaigns, areas or ads bring real customers." },
    ],
    systemHeading: "How we run Google Ads in Miami.",
    systemIntro: "Ads work best with a good landing page and a fast reply behind them. We build all three together.",
    system: [
      { slug: "google-ads", why: "Search campaigns, Local Services Ads where they fit and tight targeting by service and area." },
      { slug: "website-design", why: "Landing pages that load fast and make the call or form obvious." },
      { slug: "gohighlevel-crm", why: "Instant text back and follow ups so a lead gets a reply while it is still warm." },
      { slug: "seo", why: "Organic and Maps results that lower how much you depend on paid clicks over time." },
      { slug: "meta-ads", why: "Stay in front of people who visited but did not call." },
      { slug: "ai-agents", why: "Answer calls and chats after hours and book the appointment." },
    ],
    sections: [
      {
        heading: "Why Miami ads need a plan",
        paragraphs: [
          "In a market this busy, a click can cost real money. The fix is not a bigger budget. It is cleaner targeting: the services you want most, the areas you can actually serve and the words that signal someone is ready to buy. We also block the searches that waste spend, such as jobs, free and DIY.",
          "Many Miami buyers search in Spanish or switch between languages. When that fits your business, we build campaigns and landing pages for those searches too.",
        ],
      },
      {
        heading: "What you see every month",
        paragraphs: [
          "You get a plain report with calls, form leads, cost per lead and, where your setup allows it, which leads turned into booked work. We tell you what we changed, what we will test next and what we recommend you do with the budget.",
          "You own your ad account. We ask for access to manage it and you can see everything.",
        ],
      },
      {
        heading: "Ads and SEO work better together",
        paragraphs: [
          "Ads bring calls this week. SEO brings calls that keep coming without paying for each click. Most Miami businesses do best with both, and we are happy to start with ads while SEO builds. We tell you honestly which one should get the first dollar.",
        ],
      },
    ],
    month: [
      { title: "Week one", text: "Audit of your account or a fresh build, with conversion tracking set up before any money is spent." },
      { title: "Every week", text: "Search terms reviewed, wasted spend blocked, bids and budgets moved to what books." },
      { title: "Every month", text: "New ads, new landing pages and tests for the services you want more of." },
      { title: "Every lead", text: "Response times checked, so a good lead is not lost to a slow reply." },
      { title: "Month end", text: "A plain-English report and a short call on what worked and what comes next." },
    ],
    proofPlaceholder: "[MIAMI GOOGLE ADS CLIENT RESULT]",
    faqs: [
      { question: "How much should I spend on Google Ads in Miami?", answer: "It depends on your service, your competition and your margins. We help you set a budget you are comfortable with and explain what to expect before you spend." },
      { question: "Do you manage Local Services Ads?", answer: "Yes. For many local service businesses they are an excellent lead source, and we manage them alongside your search campaigns." },
      { question: "Will I see which calls came from ads?", answer: "Yes. We set up call tracking and conversion tracking, so you can see calls and forms by campaign." },
      { question: "Do you lock me into a long contract?", answer: "We explain the terms, the length and how to cancel before you sign. You will know exactly what you are agreeing to." },
      { question: "Can you take over my existing Google Ads account?", answer: "Yes. We start with a free review of what is there and tell you what we would keep, fix or stop." },
    ],
    ctaHeading: "Want a straight answer on your Google Ads?",
    related: [
      { label: "Google Ads service", href: "/services/google-ads", text: "What our Google Ads management includes." },
      { label: "Miami SEO", href: "/miami-seo", text: "Build rankings that keep working after the budget stops." },
      { label: "GoHighLevel CRM", href: "/services/gohighlevel-crm", text: "Reply to every lead fast and book more of them." },
    ],
    byline: true,
    updated: UPDATED,
  },

  /* ------------------------------------------------------- Law firm marketing */
  {
    slug: "law-firm-marketing",
    name: "Law firm marketing",
    seo: {
      title: "Law Firm Marketing | SEO and Ads for Attorneys | TTR",
      description: "Marketing for law firms: local SEO, Google Ads, AI search and fast intake follow up. Built around signed cases. Free firm audit.",
    },
    eyebrow: "Law firm marketing",
    heading: "Law firm marketing built around signed cases.",
    intro:
      "We help law firms get found when someone is searching for a lawyer, on Google, in the Maps pack and in AI answers. Then we make sure every call and form gets a fast, professional reply. I have built SEO for law firms, and I will tell you straight what is worth paying for.",
    mockup: "ranking",
    mockupQueries: [["personal injury lawyer near me", "Map pack"], ["family law attorney", "Top 3"], ["best immigration lawyer near me", "AI answer"]],
    painsHeading: "Sound familiar?",
    pains: [
      { title: "Referrals are not enough", text: "Word of mouth is great but you cannot control it. A slow quarter hurts, and you cannot easily plan for more cases." },
      { title: "Expensive clicks, few signed cases", text: "Legal keywords are among the costliest in advertising. Without tight targeting, most of the spend never turns into a client." },
      { title: "Calls and forms go cold", text: "Someone in a stressful moment calls three firms. The one that answers first usually gets the case." },
      { title: "Hard to stand out", text: "Every firm site says experienced and dedicated. Prospects cannot tell you apart, and AI tools have nothing specific to quote." },
    ],
    systemHeading: "The TTR system for law firms.",
    systemIntro: "Six services with a clear job each. Most firms start with their top two practice areas and grow from there.",
    system: [
      { slug: "seo", why: "Rank for your practice areas and your city, and keep your Google Business Profile strong." },
      { slug: "search-everywhere-optimization", why: "Be the firm AI tools name when someone asks for a lawyer for a specific problem." },
      { slug: "google-ads", why: "Search campaigns for the practice areas you want more of, with spend tied to intake." },
      { slug: "website-design", why: "Attorney pages that build trust fast: who you are, what you handle and how to reach you." },
      { slug: "gohighlevel-crm", why: "Instant acknowledgment, intake follow up and reminders so a prospect does not slip away." },
      { slug: "ai-agents", why: "Answer after-hours calls and chats, collect the details and route urgent matters to you." },
    ],
    tradesHeading: "Practice areas we plan around",
    trades: [
      { name: "Personal injury", text: "Car accidents, slip and fall and more." },
      { name: "Family law", text: "Divorce, custody and support." },
      { name: "Immigration", text: "Visas, residency and citizenship." },
      { name: "Criminal defense", text: "DUI and other charges." },
      { name: "Estate planning", text: "Wills, trusts and probate." },
      { name: "Business law", text: "Formation, contracts and disputes." },
      { name: "Real estate law", text: "Closings and disputes." },
      { name: "Employment", text: "Workers and employers." },
    ],
    sections: [
      {
        heading: "Why legal marketing is different",
        paragraphs: [
          "People looking for a lawyer are often stressed and in a hurry. They want to see quickly that you handle their kind of problem, that you are nearby and that someone will pick up. A site that answers those three things in the first screen beats a prettier one that does not.",
          "Each practice area needs its own page, written for the problem the person is facing. One page that lists everything you do rarely ranks for any of it.",
        ],
      },
      {
        heading: "Advertising rules and ethics",
        paragraphs: [
          "Lawyer advertising is regulated, and the rules differ by state and bar. We write to your bar's rules, we do not make promises about outcomes and nothing goes live without your approval. You are responsible for compliance, and we keep the process simple so it is easy to check.",
        ],
      },
      {
        heading: "Intake is where cases are won",
        paragraphs: [
          "Marketing can send you a call at 9 at night. If nobody replies until morning, that case is gone. We connect your calls and forms to GoHighLevel so every inquiry gets an immediate reply, a follow up and a clear place in your pipeline, and we show you how many turned into consultations.",
        ],
      },
    ],
    month: [
      { title: "Every week", text: "Ads checked and tuned, with spend moved toward practice areas that bring consultations." },
      { title: "Every month", text: "New or improved practice area pages and answers to the questions clients ask, plus Google Business Profile updates." },
      { title: "Every review", text: "A compliant way to ask happy clients for a review, where your bar rules allow it." },
      { title: "Every inquiry", text: "Response time, missed calls and consultation bookings reviewed." },
      { title: "Month end", text: "A plain-English report and a short call on what worked and what comes next." },
    ],
    proofPlaceholder: "[LAW FIRM CLIENT RESULT]",
    faqs: [
      { question: "Do you work with small firms and solo attorneys?", answer: "Yes. We work with solo practices and larger firms. We plan around your top practice areas and your budget." },
      { question: "Do you follow bar advertising rules?", answer: "We write to the rules in your state and nothing goes live without your approval. You stay responsible for compliance, and we make the review easy." },
      { question: "Can you help us appear in ChatGPT and Gemini answers?", answer: "Yes. AI tools favor clear pages, a complete business profile, consistent details and real reviews. We build all of those and check that AI crawlers can read your site." },
      { question: "Do you guarantee cases or rankings?", answer: "No. We do not promise rankings, cases or outcomes. We promise clear work and honest reporting on calls, consultations and cost." },
      { question: "Do you build separate pages for each practice area?", answer: "Yes. Each practice area gets its own page with clear details, answers to common questions and an easy way to reach you." },
      { question: "Who owns the website and the data?", answer: "You do. Your website, ad accounts and intake data belong to your firm." },
    ],
    ctaHeading: "Ready to bring in more of the cases you want?",
    related: [
      { label: "SEO service", href: "/services/seo", text: "How we get firms found on Google and in Maps." },
      { label: "Google Ads service", href: "/services/google-ads", text: "Search campaigns tied to consultations." },
      { label: "AI agents", href: "/services/ai-agents", text: "Answer after-hours calls and collect the details." },
    ],
    byline: true,
    updated: UPDATED,
  },

  /* ------------------------------------------------------ Real estate marketing */
  {
    slug: "real-estate-marketing",
    name: "Real estate marketing",
    seo: {
      title: "Real Estate Marketing for Agents and Brokers | TTR",
      description: "Marketing for real estate agents and brokerages: local SEO, Google Ads, Meta Ads and instant lead follow up. Get found, then get the appointment.",
    },
    eyebrow: "Real estate marketing",
    heading: "Real estate marketing that brings buyers and sellers to you.",
    intro:
      "We help real estate agents and brokerages get found by people ready to buy or sell, on Google, in the Maps pack, on social and in AI answers. Then we follow up on every lead fast, because in real estate the first agent to reply usually gets the appointment.",
    mockup: "meta",
    painsHeading: "Sound familiar?",
    pains: [
      { title: "Big portals own the results", text: "Zillow and other portals take the top of search. As an individual agent or small team, you get lost underneath." },
      { title: "Paying for leads you share", text: "Bought leads go to several agents at once. You race four other people for a name and a phone number." },
      { title: "Slow follow up", text: "You are at a showing. A new lead comes in and waits an hour. By then they have booked someone else." },
      { title: "Not known for any area", text: "Buyers and sellers search by neighborhood. If your site does not own a few areas, nobody finds you for them." },
    ],
    systemHeading: "The TTR system for real estate.",
    systemIntro: "Six services that work together. Most agents start with their strongest area and their follow up, then add more.",
    system: [
      { slug: "seo", why: "Rank for the neighborhoods you work in and keep your Google Business Profile current." },
      { slug: "search-everywhere-optimization", why: "Be the agent AI tools mention when someone asks for the best agent in an area." },
      { slug: "google-ads", why: "Reach buyers and sellers who are searching right now, in the areas you actually work." },
      { slug: "meta-ads", why: "Listings, open houses and seller campaigns on Facebook and Instagram." },
      { slug: "gohighlevel-crm", why: "Instant replies, drip follow up for buyers who are not ready yet and a clear pipeline." },
      { slug: "website-design", why: "Fast area pages and a clear way to start a conversation." },
    ],
    tradesHeading: "Who we help",
    trades: [
      { name: "Solo agents", text: "Own a few areas and a steady lead flow." },
      { name: "Teams", text: "Shared pipeline and consistent follow up." },
      { name: "Brokerages", text: "Brand, recruiting and agent pages." },
      { name: "Property managers", text: "Owner leads and tenant inquiries." },
    ],
    sections: [
      {
        heading: "Own your neighborhoods",
        paragraphs: [
          "Buyers and sellers search by place: homes in a neighborhood, an agent in a city, a condo in a building. The agents who show up pick a few areas and build real pages for them, with local detail that a portal cannot copy: the streets, the schools, what people ask and what you have sold or helped with there.",
          "We help you choose areas, write those pages and connect them to your Google Business Profile, so your name appears where it counts.",
        ],
      },
      {
        heading: "Speed to lead",
        paragraphs: [
          "Most real estate leads are not ready to talk to a person yet. They still expect a fast reply. We set up an instant text and email, a call or reminder for you and a longer follow up for people who are not ready this month, so the right lead is still warm when the time comes.",
        ],
      },
      {
        heading: "Honest about what works",
        paragraphs: [
          "Real estate is seasonal and local, and no agency can promise you deals. We promise clear work, a plain report and an honest view on where to spend. If a channel is not worth your money, we will say so.",
        ],
      },
    ],
    month: [
      { title: "Every week", text: "Ads checked and tuned, with budget moved toward the areas and offers that bring conversations." },
      { title: "Every month", text: "New area pages and answers to the questions buyers and sellers ask, plus Google Business Profile posts." },
      { title: "Every lead", text: "Instant reply and follow up, with response time and appointments reviewed." },
      { title: "Every closing", text: "A simple way to ask happy clients for a review." },
      { title: "Month end", text: "A plain-English report and a short call on what worked and what comes next." },
    ],
    proofPlaceholder: "[REAL ESTATE CLIENT RESULT]",
    faqs: [
      { question: "Do you work with individual agents or only brokerages?", answer: "Both. We work with solo agents, teams and brokerages. We scale the plan to your goals and budget." },
      { question: "Can you help me compete with Zillow?", answer: "You will not outspend a portal, so we do not try. We help you win the local, human searches: your neighborhoods, your reviews and your reply speed." },
      { question: "Do you buy or sell leads?", answer: "No. We build your own lead flow from your website, your Google presence and your ads, so the leads come only to you." },
      { question: "Can you show up for me in ChatGPT and Gemini?", answer: "Yes. AI tools lean on clear area pages, a complete profile, consistent details and real reviews. We build those and check that AI crawlers can read your site." },
      { question: "Do you promise leads or sales?", answer: "No. We promise clear work and honest reporting on calls, leads and appointments." },
    ],
    ctaHeading: "Ready for more buyers and sellers who call you first?",
    related: [
      { label: "Local SEO", href: "/services/seo", text: "Rank for the areas you work in." },
      { label: "Meta Ads", href: "/services/meta-ads", text: "Listings and seller campaigns on Facebook and Instagram." },
      { label: "GoHighLevel CRM", href: "/services/gohighlevel-crm", text: "Reply fast and keep every lead warm." },
    ],
    byline: true,
    updated: UPDATED,
  },

  /* --------------------------------------------------------- Miami dental */
  {
    slug: "miami-dental-marketing",
    name: "Miami dental marketing",
    seo: {
      title: "Miami Dental Marketing | New Patients for Your Practice",
      description: "Dental marketing for Miami practices: local SEO, Google Maps, Google Ads and AI search. More new patients, plain reports. Free practice audit.",
    },
    eyebrow: "Miami dental marketing",
    heading: "Dental marketing for Miami practices that want more new patients.",
    intro:
      "We help Miami dental practices get found by people looking for a dentist nearby, on Google, in the Maps pack and in AI answers. We also make sure every call and form gets a fast reply. I have built SEO for dental practices, so I know what patients look for before they call.",
    mockup: "ai-answer",
    painsHeading: "Sound familiar?",
    pains: [
      { title: "Crowded Miami market", text: "There is a dental office on every few blocks, so patients compare reviews and Google results before they call." },
      { title: "Gaps in the schedule", text: "You have chair time to fill, but the new patients you want most, such as implants and cosmetic cases, are not arriving." },
      { title: "A busy front desk", text: "Calls ring out while the team handles patients. A missed call is a patient who books the next office." },
      { title: "One language only", text: "Many patients here search in Spanish or in both languages, and your website speaks only one." },
    ],
    systemHeading: "How we market Miami dental practices.",
    systemIntro: "The same system as our dental marketing page, applied to the way people search in Miami.",
    system: [
      { slug: "seo", why: "Win the map pack for your neighborhood and rank pages for the treatments you want." },
      { slug: "search-everywhere-optimization", why: "Be the practice AI tools suggest when someone asks for a dentist nearby." },
      { slug: "google-ads", why: "Campaigns for implants, Invisalign, emergency visits and new patient exams, each with its own page." },
      { slug: "gohighlevel-crm", why: "Instant replies, reminders that cut no-shows and review requests after visits." },
      { slug: "website-design", why: "Fast treatment pages and, where it fits, a Spanish version of the pages that matter." },
      { slug: "ai-agents", why: "Answer after-hours questions and book consults." },
    ],
    tradesHeading: "Miami areas we plan around",
    trades: [
      { name: "Brickell and Downtown", text: "Working professionals and condo residents." },
      { name: "Coral Gables", text: "Established practices and referral dentistry." },
      { name: "Miami Beach", text: "Residents and visitors who need a dentist fast." },
      { name: "Doral and Kendall", text: "Families and long-term patients." },
      { name: "Aventura", text: "Cosmetic and specialty cases." },
      { name: "Hialeah and Little Havana", text: "Bilingual families and neighborhood practices." },
    ],
    sections: [
      {
        heading: "How Miami patients choose a dentist",
        paragraphs: [
          "Most patients start with a search like dentist near me or a treatment name and a neighborhood. They look at the Maps pack first: rating, number of reviews, photos and distance. Then they click one or two websites. If your profile is thin or your site is slow, you lose the patient before they ever see your office.",
          "That is why we begin with the Google Business Profile and the review process. They are the fastest way to improve how your practice looks in a crowded market.",
        ],
      },
      {
        heading: "Treatment pages that answer real questions",
        paragraphs: [
          "Each treatment you want more of gets its own page: what it involves, who it is for, what to expect and how to book. These pages help your SEO and your Google Ads at the same time, because they match what the patient searched for.",
          "We write them in a calm, clear tone and leave out claims you cannot support. Dental advertising has its own rules, and we keep to them.",
        ],
      },
      {
        heading: "Reaching Spanish-speaking patients",
        paragraphs: [
          "If your team speaks Spanish, tell patients. A Spanish version of your key pages and your Google Business Profile details can reach people your competitors miss. We plan this with you so it is accurate and worth the effort.",
        ],
      },
    ],
    month: [
      { title: "Every week", text: "Ads checked and tuned, with spend moved toward the treatments that book." },
      { title: "Every month", text: "New treatment pages and Google Business Profile updates." },
      { title: "Every visit", text: "An automatic review request after the appointment." },
      { title: "Every lead", text: "Response times, missed calls and booked consults reviewed." },
      { title: "Month end", text: "A plain-English report and a short call on what worked and what comes next." },
    ],
    proofPlaceholder: "[MIAMI DENTAL CLIENT RESULT]",
    faqs: [
      { question: "How is this different from your dental marketing page?", answer: "Same approach, written for Miami. This page covers the Miami market, the neighborhoods and bilingual patients. The dental marketing page covers the full system for practices anywhere." },
      { question: "Can you help us show up in ChatGPT and Gemini?", answer: "Yes. Patients now ask AI tools for a dentist nearby. Clear pages, a complete profile, consistent details and real reviews are what those tools pick up. We build those." },
      { question: "Do you help with patient reviews?", answer: "Yes. We set up an automatic review request after visits, which builds trust and supports your local rankings." },
      { question: "Can you build pages in Spanish?", answer: "Yes. We plan which pages are worth translating and work from accurate copy that your team reviews." },
      { question: "Do you guarantee new patients?", answer: "No. We do not promise rankings or patient counts. We promise clear work and honest reporting on calls and booked consults." },
    ],
    ctaHeading: "Ready to fill your Miami schedule with the right patients?",
    parent: { name: "Dental marketing", href: "/dental-marketing" },
    related: [
      { label: "Dental marketing", href: "/dental-marketing", text: "The full system for dental practices." },
      { label: "Miami SEO", href: "/miami-seo", text: "How we approach local SEO in Miami." },
      { label: "Search Everywhere Optimization", href: "/services/search-everywhere-optimization", text: "Be the practice AI tools name." },
    ],
    byline: true,
    updated: UPDATED,
  },
];
