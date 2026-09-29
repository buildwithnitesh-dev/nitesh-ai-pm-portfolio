/**
 * Conceptual AI product architecture, annotated with what actually exists where.
 * Professional cells come only from the documented Edfora work; everything else
 * is marked as the independent prototype or left empty, so nothing implies shipping.
 */

type Cell = { text: string; kind: "shipped" | "prototype" | "designed" | "none" };

const nodes: { name: string; edfora: Cell; prototype: Cell }[] = [
  {
    name: "User signals",
    edfora: { text: "Student performance history", kind: "shipped" },
    prototype: { text: "Three learner-signal answers", kind: "prototype" },
  },
  {
    name: "Diagnostic engine",
    edfora: { text: "Learner ability estimate from performance", kind: "shipped" },
    prototype: { text: "Skill-gap diagnosis with an evidence trace", kind: "prototype" },
  },
  {
    name: "LLM / rules",
    edfora: { text: "Question parameters, plus an LLM API", kind: "shipped" },
    prototype: { text: "Deterministic rules, no model", kind: "prototype" },
  },
  {
    name: "Recommendation",
    edfora: { text: "Next question matched to the learner", kind: "shipped" },
    prototype: { text: "Next-best action, stated confidence, educator override", kind: "prototype" },
  },
  {
    name: "Evaluation",
    edfora: { text: "Not part of documented experience", kind: "none" },
    prototype: { text: "Rubric designed, not yet run", kind: "designed" },
  },
];

function Mark({ kind }: { kind: Cell["kind"] }) {
  if (kind === "none") return <span aria-hidden className="inline-block h-px w-2.5 bg-white/30" />;
  if (kind === "shipped") return <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-cap-structure" />;
  if (kind === "prototype") return <span aria-hidden className="inline-block h-2 w-2 rounded-full border border-cap-structure" />;
  return <span aria-hidden className="inline-block h-2 w-2 rounded-full border border-dashed border-white/50" />;
}

function CellText({ c }: { c: Cell }) {
  return (
    <span className={`flex items-start gap-2 text-sm leading-5 ${c.kind === "none" ? "text-panel/60" : "text-panel/85"}`}>
      <span className="mt-1.5 shrink-0"><Mark kind={c.kind} /></span>
      {c.text}
    </span>
  );
}

export function AiSystemFlow() {
  return (
    <figure aria-labelledby="ai-flow-title" className="rounded-2xl border border-white/10 bg-ink-raised p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <p id="ai-flow-title" className="font-serif text-2xl">A conceptual AI product system, and what exists where</p>
        <ul aria-label="Legend" className="flex flex-wrap gap-x-5 gap-y-1 text-xs text-panel/70">
          <li className="flex items-center gap-2"><Mark kind="shipped" />Professional · Edfora</li>
          <li className="flex items-center gap-2"><Mark kind="prototype" />Independent prototype</li>
          <li className="flex items-center gap-2"><Mark kind="designed" />Designed, not run</li>
        </ul>
      </div>

      {/* Wide screens: the flow across, with two annotation rows beneath it. */}
      <table className="mt-8 hidden w-full table-fixed border-collapse text-left md:table">
        <caption className="sr-only">Conceptual AI product system stages, with what exists professionally at Edfora and in the independent prototype</caption>
        <thead>
          <tr>
            <th scope="col" className="w-[8.5rem]"><span className="sr-only">Where</span></th>
            {nodes.map((n, i) => (
              <th key={n.name} scope="col" className="relative pb-5 align-bottom font-normal">
                <span aria-hidden className="relative mb-3 block h-[9px]">
                  {/* Flow line from this stage's node to the next one. */}
                  {i < nodes.length - 1 ? <span className="absolute top-[4px] right-0 left-[9px] h-px bg-cap-structure/40" /> : null}
                  <span className="absolute top-0 left-0 h-[9px] w-[9px] rounded-full border border-cap-structure bg-ink-raised" />
                </span>
                <span className="block pr-4 font-mono text-[11px] tracking-[0.14em] text-panel uppercase">{n.name}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-white/10">
            <th scope="row" className="py-4 pr-4 align-top text-xs font-normal text-panel/70">Edfora · professional</th>
            {nodes.map((n) => <td key={n.name} className="py-4 pr-4 align-top"><CellText c={n.edfora} /></td>)}
          </tr>
          <tr className="border-t border-white/10">
            <th scope="row" className="py-4 pr-4 align-top text-xs font-normal text-panel/70">AI Learner Diagnostic · independent</th>
            {nodes.map((n) => <td key={n.name} className="py-4 pr-4 align-top"><CellText c={n.prototype} /></td>)}
          </tr>
        </tbody>
      </table>

      {/* Phones: the same flow, top to bottom. */}
      <ol className="mt-6 md:hidden">
        {nodes.map((n, i) => (
          <li key={n.name} className="relative pb-6 pl-6 last:pb-0">
            {i < nodes.length - 1 ? <span aria-hidden className="absolute top-3 bottom-0 left-[4px] w-px bg-cap-structure/40" /> : null}
            <span aria-hidden className="absolute top-1 left-0 h-[9px] w-[9px] rounded-full border border-cap-structure bg-ink-raised" />
            <p className="font-mono text-[11px] tracking-[0.14em] text-panel uppercase">{n.name}</p>
            <dl className="mt-2 grid gap-1.5">
              <div><dt className="sr-only">Edfora, professional</dt><dd><CellText c={n.edfora} /></dd></div>
              <div><dt className="sr-only">Independent prototype</dt><dd><CellText c={n.prototype} /></dd></div>
            </dl>
          </li>
        ))}
      </ol>

      <figcaption className="mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-panel/70">
        Conceptual architecture, not a description of one shipped system. At Edfora, the documented work is the Adaptive Assignment Engine: learner ability matched against question difficulty, discrimination and guessing, with an LLM API adjusting difficulty from performance history. Evaluation there is not described here. The independent prototype runs the full loop with deterministic rules and has no real users.
      </figcaption>
    </figure>
  );
}
