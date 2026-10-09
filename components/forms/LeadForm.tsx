"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, CircleAlert, LoaderCircle, Phone } from "lucide-react";
import { ATTRIBUTION_STORAGE_KEY, attributionKeys, serviceOptions } from "@/lib/lead-options";
import { track } from "@/lib/analytics";
import { Recaptcha, type CaptchaHandle } from "@/components/forms/Recaptcha";

type Field = "name" | "phone" | "email" | "business" | "website" | "service" | "message";
type Values = Record<Field, string>;
type Errors = Partial<Record<Field, string>>;

/* Light client checks that mirror the server schema in lib/lead.ts. */
const validators: Record<Field, (v: string) => string | undefined> = {
  name: (v) => (v.trim().length < 2 ? "Please enter your name." : undefined),
  phone: (v) => (v.replace(/\D/g, "").length < 10 ? "Please enter a phone number with area code." : undefined),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? undefined : "Please enter a valid email address."),
  business: (v) => (v.trim().length < 2 ? "Please enter your business name." : undefined),
  website: () => undefined,
  service: (v) => (v ? undefined : "Please choose a service."),
  message: (v) => (v.length > 3000 ? "Please keep your message under 3,000 characters." : undefined),
};

const empty: Values = { name: "", phone: "", email: "", business: "", website: "", service: "", message: "" };

export function LeadForm({
  variant = "full",
  phone,
  phoneHref,
  defaultService,
  dark = true,
  captchaSiteKey = "",
}: {
  variant?: "full" | "compact";
  phone: string;
  phoneHref: string;
  defaultService?: (typeof serviceOptions)[number];
  dark?: boolean;
  /** Google reCAPTCHA v2 checkbox site key, read on the server. Empty: no human check. */
  captchaSiteKey?: string;
}) {
  const router = useRouter();
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const startedAt = useRef<number>(0);
  const [values, setValues] = useState<Values>({ ...empty, service: defaultService ?? "" });
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [summary, setSummary] = useState("");
  const captcha = useRef<CaptchaHandle | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const compact = variant === "compact";
  const fields: Field[] = compact
    ? ["name", "phone", "email", "business", "service"]
    : ["name", "phone", "email", "business", "website", "service", "message"];

  const setField = (f: Field, v: string) => {
    setValues((s) => ({ ...s, [f]: v }));
    if (touched[f]) setErrors((e) => ({ ...e, [f]: validators[f](v) }));
  };
  const blur = (f: Field) => {
    setTouched((t) => ({ ...t, [f]: true }));
    setErrors((e) => ({ ...e, [f]: validators[f](values[f]) }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;
    const next: Errors = {};
    for (const f of fields) {
      const msg = validators[f](values[f]);
      if (msg) next[f] = msg;
    }
    setErrors(next);
    setTouched(Object.fromEntries(fields.map((f) => [f, true])));
    const bad = fields.filter((f) => next[f]);
    if (bad.length) {
      setSummary(`Please fix ${bad.length === 1 ? "1 field" : `${bad.length} fields`} below.`);
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(`${uid}-${bad[0]}`)}`)?.focus();
      return;
    }
    const captchaToken = captchaSiteKey ? (captcha.current?.getToken() ?? null) : null;
    if (captchaSiteKey && !captchaToken && !captcha.current?.unavailable()) {
      setSummary("Please tick \u201cI\u2019m not a robot\u201d below the form, then send again.");
      return;
    }
    setSummary("");
    setStatus("sending");

    let attribution: Record<string, string> = {};
    try {
      attribution = JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? "{}");
    } catch {
      /* ignore */
    }
    const honeypot = (formRef.current?.elements.namedItem("hp_ttr") as HTMLInputElement | null)?.value ?? "";

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          hp_ttr: honeypot,
          captcha_token: captchaToken ?? "",
          elapsed_ms: Date.now() - startedAt.current,
          page_url: window.location.href,
          landing_page: attribution.landing_page ?? "",
          referrer: attribution.referrer ?? document.referrer,
          ...Object.fromEntries(attributionKeys.map((k) => [k, attribution[k] ?? ""])),
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { code?: string; error?: string } | null;
        if (data?.code === "captcha") {
          captcha.current?.reset();
          setSummary(data.error ?? "We could not confirm you are human. Please try again.");
          setStatus("idle");
          return;
        }
        throw new Error(String(res.status));
      }
      setStatus("success");
      track("generate_lead", { service: values.service, form: variant });
      window.setTimeout(() => router.push("/thank-you"), 1400);
    } catch {
      setStatus("error");
    }
  };

  const tone = dark
    ? {
        label: "text-hi",
        hint: "text-meta",
        input:
          "border-line-strong bg-ink-950/60 text-hi placeholder:text-meta focus:border-violet-300 focus:bg-ink-950/80 focus:shadow-[0_0_0_4px_rgb(166_107_255/0.18)]",
        error: "text-[#ffb4c4]",
        errBorder: "border-[#ff8fa8]/70",
      }
    : {
        label: "text-ink-text",
        hint: "text-ink-meta",
        input: "border-line-light bg-white text-ink-text placeholder:text-ink-meta focus:border-brand-600 focus:shadow-[0_0_0_4px_rgb(110_31_168/0.14)]",
        error: "text-[#b42346]",
        errBorder: "border-[#b42346]",
      };

  if (status === "success") {
    return (
      <div role="status" aria-live="polite" className="flex min-h-[420px] flex-col items-center justify-center text-center">
        <span className="success-pop flex h-16 w-16 items-center justify-center rounded-full bg-[image:var(--grad-brand)] text-white shadow-[0_0_50px_-6px_rgb(166_107_255/0.9)]">
          <Check className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
        </span>
        <p className={`mt-6 font-display text-h3 font-semibold ${tone.label}`}>Thanks, {values.name.split(" ")[0]}. We got it.</p>
        <p className={`mt-2 ${tone.hint}`}>Taking you to the next steps…</p>
      </div>
    );
  }

  const inputCls = (f: Field) =>
    `block w-full rounded-xl border px-4 text-base outline-none transition-[border-color,box-shadow,background-color] duration-150 ${tone.input} ${
      errors[f] ? tone.errBorder : ""
    } ${f === "message" ? "min-h-32 py-3" : "min-h-12 py-2.5"}`;

  const label = (f: Field, text: string, optional = false) => (
    <label htmlFor={`${uid}-${f}`} className={`mb-2 block text-small font-medium ${tone.label}`}>
      {text}
      {optional ? <span className={`ml-1 font-normal ${tone.hint}`}>(optional)</span> : null}
    </label>
  );

  const err = (f: Field) =>
    errors[f] ? (
      <p id={`${uid}-${f}-err`} className={`mt-2 flex items-center gap-1.5 text-small ${tone.error}`}>
        <CircleAlert className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        {errors[f]}
      </p>
    ) : null;

  const aria = (f: Field) => ({
    id: `${uid}-${f}`,
    name: f,
    "aria-invalid": errors[f] ? true : undefined,
    "aria-describedby": errors[f] ? `${uid}-${f}-err` : undefined,
    onBlur: () => blur(f),
  });

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-summary`}>
      <p id={`${uid}-summary`} role="alert" aria-live="assertive" className={summary ? `mb-5 text-small font-medium ${tone.error}` : "sr-only"}>
        {summary}
      </p>

      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          {label("name", "Your name")}
          <input {...aria("name")} type="text" autoComplete="name" value={values.name} onChange={(e) => setField("name", e.target.value)} className={inputCls("name")} />
          {err("name")}
        </div>
        <div>
          {label("phone", "Phone")}
          <input {...aria("phone")} type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(e) => setField("phone", e.target.value)} className={inputCls("phone")} />
          {err("phone")}
        </div>
        <div>
          {label("email", "Email")}
          <input {...aria("email")} type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(e) => setField("email", e.target.value)} className={inputCls("email")} />
          {err("email")}
        </div>
        <div>
          {label("business", "Business name")}
          <input {...aria("business")} type="text" autoComplete="organization" value={values.business} onChange={(e) => setField("business", e.target.value)} className={inputCls("business")} />
          {err("business")}
        </div>
        {!compact ? (
          <div>
            {label("website", "Website", true)}
            <input {...aria("website")} type="url" inputMode="url" autoComplete="url" placeholder="yourbusiness.com" value={values.website} onChange={(e) => setField("website", e.target.value)} className={inputCls("website")} />
            {err("website")}
          </div>
        ) : null}
        <div>
          {label("service", "What do you need help with?")}
          <select {...aria("service")} value={values.service} onChange={(e) => setField("service", e.target.value)} className={`${inputCls("service")} appearance-none bg-[length:16px] bg-[right_1rem_center] bg-no-repeat pr-10`} style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23a99fbf' stroke-width='1.5'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E\")" }}>
            <option value="" disabled>
              Choose a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {err("service")}
        </div>
        {!compact ? (
          <div className="sm:col-span-2">
            {label("message", "Anything we should know?", true)}
            <textarea {...aria("message")} rows={4} value={values.message} onChange={(e) => setField("message", e.target.value)} placeholder="Your goals, your area, what has or has not worked so far." className={inputCls("message")} />
            {err("message")}
          </div>
        ) : null}
      </div>

      {/* Honeypot: hidden from people, tempting to bots. The name and label
          match nothing browser autofill or password managers know, so a real
          visitor's autofill never fills it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-hp_ttr`}>Leave this field empty</label>
        <input id={`${uid}-hp_ttr`} name="hp_ttr" type="text" tabIndex={-1} autoComplete="off" data-1p-ignore data-lpignore="true" />
      </div>

      <Recaptcha siteKey={captchaSiteKey} theme={dark ? "dark" : "light"} handleRef={captcha} />

      {status === "error" ? (
        <p role="alert" className={`mt-5 text-small ${tone.error}`}>
          Something went wrong sending your request. Please try again, or call us at{" "}
          <a href={phoneHref} className="font-medium underline">
            {phone}
          </a>
          .
        </p>
      ) : null}

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group/btn inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[image:var(--grad-brand)] px-7 font-medium text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.22),0_10px_30px_-12px_rgb(138_47_208/0.8)] transition-shadow duration-300 hover:shadow-[inset_0_1px_0_rgb(255_255_255/0.28),0_0_0_1px_rgb(196_155_255/0.45),0_14px_44px_-8px_rgb(166_107_255/0.9)] disabled:opacity-70"
        >
          {status === "sending" ? (
            <>
              <LoaderCircle className="h-4 w-4 animate-spin" strokeWidth={1.5} aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Get my free growth audit
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
            </>
          )}
        </button>
        <a href={phoneHref} data-track="click_to_call" className={`inline-flex min-h-11 items-center gap-2 text-small ${tone.hint} hover:underline`}>
          <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
          Prefer to talk? {phone}
        </a>
      </div>
      <p className={`mt-5 text-micro ${tone.hint}`}>
        No spam and no pressure. We reply within one business day. By sending this form you agree we may contact you by phone, text or email about your request.
      </p>
    </form>
  );
}
