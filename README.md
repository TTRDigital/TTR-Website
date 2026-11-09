# TTR Digital Marketing website

Next.js 16 (App Router, Turbopack), Tailwind v4, Sanity CMS embedded at `/cms`.
Vercel deploys `main` automatically.

## Local development

```bash
cp .env.example .env.local   # fill in the values
npm install
npm run dev                  # http://localhost:3000, studio at /cms
```

Before every push: `npm run build` must pass. Also run `npx tsc --noEmit` and `npx eslint .`.

## Where content lives

| What | Edit in | Fallback in code |
| --- | --- | --- |
| Phone, address, hours, social, badges, default SEO | Studio > Settings > Site settings | `lib/content.ts` (`fallbackSettings`) |
| Header and footer links, header button label | Studio > Settings > Navigation | `lib/content.ts` (`fallbackNavigation`) |
| Home page sections | Studio > Home page | `lib/data/home.ts` |
| Service pages | Studio > Services | `lib/data/services.ts` |
| Dental and home services pages | Studio > Industries | `lib/data/industries.ts` |
| About and Contact hero, legal pages | Studio > Pages | inline in each page |
| Blog posts, authors, categories | Studio > Blog | none |
| Testimonials, case studies, client logos | Studio > Proof | `lib/content.ts`, `lib/data/home.ts` |

Sanity wins field by field. An empty field in the studio shows the built-in copy, so a half-filled document never breaks a page.

Text in `[SQUARE BRACKETS]` is a placeholder. Any block that still contains one is hidden on the site; fill the field in `/cms` and it appears. Set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true` (on a preview only) to see them marked up.

## One-time Sanity setup

### 1. Allow the studio on your domains (CORS)

The studio at `/cms` only loads on origins Sanity trusts.

1. Go to https://www.sanity.io/manage and open the project.
2. Open **API > CORS origins > Add CORS origin**.
3. Add each of these with **Allow credentials** checked:
   - `https://ttr-website-nu.vercel.app`
   - `https://ttrdigitalmarketing.com` and `https://www.ttrdigitalmarketing.com` (once the domain points to Vercel)
   - `http://localhost:3000` (for local development)

### 2. Publish webhook (instant updates)

Pages refresh from Sanity every 5 minutes on their own. The webhook makes a publish show up on the next page view.

1. Make a long random secret, for example with `openssl rand -hex 32`.
2. In Vercel, open **Project Settings > Environment Variables**. Add `SANITY_REVALIDATE_SECRET` with that value for Production and Preview, then redeploy.
3. In https://www.sanity.io/manage, open the project, then **API > Webhooks > Create webhook**:
   - **URL:** `https://ttr-website-nu.vercel.app/api/revalidate` (switch to the live domain later)
   - **Dataset:** `production`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** leave empty
   - **Projection:** `{_type, slug}`
   - **HTTP method:** POST
   - **Secret:** the same value as `SANITY_REVALIDATE_SECRET`
4. Publish any small change in the studio and check that the webhook's attempt log shows `200`.

Without the secret the route answers `503` and the site keeps its 5 minute refresh.

## Leads (TTR OS)

The form posts to `/api/lead`. It checks the fields, the hidden honeypot, the time taken to fill the form, reCAPTCHA and a per-IP limit, then sends the lead from the server to TTR OS (`/api/site/form`, form-encoded: `k` site key, `p` page, `r` referrer, `u` landing URL, fields as `f_<name>`). If TTR OS does not accept it, the visitor is asked to call. The form carries `data-ttr-skip` so the browser tracker does not post it a second time. Nothing here uses GoHighLevel.

The site key is public and lives in `lib/ttr-site-key.ts` (`NEXT_PUBLIC_TTR_SITE_KEY` overrides it, `off` turns TTR OS off). `TTR_OS_FORM_URL` overrides the endpoint.

### SMS consent (Twilio A2P 10DLC)

Every form has one optional SMS checkbox, unticked by default. The wording lives in `lib/sms-consent.ts` with a version date (`SMS_CONSENT_VERSION`) and must match the Twilio registration word for word. If you change the wording, change the version too, and update `/privacy-policy` and `/terms` to match. A phone number alone never opts anyone in.

Each lead carries its consent record as fields: `f_sms_consent` (`yes`/`no`), `f_sms_consent_at` (when it was ticked), `f_sms_consent_page`, `f_sms_consent_text` (the exact wording), `f_sms_consent_version`, `f_sms_consent_phone` (E.164) and `f_sms_consent_ip`. They are empty when the box was not ticked. Contacts without consent must not be texted. STOP and HELP are handled by the messaging system, not this website.

The legal pages are `/privacy-policy` (`/privacy` redirects there) and `/terms`; their text is in Studio > Pages and was written by `scripts/a2p-legal-pages.mjs`. The legal entity name, `TTR Digital Marketing LLC`, is `legalName` in `lib/site.ts` and shows in the footer, on the contact page and in the schema.

**Human check (Google reCAPTCHA v2, "I'm not a robot" checkbox).** Every form shows the checkbox under the fields (the compact version on small phones). The form will not send until it is ticked, and the server confirms each tick with Google before a lead is sent. A missing or rejected tick is blocked and the visitor is asked to tick again or call. If Google cannot be reached, or the secret key is wrong, leads are still delivered (flagged `suspected-spam`) so nothing is lost. Blocked attempts are logged in Vercel as `[lead] Blocked by reCAPTCHA`.

Setup:

1. The **site key** is public and built into `lib/recaptcha.ts` (`RECAPTCHA_SITE_KEY` in Vercel overrides it).
2. Add the **secret key** in Vercel as `RECAPTCHA_SECRET_KEY` with **Production** ticked, then redeploy. It is never put in the code (this repository is public).
3. In the reCAPTCHA admin console (google.com/recaptcha/admin), the key's **Domains** must include `ttrdigitalmarketing.com` (covers www) and `ttr-website-nu.vercel.app`.
4. Open `/api/status` on the live site: `captcha.active: true` means it is enforcing.

**Spam handling.** A submission is dropped only when both spam signals agree: the hidden field is filled *and* it was sent in under 2.5 seconds. With just one signal (browser autofill can fill hidden fields, and some people type fast) the lead is still delivered, with the tag `suspected-spam` and a `spam_check` field saying why. Every drop and delivery is logged in Vercel (Logs, search `[lead]`).

If both are set, both run and the lead counts as saved when either succeeds. With neither set, the form still shows success and the server logs a warning, but leads are not saved anywhere. If every configured delivery fails (after one retry), the visitor sees a message asking them to call.

## Analytics

- `NEXT_PUBLIC_GA_ID` (GA4) and/or `NEXT_PUBLIC_GTM_ID` (Tag Manager). Nothing loads when both are empty. When set, the tags load on the visitor's first scroll, tap or key press, so they never slow the first paint.
- Events: `generate_lead` (form sent), `click_to_call` (any phone link), `audit_cta_click` (any "free audit" button). Each carries `link_url`, `link_text` and `page_path`; `generate_lead` carries `service` and `form`.
- If you set both IDs, events go to GA4 directly and to the GTM dataLayer. Do not also forward them to GA4 inside GTM, or they will be counted twice.
- In GA4, mark `generate_lead` as a key event (Admin > Events).
- Vercel Analytics and Speed Insights load automatically on Vercel. Turn them on once in the Vercel project (Analytics tab and Speed Insights tab).

## SEO

- Each page sets its title, description, canonical, Open Graph and Twitter tags through `pageMetadata` in `lib/seo.ts`. SEO fields in the studio override the built-in ones.
- Share images are generated at `/og?title=...&eyebrow=...` in the brand style. A blog post with a real cover image uses the cover instead.
- Schema: Organization + ProfessionalService and WebSite on every page (`lib/schema.ts`), Service on service pages, FAQPage wherever there are FAQs, Article on posts, and BreadcrumbList everywhere except the home page.
- `/sitemap.xml`, `/robots.txt` (search and AI crawlers allowed; `/cms`, `/api` and `/thank-you` blocked) and `/llms.txt` are generated from the same content.
- Old WordPress URLs redirect with a single 301. See `REDIRECTS.md`.
- Canonicals, the sitemap, schema and share images use `https://www.ttrdigitalmarketing.com` (`lib/site.ts`; www is the primary domain in Vercel and the bare domain redirects to it). Set `NEXT_PUBLIC_SITE_URL` only to use a different domain.

## Security headers

`next.config.ts` sends a Content Security Policy that only allows this site, Google Analytics / Tag Manager, Vercel Analytics, Sanity images and Google reCAPTCHA. If you add a tag in GTM that loads another script (for example the Meta Pixel), add its domain to the `csp` list there, or the browser will block it. The studio at `/cms` is excluded from the CSP.

## Optional next steps

- **Live preview in the studio** (Presentation tool and draft mode) needs a Viewer token in `SANITY_API_READ_TOKEN`. It is not set up yet.

## Scripts

Scripts in `scripts/` write content to Sanity. They only patch or create documents and never delete. Run them with Node, for example:

```bash
node --experimental-strip-types --no-warnings scripts/phase4-migrate.mjs
```
