import Link from "next/link";
import type { Faq } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd, faqPageSchema } from "@/components/ui/JsonLd";

/** Light FAQ section with FAQPage schema. Used on every page that has FAQs. */
export function FaqSection({
  data,
  phone,
  phoneHref,
}: {
  data: { eyebrow: string; heading: string; items: Faq[] };
  phone: string;
  phoneHref: string;
}) {
  return (
    <section aria-labelledby="faq-title" data-surface="light" className="surface-light section-pad relative">
      <JsonLd data={faqPageSchema(data.items)} />
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" eyebrow={data.eyebrow} title={data.heading} light />
          <p data-reveal className="mt-6 text-ink-body">
            Still have a question?{" "}
            <a href={phoneHref} data-track="click_to_call" className="link-underline font-medium text-ink-text">
              Call {phone}
            </a>{" "}
            or{" "}
            <Link href="/contact" className="link-underline font-medium text-ink-text">
              send us a message
            </Link>
            .
          </p>
        </div>
        <div className="lg:col-span-8">
          <FaqAccordion items={data.items} light />
        </div>
      </div>
    </section>
  );
}
