import { CaseStudyShell, Chapter, Prose, PullQuote } from "@/components/case-study/shell";
import { DiagnosticDemo } from "@/components/diagnostic-demo";
import { EvidenceTag } from "@/components/ui";
import { LoopDiagram } from "@/components/viz/loop-diagram";
import { aiLearnerDiagnostic } from "@/content/case-studies";
import { aiLoop } from "@/content/portfolio";

const toc = [
  { id: "why-ai", label: "Why AI" },
  { id: "journey", label: "User journey" },
  { id: "prototype", label: "Prototype" },
  { id: "system", label: "System design" },
  { id: "evaluation", label: "Evaluation" },
  { id: "guardrails", label: "Guardrails" },
  { id: "launch", label: "Launch criteria" },
] as const;

export function AiLearnerDiagnosticPage() {
  const c = aiLearnerDiagnostic;
  const s = c.sections;
  return (
    <CaseStudyShell
      meta={{
        slug: "ai-learner-diagnostic",
        type: c.type,
        title: c.title,
        subtitle: c.subtitle,
        focus: c.focus,
        outcome: c.status,
        evidence: "prototype",
        note: "Independent portfolio project. The interactive demo uses deterministic logic so the experience is reliable and transparent; no real-user adoption or model-performance results are claimed.",
      }}
      tldr={c.tldr}
      toc={toc}
    >
      <Chapter id="why-ai" index={1} label="Why AI">
        <Prose eyebrow="Framing" title="Problem first, model second." body={[s.whyAi[1]]} />
      </Chapter>

      <Chapter id="journey" index={2} label="User journey">
        <Prose eyebrow="Journey" title="A loop, not a one-shot answer." body={[s.journey[1], "Each step is a product surface with its own failure mode — which is why evaluation and explanation are steps in the loop, not afterthoughts."]} />
        <div className="rounded-xl border border-line bg-panel p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-ink">The diagnostic loop</p>
            <EvidenceTag kind="reasoning" />
          </div>
          <div className="mt-6"><LoopDiagram steps={aiLoop} label="The diagnostic loop" /></div>
        </div>
      </Chapter>

      <Chapter id="prototype" index={3} label="Prototype">
        <Prose eyebrow="Interactive prototype" title="Run it. Then try to break its confidence." body={["Choose answers that ignore the learner signal and watch the output change: confidence drops, the evidence trace shows why, and at low confidence the system stops guessing and hands the decision to the educator."]} />
        <DiagnosticDemo />
      </Chapter>

      <Chapter id="system" index={4} label="System design">
        <Prose eyebrow="System thinking" title="Where the model sits — and where it doesn’t." body={[s.system[1]]} />
        <SystemMap />
      </Chapter>

      <Chapter id="evaluation" index={5} label="Evaluation">
        <Prose eyebrow="Evaluation" title="Evaluation is a product practice." body={[s.evaluation[1]]} />
        <Rubric />
      </Chapter>

      <Chapter id="guardrails" index={6} label="Guardrails">
        <Prose eyebrow="Guardrails" title="Designing for uncertainty." body={[s.guardrails[1]]} />
        <GuardrailPatterns />
      </Chapter>

      <Chapter id="launch" index={7} label="Launch criteria">
        <Prose eyebrow="Launch criteria" title="A gate, not a date." body={[s.launch[1]]} />
        <LaunchGate />
        <PullQuote>Ship when it beats a credible non-AI baseline — not when the demo looks good.</PullQuote>
        <div className="rounded-xl border border-line p-6 sm:p-8">
          <p className="text-xs tracking-[0.18em] text-accent uppercase">Product PM lens</p>
          <p className="mt-3 text-base leading-8 text-muted">The prototype demonstrates the product loop and decision design. The interactive demo uses deterministic logic so the experience is reliable and transparent; a production version would connect the same product flow to an LLM, curated retrieval, evaluation datasets, and human controls. No real-user adoption or model-performance results are claimed.</p>
        </div>
      </Chapter>
    </CaseStudyShell>
  );
}

function SystemMap() {
  const layers = aiLearnerDiagnostic.system;
  return (
    <figure aria-label="Proposed system architecture" className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-hidden className="text-sm font-medium text-ink">Proposed production architecture</p>
        <EvidenceTag kind="illustrative" />
      </div>
      <ol className="mt-6 grid gap-2">
        {layers.map((l, i) => {
          const model = l.layer === "Reasoning";
          return (
            <li key={l.layer} className="grid gap-3 sm:grid-cols-[8.5rem_1fr]">
              <p className="pt-3 font-mono text-[11px] tracking-wide text-muted uppercase">{String(i + 1).padStart(2, "0")} · {l.layer}</p>
              <div className={`rounded-lg border px-4 py-3 ${model ? "border-accent bg-accent text-panel" : "border-line bg-background"}`}>
                <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {l.items.map((it) => <li key={it} className={`before:mr-5 before:opacity-50 before:content-['·'] first:before:hidden ${model ? "" : "text-ink"}`}>{it}</li>)}
                </ul>
              </div>
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-5 flex items-start gap-2 text-xs leading-5 text-muted">
        <span aria-hidden className="text-accent">↺</span>
        The learning loop feeds overrides and evaluation results back into inputs. The model (highlighted) is one layer of five — most product risk lives in the others.
      </figcaption>
    </figure>
  );
}

function Rubric() {
  const rows = aiLearnerDiagnostic.evaluation;
  return (
    <div className="rounded-xl border border-line bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
        <p className="text-sm font-medium text-ink">Pre-launch evaluation rubric</p>
        <EvidenceTag kind="reasoning" />
      </div>
      <table className="hidden w-full text-left text-sm md:table">
        <thead className="text-xs tracking-[0.12em] text-muted uppercase">
          <tr className="border-b border-line">
            <th scope="col" className="px-7 py-3 font-medium">Criterion</th>
            <th scope="col" className="py-3 pr-6 font-medium">The question we test</th>
            <th scope="col" className="py-3 pr-7 font-medium">If it fails</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.criterion} className="border-b border-line/70 align-top last:border-0">
              <th scope="row" className="px-7 py-4 font-medium text-ink">{r.criterion}</th>
              <td className="py-4 pr-6 leading-6 text-muted">{r.question}</td>
              <td className="py-4 pr-7 leading-6 text-ink">{r.risk}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="divide-y divide-line md:hidden">
        {rows.map((r) => (
          <li key={r.criterion} className="px-5 py-4">
            <p className="text-sm font-medium text-ink">{r.criterion}</p>
            <p className="mt-1 text-sm leading-6 text-muted">{r.question}</p>
            <p className="mt-2 text-xs text-ink"><span className="text-muted">If it fails: </span>{r.risk}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Each guardrail shown as the UI a user would actually see — principles made concrete. */
function GuardrailPatterns() {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      <Pattern title="Show the evidence" body="Every diagnosis lists the signals it used, so it can be checked.">
        <div className="flex flex-wrap gap-1.5">
          {["3 of 5 fractions correct", "Repeated sign errors", "Frequent hints"].map((t) => <span key={t} className="rounded-full border border-line bg-panel px-2 py-0.5 text-[11px] text-ink">{t}</span>)}
        </div>
      </Pattern>
      <Pattern title="Honest confidence" body="Uncertainty is stated, never styled away.">
        <div className="flex items-center gap-3">
          <div aria-hidden className="grid w-24 grid-cols-3 gap-[2px]">
            <span className="h-1.5 rounded-l-full bg-accent" /><span className="h-1.5 bg-accent" /><span className="h-1.5 rounded-r-full bg-data-track" />
          </div>
          <span className="text-[11px] text-ink">Medium confidence</span>
        </div>
      </Pattern>
      <Pattern title="Human override" body="The educator makes the final call; overrides are logged as feedback.">
        <div className="flex gap-1.5">
          <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] text-panel">Accept plan</span>
          <span className="rounded-full border border-line-strong px-2.5 py-1 text-[11px] text-ink">Override</span>
        </div>
      </Pattern>
      <Pattern title="Defined failure state" body="When signals are ambiguous, the system holds — it does not guess.">
        <p className="rounded-md border border-line-strong bg-panel px-2.5 py-1.5 text-[11px] text-ink">⚠ Not enough evidence — holding current path</p>
      </Pattern>
    </ul>
  );
}

function Pattern({ title, body, children }: { title: string; body: string; children: React.ReactNode }) {
  return (
    <li className="flex flex-col justify-between gap-5 rounded-xl border border-line bg-panel p-5">
      <div>
        <p className="font-serif text-xl text-ink">{title}</p>
        <p className="mt-1 text-sm leading-6 text-muted">{body}</p>
      </div>
      <div aria-hidden className="rounded-lg border border-dashed border-line-strong bg-background p-3">{children}</div>
    </li>
  );
}

function LaunchGate() {
  const checks = [
    "Quality thresholds met across representative evaluation cases — not a handful of demo prompts",
    "No harmful or overconfident outputs in the failure-category review",
    "Latency and cost viable at every learner checkpoint",
    "Measurable improvement over a credible non-AI baseline",
  ];
  return (
    <div className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <p className="text-sm font-medium text-ink">Launch gate — all must hold</p>
      <ol className="mt-4 grid gap-3">
        {checks.map((c, i) => (
          <li key={c} className="flex gap-3 text-sm leading-6 text-ink">
            <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border border-line-strong font-mono text-[10px] text-muted">{i + 1}</span>
            {c}
          </li>
        ))}
      </ol>
    </div>
  );
}
