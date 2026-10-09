"use client";

import { useEffect, useRef, useState } from "react";

/*
 * Google reCAPTCHA v2 "I'm not a robot" checkbox, inside the form. It loads
 * once the form is near the screen. The compact layout is used when the
 * form is narrower than the standard 304px widget (small phones).
 */

type Grecaptcha = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => number;
  getResponse: (id?: number) => string;
  reset: (id?: number) => void;
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

export type CaptchaHandle = {
  /** The checkbox answer, or null if not ticked (or expired). */
  getToken: () => string | null;
  /** True when the widget could not load (e.g. blocked); the server then decides. */
  unavailable: () => boolean;
  reset: () => void;
};

export function Recaptcha({
  siteKey,
  theme,
  handleRef,
  onChange,
}: {
  siteKey: string;
  theme: "dark" | "light";
  handleRef: React.RefObject<CaptchaHandle | null>;
  onChange?: (ticked: boolean) => void;
}) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const changeRef = useRef(onChange);

  useEffect(() => {
    changeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const el = boxRef.current;
    if (!el || !siteKey) return;
    let g: Grecaptcha | null = null;
    let id: number | null = null;
    let loadFailed = false;
    let started = false;

    handleRef.current = {
      getToken: () => (g && id !== null ? g.getResponse(id) || null : null),
      unavailable: () => loadFailed,
      reset: () => {
        if (g && id !== null) g.reset(id);
        changeRef.current?.(false);
      },
    };

    const mount = () => {
      if (started) return;
      started = true;
      loadRecaptcha()
        .then((api) => {
          g = api;
          id = api.render(el, {
            sitekey: siteKey,
            theme,
            size: el.clientWidth < 304 ? "compact" : "normal",
            callback: () => changeRef.current?.(true),
            "expired-callback": () => changeRef.current?.(false),
            "error-callback": () => changeRef.current?.(false),
          });
        })
        .catch(() => {
          loadFailed = true;
          setFailed(true);
        });
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
      io.disconnect();
      handleRef.current = null;
    };
  }, [siteKey, theme, handleRef]);

  if (!siteKey) return null;
  return (
    <div className="mt-6">
      <div ref={boxRef} className="min-h-[78px] w-full" />
      {failed ? <p className="mt-2 text-small text-meta">The security check could not load. You can still send the form.</p> : null}
    </div>
  );
}
