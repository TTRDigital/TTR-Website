"use client";

import { useEffect, useRef } from "react";

/*
 * Google reCAPTCHA v3, rendered as the inline reCAPTCHA badge inside the form
 * (not floating over the page). It loads once the form is near the screen.
 * getToken() runs the check at submit time, so the token is always fresh.
 */

type Grecaptcha = {
  ready: (cb: () => void) => void;
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  execute: (id: number, opts: { action: string }) => Promise<string>;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __ttrRecaptchaLoaded?: () => void;
  }
}

let loader: Promise<Grecaptcha> | null = null;
function loadRecaptcha(): Promise<Grecaptcha> {
  if (window.grecaptcha?.render) return Promise.resolve(window.grecaptcha);
  loader ??= new Promise((resolve, reject) => {
    window.__ttrRecaptchaLoaded = () => (window.grecaptcha ? resolve(window.grecaptcha) : reject(new Error("reCAPTCHA missing")));
    const s = document.createElement("script");
    s.src = "https://www.google.com/recaptcha/api.js?onload=__ttrRecaptchaLoaded&render=explicit";
    s.async = true;
    s.onerror = () => {
      loader = null;
      reject(new Error("reCAPTCHA failed to load"));
    };
    document.head.appendChild(s);
  });
  return loader;
}

export type CaptchaHandle = { getToken: () => Promise<string | null> };

export function Recaptcha({ siteKey, handleRef }: { siteKey: string; handleRef: React.RefObject<CaptchaHandle | null> }) {
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || !siteKey) return;
    let widget: Promise<{ g: Grecaptcha; id: number }> | null = null;

    const mount = () =>
      (widget ??= loadRecaptcha().then(
        (g) =>
          new Promise((resolve) =>
            g.ready(() => resolve({ g, id: g.render(el, { sitekey: siteKey, badge: "inline", size: "invisible" }) })),
          ),
      ));

    handleRef.current = {
      getToken: async () => {
        try {
          const { g, id } = await mount();
          return await Promise.race([
            g.execute(id, { action: "lead_form" }),
            new Promise<null>((r) => setTimeout(() => r(null), 8000)),
          ]);
        } catch {
          return null;
        }
      },
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          mount().catch(() => {});
        }
      },
      { rootMargin: "600px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      handleRef.current = null;
    };
  }, [siteKey, handleRef]);

  if (!siteKey) return null;
  return <div ref={boxRef} className="mt-6 min-h-[60px]" aria-label="Protected by Google reCAPTCHA" />;
}
