// TTR OS website tracker (visits by source and form leads; no personal data). The site key is public: it ships in this tag.
// "off" in NEXT_PUBLIC_TTR_SITE_KEY turns it off.
const TTR_SITE_KEY = process.env.NEXT_PUBLIC_TTR_SITE_KEY === "off" ? "" : process.env.NEXT_PUBLIC_TTR_SITE_KEY || "IVtje4aMphQnc_SHTXgQdQ";

export function TtrTracker() {
  return TTR_SITE_KEY ? <script async src="https://ttr-portal.vercel.app/api/site/script" data-site={TTR_SITE_KEY} /> : null;
}
