import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { ServiceSummary, SiteSettings } from "@/lib/content";
import { SocialIcon } from "@/components/ui/icons";

export function Footer({ settings, services }: { settings: SiteSettings; services: ServiceSummary[] }) {
  const year = new Date().getFullYear();
  const columns = [
    {
      title: "Services",
      links: services.map((s) => ({ href: `/services/${s.slug}`, label: s.title })),
    },
    {
      title: "Industries",
      links: [
        { href: "/dental-marketing", label: "Dental marketing" },
        { href: "/home-services-marketing", label: "Home services marketing" },
      ],
    },
    {
      title: "Company",
      links: [
        { href: "/about", label: "About" },
        { href: "/#results", label: "Results" },
        { href: "/blog", label: "Blog" },
        { href: "/contact", label: "Contact" },
        { href: "/contact", label: "Free growth audit" },
      ],
    },
  ];

  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-950">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_70%)]" />
      <div aria-hidden="true" className="leak -left-40 top-10 h-96 w-96 opacity-40" />

      <div className="container-page relative pb-10 pt-20 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image src="/brand/ttr-logo-on-dark.svg" alt="TTR Digital Marketing" width={175} height={22} className="h-[22px] w-auto" />
            <p className="mt-6 max-w-sm text-body">
              We help local businesses get found on Google, ads and AI search, then turn that attention into booked calls.
            </p>
            <ul className="mt-8 flex gap-2" aria-label="Social media">
              {settings.social.map((s) => (
                <li key={s.network}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`TTR Digital Marketing on ${s.label}`}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-body transition-colors hover:border-violet-400/50 hover:text-hi"
                  >
                    <SocialIcon network={s.network} className="h-[18px] w-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="font-sans text-micro font-medium uppercase tracking-[0.18em] text-meta">{col.title}</h2>
                <ul className="mt-5 space-y-1">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="inline-flex min-h-9 items-center text-small text-body transition-colors hover:text-hi">
                        <span className="link-underline">{l.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-sans text-micro font-medium uppercase tracking-[0.18em] text-meta">Visit or call</h2>
            <address className="mt-5 space-y-4 text-small not-italic text-body">
              <a href={settings.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 hover:text-hi">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                <span>
                  {settings.street}
                  <br />
                  {settings.city}, {settings.region} {settings.postalCode}
                  <span className="sr-only"> (opens Google Maps)</span>
                </span>
              </a>
              <a href={settings.phoneHref} data-track="click_to_call" className="flex gap-3 hover:text-hi">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                {settings.phone}
              </a>
              <a href={`mailto:${settings.email}`} className="flex gap-3 break-all hover:text-hi">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                {settings.email}
              </a>
              <p className="flex gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" strokeWidth={1.5} aria-hidden="true" />
                {settings.hoursText}
              </p>
            </address>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-16 select-none bg-[linear-gradient(180deg,rgb(166_107_255/0.16),transparent_85%)] bg-clip-text text-center font-display text-[clamp(7rem,30vw,26rem)] font-semibold leading-[0.8] tracking-[-0.06em] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.06)]"
        >
          TTR
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-line pt-8 text-micro text-meta sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {settings.name}. All rights reserved.
          </p>
          <ul className="flex gap-6">
            <li>
              <Link href="/privacy" className="link-underline hover:text-hi">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="link-underline hover:text-hi">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        {/* Room for the sticky mobile action bar */}
        <div aria-hidden="true" className="h-[calc(72px+env(safe-area-inset-bottom))] md:hidden" />
      </div>
    </footer>
  );
}
