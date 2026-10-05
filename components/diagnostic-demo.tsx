"use client";

import { useEffect, useRef, useState } from "react";

const questions = [
  {
    skill: "Fractions",
    gap: "Fractions with unlike denominators",
    prompt: "A student gets 3 out of 5 fraction questions correct, then misses a question involving unlike denominators. What should the next practice focus on?",
    options: [
      { label: "More unlike-denominator practice", value: "gap" },
      { label: "Move immediately to advanced fractions", value: "advance" },
      { label: "Repeat the same question", value: "repeat" },
    ],
  },
  {
    skill: "Algebra",
    gap: "Algebraic simplification",
    prompt: "A learner solves linear equations correctly but repeatedly makes sign errors when simplifying expressions. What is the best next step?",
    options: [
      { label: "Targeted simplification practice", value: "gap" },
      { label: "Skip algebra and move to geometry", value: "skip" },
      { label: "Give a full advanced algebra test", value: "test" },
    ],
  },
  {
    skill: "Confidence",
    gap: "Independent problem-solving confidence",
    prompt: "A learner answers correctly but takes much longer than expected and requests hints frequently. How should the system respond?",
    options: [
      { label: "Reduce difficulty and add guided practice", value: "support" },
      { label: "Increase difficulty immediately", value: "advance" },
      { label: "Ignore the behavioral signal", value: "ignore" },
    ],
  },
] as const;

const aligned = (v: string) => v === "gap" || v === "support";
type Confidence = "Low" | "Medium" | "High";

function diagnose(answers: string[]) {
  const agree = answers.filter(aligned).length;
  const gaps = questions.filter((_, i) => aligned(answers[i] ?? "")).map((q) => q.gap);
  if (agree === 3) {
    return { level: "Targeted support", confidence: "High" as Confidence, gaps, next: "A short, targeted practice set with worked examples followed by a re-check." };
  }
  if (agree === 2) {
    return { level: "Targeted support", confidence: "Medium" as Confidence, gaps, next: "Targeted practice on the two consistent signals, then a re-check before widening the plan." };
  }
  return {
    level: "Hold: gather more evidence",
    confidence: "Low" as Confidence,
    gaps: ["Needs more evidence across core skills", "Confidence signal needs another observation"],
    next: "Collect another small evidence set before changing the learner's path.",
  };
}

/**
 * The prototype is framed as a product surface, not a quiz: the output shows
 * its evidence, states its confidence honestly, degrades to "ask a human" when
 * evidence is thin, and lets the educator override: the AI UX principles in practice.
 */
export function DiagnosticDemo() {
  const [phase, setPhase] = useState<"intro" | "question" | "result">("intro");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [review, setReview] = useState<"pending" | "accepted" | "overridden">("pending");
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the new step's heading so keyboard and screen-reader users follow the flow.
  useEffect(() => {
    if (phase !== "intro") headingRef.current?.focus();
  }, [phase, index]);

  function choose(value: string) {
    const next = [...answers.slice(0, index), value];
    setAnswers(next);
    if (index === questions.length - 1) setPhase("result");
    else setIndex(index + 1);
  }

  function back() {
    if (index === 0) setPhase("intro");
    else setIndex(index - 1);
  }

  function reset() {
    setPhase("intro");
    setIndex(0);
    setAnswers([]);
    setReview("pending");
  }

  const result = diagnose(answers);

  return (
    <div className="overflow-hidden rounded-lg border border-ink/80 bg-panel">
      {/* App chrome: signals this is a product surface with a clear mode. */}
      <div className="flex items-center justify-between gap-3 border-b border-line bg-background px-5 py-3">
        <p className="text-sm font-medium text-ink">Learner Diagnostic</p>
        <p className="inline-flex items-center gap-2 rounded-sm border border-line px-2 py-1 text-[13px] text-muted">
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-data-muted" />
          Demo mode · deterministic
        </p>
      </div>

      <div className="p-5 sm:p-8">
        {phase === "intro" ? (
          <div className="fade-up">
            <p className="text-[13px] font-semibold text-accent">Try it · 3 signals, ~1 minute</p>
            <h3 className="mt-3 font-serif text-3xl leading-tight text-ink">See the diagnostic loop, not just the architecture.</h3>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted">
              Answer three representative learner-signal questions. The prototype turns those signals into a transparent diagnosis, states how confident it is, and hands the final call to the educator.
            </p>
            <p className="mt-4 max-w-xl text-[13px] leading-5 text-muted">
              This is the rules-only baseline, not an LLM and not a claim of model performance. A model-based version would add retrieval and a model for diagnosis, and would have to beat this baseline on the evaluation first.
            </p>
            <button type="button" onClick={() => setPhase("question")} className="group mt-7 inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-sm text-panel transition-colors hover:bg-accent">
              Start diagnostic <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        ) : null}

        {phase === "question" ? (
          <div key={index} className="fade-up">
            <ol aria-label="Progress" className="grid grid-cols-3 gap-2">
              {questions.map((q, i) => (
                <li key={q.skill} aria-current={i === index ? "step" : undefined}>
                  <span className={`block h-1 rounded-full transition-colors ${i <= index ? "bg-accent" : "bg-data-track"}`} />
                  <span className={`mt-2 block text-[13px] ${i === index ? "text-ink" : "text-subtle"}`}>{i + 1}. {q.skill}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 text-[13px] font-semibold text-accent">Learner signal · {index + 1} of {questions.length}</p>
            <h3 ref={headingRef} tabIndex={-1} className="mt-3 font-serif text-2xl leading-snug text-ink outline-none sm:text-3xl">{questions[index].prompt}</h3>
            <div role="group" aria-label="Choose a response" className="mt-7 grid gap-2.5">
              {questions[index].options.map((o, oi) => {
                const picked = answers[index] === o.value;
                return (
                  <button
                    key={o.value}
                    type="button"
                    onClick={() => choose(o.value)}
                    className={`group flex items-center gap-4 rounded-lg border px-4 py-3.5 text-left text-sm leading-6 transition-colors ${picked ? "border-accent bg-accent-soft text-ink" : "border-line bg-background text-ink hover:border-ink"}`}
                  >
                    <span aria-hidden className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line-strong tabular-nums text-[13px] text-muted group-hover:border-ink">{String.fromCharCode(65 + oi)}</span>
                    {o.label}
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={back} className="mt-6 text-sm text-muted hover:text-ink">← Back</button>
          </div>
        ) : null}

        {phase === "result" ? (
          <div className="fade-up grid gap-6">
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div>
                <p className="text-[13px] font-semibold text-accent">Diagnostic output</p>
                <h3 ref={headingRef} tabIndex={-1} className="mt-2 font-serif text-3xl leading-tight text-ink outline-none">{result.level}</h3>
              </div>
              <ConfidenceMeter level={result.confidence} />
            </div>

            {result.confidence === "Low" ? (
              <p role="note" className="rounded-lg border border-line-strong bg-background px-4 py-3 text-sm leading-6 text-ink">
                <span aria-hidden className="mr-2">⚠</span>
                Evidence is inconsistent, so the system does not guess. It holds the current path and asks the educator to decide.
              </p>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <section aria-label="Why this diagnosis" className="rounded-lg border border-line bg-background p-5">
                <p className="text-[13px] font-medium text-muted">Why: the evidence used</p>
                <ul className="mt-3 grid gap-3">
                  {questions.map((q, i) => {
                    const ok = aligned(answers[i] ?? "");
                    const label = q.options.find((o) => o.value === answers[i])?.label;
                    return (
                      <li key={q.skill} className="grid grid-cols-[1.25rem_1fr] gap-2 text-sm leading-5">
                        <span aria-hidden className={ok ? "text-accent" : "text-subtle"}>{ok ? "●" : "○"}</span>
                        <span>
                          <span className="text-ink">{q.skill}:</span> <span className="text-muted">{label}</span>
                          <span className="mt-0.5 block text-[13px] text-subtle">{ok ? "Consistent with the signal" : "Conflicts with the signal, so confidence drops"}</span>
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </section>
              <div className="grid gap-4">
                <section aria-label="Detected gaps" className="rounded-lg border border-line bg-background p-5">
                  <p className="text-[13px] font-medium text-muted">Detected gaps</p>
                  <ul className="mt-3 grid gap-1.5 text-sm leading-6 text-ink">{result.gaps.map((g) => <li key={g}>· {g}</li>)}</ul>
                </section>
                <section aria-label="Next-best action" className="rounded-lg border border-accent/30 bg-accent-soft/60 p-5">
                  <p className="text-[13px] font-semibold text-accent">Next-best action</p>
                  <p className="mt-2 text-sm leading-6 text-ink">{result.next}</p>
                </section>
              </div>
            </div>

            {/* Human in the loop: the AI proposes, the educator disposes. */}
            <div className="flex flex-col gap-4 border-t border-line pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div aria-live="polite" className="text-sm text-muted">
                {review === "pending" ? "Educator review: accept the plan or override it." : null}
                {review === "accepted" ? <span className="text-ink">✓ Plan accepted. The learner receives the next step (demo).</span> : null}
                {review === "overridden" ? <span className="text-ink">↺ Override logged. It becomes an evaluation case for the next iteration.</span> : null}
              </div>
              <div className="flex flex-wrap gap-2">
                {review === "pending" ? (
                  <>
                    <button type="button" onClick={() => setReview("accepted")} className="h-10 rounded-md bg-ink px-4 text-sm text-panel transition-colors hover:bg-accent">Accept plan</button>
                    <button type="button" onClick={() => setReview("overridden")} className="h-10 rounded-md border border-line-strong px-4 text-sm text-ink transition-colors hover:border-ink">Override</button>
                  </>
                ) : null}
                <button type="button" onClick={reset} className="h-10 rounded-md px-4 text-sm text-muted transition-colors hover:text-ink">Run again</button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function ConfidenceMeter({ level }: { level: Confidence }) {
  const steps: Confidence[] = ["Low", "Medium", "High"];
  const n = steps.indexOf(level) + 1;
  return (
    <div className="min-w-[10rem]">
      <p className="text-[13px] font-medium text-muted">Confidence: <span className="font-medium text-ink">{level}</span></p>
      <div aria-hidden className="mt-2 grid grid-cols-3 gap-[2px]">
        {steps.map((s, i) => <span key={s} className={`h-1.5 first:rounded-l-full last:rounded-r-full ${i < n ? "bg-accent" : "bg-data-track"}`} />)}
      </div>
    </div>
  );
}
