import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowUpRight, Check, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = pageMetadata({
  title: "Thank You | TTR Digital Marketing",
  description: "We received your request for a free growth audit.",
  path: "/thank-you",
  noIndex: true,
});

const next = [
  { title: "We review your request", text: "A real person looks at your business and your website before we reach out." },
  { title: "We reach out within one business day", text: "We call or email to set up your free 30-minute audit at a time that suits you." },
  { title: "You get a clear plan", text: "On the call we show you what to fix first, whether or not you hire us." },
];

export default async function ThankYouPage() {
  const settings = await getSiteSettings();
  return (
    <section className="relative overflow-hidden pb-24 pt-[calc(var(--header-h)+64px)] lg:pb-32">
      <div aria-hidden="true" className="leak left-1/2 top-0 h-[480px] w-[640px] -translate-x-1/2 opacity-40" />
      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <span className="success-pop mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[image:var(--grad-brand)] text-white shadow-[0_0_50px_-6px_rgb(166_107_255/0.9)]">
            <Check className="h-7 w-7" strokeWidth={2} aria-hidden="true" />
          </span>
          <h1 className="mt-8 text-h2 font-semibold">Thanks. Your free growth audit is on its way.</h1>
          <p className="measure mx-auto mt-6 text-lead text-body">
            We received your request. Here is what happens next. Need us sooner? Give us a call during business hours.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={settings.phoneHref} size="lg">
              <Phone className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
              Call {settings.phone}
            </Button>
            <Button href="/" size="lg" variant="secondary">
              Back to home
            </Button>
          </div>
        </div>

        <ol className="mx-auto mt-20 grid max-w-5xl gap-4 lg:grid-cols-3 lg:gap-5">
          {next.map((s, i) => (
            <li key={s.title} className="card rounded-[20px] p-8">
              <span className="font-display text-[2rem] font-semibold leading-none tracking-[-0.04em] text-gradient">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-5 font-sans text-[1.125rem] font-semibold text-hi">{s.title}</h2>
              <p className="mt-2 text-small text-body">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2">
          {[
            { href: "/services", title: "Explore our services", text: "See how SEO, ads, CRM and AI agents fit together." },
            { href: "/blog", title: "Read the blog", text: "Plain-English advice for local business owners." },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="group card flex items-center justify-between gap-6 rounded-[20px] p-6 transition-colors hover:border-violet-400/35">
              <span>
                <span className="block font-medium text-hi">{l.title}</span>
                <span className="mt-1 block text-small text-meta">{l.text}</span>
              </span>
              <ArrowUpRight className="h-5 w-5 shrink-0 text-meta transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-hi" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
