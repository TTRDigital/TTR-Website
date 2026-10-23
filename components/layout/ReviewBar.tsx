/*
 * TTR OS's "Suggest a change" bar (TTR-585), on Vercel previews only, never on the live site. It does nothing unless
 * the page was opened from a private review link (a review token after #); the reader highlights words on the draft
 * and leaves notes for TTR. The CSP in next.config.ts allows ttr-portal.vercel.app (it also serves the site tracker).
 */
export function ReviewBar() {
  return process.env.VERCEL_ENV === "preview" ? <script defer src="https://ttr-portal.vercel.app/api/site/notes/bar" /> : null;
}
