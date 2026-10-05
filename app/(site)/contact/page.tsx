import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { getCmsPage } from "@/lib/pages";
import { PageHero } from "@/components/sections/PageHero";
import { FaqSection } from "@/components/sections/FaqSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadForm } from "@/components/forms/LeadForm";

export const revalidate = 300;

const fallbackSeo = {
  title: "Contact TTR Digital Marketing | Free Growth Audit",
  description:
    "Call (786) 460-1311 or send a message to book your free growth audit. TTR Digital Marketing, 1000 Brickell Ave Ste 715, Miami, FL.",
};

export async function generateMetadata(): Promise<Metadata> {
  const cms = await getCmsPage("contact");
  return {
    title: { absolute: cms?.seo?.title || fallbackSeo.title },
    description: cms?.seo?.description || fallbackSeo.description,
    alternates: { canonical: "/contact" },
  };
}

const steps = [
  { title: "We reply within one business day", text: "A real person reviews your request and reaches out to set up a time that works for you." },
  { title: "Your free 30-minute audit call", text: "We look at your website, your Google presence, your ads and your competitors together." },
  { title: "A clear plan", text: "You leave with a short list of what to fix first and how we would help, whether or not you hire us." },
];

const faqs = [
  {
    question: "What happens on the free audit call?",
    answer:
      "We spend about 30 minutes looking at your website, your Google presence and your competitors with you. You leave with a short list of things to fix first, whether or not you hire us.",
  },
  { question: "Is the audit really free?", answer: "Yes. There is no cost and no obligation. No sales pitches, just honest, practical feedback." },
  { question: "How quickly will I hear back?", answer: "Within one business day. If it is urgent, call us at (786) 460-1311 during business hours." },
  {
    question: "Do you only work with businesses in Miami?",
    answer: "Our office is on Brickell Avenue in Miami and many of our clients are in South Florida, but we work with businesses across the United States.",
  },
];

export default async function ContactPage() {
  const [settings, cms] = await Promise.all([getSiteSettings(), getCmsPage("contact")]);
  const contact = [
    { icon: Phone, label: "Call", value: settings.phone, href: settings.phoneHref, track: "click_to_call" },
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { icon: MapPin, label: "Visit", value: `${settings.street}, ${settings.city}, ${settings.region} ${settings.postalCode}`, href: settings.mapsUrl, external: true },
    { icon: Clock, label: "Hours", value: settings.hoursText },
  ];

  return (
    <>
      <PageHero
        compact
        breadcrumbs={[{ name: "Contact", href: "/contact" }]}
        eyebrow="Contact"
        title={cms?.heading || "Let's talk about growing your business."}
        intro={
          <p>
            {cms?.intro ||
              "Call us, stop by our Brickell office or send a quick message. We will get back to you within one business day to set up your free growth audit."}
          </p>
        }
      />

      <section id="audit" aria-label="Contact form and details" className="relative scroll-mt-20 pb-24 lg:pb-32">
        <div className="container-page grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="glass rounded-[28px] p-6 sm:p-10 lg:col-span-8">
            <h2 className="font-display text-h3 font-semibold">Get your free growth audit</h2>
            <p className="mt-2 text-small text-meta">Takes about a minute. A real person reads every request.</p>
            <div className="mt-8">
              <LeadForm phone={settings.phone} phoneHref={settings.phoneHref} />
            </div>
          </div>

          <aside aria-label="Contact details" className="lg:col-span-4">
            <ul className="card divide-y divide-line rounded-[28px]">
              {contact.map((c) => (
                <li key={c.label} className="flex gap-4 p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-400/15 text-violet-300">
                    <c.icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-micro uppercase tracking-[0.18em] text-meta">{c.label}</p>
                    {c.href ? (
                      <a
                        href={c.href}
                        data-track={c.track}
                        {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="mt-1 block text-hi [overflow-wrap:anywhere] hover:text-lavender-200"
                      >
                        {c.value}
                        {c.external ? <span className="sr-only"> (opens Google Maps)</span> : null}
                      </a>
                    ) : (
                      <p className="mt-1 text-hi">{c.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section aria-labelledby="next-title" className="section-pad relative border-t border-line">
        <div className="container-page">
          <SectionHeading id="next-title" eyebrow="What happens next" title="Three simple steps after you hit send." />
          <ol className="mt-14 grid gap-4 lg:mt-20 lg:grid-cols-3 lg:gap-5">
            {steps.map((s, i) => (
              <li key={s.title} data-reveal style={{ "--i": i } as React.CSSProperties} className="card rounded-[20px] p-8">
                <span className="font-display text-[2.5rem] font-semibold leading-none tracking-[-0.04em] text-gradient">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[1.25rem] font-semibold tracking-[-0.015em]">{s.title}</h3>
                <p className="mt-2 text-body">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FaqSection data={{ eyebrow: "FAQ", heading: "Before you reach out.", items: faqs }} phone={settings.phone} phoneHref={settings.phoneHref} />
    </>
  );
}
