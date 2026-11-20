import type { PortableTextBlock } from "@portabletext/react";

/*
 * Plain Markdown (## and ### headings, paragraphs, "- " lists, **bold** and [links](/path or https://)) turned into the
 * same portable text blocks Sanity stores, so code posts render through the site's own components.
 */

type Span = { _type: "span"; _key: string; text: string; marks: string[] };
type MarkDef = { _type: "link"; _key: string; href: string };

function spans(text: string, key: () => string, defs: MarkDef[]): Span[] {
  const out: Span[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  for (let m = re.exec(text); m; m = re.exec(text)) {
    if (m.index > last) out.push({ _type: "span", _key: key(), text: text.slice(last, m.index), marks: [] });
    if (m[1]) {
      const k = key();
      defs.push({ _type: "link", _key: k, href: m[2] });
      out.push({ _type: "span", _key: key(), text: m[1], marks: [k] });
    } else out.push({ _type: "span", _key: key(), text: m[3], marks: ["strong"] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push({ _type: "span", _key: key(), text: text.slice(last), marks: [] });
  return out;
}

export function toBlocks(md: string): PortableTextBlock[] {
  let n = 0;
  const key = () => `p${(n++).toString(36)}`;
  const blocks: PortableTextBlock[] = [];
  for (const raw of md.trim().split(/\n{2,}/)) {
    const lines = raw.trim().split("\n");
    if (lines.every((l) => l.startsWith("- "))) {
      for (const l of lines) {
        const markDefs: MarkDef[] = [];
        blocks.push({ _type: "block", _key: key(), style: "normal", listItem: "bullet", level: 1, markDefs, children: spans(l.slice(2), key, markDefs) } as PortableTextBlock);
      }
      continue;
    }
    const h = /^(#{2,3}) (.+)$/.exec(lines[0]);
    const markDefs: MarkDef[] = [];
    const style = h ? (h[1] === "##" ? "h2" : "h3") : "normal";
    const text = h ? h[2] : lines.join(" ");
    blocks.push({ _type: "block", _key: key(), style, markDefs, children: spans(text, key, markDefs) } as PortableTextBlock);
  }
  return blocks;
}
