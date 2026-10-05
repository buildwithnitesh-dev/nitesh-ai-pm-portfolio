import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { deltas, profile, retentionHeadline, seo, shareProof } from "@/content/portfolio";
import { proofText } from "@/components/proof-label";

export const alt = seo.share.imageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** The site's own typeface (SIL OFL, licence beside the files), read once at build time. */
const font = (file: string) => readFile(join(process.cwd(), "assets/og", file));
const [regular, semi, heavy] = await Promise.all([
  font("SchibstedGrotesk-400.ttf"),
  font("SchibstedGrotesk-600.ttf"),
  font("SchibstedGrotesk-800.ttf"),
]);

/** Site colour tokens (app/globals.css). */
const c = { background: "#f9f8f6", ink: "#16171b", muted: "#53555c", line: "#c9c6bf", accent: "#8b1a2e", stone: "#efede8" };

/** Length of the full Day-7 shift line; the "before" point is placed to scale on it. */
const LINE = 400;

/**
 * The share card, built to read at chat-preview size: who (name, role,
 * positioning) on the left, and the hero's proof on a ruled stone column, with
 * the Day-7 result drawn as the site's shift line: hollow "before", solid "after".
 */
export default function Image() {
  const stats = shareProof.map((id) => {
    const d = deltas[id];
    return { value: d.before ? `${d.before} → ${d.after}` : d.after, label: `${d.label} · ${proofText(d.evidence, d.beforeEvidence)}`, note: d.note };
  });
  const from = Math.round((LINE * retentionHeadline.before) / retentionHeadline.after);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: c.background, fontFamily: "Schibsted Grotesk", color: c.ink }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 40px 60px 72px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ width: 18, height: 18, background: c.accent, transform: "rotate(45deg)" }} />
              <div style={{ marginLeft: 18, fontSize: 24, fontWeight: 800, letterSpacing: 3, color: c.ink }}>{profile.role.toUpperCase()}</div>
            </div>
            <div style={{ marginTop: 34, fontSize: 112, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4, color: c.ink }}>{profile.name}</div>
            <div style={{ marginTop: 26, fontSize: 32, color: c.muted }}>{profile.positioning}</div>
          </div>
          <div style={{ fontSize: 22, color: c.ink }}>buildwithnitesh.com</div>
        </div>

        <div style={{ width: 520, display: "flex", flexDirection: "column", justifyContent: "center", background: c.stone, padding: "0 56px", borderLeft: `2px solid ${c.ink}` }}>
          <div style={{ fontSize: 20, fontWeight: 600, color: c.accent }}>Documented outcomes</div>
          {stats.map(({ value, label, note }, i) => (
            <div key={label} style={{ display: "flex", flexDirection: "column", padding: "22px 0", borderTop: i ? `1px solid ${c.line}` : "none" }}>
              <div style={{ fontSize: 60, fontWeight: 800, lineHeight: 1, letterSpacing: -2, whiteSpace: "nowrap", color: c.ink }}>{value}</div>
              {i === 0 ? (
                <div style={{ display: "flex", position: "relative", width: LINE, height: 16, marginTop: 18 }}>
                  <div style={{ position: "absolute", left: 0, top: 7, width: LINE, height: 2, background: c.line }} />
                  <div style={{ position: "absolute", left: from, top: 6, width: LINE - from, height: 4, background: c.accent }} />
                  <div style={{ position: "absolute", left: from - 8, top: 0, width: 16, height: 16, borderRadius: 8, border: `2px solid ${c.ink}`, background: c.stone }} />
                  <div style={{ position: "absolute", left: LINE - 8, top: 0, width: 16, height: 16, background: c.accent }} />
                </div>
              ) : null}
              <div style={{ marginTop: 14, fontSize: 22, fontWeight: 600, color: c.ink }}>{label}</div>
              {note ? <div style={{ marginTop: 4, fontSize: 18, color: c.muted }}>{note}</div> : null}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Schibsted Grotesk", data: regular, style: "normal", weight: 400 },
        { name: "Schibsted Grotesk", data: semi, style: "normal", weight: 600 },
        { name: "Schibsted Grotesk", data: heavy, style: "normal", weight: 800 },
      ],
    },
  );
}
