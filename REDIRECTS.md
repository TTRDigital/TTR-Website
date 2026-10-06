# Redirects from the old WordPress site

Every URL from the old site's sitemap (100 URLs, collected in Phase 1) and where it goes now. All redirects are permanent (301) and take a single hop. They are defined in `redirects.ts`, which `next.config.ts` loads.

How the rules work:

- Old pages that have a new home go to it (for example `/about-us/` to `/about`).
- The old city pages (`/fl/miami-seo/` and similar) go to the matching service page. The site no longer has city pages, as agreed in CONTENT-NOTES.md.
- The old state hub pages (`/fl/` and similar) and the city "digital marketing" pages go to the home page.
- Blog posts keep their exact WordPress slugs. Only the trailing slash is dropped.
- Any other old URL with a trailing slash redirects to the same path without it.

To add a redirect, add a line to the `map` in `redirects.ts`.

| Old URL | New URL |
|---|---|
| `/` | `/` (unchanged) |
| `/audit/` | `/contact` |
| `/about-kia/` | `/about` |
| `/digital-marketing-referral-program/` | `/contact` |
| `/thank-you/` | `/thank-you` |
| `/thank-you-free-audit/` | `/thank-you` |
| `/testing-page/` | `/` |
| `/sitemap/` | `/` |
| `/privacy-policy/` | `/privacy` |
| `/terms-of-service/` | `/terms` |
| `/about-us/` | `/about` |
| `/fl/orlando-digital-marketing/` | `/` |
| `/il/schaumburg-digital-marketing/` | `/` |
| `/al/` | `/` |
| `/al/birmingham-seo/` | `/services/seo` |
| `/ca/` | `/` |
| `/ca/san-francisco-ppc/` | `/services/google-ads` |
| `/ca/san-francisco-social-media/` | `/services/social-media-marketing` |
| `/fl/aventura-ppc/` | `/services/google-ads` |
| `/fl/miami-ppc/` | `/services/google-ads` |
| `/fl/orlando-ppc/` | `/services/google-ads` |
| `/fl/aventura-seo/` | `/services/seo` |
| `/fl/orlando-seo/` | `/services/seo` |
| `/fl/aventura-social-media/` | `/services/social-media-marketing` |
| `/fl/miami-social-media/` | `/services/social-media-marketing` |
| `/fl/orlando-social-media/` | `/services/social-media-marketing` |
| `/ga/` | `/` |
| `/ga/atlanta-ppc/` | `/services/google-ads` |
| `/ga/atlanta-seo/` | `/services/seo` |
| `/ga/atlanta-social-media/` | `/services/social-media-marketing` |
| `/il/` | `/` |
| `/il/chicago-ppc/` | `/services/google-ads` |
| `/il/schaumburg-ppc/` | `/services/google-ads` |
| `/il/chicago-seo/` | `/services/seo` |
| `/il/chicago-social-media/` | `/services/social-media-marketing` |
| `/il/schaumburg-social-media/` | `/services/social-media-marketing` |
| `/ma/` | `/` |
| `/ma/boston-ppc/` | `/services/google-ads` |
| `/ma/boston-seo/` | `/services/seo` |
| `/ma/boston-social-media/` | `/services/social-media-marketing` |
| `/ny/` | `/` |
| `/ny/new-york-ppc/` | `/services/google-ads` |
| `/ny/new-york-seo/` | `/services/seo` |
| `/ny/new-york-social-media/` | `/services/social-media-marketing` |
| `/pa/` | `/` |
| `/pa/philadelphia-ppc/` | `/services/google-ads` |
| `/pa/philadelphia-social-media/` | `/services/social-media-marketing` |
| `/md/` | `/` |
| `/md/chevy-chase-ppc/` | `/services/google-ads` |
| `/md/chevy-chase-seo/` | `/services/seo` |
| `/md/chevy-chase-social-media/` | `/services/social-media-marketing` |
| `/digital-marketing-services/automotive/` | `/services` |
| `/digital-marketing-services/health-care/` | `/dental-marketing` |
| `/digital-marketing-services/insurance/` | `/services` |
| `/va/fairfax-ppc/` | `/services/google-ads` |
| `/va/arlington-ppc/` | `/services/google-ads` |
| `/va/herndon-ppc/` | `/services/google-ads` |
| `/va/mclean-ppc/` | `/services/google-ads` |
| `/va/reston-ppc/` | `/services/google-ads` |
| `/va/fairfax-seo/` | `/services/seo` |
| `/va/arlington-seo/` | `/services/seo` |
| `/va/herndon-seo/` | `/services/seo` |
| `/va/mclean-seo/` | `/services/seo` |
| `/va/reston-seo/` | `/services/seo` |
| `/va/arlington-social-media/` | `/services/social-media-marketing` |
| `/va/fairfax-social-media/` | `/services/social-media-marketing` |
| `/va/herndon-social-media/` | `/services/social-media-marketing` |
| `/va/mclean-social-media/` | `/services/social-media-marketing` |
| `/va/reston-social-media/` | `/services/social-media-marketing` |
| `/dc/` | `/` |
| `/dc/washington-ppc/` | `/services/google-ads` |
| `/dc/washington-seo/` | `/services/seo` |
| `/dc/washington-social-media/` | `/services/social-media-marketing` |
| `/va/reston-digital-marketing/` | `/` |
| `/digital-marketing-services/ppc/` | `/services/google-ads` |
| `/digital-marketing-services/seo/` | `/services/seo` |
| `/digital-marketing-services/social-media/` | `/services/social-media-marketing` |
| `/va/` | `/` |
| `/ca/san-francisco-seo/` | `/services/seo` |
| `/pa/philadelphia-seo/` | `/services/seo` |
| `/ga/atlanta-digital-marketing/` | `/` |
| `/fl/miami-seo/` | `/services/seo` |
| `/fl/` | `/` |
| `/dc/washington-dc-digital-marketing/` | `/` |
| `/il/schaumburg-seo/` | `/services/seo` |
| `/fl/miami-digital-marketing/` | `/` |
| `/va/mclean-digital-marketing/` | `/` |
| `/ca/san-francisco-digital-marketing/` | `/` |
| `/fl/aventura-digital-marketing/` | `/` |
| `/il/chicago-digital-marketing/` | `/` |
| `/va/herndon-digital-marketing/` | `/` |
| `/md/chevy-chase-digital-marketing/` | `/` |
| `/pa/philadelphia-digital-marketing/` | `/` |
| `/va/arlington-digital-marketing/` | `/` |
| `/va/fairfax-digital-marketing/` | `/` |
| `/contact-us/` | `/contact` |
| `/blog/` | `/blog` |
| `/blog/seo-services-pricing/` | `/blog/seo-services-pricing` |
| `/blog/social-media-marketing-strategy/` | `/blog/social-media-marketing-strategy` |
| `/blog/digital-marketing-trends-2021-for-local-businesses/` | `/blog/digital-marketing-trends-2021-for-local-businesses` |
