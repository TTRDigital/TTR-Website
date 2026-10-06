import { getAllPosts } from "@/lib/blog";
import { getServiceSummaries, getSiteSettings } from "@/lib/content";
import { industryPages } from "@/lib/data/industries";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

/** llms.txt (llmstxt.org): a plain summary of who TTR is for AI crawlers. */
export async function GET() {
  const [settings, services, posts] = await Promise.all([getSiteSettings(), getServiceSummaries(), getAllPosts()]);
  const address = `${settings.street}, ${settings.city}, ${settings.region} ${settings.postalCode}`;

  const text = `# ${settings.name}

> ${settings.name} is a digital marketing agency founded in ${settings.foundedYear}. We help local service businesses, especially dental practices and home service companies (HVAC, plumbing, roofing, electrical), get found on Google, Google Maps, Google Ads, Meta and in AI answers from ChatGPT, Gemini, Perplexity and Google AI Overviews, then turn that attention into booked calls with GoHighLevel CRM and AI agents.

## Contact

- Phone: ${settings.phone}
- Email: ${settings.email}
- Office: ${address}
- Hours: ${settings.hoursText}
- Free growth audit: ${absoluteUrl("/contact")}

## Services

${services.map((s) => `- [${s.title}](${absoluteUrl(`/services/${s.slug}`)}): ${s.summary}`).join("\n")}

## Industries

${industryPages.map((p) => `- [${p.name}](${absoluteUrl(`/${p.slug}`)}): ${p.intro}`).join("\n")}

## How we work

- Every engagement starts with a free audit call; plans, terms and pricing are explained there in plain English.
- We never promise rankings. We report calls, leads and booked jobs in plain English every month.
- Clients own their ad accounts, website and CRM data.

## Key pages

- [Home](${absoluteUrl("/")})
- [All services](${absoluteUrl("/services")})
- [About](${absoluteUrl("/about")})
- [Contact](${absoluteUrl("/contact")})
- [Blog](${absoluteUrl("/blog")})

## Blog

${posts.map((p) => `- [${p.title}](${absoluteUrl(`/blog/${p.slug}`)})`).join("\n") || "- No posts yet."}
`;

  return new Response(text, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=3600" },
  });
}
