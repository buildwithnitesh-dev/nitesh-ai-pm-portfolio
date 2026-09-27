"use client";

import { useId, useState } from "react";
import { EvidenceTag } from "@/components/ui";

type ScenarioId = "struggling" | "on-track" | "ready";

const scenarios: { id: ScenarioId; label: string; state: string; decision: string; why: string }[] = [
  {
    id: "struggling",
    label: "Struggling",
    state: "below",
    decision: "support",
    why: "Repeated misses and heavy hint use suggest the task is above current readiness. Pushing ahead risks frustration and drop-off, so the system adds support before raising difficulty.",
  },
  {
    id: "on-track",
    label: "On track",
    state: "at",
    decision: "hold",
    why: "Steady completion at the expected pace. Adapting here would add unpredictability without adding value — the stable default is the better product decision.",
  },
  {
    id: "ready",
    label: "Ahead",
    state: "above",
    decision: "stretch",
    why: "Fast, accurate completion without hints suggests more of the same has low learning value. A harder task keeps the next step meaningful.",
  },
];

const stages = [
  { title: "Learner signal", layer: "Input", nodes: [{ id: "signal", label: "Attempts, hints, time on task", always: true }] },
  { title: "Readiness", layer: "Layer 1 · state", nodes: [
    { id: "below", label: "Below readiness" },
    { id: "at", label: "At readiness" },
    { id: "above", label: "Above readiness" },
  ] },
  { title: "Next-best assignment", layer: "Layer 2 · decision", nodes: [
    { id: "support", label: "Support — worked example, smaller step" },
    { id: "hold", label: "Hold — continue planned sequence" },
    { id: "stretch", label: "Stretch — introduce a harder task" },
  ] },
  { title: "Feedback", layer: "Layer 3 · feedback", nodes: [{ id: "recheck", label: "Re-check progress → feeds next decision", always: true }] },
];

/**
 * An interactive, illustrative model of the adaptive decision logic.
 * Choosing a learner scenario traces one path, so the reader sees the system
 * make a decision instead of reading a description of it.
 */
export function DecisionTree() {
  const [scenario, setScenario] = useState<ScenarioId>("struggling");
  const group = useId();
  const current = scenarios.find((s) => s.id === scenario)!;
  const onPath = (id: string, always?: boolean) => always || id === current.state || id === current.decision;

  return (
    <figure aria-label="Adaptive assignment decision tree" className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-ink">Trace a decision</p>
          <p className="mt-1 text-sm text-muted">Pick a learner. Watch the path the system takes.</p>
        </div>
        <EvidenceTag kind="illustrative" />
      </div>

      <fieldset className="mt-5">
        <legend className="sr-only">Learner scenario</legend>
        <div className="grid grid-cols-3 gap-1 rounded-2xl border border-line bg-background p-1 sm:inline-grid sm:rounded-full">
          {scenarios.map((s) => (
            <label key={s.id} className="relative cursor-pointer text-center">
              <input
                type="radio"
                name={group}
                value={s.id}
                checked={scenario === s.id}
                onChange={() => setScenario(s.id)}
                className="peer sr-only"
              />
              <span className="block rounded-xl px-2 py-2 text-xs text-muted sm:rounded-full sm:px-4 sm:text-sm transition-colors peer-checked:bg-ink peer-checked:text-panel peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:text-ink peer-checked:hover:text-panel">
                {s.label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <ol className="mt-7 grid gap-3 lg:grid-cols-4 lg:gap-0">
        {stages.map((stage, i) => (
          <li key={stage.title} className="relative lg:pr-6">
            <p className="font-mono text-[10px] tracking-[0.12em] whitespace-nowrap text-subtle uppercase">{stage.layer}</p>
            <p className="mt-1 text-sm font-medium text-ink">{stage.title}</p>
            <ul className="mt-3 grid gap-2">
              {stage.nodes.map((n) => {
                const on = onPath(n.id, "always" in n ? n.always : false);
                return (
                  <li
                    key={n.id}
                    aria-current={on ? "step" : undefined}
                    className={`rounded-md border px-3 py-2.5 text-sm leading-5 transition-all duration-300 ${
                      on ? "border-accent bg-accent text-panel shadow-[0_6px_20px_-12px_var(--accent)]" : "border-line bg-background text-subtle"
                    }`}
                  >
                    {n.label}
                  </li>
                );
              })}
            </ul>
            {i < stages.length - 1 ? (
              <span aria-hidden className="mt-2 block text-center text-subtle lg:absolute lg:top-1/2 lg:right-1 lg:mt-0 lg:translate-y-1">
                <span className="lg:hidden">↓</span><span className="hidden lg:inline">→</span>
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <div aria-live="polite" className="mt-6 grid gap-2 border-t border-line pt-5 sm:grid-cols-[9rem_1fr]">
        <p className="text-xs tracking-[0.16em] text-muted uppercase">Why this path</p>
        <p key={current.id} className="fade-up text-sm leading-6 text-ink">{current.why}</p>
      </div>
      <figcaption className="mt-5 text-xs leading-5 text-muted">
        Illustrative model of the three-layer logic — learner state, next-best decision, feedback. In production, the engine used an LLM API to adjust question difficulty from student performance history; exact signals, thresholds, and implementation details are confidential and omitted.
      </figcaption>
    </figure>
  );
}
