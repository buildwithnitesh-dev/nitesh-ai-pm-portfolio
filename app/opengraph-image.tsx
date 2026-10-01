import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile, retentionHeadline, seo } from "@/content/portfolio";

export const alt = seo.share.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The site's own typefaces (SIL OFL, licences beside the files), read once at build time. */
const font = (file: string) => readFile(join(process.cwd(), "assets/og", file));
const [serif, sans, sansSemi] = await Promise.all([
  font("InstrumentSerif-Regular.ttf"),
  font("Geist-Regular.ttf"),
  font("Geist-SemiBold.ttf"),
]);

/** Site colour tokens (app/globals.css). */
const c = { background: "#f5f1e8", ink: "#111111", accent: "#0f766e", dark: "#111513", panel: "#fbf9f4", teal: "#5eafa3", before: "#7cb3ab" };

/** Width of the full D7 bar; the control bar is drawn to scale against it. */
const BAR = 408;

/**
 * The share card, built to read at chat-preview size: who (name, role,
 * positioning) on the cream side, and the three documented outcomes on a dark
 * proof panel, with the Day-7 result drawn to scale as control vs. redesign.
 */
export default function Image() {
  const stats = [
    ["12.2% → 25.4%", "D7 retention"],
    ["18% → 45%", "Assignment completion"],
    ["100K+", "Learners"],
  ];
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.background, fontFamily: "Geist" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 40px 60px 72px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: 56, height: 5, background: c.accent }} />
            <div style={{ marginTop: 34, fontFamily: "Instrument Serif", fontSize: 126, lineHeight: 0.95, letterSpacing: -2.5, color: c.ink }}>{profile.name}</div>
            <div style={{ marginTop: 26, fontSize: 44, fontWeight: 600, letterSpacing: -0.8, color: c.ink }}>Senior Product Manager</div>
            <div style={{ marginTop: 18, fontSize: 23, color: c.accent }}>Consumer Products  •  Growth  •  Monetization  •  AI</div>
          </div>
          <div style={{ fontSize: 22, color: c.ink }}>buildwithnitesh.com</div>
        </div>

        <div style={{ width: 520, display: "flex", flexDirection: "column", justifyContent: "center", background: c.dark, padding: "0 56px" }}>
          <div style={{ marginBottom: 4, fontSize: 18, letterSpacing: 4, textTransform: "uppercase", color: "rgba(251,249,244,0.55)" }}>Documented outcomes</div>
          {stats.map(([value, label], i) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", padding: "24px 0", borderTop: i ? "1px solid rgba(251,249,244,0.14)" : "none" }}>
              <div style={{ fontSize: 60, fontWeight: 600, lineHeight: 1, letterSpacing: -1.8, whiteSpace: "nowrap", color: c.panel }}>{value}</div>
              {i === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", marginTop: 16 }}>
                  <div style={{ height: 8, width: Math.round((BAR * retentionHeadline.before) / retentionHeadline.after), borderRadius: 4, background: c.before }} />
                  <div style={{ height: 8, width: BAR, marginTop: 6, borderRadius: 4, background: c.teal }} />
                </div>
              ) : null}
              <div style={{ marginTop: 12, fontSize: 19, letterSpacing: 3.5, textTransform: "uppercase", color: c.teal }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Geist", data: sans, style: "normal", weight: 400 },
        { name: "Geist", data: sansSemi, style: "normal", weight: 600 },
      ],
    },
  );
}
