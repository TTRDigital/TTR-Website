// TTR OS website tracker (visits by source and form leads; no personal data). The site key is public: it ships in this tag.
// "off" in NEXT_PUBLIC_TTR_SITE_KEY turns it off.
// The script loads from its versioned address, cached for a year. A new script version gets a new address.
const TTR_SITE_KEY = process.env.NEXT_PUBLIC_TTR_SITE_KEY === "off" ? "" : process.env.NEXT_PUBLIC_TTR_SITE_KEY || "IVtje4aMphQnc_SHTXgQdQ";

export function TtrTracker() {
  return TTR_SITE_KEY ? <script async src="https://portal.ttrdigitalmarketing.com/api/site/script/5a23a7758595" data-site={TTR_SITE_KEY} /> : null;
}
