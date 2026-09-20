"use client";

import { useMemo, useState } from "react";

const questions = [
  {
    skill: "Fractions",
    prompt: "A student gets 3 out of 5 fraction questions correct, then misses a question involving unlike denominators. What should the next practice focus on?",
    options: [
      { label: "More unlike-denominator practice", value: "gap" },
      { label: "Move immediately to advanced fractions", value: "advance" },
      { label: "Repeat the same question", value: "repeat" },
    ],
  },
  {
    skill: "Algebra",
    prompt: "A learner solves linear equations correctly but repeatedly makes sign errors when simplifying expressions. What is the best next step?",
    options: [
      { label: "Targeted simplification practice", value: "gap" },
      { label: "Skip algebra and move to geometry", value: "skip" },
      { label: "Give a full advanced algebra test", value: "test" },
    ],
  },
  {
    skill: "Confidence",
    prompt: "A learner answers correctly but takes much longer than expected and requests hints frequently. How should the system respond?",
    options: [
      { label: "Reduce difficulty and add guided practice", value: "support" },
      { label: "Increase difficulty immediately", value: "advance" },
      { label: "Ignore the behavioral signal", value: "ignore" },
    ],
  },
];

export function DiagnosticDemo() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [complete, setComplete] = useState(false);

  const result = useMemo(() => {
    const gapSignals = answers.filter((a) => ["gap", "support"].includes(a)).length;
    if (gapSignals >= 2) {
      return {
        level: "Targeted support",
        confidence: "High",
        gaps: ["Fractions with unlike denominators", "Algebraic simplification", "Independent problem-solving confidence"],
        next: "A short, targeted practice set with worked examples followed by a re-check.",
      };
    }
    return {
      level: "Guided practice",
      confidence: "Medium",
      gaps: ["Needs more evidence across core skills", "Confidence signal needs another observation"],
      next: "Collect another small evidence set before changing the learner's path.",
    };
  }, [answers]);

  function choose(value: string) {
    const next = [...answers, value];
    setAnswers(next);
    if (index === questions.length - 1) {
      setComplete(true);
    } else {
      setIndex(index + 1);
    }
  }

  function reset() {
    setStarted(false);
    setIndex(0);
    setAnswers([]);
    setComplete(false);
  }

  if (!started) {
    return (
      <section className="border-y border-line bg-ink py-16 text-panel lg:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent-soft">Interactive prototype</p>
              <h2 className="mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">See the diagnostic loop, not just the architecture.</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-panel/70">Answer three representative learner-signal questions. The prototype turns those signals into a transparent diagnosis and next-best action.</p>
            </div>
            <div className="border border-white/15 bg-white/[0.04] p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-accent-soft">Demo mode</p>
              <p className="mt-3 text-sm leading-7 text-panel/70">This is a deterministic product prototype, not a claim of production model performance. The production architecture described below would use an LLM, retrieval, evaluation data, and human controls.</p>
              <button onClick={() => setStarted(true)} className="mt-6 rounded-full bg-panel px-5 py-3 text-sm font-medium text-ink transition hover:opacity-90">Start diagnostic →</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-y border-line bg-ink py-16 text-panel lg:py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        {!complete ? (
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-accent-soft">
              <span>Diagnostic question {index + 1} / {questions.length}</span>
              <span>{questions[index].skill}</span>
            </div>
            <div className="mt-4 h-1 overflow-hidden rounded-full bg-white/10"><div className="h-full bg-accent-soft transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} /></div>
            <div className="mt-10 border border-white/15 bg-white/[0.04] p-7 sm:p-10">
              <p className="text-xs uppercase tracking-[0.18em] text-accent-soft">Learner signal</p>
              <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{questions[index].prompt}</h2>
              <div className="mt-8 grid gap-3">
                {questions[index].options.map((option) => (
                  <button key={option.value} onClick={() => choose(option.value)} className="border border-white/15 px-5 py-4 text-left text-sm leading-6 text-panel/80 transition hover:border-accent-soft hover:bg-white/[0.06]">{option.label}</button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-accent-soft">Diagnostic output</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight">{result.level}</h2>
              <p className="mt-4 text-sm leading-7 text-panel/70">Confidence: <span className="text-panel">{result.confidence}</span></p>
              <button onClick={reset} className="mt-7 rounded-full border border-white/20 px-5 py-3 text-sm text-panel transition hover:bg-white/[0.06]">Run again</button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border border-white/15 bg-white/[0.04] p-6 sm:col-span-2"><p className="text-xs uppercase tracking-[0.18em] text-accent-soft">Detected gaps</p><ul className="mt-4 space-y-2 text-sm leading-7 text-panel/75">{result.gaps.map((gap) => <li key={gap}>— {gap}</li>)}</ul></div>
              <div className="border border-white/15 bg-white/[0.04] p-6 sm:col-span-2"><p className="text-xs uppercase tracking-[0.18em] text-accent-soft">Next-best action</p><p className="mt-4 text-base leading-7 text-panel/80">{result.next}</p></div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
