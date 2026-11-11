# Back-end SEO change log

Every change that affects crawling, indexing or redirects is listed here with how to undo it (Oct 28 rule).

## 2026-11-10: Miami redirects (TTR-1454, batch 1 PR)
- Change: `/fl/miami-seo/` now 301s to `/miami-seo` (was `/services/seo`), and `/fl/miami-ppc/` to `/miami-google-ads` (was `/services/google-ads`). Edited in `redirects.ts` and `REDIRECTS.md`.
- Why: the only old city URLs that match a market TTR serves keep their link value on a relevant page.
- Goes live: only when Kia approves the new Miami pages and the PR is merged.
- Undo: delete the two lines marked TTR-1454 in `redirects.ts` and restore the two rows in `REDIRECTS.md`. The generic city rules then send both URLs back to the service pages.

## 2026-11-10: Five new pages in the sitemap and llms.txt (TTR-1454, batch 1 PR)
- Change: `/miami-seo`, `/miami-google-ads`, `/law-firm-marketing`, `/real-estate-marketing`, `/miami-dental-marketing` are added to `lib/data/landing-pages.ts`. The sitemap and `llms.txt` read that list.
- Undo: remove the entry from `lib/data/landing-pages.ts` (and its route folder); the sitemap and `llms.txt` follow. Add a redirect if the URL was ever indexed.
