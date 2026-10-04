/**
 * The decision trace: the site's visual grammar. Every story reads as
 * Signal → Decision → Outcome, and every step of a case or a decision carries
 * a marker from the same small alphabet:
 *
 *   signal   ○  what was noticed        decision ◆  what was chosen (oxblood)
 *   tradeoff ◐  what it cost or risked  outcome  ■  what was measured
 *   learning □  what it taught
 */

export type StepKind = "signal" | "decision" | "tradeoff" | "outcome" | "learning";

export function StageMarker({ kind, className = "" }: { kind: StepKind; className?: string }) {
  const base = `inline-block h-[11px] w-[11px] shrink-0 ${className}`;
  if (kind === "signal") return <span aria-hidden className={`${base} rounded-full border-[1.5px] border-ink bg-background`} />;
  if (kind === "decision") return <span aria-hidden className={`${base} rotate-45 scale-[0.85] bg-accent`} />;
  if (kind === "tradeoff") return <span aria-hidden className={`${base} rounded-full border-[1.5px] border-ink bg-[linear-gradient(90deg,var(--ink)_50%,var(--background)_50%)]`} />;
  if (kind === "outcome") return <span aria-hidden className={`${base} bg-ink`} />;
  return <span aria-hidden className={`${base} border-[1.5px] border-ink bg-background`} />;
}

const kindLabel: Record<StepKind, string> = { signal: "Signal", decision: "Decision", tradeoff: "Trade-off", outcome: "Outcome", learning: "Learning" };

/** Maps a stage or step name to its place in the grammar. */
export function kindOf(term: string): StepKind {
  const t = term.toLowerCase();
  if (/(trade-off|tradeoff|limits|cold start|attribution|guardrail|gate|tension|why it missed|risk|constraint)/.test(t)) return "tradeoff";
  if (/(result|experiment|rollout|pilot|business|outcome|evidence)/.test(t)) return "outcome";
  if (/(learning|next|isolate)/.test(t)) return "learning";
  if (/(decision|hypothesis|options|system|built|practice|shipped)/.test(t)) return "decision";
  return "signal";
}

export type TraceStep = { kind: StepKind; label?: string; content: React.ReactNode };

/**
 * Three (or more) steps on one ruled line; stacks with a left rule on narrow
 * screens. `wide` (four steps) stays stacked until desktop width.
 */
export function Trace({ steps, className = "", wide = false }: { steps: readonly TraceStep[]; className?: string; wide?: boolean }) {
  const bp = wide
    ? { ol: "trace-lg lg:grid-flow-col lg:auto-cols-fr lg:gap-8", li: "pl-7 lg:pl-0", mark: "lg:static lg:block", label: "lg:mt-4" }
    : { ol: "trace md:grid-flow-col md:auto-cols-fr md:gap-8", li: "pl-7 md:pl-0", mark: "md:static md:block", label: "md:mt-4" };
  return (
    <ol className={`relative grid ${wide ? "gap-4" : "gap-6"} ${bp.ol} ${className}`}>
      {steps.map((s, i) => (
        <li key={i} className={`relative ${bp.li}`}>
          <span className={`absolute top-[3px] left-0 ${bp.mark}`}><StageMarker kind={s.kind} /></span>
          <p className={`text-[13px] font-medium ${bp.label} ${s.kind === "decision" ? "text-accent" : "text-muted"}`}>{s.label ?? kindLabel[s.kind]}</p>
          <div className="mt-1.5 text-[15px] leading-6 text-ink">{s.content}</div>
        </li>
      ))}
    </ol>
  );
}
