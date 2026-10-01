import { ImageResponse } from "next/og";
import { hero, profile } from "@/content/portfolio";

export const alt = `${profile.name}, Senior Product Manager: ${hero.headline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The share card: who, the headline, and three verified outcomes. Colors are the site's tokens. */
export default function Image() {
  const stats = [
    ["12.2% → 25.4%", "Day-7 retention · Witzeal"],
    ["18% → 45%", "Assignment completion · Edfora"],
    ["100K+", "Learners reached · Edfora"],
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#f5f1e8", color: "#111111", padding: "64px 72px" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, color: "#0f766e", letterSpacing: 4, textTransform: "uppercase" }}>Senior Product Manager · Consumer Products · Growth · Monetization · AI</div>
          <div style={{ marginTop: 28, fontSize: 76, lineHeight: 1.05, letterSpacing: -2, maxWidth: 980 }}>{hero.headline}</div>
          <div style={{ marginTop: 24, fontSize: 30, color: "#5f5b54" }}>{`${profile.name} · ~7 years in product · 10+ years in technology`}</div>
        </div>
        <div style={{ display: "flex", borderTop: "2px solid #111111", paddingTop: 28 }}>
          {stats.map(([v, l]) => (
            <div key={l} style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div style={{ fontSize: 44, fontWeight: 700 }}>{v}</div>
              <div style={{ marginTop: 6, fontSize: 22, color: "#5f5b54" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
