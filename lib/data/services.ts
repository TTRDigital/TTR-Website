import type { Faq, Step } from "@/lib/content";
import type { MockupKind } from "@/components/mockups/ServiceMockups";
import type { serviceOptions } from "@/lib/lead-options";

/* ==========================================================================
   Service page copy (fallbacks). Phase 4 moves this into Sanity; until then
   these are the source of truth for /services/[slug].
   ========================================================================== */

export type ServicePage = {
  slug: string;
  title: string;
  seo: { title: string; description: string };
  eyebrow: string;
  heading: string;
  /** Answer-first: what it is and who it is for, in 2 to 3 sentences. */
  intro: string;
  mockup: MockupKind;
  included: Step[];
  sections: { heading: string; paragraphs: string[] }[];
  process: Step[];
  proof: {
    stats?: { value: string; label: string }[];
    testimonialIndex?: number;
    placeholder?: string;
  };
  audiences: { dental: string; homeServices: string; other: string };
  related: string[];
  faqs: Faq[];
  formService: (typeof serviceOptions)[number];
};

export const servicePages: ServicePage[] = [
  /* ------------------------------------------------------------------ SEO */
  {
    slug: "seo",
    title: "SEO",
    seo: {
      title: "Local SEO Services | TTR Digital Marketing",
      description:
        "Local SEO that gets your business into Google search and the map pack, then turns that traffic into calls. Free SEO audit from our team.",
    },
    eyebrow: "Local SEO",
    heading: "SEO that puts you in front of local customers ready to call.",
    intro:
      "SEO, or search engine optimization, is the work that helps your business show up in Google search and Google Maps when people nearby look for what you do. It is for local service businesses, like dental practices and home service companies, that want a steady flow of calls without paying for every click.",
    mockup: "ranking",
    included: [
      { title: "SEO audit and roadmap", text: "We check your site, your Google Business Profile and your top competitors, then rank every fix by how much it will move the needle." },
      { title: "Google Business Profile", text: "Categories, services, photos, posts and questions kept complete and current, so you can compete for the map pack." },
      { title: "Service and location pages", text: "Clear pages for each service and area you cover, written for real customers and the words they actually search." },
      { title: "Technical fixes", text: "Speed, mobile layout, indexing, broken links and structured data, so Google can crawl your site and trust it." },
      { title: "Reviews and citations", text: "A steady flow of new reviews and consistent name, address and phone details across the directories that matter." },
      { title: "Reporting tied to leads", text: "Monthly reports that show calls, forms and rankings in plain English, with what we did and what comes next." },
    ],
    sections: [
      {
        heading: "Why local SEO pays off",
        paragraphs: [
          "Most people pick a business from the top few results or the three listings in the map pack. If you are not there, you are invisible to them. Unlike ads, you do not pay for each visit, and good rankings keep working month after month. That is why SEO often becomes the lowest cost source of leads over time.",
          "It is not instant. Most businesses see movement in the first few months and steadier growth after that. Many of our clients run Google Ads at the same time, so the phone rings while organic rankings build.",
        ],
      },
      {
        heading: "SEO that also works for AI search",
        paragraphs: [
          "Google's AI Overviews, ChatGPT and Gemini pull from many of the same signals we build for SEO: clear pages that answer real questions, strong reviews and consistent business details. Every SEO plan we run follows our Search Everywhere approach, so the same work helps you in classic results and in AI answers.",
        ],
      },
      {
        heading: "What we will not do",
        paragraphs: [
          "We do not promise number one rankings, because nobody controls Google. We do not buy spammy links or stuff keywords into pages. We focus on the searches that bring you customers, and we show you the work and the results every month.",
        ],
      },
    ],
    process: [
      { title: "Audit", text: "We review your site, your profile, your reviews and the businesses outranking you today." },
      { title: "Plan", text: "You get a prioritized roadmap tied to the services and areas you most want to grow." },
      { title: "Fix the foundation", text: "Speed, structure, tracking and on-page basics come first, so every later step counts for more." },
      { title: "Build authority", text: "Helpful content, reviews, citations and local links show Google you are the trusted choice nearby." },
      { title: "Measure and adjust", text: "We track calls, forms and rankings, then adjust the plan every month based on what works." },
    ],
    proof: {
      stats: [
        { value: "411%", label: "more organic traffic, year over year, for one SEO client" },
        { value: "688%", label: "more keywords ranking in Google's top 10" },
      ],
      testimonialIndex: 0,
    },
    audiences: {
      dental: "Rank for searches like \"dentist near me\", \"emergency dentist\" and the treatments you want more of, from implants to Invisalign.",
      homeServices: "Win the map pack in your service area for urgent searches like \"AC repair near me\" or \"emergency plumber\".",
      other: "Any local business that depends on calls, forms or bookings from people nearby.",
    },
    related: ["search-everywhere-optimization", "google-ads", "website-design"],
    faqs: [
      {
        question: "How long does SEO take to work?",
        answer:
          "Most businesses start to see movement within the first few months, with steadier growth after that. It depends on your competition, your site and how much work is needed up front.",
      },
      {
        question: "What is the difference between SEO and Google Ads?",
        answer:
          "Google Ads put you at the top right away, and you pay for each click. SEO earns your place in the regular results and the map pack, so traffic keeps coming without a per-click cost. Ads are fast and SEO compounds, which is why many businesses use both.",
      },
      {
        question: "Do you write the content?",
        answer: "Yes. Our team writes service pages, location pages and blog posts, and we run everything by you before it goes live.",
      },
      {
        question: "Will you work on my existing website?",
        answer:
          "Usually, yes. We work with WordPress, Wix, Squarespace, Shopify and most other platforms. If your site holds you back, we will tell you and show you the options.",
      },
      {
        question: "How do you report on SEO?",
        answer:
          "Every month you get a short report in plain English: calls, form leads, rankings for your key searches, Google Business Profile activity and what we did. You can always ask us what anything means.",
      },
      {
        question: "Can you guarantee first page rankings?",
        answer:
          "No. Nobody controls Google, and anyone who guarantees rankings is guessing or cutting corners. We promise honest work focused on the searches that bring you customers, and clear reporting on progress.",
      },
    ],
    formService: "SEO",
  },

  /* ----------------------------------------------------- Search Everywhere */
  {
    slug: "search-everywhere-optimization",
    title: "Search Everywhere Optimization",
    seo: {
      title: "Search Everywhere Optimization: Google + AI Search | TTR",
      description:
        "Get found and recommended in Google, Maps, AI Overviews, ChatGPT, Gemini and Perplexity. Search Everywhere Optimization from TTR.",
    },
    eyebrow: "AI search and SEO",
    heading: "Be the business Google, Maps and AI tools recommend.",
    intro:
      "Search Everywhere Optimization makes your business easy to find and easy to recommend wherever people search: Google, Google Maps, YouTube and AI tools like ChatGPT, Gemini, Perplexity and Google's AI Overviews. It is for local businesses that want to show up when a customer asks \"who is the best near me?\", not only when they type a keyword.",
    mockup: "ai-answer",
    included: [
      { title: "AI visibility check", text: "We ask the major AI tools the questions your customers ask and record who gets recommended today." },
      { title: "Answer-first pages", text: "We rewrite key pages so they answer common questions directly, in a way AI tools can understand and quote." },
      { title: "Structured data", text: "Schema markup that tells search engines exactly who you are, what you do and where you work." },
      { title: "Consistent business details", text: "Your name, address, phone and hours made consistent across maps, directories and profiles." },
      { title: "Reviews and mentions", text: "A plan to grow reviews and earn mentions on trusted local sites, two signals AI tools lean on heavily." },
      { title: "Monthly visibility tracking", text: "We re-test your key questions every month and report where you show up and where you do not yet." },
    ],
    sections: [
      {
        heading: "Why classic SEO is no longer enough",
        paragraphs: [
          "More searches now end with an AI summary instead of a click. A customer asks ChatGPT for a good dentist nearby, or reads Google's AI Overview for \"best roofer near me\", and calls one of the names they see. If your business is not part of that answer, you can lose leads even when you rank well in the regular results.",
        ],
      },
      {
        heading: "What AI tools look for",
        paragraphs: [
          "AI answers favor businesses with clear, factual pages, plenty of recent reviews, consistent details across the web and mentions on sites they trust. None of that is a trick. It is the same work that makes you look credible to a real customer, done in a way machines can read.",
          "Search Everywhere Optimization builds on strong SEO and adds the steps that help AI tools understand your business and mention it.",
        ],
      },
      {
        heading: "How we measure it",
        paragraphs: [
          "Rankings alone do not show AI visibility. We keep a list of the questions your customers really ask, test them in the major AI tools every month and track how often your business appears, right next to your Google rankings, calls and leads.",
        ],
      },
    ],
    process: [
      { title: "Find the gaps", text: "We test the questions your customers ask and see who gets recommended today, and why." },
      { title: "Make your site easy to quote", text: "We rewrite key pages with direct answers, FAQs and structured data." },
      { title: "Build trust signals", text: "Reviews, citations, mentions and consistent details tell every platform you are legitimate." },
      { title: "Track and expand", text: "We re-check visibility every month and add new questions and topics as you grow." },
    ],
    proof: { placeholder: "[CLIENT RESULT]" },
    audiences: {
      dental: "Patients now ask AI tools for a trusted dentist, or for a specialist for implants or Invisalign. We work to make your practice part of that answer.",
      homeServices: "When a homeowner asks who to call for a leak or a broken AC, AI tools name a few local companies. We work to make yours one of them.",
      other: "Any business that people research before they call: clinics, law offices, contractors, salons and more.",
    },
    related: ["seo", "website-design", "ai-agents"],
    faqs: [
      {
        question: "Is this the same as SEO?",
        answer:
          "It starts with SEO, then goes further. We also optimize for AI answers, maps, reviews and other places people search, and we track visibility in AI tools directly.",
      },
      {
        question: "Can you get my business mentioned in ChatGPT?",
        answer:
          "Nobody controls what an AI tool says. We improve the signals these tools rely on, like clear pages, reviews and mentions, which makes it more likely they recommend you.",
      },
      {
        question: "How do you measure AI search visibility?",
        answer:
          "We regularly test the questions your customers ask in the major AI tools and track how often your business appears, alongside normal Google rankings and leads.",
      },
      {
        question: "Which AI tools do you focus on?",
        answer:
          "Google's AI Overviews, ChatGPT, Gemini and Perplexity, plus Google Maps and classic search. They overlap a lot, so the same work helps across all of them.",
      },
      {
        question: "How long until AI tools mention my business?",
        answer:
          "It varies. AI tools update at different speeds and some rely on data that refreshes over weeks or months. We track progress monthly and start with the fixes that help everywhere, like clear pages, reviews and consistent details.",
      },
      {
        question: "Do I still need regular SEO?",
        answer:
          "Yes. Strong SEO is the base. Search Everywhere Optimization includes it and adds the AI-specific work on top, so you do not need two separate plans.",
      },
    ],
    formService: "Search Everywhere Optimization",
  },

  /* ----------------------------------------------------------- Google Ads */
  {
    slug: "google-ads",
    title: "Google Ads",
    seo: {
      title: "Google Ads Management Services | TTR Digital Marketing",
      description:
        "Google Ads built for calls and booked appointments. Search, Local Services Ads and Performance Max managed by TTR Digital Marketing.",
    },
    eyebrow: "Google Ads management",
    heading: "Google Ads that bring calls, not just clicks.",
    intro:
      "Google Ads put your business at the top of Google the moment someone searches for what you offer. We build and manage Search, Local Services Ads and Performance Max campaigns for local businesses that want booked appointments fast, and we cut the spend that does not bring them.",
    mockup: "ads",
    included: [
      { title: "Account audit or clean setup", text: "We review what you have and find the waste, or build a new account the right way from day one." },
      { title: "Keyword strategy", text: "Tight keyword groups around the services you want, plus negative keywords that block clicks that never buy." },
      { title: "Ads and landing pages", text: "Clear ads matched to each search, sent to fast pages that make calling or booking easy." },
      { title: "Call and form tracking", text: "Every call and form is tracked back to its campaign, so we optimize for leads, not clicks." },
      { title: "Local Services Ads", text: "Setup and management of Google's pay-per-lead listings, where they fit your business." },
      { title: "Weekly tuning, monthly reports", text: "Bids, keywords and ads adjusted every week, with a monthly report on cost per lead and booked jobs." },
    ],
    sections: [
      {
        heading: "Ads that match what people search",
        paragraphs: [
          "A person searching \"emergency plumber\" needs a different ad and page than someone searching \"water heater installation\". We group keywords tightly and send each search to a page that answers it. That raises the quality of your leads and usually lowers what you pay for each one.",
        ],
      },
      {
        heading: "Landing pages matter as much as ads",
        paragraphs: [
          "Good ads sent to a slow or confusing page waste money. We can build fast landing pages as part of our website service and connect them to GoHighLevel, so every lead gets a quick follow up instead of sitting in an inbox.",
        ],
      },
      {
        heading: "Ads and SEO work better together",
        paragraphs: [
          "Ads bring leads now. SEO lowers your cost per lead over time. Many clients run both, using ad data to learn which searches turn into the best customers, then going after those same searches with SEO.",
        ],
      },
    ],
    process: [
      { title: "Account review", text: "We look at what you have now, or plan a clean new setup around your goals." },
      { title: "Build the campaigns", text: "Tight ad groups, strong ads and a landing page that matches each search." },
      { title: "Track every lead", text: "Calls and forms are tracked so we optimize for leads, not clicks." },
      { title: "Tune every week", text: "We trim waste, test new ads and move budget to what brings booked jobs." },
    ],
    proof: { placeholder: "[CLIENT RESULT]" },
    audiences: {
      dental: "Campaigns for high-value treatments like implants, Invisalign and emergency visits, each with its own landing page.",
      homeServices: "Search and Local Services Ads for urgent jobs, with call tracking so you know which jobs came from ads.",
      other: "Any local business where a single customer is worth far more than a click.",
    },
    related: ["meta-ads", "website-design", "gohighlevel-crm"],
    faqs: [
      {
        question: "How soon will I get leads from Google Ads?",
        answer:
          "Often within the first few weeks after launch. The first month or two is also a learning period where we tune keywords and ads to lower the cost per lead.",
      },
      { question: "Do I keep my ad account?", answer: "Yes. The account and all of its data belong to you." },
      {
        question: "Do you manage Local Services Ads?",
        answer:
          "Yes. For many home service businesses and some dental practices, Local Services Ads are a great fit, and we manage them along with regular search campaigns.",
      },
      {
        question: "How much should I spend on Google Ads?",
        answer:
          "It depends on your market, your services and how fast you want to grow. We look at search volume and competition in your area and recommend a starting budget that can produce real data, then adjust from there. Your ad budget is paid to Google directly.",
      },
      {
        question: "Why do my current ads get clicks but no calls?",
        answer:
          "Common causes are broad keywords, missing negative keywords, slow landing pages, no call tracking and ads that send everyone to the home page. Our account review shows which of these apply to you.",
      },
      {
        question: "How do you report results?",
        answer:
          "You get a monthly report on calls, form leads and cost per lead, plus booked jobs where your CRM tracks them, along with what we changed and why.",
      },
    ],
    formService: "Google Ads",
  },

  /* -------------------------------------------------------------- Meta Ads */
  {
    slug: "meta-ads",
    title: "Meta Ads",
    seo: {
      title: "Meta Ads Management: Facebook and Instagram Ads | TTR",
      description:
        "Facebook and Instagram ads that reach local customers and bring in leads, with fast follow up through your CRM. Meta Ads management by TTR.",
    },
    eyebrow: "Facebook and Instagram ads",
    heading: "Meta Ads that turn scrolling into booked calls.",
    intro:
      "Meta Ads are paid ads on Facebook and Instagram. They let you reach people in your area before they ever search, with an offer worth acting on. We create the ads, the offers and the lead forms, then connect every lead to fast follow up so it does not go cold.",
    mockup: "meta",
    included: [
      { title: "Offer strategy", text: "We help you pick an offer your audience will act on, like a new patient special or a seasonal tune-up." },
      { title: "Ad creative", text: "Images, short videos and copy made for the feed, using photos of your real work whenever possible." },
      { title: "Audience targeting", text: "Location, interest and lookalike audiences built around the customers you want more of." },
      { title: "Lead forms and landing pages", text: "Instant forms or fast landing pages, with a few smart questions that filter out people who are not serious." },
      { title: "Retargeting", text: "Ads that bring back people who visited your site or watched your videos but did not reach out." },
      { title: "CRM connection and reporting", text: "Leads go straight into your CRM with instant replies, and you get monthly reports on cost per lead and bookings." },
    ],
    sections: [
      {
        heading: "Why Meta Ads work for local businesses",
        paragraphs: [
          "Most people in your area scroll Facebook or Instagram every day. With the right offer, you can reach homeowners or patients long before they search on Google. That makes Meta Ads great for seasonal pushes, new services and filling quiet weeks.",
        ],
      },
      {
        heading: "Speed to lead is everything",
        paragraphs: [
          "Social leads go cold fast. Someone who filled out a form on their lunch break has moved on by the evening. We connect your ads to GoHighLevel and can add an AI agent that replies within seconds, day or night, and offers a time to book.",
        ],
      },
      {
        heading: "Creative that looks like you",
        paragraphs: [
          "Polished stock photos tend to get scrolled past. Real photos of your team and your work, short videos and clear offers usually perform best. We plan creative with you and test new versions every month.",
        ],
      },
    ],
    process: [
      { title: "Pick the offer", text: "We help you choose an offer your audience will act on." },
      { title: "Create and launch", text: "We make the ads, set the audience and launch with clear tracking." },
      { title: "Fast follow up", text: "Leads go into your CRM with instant text and email replies." },
      { title: "Test and scale", text: "We test new ads and audiences and put budget behind the winners." },
    ],
    proof: { placeholder: "[CLIENT RESULT]" },
    audiences: {
      dental: "New patient offers, whitening, Invisalign consults and reactivation campaigns for past patients.",
      homeServices: "Seasonal offers like AC tune-ups, roof inspections or gutter cleaning, aimed at homeowners in your service area.",
      other: "Businesses with a clear offer and a local audience, from med spas to fitness studios.",
    },
    related: ["google-ads", "social-media-marketing", "gohighlevel-crm"],
    faqs: [
      {
        question: "Are Facebook leads good quality?",
        answer:
          "They can be, with the right offer, targeting and a quick follow up. We add simple questions to forms and reply fast to filter out people who are not serious.",
      },
      {
        question: "Do you make the ad creative?",
        answer: "Yes. We write the copy and create images and short videos. If you have photos or videos of your work, those usually perform best.",
      },
      {
        question: "Should I run Meta Ads or Google Ads?",
        answer:
          "Google Ads reach people who are already searching, so they are best for urgent needs. Meta Ads reach people before they search, so they are great for offers and building demand. Many local businesses use Google for steady demand and Meta for promotions.",
      },
      {
        question: "How fast will I see leads?",
        answer:
          "Often within the first couple of weeks after launch. The first month is a testing period where we find the offers, audiences and creative that bring the best leads at the best cost.",
      },
      {
        question: "Do you post on my page too?",
        answer:
          "Ads and regular posts are separate. Our social media marketing service keeps your profiles active, which also helps your ads, because people check your page before they reach out.",
      },
      { question: "Who owns the ad account?", answer: "You do. We work inside your Meta Business account, and the account, pages and data stay yours." },
    ],
    formService: "Meta Ads",
  },

  /* --------------------------------------------------------- Website Design */
  {
    slug: "website-design",
    title: "Website Design",
    seo: {
      title: "Website Design for Local Businesses | TTR",
      description:
        "Fast, mobile-first websites built to rank on Google and turn visitors into calls and form leads. Website design from TTR Digital Marketing.",
    },
    eyebrow: "Website design",
    heading: "Websites built to rank and turn visitors into customers.",
    intro:
      "Your website is where most people decide whether to call you. We design and build fast, mobile-first websites for local businesses, with clear calls to action, SEO built in and forms connected to your CRM, so more visitors pick up the phone or book.",
    mockup: "website",
    included: [
      { title: "Strategy and sitemap", text: "We map your pages, your services and your goals before any design work starts." },
      { title: "Custom design", text: "A clean design that fits your brand, made for phones first and polished for desktop." },
      { title: "Copy that converts", text: "Clear, plain-English copy for every page, with your phone number one tap away." },
      { title: "SEO and AI search basics", text: "Fast load times, clean structure, page titles, schema markup and internal links from day one." },
      { title: "Forms and tracking", text: "Forms that feed your CRM, with call and form tracking set up before launch." },
      { title: "Easy editing", text: "A simple editor so your team can update text, add posts and change pages without code." },
    ],
    sections: [
      {
        heading: "Speed and clarity win",
        paragraphs: [
          "Most local searches happen on a phone. A slow or confusing site sends people back to Google and straight to a competitor. We keep pages light, fast and easy to scan, and we put your phone number and booking button where thumbs can reach them.",
        ],
      },
      {
        heading: "Built for search from the start",
        paragraphs: [
          "Every site we build has clean structure, page titles, schema markup and internal links, so it is ready for SEO and AI search on launch day. If you are replacing an old site, we map every old page to its new home and set up redirects so you keep the rankings you have earned.",
        ],
      },
      {
        heading: "Connected to your follow up",
        paragraphs: [
          "A form that sends to an inbox nobody checks is a lost lead. Our forms feed straight into GoHighLevel, so every lead gets an instant reply and lands in your pipeline where your team can see it.",
        ],
      },
    ],
    process: [
      { title: "Plan", text: "We map out pages, content and goals with you." },
      { title: "Design", text: "We design the look on mobile first, then desktop, and refine it with your feedback." },
      { title: "Write", text: "We write clear copy for each page and send it to you for review." },
      { title: "Build and connect", text: "We build the site, connect forms and tracking and test on every device." },
      { title: "Launch and grow", text: "We launch with redirects in place so you keep your rankings, then keep improving." },
    ],
    proof: { placeholder: "[CLIENT RESULT]" },
    audiences: {
      dental: "A modern site with treatment pages, online booking, reviews and clear insurance and financing information.",
      homeServices: "A site that shows your service area, your reviews and your work, with click-to-call and quote forms on every page.",
      other: "Any business that needs its website to bring in leads, not just look nice.",
    },
    related: ["seo", "google-ads", "gohighlevel-crm"],
    faqs: [
      {
        question: "Can you redesign my current site without losing rankings?",
        answer: "Yes. We map every old page to its new home and set up redirects, so search engines and visitors land in the right place.",
      },
      {
        question: "Will I be able to edit the site myself?",
        answer: "Yes. We set up an easy editor so your team can change text, add blog posts and update pages without code.",
      },
      {
        question: "How long does a new website take?",
        answer:
          "It depends on the number of pages and how quickly content and feedback come together. We give you a timeline at the start and keep you updated at each step.",
      },
      {
        question: "Do you write the content?",
        answer: "Yes. We write clear copy for every page and send it to you for review. If you already have content you like, we polish it and keep your voice.",
      },
      {
        question: "Can you build landing pages for my ads?",
        answer: "Yes. We build fast, focused landing pages for Google Ads and Meta Ads offers, with tracking and CRM forms included.",
      },
      { question: "Who owns the website?", answer: "You do. The site, its content and its domain belong to your business." },
    ],
    formService: "Website Design",
  },

  /* ------------------------------------------------------------ Social media */
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing",
    seo: {
      title: "Social Media Marketing for Local Businesses | TTR",
      description:
        "Social media management that keeps your profiles active, builds trust and supports your ads and SEO. Social media marketing from TTR.",
    },
    eyebrow: "Social media marketing",
    heading: "Social media that builds trust before people call.",
    intro:
      "Social media marketing is planning, creating and posting content on platforms like Facebook, Instagram, LinkedIn and your Google Business Profile. People check your pages before they call. We keep them active with useful posts, real photos of your work and quick replies, so new customers feel confident choosing you.",
    mockup: "social",
    included: [
      { title: "Monthly content plan", text: "A clear plan for the month, built around your services, seasons and offers, that you approve first." },
      { title: "Posts for every key platform", text: "Content for Facebook, Instagram, LinkedIn and your Google Business Profile, formatted for each one." },
      { title: "Short videos and graphics", text: "Simple, on-brand graphics and short videos that show your team and your work." },
      { title: "Comment and message monitoring", text: "We watch comments and messages and flag anything that needs your team right away." },
      { title: "Review sharing", text: "Happy customer reviews turned into posts, which builds trust and supports your reputation." },
      { title: "Simple monthly reports", text: "What we posted, what people engaged with and what we will do differently next month." },
    ],
    sections: [
      {
        heading: "Social proof that helps every other channel",
        paragraphs: [
          "An active page with real photos and happy customers makes your Google Ads and Meta Ads work better, because people trust what they see. A quiet page that has not posted in two years does the opposite.",
        ],
      },
      {
        heading: "Content that answers real questions",
        paragraphs: [
          "The same helpful content can show up in search and AI answers. We plan social posts alongside your SEO topics, so each piece works twice: once on social and once on your website.",
        ],
      },
      {
        heading: "Steady beats viral",
        paragraphs: [
          "You do not need to go viral. A few good posts every week, a clear next step in each one and fast replies to comments and messages build trust over time, and that trust turns into calls.",
        ],
      },
    ],
    process: [
      { title: "Learn your voice", text: "We learn your business, your customers and what makes you different." },
      { title: "Plan the month", text: "You get a content calendar to approve before anything posts." },
      { title: "Create and post", text: "We create the posts and publish them on schedule." },
      { title: "Engage and report", text: "We watch comments and messages and report on what worked." },
    ],
    proof: { placeholder: "[CLIENT RESULT]" },
    audiences: {
      dental: "Smile results shared with consent, team introductions, patient tips and reviews that put new patients at ease.",
      homeServices: "Job photos, quick maintenance tips, seasonal reminders and reviews that show great work in their neighborhood.",
      other: "Any business whose customers check social pages before they pick up the phone.",
    },
    related: ["meta-ads", "seo", "search-everywhere-optimization"],
    faqs: [
      {
        question: "Which platforms should my business be on?",
        answer:
          "Most local businesses do well with Facebook, Instagram and Google Business Profile. We will recommend what fits your customers instead of trying to be everywhere.",
      },
      { question: "Do I need to approve posts?", answer: "Yes. You see the monthly plan before anything goes live." },
      {
        question: "How often will you post?",
        answer:
          "It depends on your plan and your audience. Most local businesses do well with a few quality posts a week on two or three platforms. We agree on a schedule in the monthly plan.",
      },
      {
        question: "Do you reply to comments and messages?",
        answer:
          "We monitor comments and messages and can reply to common questions. Anything that needs your team, like a quote or a medical question, we pass to you right away.",
      },
      {
        question: "Do I need to provide photos?",
        answer:
          "Real photos of your team and your work perform best, so we will ask for some. We also create graphics and short videos to keep the feed fresh.",
      },
      {
        question: "Will social media bring leads directly?",
        answer:
          "Sometimes, but its main job is trust. Pair it with Meta Ads to turn that trust into leads, and make sure every post gives people an easy next step.",
      },
    ],
    formService: "Social Media Marketing",
  },

  /* ------------------------------------------------------- GoHighLevel CRM */
  {
    slug: "gohighlevel-crm",
    title: "GoHighLevel CRM",
    seo: {
      title: "GoHighLevel CRM Setup and Automation | TTR Digital",
      description:
        "GoHighLevel setup, pipelines and automatic text and email follow up so no lead slips through. CRM and automation services from TTR.",
    },
    eyebrow: "GoHighLevel CRM",
    heading: "GoHighLevel CRM so no lead slips through the cracks.",
    intro:
      "GoHighLevel is a CRM and marketing platform that puts every lead from your website, ads, phone and social inboxes in one place and follows up automatically. We set it up for local businesses, build your pipelines and automations and train your team, so more leads turn into booked appointments.",
    mockup: "crm",
    included: [
      { title: "Setup and pipeline design", text: "A full GoHighLevel setup with pipelines that match how your business actually books work." },
      { title: "Every lead in one inbox", text: "Website forms, ad leads, calls, texts and social messages in a single view." },
      { title: "Instant follow up", text: "Automatic text and email replies the moment a lead comes in, written in your voice." },
      { title: "Booking and reminders", text: "Online booking with reminders that cut no-shows and keep your schedule full." },
      { title: "Review requests", text: "A quick review request after every job or visit, which also helps your Google rankings." },
      { title: "Team training", text: "We train your team on the daily workflow and keep tuning the automations as you use them." },
    ],
    sections: [
      {
        heading: "Why follow up speed matters",
        paragraphs: [
          "Customers contact several businesses at once, and the one that answers first often wins the job. With GoHighLevel, every new lead gets an instant reply and lands in a pipeline where nothing is forgotten.",
        ],
      },
      {
        heading: "Works with your marketing",
        paragraphs: [
          "Leads from your website, Google Ads and Meta Ads flow straight in, tagged with where they came from. That means your reports show which channels bring booked jobs, not just clicks. Add an AI agent to answer questions and book appointments around the clock.",
        ],
      },
      {
        heading: "Built around how your team works",
        paragraphs: [
          "We start by mapping how leads come in and how your front desk or office books them today. Then we build the pipelines, messages and reminders around that process, so your team uses the system instead of working around it.",
        ],
      },
    ],
    process: [
      { title: "Map your process", text: "We learn how leads come in and how your team books them today." },
      { title: "Build it", text: "We set up pipelines, forms, calendars and automations." },
      { title: "Connect everything", text: "Website forms, ads, phone numbers and social inboxes all flow in." },
      { title: "Train and tune", text: "We train your team and keep improving the automations." },
    ],
    proof: { placeholder: "[CLIENT RESULT]" },
    audiences: {
      dental: "New patient pipelines, appointment reminders that cut no-shows, recall campaigns and review requests after visits.",
      homeServices: "Missed call text back, estimate follow ups, job reminders and review requests after every completed job.",
      other: "Any team that juggles leads from several places and loses some along the way.",
    },
    related: ["ai-agents", "website-design", "google-ads"],
    faqs: [
      {
        question: "I already have a GoHighLevel account. Can you help?",
        answer: "Yes. We can audit and clean up your existing setup, or rebuild the parts that are not working.",
      },
      {
        question: "Can it send review requests?",
        answer: "Yes. We set up automatic review requests after appointments or completed jobs, which also helps your Google rankings.",
      },
      {
        question: "Can it text back missed calls?",
        answer:
          "Yes. When a call is missed, GoHighLevel can send an instant text so the caller knows you will get back to them, with a link to book if you want one.",
      },
      {
        question: "Will it work with my calendar?",
        answer:
          "GoHighLevel has its own calendars and can sync with Google Calendar and Outlook. We set up the booking rules that fit your schedule.",
      },
      { question: "Who owns the data?", answer: "You do. Your contacts, conversations and pipeline data belong to your business." },
      {
        question: "Do you train my team?",
        answer:
          "Yes. We walk your team through the daily workflow, give you short how-to notes and keep tuning the automations as you use them.",
      },
    ],
    formService: "GoHighLevel CRM",
  },

  /* -------------------------------------------------------------- AI Agents */
  {
    slug: "ai-agents",
    title: "AI Agents",
    seo: {
      title: "AI Agents for Calls, Chat and Booking | TTR Digital",
      description:
        "AI agents that answer calls and chats, qualify leads and book appointments 24/7, connected to your CRM. AI automation from TTR.",
    },
    eyebrow: "AI agents",
    heading: "AI agents that answer, qualify and book around the clock.",
    intro:
      "AI agents are virtual assistants that answer website chats, texts and phone calls for your business. They answer common questions, ask the right qualifying questions and book appointments into your calendar, any time of day. We build them for local businesses that miss calls or reply too slowly.",
    mockup: "agent",
    included: [
      { title: "AI chat", text: "An assistant for your website chat and social inboxes that answers questions and captures leads." },
      { title: "AI voice agents", text: "Agents that pick up missed or after-hours calls, have a natural conversation and book or route the caller." },
      { title: "Questions tailored to you", text: "Qualifying questions and answers written for your services, your area and your rules." },
      { title: "Booking into your calendar", text: "Appointments booked, rescheduled or confirmed straight into your calendar." },
      { title: "Hand off to your team", text: "A clean hand off to a person whenever a question needs one, with the full conversation attached." },
      { title: "Logged in your CRM", text: "Every conversation and booking saved with the lead in GoHighLevel." },
    ],
    sections: [
      {
        heading: "Never miss a lead after hours",
        paragraphs: [
          "Many calls and messages come in at night, on weekends or while your team is busy with a customer. An AI agent can answer right away, collect the details and book the appointment, then your team picks it up in the morning.",
        ],
      },
      {
        heading: "Built on your CRM",
        paragraphs: [
          "Our agents run inside GoHighLevel, so every conversation, answer and booking is saved with the lead. Your team sees the full history before they call back.",
        ],
      },
      {
        heading: "Clear rules, and a person when needed",
        paragraphs: [
          "We write down what the agent should say, what it should never say and when it should hand off to a person. You approve the scripts, we test real scenarios with your team before launch and we review conversations to keep improving.",
        ],
      },
    ],
    process: [
      { title: "Plan the conversations", text: "We write down the questions, answers and rules your agent should follow." },
      { title: "Build and connect", text: "We build the agent and connect it to your CRM and calendar." },
      { title: "Test with you", text: "We test real scenarios with your team before going live." },
      { title: "Review and improve", text: "We review conversations and keep making the agent better." },
    ],
    proof: { placeholder: "[CLIENT RESULT]" },
    audiences: {
      dental: "Answer questions about hours, insurance and new patient visits, and book cleanings and consults while the front desk focuses on patients in the office.",
      homeServices: "Pick up calls while your team is on a job, collect the address and the problem, and book the visit or estimate.",
      other: "Any business that gets more calls and messages than it can answer quickly.",
    },
    related: ["gohighlevel-crm", "search-everywhere-optimization", "meta-ads"],
    faqs: [
      {
        question: "Will customers know they are talking to AI?",
        answer: "We recommend being upfront. Most people are happy to get a fast, helpful answer, and the agent can hand off to a person any time.",
      },
      {
        question: "Can the AI agent book appointments?",
        answer: "Yes. It can check your calendar and book, reschedule or confirm appointments based on rules you set.",
      },
      {
        question: "What if the AI does not know the answer?",
        answer: "It follows the rules we set together. When it is unsure, or the question needs a person, it says so, collects the details and hands off to your team.",
      },
      {
        question: "Can it answer phone calls?",
        answer: "Yes. Voice agents can answer missed or after-hours calls, have a natural conversation and book or route the caller. You decide when it picks up.",
      },
      {
        question: "What about private customer information?",
        answer:
          "We design the agent to ask only for what it needs to book or route a request, and we review the setup with you before launch. For healthcare practices we keep it to scheduling and general questions.",
      },
      {
        question: "How long does setup take?",
        answer:
          "It depends on how many questions and workflows the agent needs to handle. Chat and missed-call agents come together faster than full voice agents. We give you a timeline after we map the conversations.",
      },
    ],
    formService: "AI Agents",
  },
];

export const getServicePage = (slug: string) => servicePages.find((s) => s.slug === slug) ?? null;
