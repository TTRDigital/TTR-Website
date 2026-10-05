import type { PortableTextBlock } from "@portabletext/react";

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);

type Span = { _type?: string; text?: string };
export const blockText = (b: PortableTextBlock) =>
  ((b as { children?: Span[] }).children ?? []).map((c) => c.text ?? "").join("");

/** h2 headings of a body, used for the table of contents and anchors. */
export function headingsOf(body: PortableTextBlock[]) {
  return body
    .filter((b) => b._type === "block" && (b as { style?: string }).style === "h2")
    .map((b) => {
      const text = blockText(b);
      return { id: slugify(text), text };
    })
    .filter((h) => h.text);
}

export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}
