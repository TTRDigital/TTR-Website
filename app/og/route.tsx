import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/*
 * Branded Open Graph image: /og?title=...&eyebrow=...
 * Lives outside /api so crawlers that respect robots.txt can fetch it.
 */

const clamp = (s: string | null, max: number) => (s ?? "").replace(/\s+/g, " ").trim().slice(0, max);

let assets: Promise<{ font: Buffer; logo: string }> | undefined;
function loadAssets() {
  assets ??= Promise.all([
    readFile(join(process.cwd(), "assets/og/Sora-SemiBold.ttf")),
    readFile(join(process.cwd(), "public/brand/ttr-logo-on-dark.svg")),
  ]).then(([font, logo]) => ({ font, logo: `data:image/svg+xml;base64,${logo.toString("base64")}` }));
  return assets;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = clamp(searchParams.get("title"), 90) || "Get found everywhere your customers search.";
  const eyebrow = clamp(searchParams.get("eyebrow"), 40) || "TTR Digital Marketing";
  const { font, logo } = await loadAssets();
  const size = title.length > 60 ? 60 : title.length > 40 ? 68 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#07060b",
          backgroundImage:
            "radial-gradient(70% 90% at 100% 0%, rgba(138,47,208,0.55), rgba(7,6,11,0) 60%), radial-gradient(50% 60% at 0% 100%, rgba(110,31,168,0.35), rgba(7,6,11,0) 70%)",
          fontFamily: "Sora",
          color: "#F5F3FA",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 12, height: 12, borderRadius: 999, background: "#A66BFF", boxShadow: "0 0 24px #A66BFF" }} />
          <div style={{ fontSize: 26, letterSpacing: 6, textTransform: "uppercase", color: "#D9B8FF" }}>{eyebrow}</div>
        </div>
        <div style={{ display: "flex", fontSize: size, lineHeight: 1.08, letterSpacing: -2, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={381} height={48} alt="" />
          <div style={{ fontSize: 24, color: "#B9B3C9" }}>Miami · (786) 460-1311</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [{ name: "Sora", data: font, weight: 600, style: "normal" }],
      headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, stale-while-revalidate=86400" },
    },
  );
}
