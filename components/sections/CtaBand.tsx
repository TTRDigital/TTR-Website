import { ArrowRight, Check, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/content";
import type { serviceOptions } from "@/lib/lead-options";
import { MaskedWords } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { LeadForm } from "@/components/forms/LeadForm";
import { turnstileSiteKey } from "@/lib/turnstile";

const auditIncludes = [
  "A review of your website, with clear next steps",
  "What your top competitors do well, and how to beat them",
  "Technical issues holding back your rankings",
  "Ways to turn more visitors into calls and bookings",
];

type Props = {
  heading?: string;
  text?: string;
  settings: SiteSettings;
  /** "form" shows the full lead form; "buttons" shows two CTAs. */
  variant?: "form" | "buttons";
  defaultService?: (typeof serviceOptions)[number];
};

const defaults = {
  heading: "Ready for more calls and booked jobs?",
  text: "Get a free growth audit. We will show you where your leads are slipping away and how to fix it, whether or not you hire us.",
};

/** CTA band reused at the bottom of every page. */
export function CtaBand({ heading = defaults.heading, text = defaults.text, settings, variant = "buttons", defaultService }: Props) {
  if (variant === "buttons") {
    return (
      <section aria-labelledby="cta-title" className="section-pad relative overflow-hidden">
        <div className="container-page">
          <div className="relative isolate overflow-hidden rounded-[28px] border border-violet-400/25 px-6 py-16 text-center sm:px-12 lg:py-24">
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(70%_90%_at_50%_0%,rgb(110_31_168/0.55),transparent_70%),linear-gradient(180deg,var(--ink-850),var(--ink-950))]" />
            <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(60%_70%_at_50%_10%,#000,transparent)]" />
            <h2 id="cta-title" data-reveal-words className="mx-auto max-w-3xl text-h2 font-semibold">
              <MaskedWords text={heading} />
            </h2>
            <p data-reveal className="measure mx-auto mt-6 text-lead text-body">
              {text}
            </p>
            <div data-reveal className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/contact" size="lg" magnetic track="audit_cta_click">
                Get a free growth audit
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" strokeWidth={1.5} aria-hidden="true" />
              </Button>
              <Button href={settings.phoneHref} size="lg" variant="secondary">
                <Phone className="h-4 w-4 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                Call {settings.phone}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="audit" aria-labelledby="audit-title" className="section-pad relative scroll-mt-20 overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_20%_30%,rgb(110_31_168/0.45),transparent_70%),radial-gradient(40%_50%_at_90%_80%,rgb(166_107_255/0.18),transparent_70%)]" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-grid opacity-40 [mask-image:radial-gradient(70%_70%_at_30%_40%,#000,transparent)]" />

      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <h2 id="audit-title" data-reveal-words className="text-h2 font-semibold">
            <MaskedWords text={heading} />
          </h2>
          <p data-reveal className="mt-6 text-lead text-body">
            {text}
          </p>
          <ul className="mt-10 space-y-4">
            {auditIncludes.map((item, i) => (
              <li key={item} data-reveal style={{ "--i": i } as React.CSSProperties} className="flex gap-3 text-body">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-400/15 text-violet-300">
                  <Check className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div data-reveal className="mt-10">
            <Button href={settings.phoneHref} variant="secondary" size="lg">
              <Phone className="h-4 w-4 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
              Call {settings.phone}
            </Button>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div data-reveal className="glass rounded-[28px] p-6 shadow-[0_40px_120px_-50px_rgb(110_31_168/0.9)] sm:p-10">
            <h3 className="font-display text-h3 font-semibold">Get your free growth audit</h3>
            <p className="mt-2 text-small text-meta">Takes about a minute. A real person reads every request.</p>
            <div className="mt-8">
              <LeadForm phone={settings.phone} phoneHref={settings.phoneHref} defaultService={defaultService} captchaSiteKey={turnstileSiteKey()} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
