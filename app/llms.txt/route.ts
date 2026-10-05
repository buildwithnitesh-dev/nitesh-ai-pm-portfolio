import { cases } from "@/content/cases";
import { aiLab, arc, changeOf, contact, decisions, deltas, profile, roles } from "@/content/portfolio";
import { proofText } from "@/components/proof-label";
import { siteUrl } from "@/content/site";

export const dynamic = "force-static";

/** /llms.txt, generated from the canonical content model so it can never drift from the site. */
export function GET() {
  const d = (id: keyof typeof deltas) => {
    const x = deltas[id];
    const ends = x.fromLabel && x.toLabel ? `${x.before} ${x.fromLabel} → ${x.after} ${x.toLabel}` : `${x.before ? `${x.before} → ` : ""}${x.after}`;
    const change = changeOf(x);
    return `[${proofText(x.evidence, x.beforeEvidence).toUpperCase()}] ${x.label} ${ends}${change ? `, ${change.value} ${change.unit}` : ""} (${x.method}${x.note ? `; ${x.note}` : ""}). ${x.definition}${x.detail ? ` ${x.detail}` : ""}`;
  };
  /** The doubt-resolution results that aren't deltas, as the decision record states them. */
  const doubtResults = (decisions.find((x) => x.id === "doubt-resolution")?.results ?? []).map(
    (r) => `- ${r.evidence ? `[${r.evidence.toUpperCase()}] ` : ""}${r.text}${r.basis ? ` (${r.basis})` : ""} — Edfora · doubt resolution`,
  );
  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.role} · ${profile.positioning}. ${profile.experience}. ${profile.location}. Open to ${contact.lookingFor}.`,
    "",
    `Contact: ${contact.email} · ${contact.linkedin}`,
    `Resume (PDF): ${siteUrl}${contact.resumeUrl}`,
    "",
    "## Career",
    ...arc.map((a) => `- ${a.verb} (${"independent" in a ? `${a.role}, ${a.org}, independent work, not a role` : `${a.role}, ${a.org}`}, ${a.years}): ${a.taught} ${a.proof}`),
    "",
    "## Flagship case studies",
    ...Object.values(cases).map((c) => `- [${c.capability}: ${c.title}](${siteUrl}/work/${c.slug}): ${c.description}`),
    "",
    "## Documented outcomes",
    "Evidence labels: MEASURED (a test, pilot or audit), REPORTED (on record; method, window or basis not recorded), DERIVED (calculated, not observed), OBSERVED (before/after or usage, no control).",
    `- ${d("d7")} — ${deltas.d7.context}`,
    `- ${d("tat")} — ${deltas.tat.context}`,
    `- ${d("completion")} — ${deltas.completion.context}`,
    ...doubtResults,
    ...(["d0", "bonus", "learners"] as const).map((id) => `- ${d(id)} — ${deltas[id].context}`),
    "",
    "## Decisions",
    ...decisions.map((x) => `- ${x.title} (${x.product ? `${x.company} · ${x.product}` : x.company}, ${x.verdict}): ${x.stages.map((s) => `${s.term}: ${s.text}`).join(" ")}${x.results ? ` Results: ${x.results.map((r) => `${r.evidence ? `[${r.evidence.toUpperCase()}] ` : ""}${r.basis ? `${r.text} (${r.basis})` : r.text}`).join("; ")}.` : ""}${x.note ? ` Note: ${x.note}` : ""}`),
    "",
    "## AI Lab",
    `${aiLab.sub} ${aiLab.professional}`,
    ...aiLab.builds.map((b) => `- [${b.title}](${siteUrl}${b.href}): ${b.status}. ${b.statusNote}`),
    "",
    "## Experience",
    ...roles.map((r) => `- ${r.title}, ${r.company} (${r.period}): ${r.highlights.map((h) => h.replace(/\.$/, "")).join("; ")}.`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
