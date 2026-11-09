// TTR OS website tracker (visits by source and form leads; no personal data). The site key is public: it ships in this tag.
// "off" in NEXT_PUBLIC_TTR_SITE_KEY turns it off.
import { TTR_SITE_KEY } from "@/lib/ttr-site-key";

export function TtrTracker() {
  return TTR_SITE_KEY ? <script async src="https://ttr-portal.vercel.app/api/site/script" data-site={TTR_SITE_KEY} /> : null;
}
