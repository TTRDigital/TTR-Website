import type { SiteSettings } from "@/lib/content";
import { absoluteUrl, legalName, siteUrl } from "@/lib/site";
import { ogImageUrl } from "@/lib/seo";

/** 1000 Brickell Ave, Miami. */
const GEO = { latitude: 25.7645, longitude: -80.1923 };

/**
 * Organization + LocalBusiness (ProfessionalService) and WebSite, rendered on
 * every page. Other schema (Service, Article, FAQPage, BreadcrumbList) points
 * back to the "#organization" id.
 */
export function siteSchema(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "ProfessionalService"],
        "@id": absoluteUrl("/#organization"),
        name: settings.name,
        legalName,
        url: siteUrl,
        logo: { "@type": "ImageObject", url: absoluteUrl("/brand/ttr-logo-on-light.svg") },
        image: absoluteUrl(ogImageUrl("Get found everywhere your customers search.", "Digital marketing agency")),
        description:
          "Digital marketing agency for local businesses: SEO, AI search optimization, Google Ads, Meta Ads, websites, social media, GoHighLevel CRM and AI agents.",
        telephone: settings.phoneHref.replace(/^tel:/, ""),
        email: settings.email,
        foundingDate: String(settings.foundedYear),
        address: {
          "@type": "PostalAddress",
          streetAddress: settings.street,
          addressLocality: settings.city,
          addressRegion: settings.region,
          postalCode: settings.postalCode,
          addressCountry: settings.country,
        },
        geo: { "@type": "GeoCoordinates", ...GEO },
        hasMap: settings.mapsUrl,
        // Mirrors the hours text in Site settings (Monday to Friday, 9 to 5).
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "17:00",
          },
        ],
        areaServed: { "@type": "Country", name: "United States" },
        knowsAbout: ["Local SEO", "AI search optimization", "Google Ads", "Meta Ads", "Website design", "Social media marketing", "GoHighLevel CRM", "AI agents"],
        sameAs: settings.social.map((s) => s.href),
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: siteUrl,
        name: settings.name,
        publisher: { "@id": absoluteUrl("/#organization") },
        inLanguage: "en-US",
      },
    ],
  };
}

/** Kia as the author and founder. Title is "Founder" until decision 6 in docs/seo/DECISIONS-FOR-KIA.md is answered. */
export const kiaPerson = {
  "@type": "Person",
  "@id": absoluteUrl("/about#kia"),
  name: "Kia Khamoushi",
  jobTitle: "Founder",
  worksFor: { "@id": absoluteUrl("/#organization") },
  sameAs: ["https://www.linkedin.com/in/kia-kham"],
};

/** WebPage + Service schema for a service-like landing page written by Kia. */
export function landingPageSchema(input: { path: string; name: string; description: string; updated?: string; areaServed?: string; byKia?: boolean }) {
  const url = absoluteUrl(input.path);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: input.name,
        description: input.description,
        inLanguage: "en-US",
        isPartOf: { "@id": absoluteUrl("/#website") },
        ...(input.byKia ? { author: kiaPerson } : {}),
        ...(input.updated ? { dateModified: input.updated } : {}),
        mainEntity: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: input.name,
        description: input.description,
        provider: { "@id": absoluteUrl("/#organization") },
        ...(input.areaServed ? { areaServed: { "@type": "City", name: input.areaServed } } : {}),
      },
    ],
  };
}
