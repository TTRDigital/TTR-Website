import Link from "next/link";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { Info } from "lucide-react";

/** Rich text on the dark surface. Body h2s render as h3 under the section heading. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="measure mt-4 text-body">{children}</p>,
    h2: ({ children }) => <h3 className="mt-12 text-h3 font-semibold first:mt-0">{children}</h3>,
    h3: ({ children }) => <h4 className="mt-8 text-[1.25rem] font-semibold tracking-[-0.015em] text-hi">{children}</h4>,
    blockquote: ({ children }) => <blockquote className="measure mt-6 border-l-2 border-violet-400/50 pl-5 font-display text-[1.25rem] text-hi">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="measure mt-4 list-disc space-y-2 pl-6 text-body marker:text-violet-300">{children}</ul>,
    number: ({ children }) => <ol className="measure mt-4 list-decimal space-y-2 pl-6 text-body marker:text-violet-300">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-hi">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const cls = "text-lavender-200 underline decoration-lavender-200/30 underline-offset-4 transition-colors hover:decoration-lavender-200";
      return href.startsWith("/") ? (
        <Link href={href} className={cls}>
          {children}
        </Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
          {children}
        </a>
      );
    },
  },
  types: {
    // Images in service bodies are optional; the dark layout skips them for now.
    image: () => null,
    altImage: () => null,
    callout: ({ value }: { value: { title?: string; text?: string } }) => (
      <aside className="card mt-8 flex gap-4 rounded-2xl p-6">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
        <div>
          {value.title ? <p className="font-semibold text-hi">{value.title}</p> : null}
          {value.text ? <p className="mt-1 text-body">{value.text}</p> : null}
        </div>
      </aside>
    ),
  },
};

export function DarkBody({ value }: { value: PortableTextBlock[] }) {
  return (
    <div data-reveal>
      <PortableText value={value} components={components} />
    </div>
  );
}
