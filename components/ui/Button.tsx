import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Magnetic } from "@/components/motion/Magnetic";

type Variant = "primary" | "secondary" | "dark" | "ghost";
type Size = "md" | "lg" | "sm";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium select-none " +
  "transition-[background-color,box-shadow,color,border-color,transform] duration-300 ease-out-expo " +
  "focus-visible:outline-2 focus-visible:outline-offset-3";

const sizes: Record<Size, string> = {
  sm: "min-h-11 px-4 text-small",
  md: "min-h-12 px-6 text-[0.9375rem]",
  lg: "min-h-14 px-7 text-base",
};

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-[image:var(--grad-brand)] shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_10px_30px_-12px_rgb(138_47_208/0.8)] " +
    "hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_0_0_1px_rgb(196_155_255/0.45),0_14px_44px_-8px_rgb(166_107_255/0.9)]",
  secondary:
    "text-hi bg-white/[0.04] border border-line-strong backdrop-blur-md hover:bg-white/[0.09] hover:border-white/25",
  dark: "text-white bg-ink-950 hover:bg-ink-800 shadow-[0_10px_30px_-14px_rgb(7_6_11/0.8)]",
  ghost: "text-hi hover:text-lavender-200 px-0 min-h-11",
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  track?: "audit_cta_click" | "click_to_call";
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">;

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  magnetic = false,
  track,
  className = "",
  ...rest
}: Props) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;
  const trackAttr = track ?? (href.startsWith("tel:") ? "click_to_call" : undefined);
  const isInternal = href.startsWith("/") && !href.startsWith("//");

  const el = isInternal ? (
    <Link href={href} className={cls} data-track={trackAttr} {...rest}>
      {children}
    </Link>
  ) : (
    <a href={href} className={cls} data-track={trackAttr} {...rest}>
      {children}
    </a>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
