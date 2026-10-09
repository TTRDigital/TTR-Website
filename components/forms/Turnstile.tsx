"use client";

import { useEffect, useRef } from "react";

/* Cloudflare Turnstile: a real human check, verified on the server in /api/lead. */

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  reset: (id?: string) => void;
  remove: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";
const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let loader: Promise<TurnstileApi> | null = null;
function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) return Promise.resolve(window.turnstile);
  loader ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SCRIPT_SRC;
    s.async = true;
    s.onload = () => (window.turnstile ? resolve(window.turnstile) : reject(new Error("Turnstile missing")));
    s.onerror = () => {
      loader = null;
      reject(new Error("Turnstile failed to load"));
    };
    document.head.appendChild(s);
  });
  return loader;
}

/**
 * Renders the widget once the form is close to the screen (so pages without
 * a visible form never load it). Reports the token, or null when it expires
 * or fails. `resetRef.current()` asks for a fresh check after a rejection.
 */
export function Turnstile({
  theme,
  onToken,
  resetRef,
}: {
  theme: "dark" | "light";
  onToken: (token: string | null) => void;
  resetRef: React.RefObject<(() => void) | null>;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const tokenCb = useRef(onToken);

  useEffect(() => {
    tokenCb.current = onToken;
  }, [onToken]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || !TURNSTILE_SITE_KEY) return;
    let widgetId: string | undefined;
    let cancelled = false;

    const mount = () => {
      loadTurnstile()
        .then((ts) => {
          if (cancelled || widgetId) return;
          widgetId = ts.render(el, {
            sitekey: TURNSTILE_SITE_KEY,
            theme,
            size: "flexible",
            action: "lead_form",
            "refresh-expired": "auto",
            callback: (token: string) => tokenCb.current(token),
            "expired-callback": () => tokenCb.current(null),
            "error-callback": () => tokenCb.current(null),
          });
          resetRef.current = () => {
            tokenCb.current(null);
            ts.reset(widgetId);
          };
        })
        .catch(() => tokenCb.current(null));
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          mount();
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
      resetRef.current = null;
    };
  }, [theme, resetRef]);

  if (!TURNSTILE_SITE_KEY) return null;
  return <div ref={boxRef} className="mt-6 min-h-[65px] w-full" />;
}
