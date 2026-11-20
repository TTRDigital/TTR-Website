// TTR OS website tracker (visits by source and form leads; no personal data). The site key is public: it ships in this tag.
// "off" in NEXT_PUBLIC_TTR_SITE_KEY turns it off.
// The script loads from its versioned address, cached for a year. A new script version gets a new address.
const TTR_SITE_KEY = process.env.NEXT_PUBLIC_TTR_SITE_KEY === "off" ? "" : process.env.NEXT_PUBLIC_TTR_SITE_KEY || "IVtje4aMphQnc_SHTXgQdQ";
const TTR_SCRIPT_SRC = "https://portal.ttrdigitalmarketing.com/api/site/script/5a23a7758595";

// The tracker is added only after the page's load event. An async script in
// the HTML holds the load event back until it has downloaded and run, and the
// body font swaps in at the load event (see fontScript in app/layout.tsx).
// A late load event repaints the hero text late and pushes LCP to about 3.5 s
// on mobile. Added after load, the tracker can never delay it. It reads
// data-site from document.currentScript, which also works for a script added
// this way.
const loader = `(function(){function go(){var s=document.createElement("script");s.async=true;s.src=${JSON.stringify(TTR_SCRIPT_SRC)};s.setAttribute("data-site",${JSON.stringify(TTR_SITE_KEY)});document.body.appendChild(s)}if(document.readyState==="complete")setTimeout(go,0);else addEventListener("load",function(){setTimeout(go,0)},{once:true})})();`;

export function TtrTracker() {
  return TTR_SITE_KEY ? <script dangerouslySetInnerHTML={{ __html: loader }} /> : null;
}
