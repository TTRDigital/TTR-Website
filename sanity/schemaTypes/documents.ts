import { defineArrayMember, defineField, defineType } from "sanity";
import {
  BookOpen,
  Building2,
  CircleHelp,
  Cog,
  FileText,
  Folder,
  Home,
  ImageIcon,
  Layers,
  Menu,
  MessageSquareQuote,
  Trophy,
  User,
} from "lucide-react";

const slugField = (source = "title") =>
  defineField({ name: "slug", type: "slug", options: { source, maxLength: 96 }, validation: (r) => r.required() });

const seoField = defineField({ name: "seo", title: "SEO", type: "seo", group: "seo" });

const mockupOptions = [
  { title: "Rankings chart", value: "ranking" },
  { title: "Google ad result", value: "ads" },
  { title: "AI answer", value: "ai-answer" },
  { title: "Facebook / Instagram ad", value: "meta" },
  { title: "Website", value: "website" },
  { title: "Content calendar", value: "social" },
  { title: "CRM pipeline", value: "crm" },
  { title: "AI agent chat", value: "agent" },
];

/* ------------------------------------------------------------ Singletons */

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  icon: Cog,
  groups: [
    { name: "contact", title: "Contact", default: true },
    { name: "trust", title: "Trust signals" },
    { name: "brand", title: "Brand and social" },
    { name: "seo", title: "Default SEO" },
  ],
  fields: [
    defineField({ name: "phone", type: "string", group: "contact", description: "Shown everywhere. Click-to-call uses this number.", validation: (r) => r.required() }),
    defineField({ name: "email", type: "string", group: "contact" }),
    defineField({ name: "street", type: "string", group: "contact" }),
    defineField({ name: "city", type: "string", group: "contact" }),
    defineField({ name: "region", title: "State", type: "string", group: "contact" }),
    defineField({ name: "postalCode", type: "string", group: "contact" }),
    defineField({ name: "hoursText", title: "Hours", type: "string", group: "contact" }),
    defineField({ name: "mapsUrl", title: "Google Maps link", type: "url", group: "contact", description: "Your Google Business Profile or a Maps search link." }),
    defineField({ name: "foundedYear", title: "Year founded", type: "number", group: "trust" }),
    defineField({ name: "googleRating", title: "Google rating", type: "string", group: "trust", description: "For example 4.9. Leave empty to hide." }),
    defineField({ name: "reviewCount", title: "Number of Google reviews", type: "string", group: "trust" }),
    defineField({
      name: "badges",
      title: "Partner badges",
      type: "array",
      group: "trust",
      description: "Only switch on badges that are current and verifiable.",
      of: [
        defineArrayMember({
          name: "logo",
          type: "object",
          fields: [
            defineField({ name: "name", type: "string" }),
            defineField({ name: "image", type: "image" }),
            defineField({ name: "show", title: "Show on site", type: "boolean", initialValue: false }),
          ],
          preview: { select: { title: "name", media: "image", show: "show" }, prepare: ({ title, media, show }) => ({ title, media, subtitle: show ? "Shown" : "Hidden" }) },
        }),
      ],
    }),
    defineField({ name: "logo", type: "image", group: "brand", description: "SVG preferred. The site uses the built-in traced logo until this is set." }),
    defineField({
      name: "social",
      title: "Social links",
      type: "array",
      group: "brand",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({ name: "network", type: "string", options: { list: ["facebook", "instagram", "linkedin", "youtube", "x", "tiktok"] } }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: { select: { title: "network", subtitle: "url" } },
        }),
      ],
    }),
    defineField({ name: "defaultSeo", title: "Default SEO", type: "seo", group: "seo" }),
    defineField({ name: "clientLogos", type: "array", of: [{ type: "image" }], hidden: true, description: "Replaced by Proof > Client logos." }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});

export const navigation = defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  icon: Menu,
  fields: [
    defineField({
      name: "mainLinks",
      title: "Header links",
      type: "array",
      of: [{ type: "linkItem" }],
      description: "Shown after the Services and Industries menus.",
    }),
    defineField({ name: "headerCtaLabel", title: "Header button label", type: "string", initialValue: "Free audit" }),
    defineField({ name: "footerCompanyLinks", title: "Footer company links", type: "array", of: [{ type: "linkItem" }] }),
  ],
  preview: { prepare: () => ({ title: "Navigation" }) },
});

export const homePage = defineType({
  name: "homePage",
  title: "Home page",
  type: "document",
  icon: Home,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections" },
    { name: "proof", title: "Results" },
    { name: "faq", title: "FAQ and CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "heroEyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeading", title: "Headline (H1)", type: "string", group: "hero", validation: (r) => r.required() }),
    defineField({ name: "heroText", title: "Subhead", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroPoints", type: "array", of: [{ type: "string" }], group: "hero", hidden: true }),

    defineField({ name: "logosHeading", title: "Logo row label", type: "string", group: "sections" }),

    defineField({ name: "problemEyebrow", type: "string", group: "sections", fieldset: "problem" }),
    defineField({ name: "problemHeading", type: "string", group: "sections", fieldset: "problem" }),
    defineField({ name: "problemBroken", title: "What is broken", type: "array", of: [{ type: "step" }], group: "sections", fieldset: "problem" }),
    defineField({ name: "problemFixes", title: "What TTR does", type: "array", of: [{ type: "step" }], group: "sections", fieldset: "problem" }),

    defineField({ name: "servicesEyebrow", type: "string", group: "sections", fieldset: "services" }),
    defineField({ name: "servicesHeading", type: "string", group: "sections", fieldset: "services" }),
    defineField({ name: "servicesIntro", type: "text", rows: 2, group: "sections", fieldset: "services" }),

    defineField({ name: "seEyebrow", title: "Eyebrow", type: "string", group: "sections", fieldset: "searchEverywhere" }),
    defineField({ name: "seHeading", title: "Heading", type: "string", group: "sections", fieldset: "searchEverywhere" }),
    defineField({ name: "seText", title: "Text", type: "text", rows: 3, group: "sections", fieldset: "searchEverywhere" }),
    defineField({ name: "sePoints", title: "Points", type: "array", of: [{ type: "string" }], group: "sections", fieldset: "searchEverywhere" }),
    defineField({ name: "sePlatforms", title: "Platform labels (6)", type: "array", of: [{ type: "string" }], group: "sections", fieldset: "searchEverywhere", validation: (r) => r.max(6) }),

    defineField({ name: "processEyebrow", type: "string", group: "sections", fieldset: "process" }),
    defineField({ name: "processHeading", type: "string", group: "sections", fieldset: "process" }),
    defineField({ name: "processIntro", type: "text", rows: 2, group: "sections", fieldset: "process" }),
    defineField({ name: "process", title: "Steps", type: "array", of: [{ type: "step" }], group: "sections", fieldset: "process" }),

    defineField({ name: "industriesEyebrow", type: "string", group: "sections", fieldset: "industries" }),
    defineField({ name: "industriesHeading", type: "string", group: "sections", fieldset: "industries" }),
    defineField({
      name: "industryCards",
      type: "array",
      group: "sections",
      fieldset: "industries",
      of: [
        defineArrayMember({
          type: "object",
          name: "industryCard",
          fields: [
            defineField({ name: "href", type: "string" }),
            defineField({ name: "eyebrow", type: "string" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "text", type: "text", rows: 3 }),
            defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
          ],
          preview: { select: { title: "title", subtitle: "eyebrow" } },
        }),
      ],
    }),
    defineField({ name: "industriesMore", type: "string", group: "sections", fieldset: "industries" }),

    defineField({ name: "aiEyebrow", type: "string", group: "sections", fieldset: "aiCrm" }),
    defineField({ name: "aiHeading", type: "string", group: "sections", fieldset: "aiCrm" }),
    defineField({ name: "aiText", type: "text", rows: 3, group: "sections", fieldset: "aiCrm" }),
    defineField({ name: "aiPoints", type: "array", of: [{ type: "step" }], group: "sections", fieldset: "aiCrm" }),

    defineField({ name: "testimonialsEyebrow", type: "string", group: "sections", fieldset: "testimonials" }),
    defineField({ name: "testimonialsHeading", type: "string", group: "sections", fieldset: "testimonials" }),

    defineField({ name: "resultsEyebrow", type: "string", group: "proof" }),
    defineField({ name: "resultsHeading", type: "string", group: "proof" }),
    defineField({ name: "resultsIntro", type: "text", rows: 2, group: "proof" }),
    defineField({ name: "stats", type: "array", of: [{ type: "stat" }], group: "proof", description: "Real numbers only. Case studies come from Proof > Case studies." }),
    defineField({ name: "resultsFootnote", type: "string", group: "proof" }),

    defineField({ name: "faqEyebrow", type: "string", group: "faq" }),
    defineField({ name: "faqHeading", type: "string", group: "faq" }),
    defineField({ name: "faqs", type: "array", of: [{ type: "faqItem" }], group: "faq" }),
    defineField({ name: "ctaHeading", type: "string", group: "faq" }),
    defineField({ name: "ctaText", type: "text", rows: 2, group: "faq" }),
    seoField,
  ],
  fieldsets: [
    { name: "problem", title: "Problem and promise", options: { collapsible: true, collapsed: true } },
    { name: "services", title: "Services intro", options: { collapsible: true, collapsed: true } },
    { name: "searchEverywhere", title: "Search Everywhere", options: { collapsible: true, collapsed: true } },
    { name: "process", title: "How we work", options: { collapsible: true, collapsed: true } },
    { name: "industries", title: "Industries", options: { collapsible: true, collapsed: true } },
    { name: "aiCrm", title: "AI + CRM", options: { collapsible: true, collapsed: true } },
    { name: "testimonials", title: "Testimonials", options: { collapsible: true, collapsed: true } },
  ],
  preview: { prepare: () => ({ title: "Home page" }) },
});

/* ------------------------------------------------------------- Documents */

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  icon: Layers,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
    { name: "proof", title: "Proof" },
    { name: "faq", title: "FAQ" },
    { name: "seo", title: "SEO" },
  ],
  orderings: [{ title: "Menu order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "title", type: "string", group: "hero", validation: (r) => r.required() }),
    { ...slugField(), group: "hero" },
    defineField({ name: "order", title: "Menu order", type: "number", group: "hero" }),
    defineField({ name: "summary", title: "One-line summary", type: "string", group: "hero", description: "Used in menus and cards." }),
    defineField({ name: "eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heading", title: "Headline (H1)", type: "string", group: "hero", description: "Service plus outcome." }),
    defineField({ name: "intro", title: "Answer-first intro", type: "text", rows: 4, group: "hero", description: "2 to 3 sentences: what it is and who it is for." }),
    defineField({ name: "mockup", title: "Hero visual", type: "string", group: "hero", options: { list: mockupOptions } }),
    defineField({ name: "included", title: "What's included (6)", type: "array", of: [{ type: "step" }], group: "content" }),
    defineField({ name: "body", title: "Why it matters", type: "richText", group: "content", description: "Use Heading 2 for each sub-section." }),
    defineField({ name: "process", type: "array", of: [{ type: "step" }], group: "content", validation: (r) => r.max(5) }),
    defineField({
      name: "audiences",
      title: "Who it's for",
      type: "object",
      group: "content",
      fields: [
        defineField({ name: "dental", type: "text", rows: 2 }),
        defineField({ name: "homeServices", type: "text", rows: 2 }),
        defineField({ name: "other", title: "Other local businesses", type: "text", rows: 2 }),
      ],
    }),
    defineField({ name: "related", title: "Related services", type: "array", group: "content", of: [{ type: "reference", to: [{ type: "service" }] }], validation: (r) => r.max(3) }),
    defineField({ name: "proofStats", title: "Stats", type: "array", of: [{ type: "stat" }], group: "proof", description: "Real numbers only." }),
    defineField({ name: "proofTestimonial", title: "Testimonial", type: "reference", to: [{ type: "testimonial" }], group: "proof" }),
    defineField({ name: "proofResult", title: "Client result", type: "string", group: "proof", description: "A short real result. Leave the [CLIENT RESULT] placeholder until you have one." }),
    defineField({ name: "faqs", title: "FAQs", type: "array", of: [{ type: "faqItem" }], group: "faq" }),
    defineField({ name: "benefits", type: "array", of: [{ type: "string" }], hidden: true, description: "Replaced by What's included." }),
    seoField,
  ],
  preview: { select: { title: "title", subtitle: "summary" } },
});

export const nichePage = defineType({
  name: "nichePage",
  title: "Industry page",
  type: "document",
  icon: Building2,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "content", title: "Content" },
    { name: "faq", title: "FAQ and CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "hero", validation: (r) => r.required() }),
    { ...slugField(), group: "hero" },
    defineField({ name: "eyebrow", type: "string", group: "hero" }),
    defineField({ name: "heading", title: "Headline (H1)", type: "string", group: "hero" }),
    defineField({ name: "intro", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "mockup", title: "Hero visual", type: "string", group: "hero", options: { list: mockupOptions } }),
    defineField({ name: "problems", title: "Pain points", type: "array", of: [{ type: "step" }], group: "content" }),
    defineField({ name: "systemHeading", type: "string", group: "content" }),
    defineField({ name: "systemIntro", type: "text", rows: 2, group: "content" }),
    defineField({
      name: "systemItems",
      title: "Services and why",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "systemItem",
          fields: [
            defineField({ name: "service", type: "reference", to: [{ type: "service" }] }),
            defineField({ name: "why", type: "text", rows: 2 }),
          ],
          preview: { select: { title: "service.title", subtitle: "why" } },
        }),
      ],
    }),
    defineField({
      name: "trades",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "object",
          name: "trade",
          fields: [defineField({ name: "name", type: "string" }), defineField({ name: "text", type: "string" })],
          preview: { select: { title: "name", subtitle: "text" } },
        }),
      ],
    }),
    defineField({ name: "process", title: "A typical month", type: "array", of: [{ type: "step" }], group: "content" }),
    defineField({ name: "proofResult", title: "Client result", type: "string", group: "content" }),
    defineField({ name: "faqs", type: "array", of: [{ type: "faqItem" }], group: "faq" }),
    defineField({ name: "ctaHeading", type: "string", group: "faq" }),
    defineField({ name: "services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }], hidden: true }),
    defineField({ name: "body", type: "richText", hidden: true }),
    seoField,
  ],
  preview: { select: { title: "title", subtitle: "heading" } },
});

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: FileText,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    { ...slugField(), group: "content" },
    defineField({ name: "heading", title: "Headline (H1)", type: "string", group: "content" }),
    defineField({ name: "intro", type: "text", rows: 3, group: "content" }),
    defineField({ name: "body", type: "richText", group: "content" }),
    seoField,
  ],
  preview: { select: { title: "title", subtitle: "slug.current" } },
});

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  icon: BookOpen,
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "meta", title: "Details" },
    { name: "seo", title: "SEO" },
  ],
  orderings: [{ title: "Newest first", name: "published", by: [{ field: "publishedAt", direction: "desc" }] }],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    { ...slugField(), group: "content", description: "Keep identical to the old WordPress slug for imported posts." },
    defineField({ name: "excerpt", type: "text", rows: 3, group: "content", validation: (r) => r.max(220) }),
    defineField({ name: "mainImage", title: "Cover image", type: "altImage", group: "content", description: "Optional. Without one, the site draws an on-brand cover." }),
    defineField({ name: "body", type: "richText", group: "content" }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }], group: "meta" }),
    defineField({ name: "categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }], group: "meta" }),
    defineField({ name: "publishedAt", type: "datetime", group: "meta", validation: (r) => r.required() }),
    defineField({ name: "updatedAt", title: "Last updated", type: "datetime", group: "meta" }),
    defineField({ name: "relatedServices", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }], group: "meta" }),
    defineField({ name: "wpId", title: "WordPress ID", type: "number", readOnly: true, group: "meta" }),
    seoField,
  ],
  preview: { select: { title: "title", subtitle: "publishedAt", media: "mainImage" } },
});

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  icon: User,
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    slugField("name"),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({ name: "image", type: "altImage" }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
});

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  icon: Folder,
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    slugField(),
    defineField({ name: "description", type: "text", rows: 2 }),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: MessageSquareQuote,
  description: "Real client words only.",
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "quote", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "name", type: "string" }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "company", type: "string" }),
    defineField({ name: "order", type: "number" }),
    defineField({ name: "stats", type: "array", of: [{ type: "stat" }] }),
  ],
  preview: { select: { title: "name", subtitle: "quote" }, prepare: ({ title, subtitle }) => ({ title: title ?? "Unnamed client", subtitle }) },
});

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case study",
  type: "document",
  icon: Trophy,
  description: "Real results only. Use [PLACEHOLDER] text until you have them.",
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "client", type: "string", validation: (r) => r.required() }),
    defineField({ name: "industry", title: "Client type", type: "string" }),
    defineField({ name: "challenge", type: "string" }),
    defineField({ name: "result", type: "string" }),
    defineField({ name: "attribution", title: "Source of the result", type: "string", description: "For example: Chris Aaron, CEO." }),
    defineField({ name: "services", type: "array", of: [{ type: "reference", to: [{ type: "service" }] }] }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "client", subtitle: "industry" } },
});

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: CircleHelp,
  description: "Reusable questions. Page FAQs are edited on each page.",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "topics", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const clientLogo = defineType({
  name: "clientLogo",
  title: "Client logo",
  type: "document",
  icon: ImageIcon,
  description: "Only add logos you have permission to show. 6 or more turns the row into a slow marquee.",
  orderings: [{ title: "Order", name: "order", by: [{ field: "order", direction: "asc" }] }],
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "logo", type: "altImage", validation: (r) => r.required() }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", media: "logo" } },
});

export const documentTypes = [siteSettings, navigation, homePage, service, nichePage, page, post, author, category, testimonial, caseStudy, faq, clientLogo];
export const singletonTypes = new Set(["siteSettings", "navigation", "homePage"]);
