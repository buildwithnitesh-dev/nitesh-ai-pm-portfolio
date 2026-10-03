import { cases } from "@/content/cases";
import { aiLab, arc, contact, decisions, deltas, profile, roles } from "@/content/portfolio";
import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

/** /llms.txt, generated from the canonical content model so it can never drift from the site. */
export function GET() {
  const d = (id: keyof typeof deltas) => {
    const x = deltas[id];
    return `${x.label} ${x.before ? `${x.before} → ` : ""}${x.after} (${x.method}${x.note ? `; ${x.note}` : ""}). ${x.definition}${x.detail ? ` ${x.detail}` : ""}`;
  };
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.role} · ${profile.positioning}. ${profile.experience}. ${profile.location}. Open to ${contact.lookingFor}.`,
    "",
    `Contact: ${contact.email} · ${contact.linkedin}`,
    `Resume (PDF): ${siteUrl}${contact.resumeUrl}`,
    "",
    "## Career",
    ...arc.map((a) => `- ${a.verb} (${a.org}, ${a.years}): ${a.taught} ${a.proof}`),
    "",
    "## Flagship case studies",
    ...Object.values(cases).map((c) => `- [${c.capability}: ${c.title}](${siteUrl}/work/${c.slug}): ${c.description}`),
    "",
    "## Documented outcomes",
    ...(["d0", "d7", "completion", "bonus", "learners"] as const).map((id) => `- ${d(id)} — ${deltas[id].context}`),
    "",
    "## Decisions",
    ...decisions.map((x) => `- ${x.title} (${x.product ? `${x.company} · ${x.product}` : x.company}, ${x.verdict}): ${x.stages.map((s) => `${s.term}: ${s.text}`).join(" ")}${x.results ? ` Results: ${x.results.map((r) => (r.basis ? `${r.text} (${r.basis})` : r.text)).join("; ")}.` : ""}${x.note ? ` Note: ${x.note}` : ""}`),
    "",
    "## AI Lab",
    `${aiLab.sub} ${aiLab.professional}`,
    ...aiLab.builds.map((b) => `- [${b.title}](${siteUrl}${b.href}): ${b.status}. ${b.statusNote}`),
    "",
    "## Experience",
    ...roles.map((r) => `- ${r.title}, ${r.company} (${r.period}): ${r.highlights.join("; ")}.`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
