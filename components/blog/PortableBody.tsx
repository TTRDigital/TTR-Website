import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { PortableText, type PortableTextBlock, type PortableTextComponents } from "@portabletext/react";
import { Info } from "lucide-react";
import { blockText, slugify } from "@/lib/text";
import { sanityImage, type SanityImageRef } from "@/lib/sanity/image";

/** Images must have alt text; images without it are skipped rather than shipped inaccessible. */
function BodyImage({ value }: { value: SanityImageRef }) {
  const img = sanityImage(value);
  if (!img || !img.alt) return null;
  return (
    <figure className="mt-10">
      <Image src={img.url} alt={img.alt} width={img.width} height={img.height} sizes="(min-width: 768px) 720px, 100vw" className="h-auto w-full rounded-2xl" />
    </figure>
  );
}

/** Rich text on a light reading surface. */
const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mt-6 text-[1.0625rem] leading-[1.75] text-ink-body">{children}</p>,
    h2: ({ children, value }) => (
      <h2 id={slugify(blockText(value))} className="mt-14 scroll-mt-28 text-[clamp(1.5rem,1.2rem+1.1vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-ink-text first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => <h3 className="mt-10 text-[1.3125rem] font-semibold tracking-[-0.015em] text-ink-text">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="mt-8 border-l-2 border-brand-600 pl-6 font-display text-[1.25rem] text-ink-text">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-6 list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-ink-body marker:text-brand-600">{children}</ul>,
    number: ({ children }) => <ol className="mt-6 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.7] text-ink-body marker:text-brand-600">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-ink-text">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const cls = "font-medium text-brand-600 underline decoration-brand-600/30 underline-offset-4 transition-colors hover:decoration-brand-600";
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
    image: BodyImage,
    altImage: BodyImage,
    callout: ({ value }: { value: { title?: string; text?: string; tone?: string } }) => (
      <aside className="mt-10 flex gap-4 rounded-2xl border border-brand-600/20 bg-brand-600/[0.06] p-6">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.5} aria-hidden="true" />
        <div>
          {value.title ? <p className="font-semibold text-ink-text">{value.title}</p> : null}
          {value.text ? <p className="mt-1 text-ink-body">{value.text}</p> : null}
        </div>
      </aside>
    ),
  },
};

/**
 * Renders a portable text body. Optionally inserts a node (like an inline
 * CTA) right before the third h2, i.e. after the second section.
 */
export function PortableBody({ value, insertAfterSecondSection }: { value: PortableTextBlock[]; insertAfterSecondSection?: ReactNode }) {
  if (!insertAfterSecondSection) return <PortableText value={value} components={components} />;
  let h2Count = 0;
  let cut = value.length;
  for (let i = 0; i < value.length; i++) {
    const b = value[i] as { _type?: string; style?: string };
    if (b._type === "block" && b.style === "h2") {
      h2Count++;
      if (h2Count === 3) {
        cut = i;
        break;
      }
    }
  }
  return (
    <>
      <PortableText value={value.slice(0, cut)} components={components} />
      {insertAfterSecondSection}
      <PortableText value={value.slice(cut)} components={components} />
    </>
  );
}
