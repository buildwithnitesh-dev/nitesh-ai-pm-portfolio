import { CaseStudyShell, Chapter, Prose } from "@/components/case-study/shell";
import { DiagnosticDemo } from "@/components/diagnostic-demo";
import { EvidenceTag, StatusLabel, StatusMark } from "@/components/ui";
import { aiLearnerDiagnostic, buildSpec, evalMetrics, type BuildStatus } from "@/content/ai-diagnostic";

const toc = [
  { id: "status", label: "Build status" },
  { id: "baseline", label: "Baseline" },
  { id: "rules-vs-model", label: "Rules vs. model" },
  { id: "failure-modes", label: "Failure modes" },
  { id: "evaluation", label: "Evaluation" },
  { id: "launch", label: "Launch gate" },
] as const;

const statusOrder: BuildStatus[] = ["Implemented", "Designed", "Planned", "Not yet tested"];

export function AiLearnerDiagnosticPage() {
  const c = aiLearnerDiagnostic;
  const s = c.sections;
  return (
    <CaseStudyShell
      meta={{
        type: c.type,
        title: c.title,
        subtitle: c.subtitle,
        focus: c.focus,
        outcome: c.status,
        evidence: "prototype",
        note: "Independent portfolio project, not shipped at any employer. The interactive demo is the rules-only baseline, not an LLM. No real-user adoption, model accuracy or production results are claimed.",
      }}
      tldr={c.tldr}
      toc={toc}
    >
      <Chapter id="status" index={1} label="Build status">
        <Prose eyebrow="Where the build stands" title="Built, designed, planned, untested." body={["Every part of the product, with an honest status. Only the first group is working code; the last has never been run."]} />
        <BuildSpec />
      </Chapter>

      <Chapter id="baseline" index={2} label="Baseline">
        <Prose eyebrow="Rules-only baseline" title="The bar any model has to beat." body={["This demo runs on deterministic rules, not a model. Choose answers that ignore the learner signal and watch it react: confidence drops, the evidence shows why, and at low confidence it holds the learner's path instead of guessing."]} />
        <DiagnosticDemo />
      </Chapter>

      <Chapter id="rules-vs-model" index={3} label="Rules vs. model">
        <Prose eyebrow="The first decision" title="Where rules win, and where a model earns its place." body={s.rules.slice(1)} />
        <RulesSplit />
      </Chapter>

      <Chapter id="failure-modes" index={4} label="Failure modes">
        <Prose eyebrow="Failure modes" title="What happens when it's wrong." body={s.failure.slice(1)} />
        <FailureTable />
      </Chapter>

      <Chapter id="evaluation" index={5} label="Evaluation">
        <Prose eyebrow="Evaluation" title="The harness exists. The run doesn't, yet." body={["The schema, ten synthetic cases and a runner are in the repository. The runner refuses to run without an API key, has no default model, and writes results only from real model calls. Every expected label is a draft until an educator reviews it."]} />
        <EvalMetrics />
      </Chapter>

      <Chapter id="launch" index={6} label="Launch gate">
        <Prose eyebrow="Launch gate" title="A gate, not a date." body={s.launch.slice(1)} />
        <LaunchGate />
      </Chapter>
    </CaseStudyShell>
  );
}

/** The build spec, grouped by status so planned work never reads like working code. */
function BuildSpec() {
  return (
    <div className="grid gap-6">
      {statusOrder.map((st) => {
        const rows = buildSpec.filter((x) => x.status === st);
        const solid = st === "Implemented" || st === "Designed";
        return (
          <section key={st} aria-label={st}>
            <StatusLabel status={st} />
            <ul className={`mt-3 grid gap-px overflow-hidden rounded-xl ${solid ? "border border-line bg-line" : "border border-dashed border-line-strong"}`}>
              {rows.map((r) => (
                <li key={r.part} className={`grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr] sm:gap-6 ${solid ? "bg-panel" : ""}`}>
                  <p className={`text-sm font-medium ${solid ? "text-ink" : "text-muted"}`}>{r.part}</p>
                  <p className={`text-sm leading-6 ${solid ? "text-ink/85" : "text-muted"}`}>{r.text}</p>
                </li>
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

/** Who does each job: rules, the model, or the teacher. The split is the product decision. */
function RulesSplit() {
  const rows = aiLearnerDiagnostic.split;
  return (
    <div className="rounded-xl border border-line bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
        <p className="text-sm font-medium text-ink">Proposed production split</p>
        <EvidenceTag kind="reasoning" />
      </div>
      <table className="hidden w-full text-left text-sm md:table">
        <caption className="sr-only">Which part of the system owns each job, and why</caption>
        <thead className="text-xs tracking-[0.12em] text-muted uppercase">
          <tr className="border-b border-line">
            <th scope="col" className="px-7 py-3 font-medium">Job</th>
            <th scope="col" className="py-3 pr-6 font-medium">Owner</th>
            <th scope="col" className="py-3 pr-7 font-medium">Why</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.job} className="border-b border-line/70 align-top last:border-0">
              <th scope="row" className="px-7 py-4 font-medium text-ink">{r.job}</th>
              <td className="py-4 pr-6"><Owner owner={r.owner} /></td>
              <td className="py-4 pr-7 leading-6 text-muted">{r.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <ul className="divide-y divide-line md:hidden">
        {rows.map((r) => (
          <li key={r.job} className="px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <p className="text-sm font-medium text-ink">{r.job}</p>
              <Owner owner={r.owner} />
            </div>
            <p className="mt-1 text-sm leading-6 text-muted">{r.why}</p>
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-5 py-4 text-xs leading-5 text-muted sm:px-7">In the prototype every row runs on deterministic rules, so the demo is reliable and inspectable. This table is the proposed production split.</p>
    </div>
  );
}

const ownerTone: Record<string, string> = {
  Rules: "border-line-strong text-ink",
  Model: "border-accent bg-accent text-panel",
  "Model + bank": "border-accent text-accent",
  Teacher: "border-ink bg-ink text-panel",
};

function Owner({ owner }: { owner: string }) {
  return <span className={`inline-flex shrink-0 rounded-full border px-2.5 py-0.5 text-xs whitespace-nowrap ${ownerTone[owner]}`}>{owner}</span>;
}

/** Failure → how it shows up → how it is caught → what the product does instead. */
function FailureTable() {
  const rows = aiLearnerDiagnostic.failures;
  return (
    <div className="rounded-xl border border-line bg-panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 sm:px-7">
        <p className="text-sm font-medium text-ink">Failure modes, designed before the happy path</p>
        <EvidenceTag kind="reasoning" />
      </div>
      <ol className="divide-y divide-line">
        {rows.map((r, i) => (
          <li key={r.failure} className="grid gap-3 px-5 py-5 sm:px-7 md:grid-cols-[13rem_1fr_1fr] md:gap-8">
            <div>
              <p className="font-mono text-[11px] text-subtle">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-serif text-xl leading-snug text-ink">{r.failure}</p>
              <p className="mt-1 text-xs leading-5 text-muted">Looks like: {r.looks}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">Caught by</p>
              <p className="mt-1 text-sm leading-6 text-ink/85">{r.detect}</p>
            </div>
            <div>
              <p className="font-mono text-[11px] tracking-[0.14em] text-accent uppercase">Product does instead</p>
              <p className="mt-1 text-sm leading-6 text-ink">{r.fallback}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** What the harness scores today, and what still needs a person. Nothing here has been run against a model. */
function EvalMetrics() {
  return (
    <div className="rounded-xl border border-line bg-panel">
      <ul className="divide-y divide-line">
        {evalMetrics.map((m) => (
          <li key={m.metric} className="grid gap-1 px-5 py-4 sm:grid-cols-[11rem_1fr_auto] sm:items-baseline sm:gap-6 sm:px-7">
            <p className="text-sm font-medium text-ink">{m.metric}</p>
            <p className="text-sm leading-6 text-muted">{m.how}</p>
            <span className="inline-flex items-center gap-2 text-xs whitespace-nowrap text-muted"><StatusMark status={m.status} />{m.status === "Implemented" ? "Scored by the harness" : "Needs an educator"}</span>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-2 border-t border-line px-5 py-4 text-xs leading-5 text-muted sm:px-7"><StatusMark status="Not yet tested" />No model has been run through it yet, so there are no results.</p>
    </div>
  );
}

function LaunchGate() {
  const checks = [
    "Quality thresholds met across representative evaluation cases, not a handful of demo prompts",
    "No harmful or overconfident outputs in the failure-category review",
    "Latency and cost viable at every learner checkpoint",
    "Measurable improvement over a credible non-AI baseline",
  ];
  return (
    <div className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <p className="text-sm font-medium text-ink">Launch gate: all four must hold</p>
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
