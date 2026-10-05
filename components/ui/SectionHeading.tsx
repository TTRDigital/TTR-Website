import { Fragment, type ReactNode } from "react";

/** Splits a headline into masked words for the reveal animation. */
export function MaskedWords({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="mask-line">
            <span className="mask-word" style={{ "--w": i + offset } as React.CSSProperties}>
              {word}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className={`inline-flex items-center gap-2.5 text-micro font-medium uppercase tracking-[0.18em] ${
        light ? "text-brand-600" : "text-lavender-200"
      }`}
    >
      <span
        aria-hidden="true"
        className={`h-1.5 w-1.5 rounded-full ${light ? "bg-brand-600" : "bg-violet-400 shadow-[0_0_12px_2px_rgb(166_107_255/0.7)]"}`}
      />
      {children}
    </p>
  );
}

type Props = {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  light?: boolean;
  as?: "h1" | "h2";
  id?: string;
  className?: string;
};

/** Eyebrow + title + intro, used at the top of most sections. */
export function SectionHeading({ eyebrow, title, intro, align = "left", light = false, as = "h2", id, className = "" }: Props) {
  const Tag = as;
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow ? (
        <div data-reveal className="mb-5">
          <Eyebrow light={light}>{eyebrow}</Eyebrow>
        </div>
      ) : null}
      <Tag id={id} data-reveal-words className="text-h2 font-semibold">
        <MaskedWords text={title} />
      </Tag>
      {intro ? (
        <p
          data-reveal
          style={{ "--i": 2 } as React.CSSProperties}
          className={`mt-6 text-lead measure ${center ? "mx-auto" : ""} ${light ? "text-ink-body" : "text-body"}`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
