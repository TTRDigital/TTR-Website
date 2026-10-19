"use client";

import Link from "next/link";
import { useState, type ComponentProps } from "react";

/**
 * A Link that prefetches when the visitor shows intent (hover, touch or
 * keyboard focus) instead of as soon as it is on screen. Used for the
 * header and footer, whose many links would otherwise download a dozen
 * pages in the background while a phone is still loading the first one.
 */
export function IntentLink({ onPointerEnter, onTouchStart, onFocus, prefetch, ...props }: ComponentProps<typeof Link>) {
  const [intent, setIntent] = useState(false);
  const show = () => setIntent(true);
  return (
    <Link
      {...props}
      prefetch={intent ? (prefetch ?? null) : false}
      onPointerEnter={(e) => {
        show();
        onPointerEnter?.(e);
      }}
      onTouchStart={(e) => {
        show();
        onTouchStart?.(e);
      }}
      onFocus={(e) => {
        show();
        onFocus?.(e);
      }}
    />
  );
}
