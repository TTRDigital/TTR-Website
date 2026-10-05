import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { getSiteSettings } from "@/lib/content";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Thank you",
  description: "We received your request for a free growth audit.",
  robots: { index: false, follow: true },
};

export default async function ThankYouPage() {
  const settings = await getSiteSettings();
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div aria-hidden="true" className="leak left-1/2 top-1/4 h-[480px] w-[640px] -translate-x-1/2 opacity-40" />
      <div className="container-page relative py-24 text-center">
        <h1 className="mx-auto max-w-3xl text-h2 font-semibold">Thanks. Your free growth audit is on its way.</h1>
        <p className="measure mx-auto mt-6 text-lead text-body">
          We will reach out within one business day to set up your 30-minute audit call. Need us sooner? Give us a call.
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
        <p className="mt-10 text-small text-meta">
          While you wait, browse our{" "}
          <Link href="/services" className="link-underline text-hi">
            services
          </Link>{" "}
          or read the{" "}
          <Link href="/blog" className="link-underline text-hi">
            blog
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
