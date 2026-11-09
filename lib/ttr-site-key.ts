/** TTR OS site key. Public: it already ships in the tracker tag. "off" in NEXT_PUBLIC_TTR_SITE_KEY turns TTR OS off. */
export const TTR_SITE_KEY = process.env.NEXT_PUBLIC_TTR_SITE_KEY === "off" ? "" : process.env.NEXT_PUBLIC_TTR_SITE_KEY || "IVtje4aMphQnc_SHTXgQdQ";
