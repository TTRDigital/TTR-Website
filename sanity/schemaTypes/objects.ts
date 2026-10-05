import { defineArrayMember, defineField, defineType } from "sanity";

/** SEO fields on every document. Lengths are warnings, not hard errors. */
export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: "title", title: "SEO title", type: "string", description: "Shown in Google. Aim for under 60 characters.", validation: (r) => r.max(60).warning("Over 60 characters may be cut off in Google.") }),
    defineField({ name: "description", title: "Meta description", type: "text", rows: 3, description: "Aim for under 155 characters.", validation: (r) => r.max(155).warning("Over 155 characters may be cut off in Google.") }),
    defineField({ name: "ogImage", title: "Social share image", type: "image", description: "1200 x 630. Leave empty to use the generated brand image." }),
    defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
  ],
});

/** Image that always has alt text. */
export const altImage = defineType({
  name: "altImage",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description: "Describe the image for people who cannot see it. Required.",
      validation: (r) =>
        r.custom((alt, ctx) => {
          const parent = ctx.parent as { asset?: unknown } | undefined;
          return parent?.asset && !alt ? "Alt text is required for accessibility." : true;
        }),
    }),
  ],
});

export const faqItem = defineType({
  name: "faqItem",
  title: "Question",
  type: "object",
  fields: [
    defineField({ name: "question", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", type: "text", rows: 4, validation: (r) => r.required() }),
  ],
  preview: { select: { title: "question", subtitle: "answer" } },
});

export const step = defineType({
  name: "step",
  title: "Item",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "object",
  description: "Real numbers only.",
  fields: [
    defineField({ name: "value", title: "Value as shown", type: "string", description: "For example 411% or 10-15.", validation: (r) => r.required() }),
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "countTo", title: "Count up to (optional)", type: "number", description: "Number to animate to. Leave empty for no animation." }),
    defineField({ name: "prefix", type: "string" }),
    defineField({ name: "suffix", type: "string", description: "For example %." }),
  ],
  preview: { select: { title: "value", subtitle: "label" } },
});

export const linkItem = defineType({
  name: "linkItem",
  title: "Link",
  type: "object",
  fields: [
    defineField({ name: "label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "URL or path", type: "string", description: "For example /about or https://...", validation: (r) => r.required() }),
  ],
  preview: { select: { title: "label", subtitle: "href" } },
});

export const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({ name: "title", type: "string" }),
    defineField({ name: "text", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "tone", type: "string", options: { list: ["info", "tip", "warning"], layout: "radio" }, initialValue: "info" }),
  ],
  preview: { select: { title: "title", subtitle: "text" }, prepare: ({ title, subtitle }) => ({ title: title ?? "Callout", subtitle }) },
});

/** Rich text: headings, lists, links, images with required alt text and a callout block. */
export const richText = defineType({
  name: "richText",
  title: "Rich text",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullets", value: "bullet" },
        { title: "Numbers", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [defineField({ name: "href", title: "URL or path", type: "string", validation: (r) => r.required() })],
          }),
        ],
      },
    }),
    defineArrayMember({ type: "altImage" }),
    defineArrayMember({ type: "callout" }),
  ],
});

export const objectTypes = [seo, altImage, faqItem, step, stat, linkItem, callout, richText];
