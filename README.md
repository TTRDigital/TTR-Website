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

Text in `[SQUARE BRACKETS]` is a placeholder. Set `NEXT_PUBLIC_HIDE_PLACEHOLDERS=true` to hide every block that still contains one.

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

## Optional next steps

- **Live preview in the studio** (Presentation tool and draft mode) needs a Viewer token in `SANITY_API_READ_TOKEN`. It is not set up yet.
- **GoHighLevel** and **analytics** turn on when their variables in `.env.example` are filled in.

## Scripts

Scripts in `scripts/` write content to Sanity. They only patch or create documents and never delete. Run them with Node, for example:

```bash
node --experimental-strip-types --no-warnings scripts/phase4-migrate.mjs
```
