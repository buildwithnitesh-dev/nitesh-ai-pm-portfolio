import { StageMarker, type StepKind } from "@/components/trace";

/**
 * The adaptive practice loop as the PRD specifies it: inputs, five steps, the
 * correct/incorrect branch, and the three documented edge cases pinned to the
 * step they affect. Nothing here goes beyond the PRD; where the PRD names an
 * edge case without its handling, the visual says so.
 */
const steps: readonly { n: string; kind: StepKind; name: string; text: string; branch?: readonly string[]; edge?: string }[] = [
  { n: "01", kind: "signal", name: "Ability", text: "θ per concept, estimated from historical performance", edge: "Initial ability estimation — method not recorded" },
  { n: "02", kind: "decision", name: "Score", text: "P(θ) for each candidate question, from difficulty (b), discrimination (a) and guessing (c)", edge: "Questions missing 3PL parameters" },
  { n: "03", kind: "decision", name: "Select", text: "A question near current ability; when candidates are comparable, the more discriminating one first", edge: "Several questions with the same median P(θ)" },
  { n: "04", kind: "tradeoff", name: "Respond", text: "The learner answers", branch: ["Correct → harder", "Incorrect → easier"] },
  { n: "05", kind: "outcome", name: "Update", text: "θ updated after every response; back to Score until the practice ends" },
];

export function AdaptiveLoop() {
  return (
    <figure aria-label="Adaptive practice loop, as specified in the PRD">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <p className="text-[13px] font-semibold text-ink">The adaptive practice loop <span className="font-normal text-muted">· as the PRD specifies it</span></p>
        <p className="text-[13px] font-medium text-accent"><span className="whitespace-nowrap">3PL Item Response Theory</span> · <span className="whitespace-nowrap">statistical model</span> · <span className="whitespace-nowrap">not an LLM</span></p>
      </div>
      <p className="mt-3 text-[13px] text-muted"><span className="font-medium text-ink">Inputs</span> · Raw student data · 3PL question parameters · Content IDs</p>

      <ol className="trace-lg relative mt-6 grid gap-5 lg:grid-flow-col lg:auto-cols-fr lg:gap-6">
        {steps.map((s) => (
          <li key={s.n} className="relative pl-7 lg:pl-0">
            <span className="absolute top-[3px] left-0 lg:static lg:block"><StageMarker kind={s.kind} /></span>
            <p className="text-[13px] font-medium text-muted lg:mt-4"><span className="tabular-nums text-subtle">{s.n}</span>&nbsp;&nbsp;<span className={s.kind === "decision" ? "text-accent" : "text-ink"}>{s.name}</span></p>
            <p className="mt-1 text-[15px] leading-6 text-ink">{s.text}</p>
            {s.branch ? (
              <ul className="mt-1.5 grid gap-0.5 text-[15px] leading-6 font-semibold text-ink">
                {s.branch.map((b) => <li key={b}>{b}</li>)}
              </ul>
            ) : null}
            {s.edge ? <p className="mt-2 border-l-2 border-line-strong pl-2.5 text-[13px] leading-5 text-muted"><span className="font-medium text-ink/80">Edge case</span> · {s.edge}</p> : null}
          </li>
        ))}
      </ol>
      <figcaption className="mt-5 text-[13px] leading-5 text-muted">The loop repeats from Score after every answer. How the edge cases were handled isn’t in the evidence available, so it isn’t described.</figcaption>
    </figure>
  );
}
