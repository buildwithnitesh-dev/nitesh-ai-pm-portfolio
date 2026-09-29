"use client";

import { useId, useState } from "react";
import { EvidenceTag } from "@/components/ui";

/*
 * An illustrative reasoning model, deliberately qualitative. It encodes how I
 * weigh onboarding levers, not historical data, so it never outputs a number.
 */

type Level<T extends string> = { value: T; label: string; hint: string };

const friction: Level<"high" | "medium" | "low">[] = [
  { value: "high", label: "High", hint: "Long setup before any value" },
  { value: "medium", label: "Medium", hint: "Some setup, value in session one" },
  { value: "low", label: "Low", hint: "Value before anything is asked" },
];
const activation: Level<"unclear" | "clear" | "obvious">[] = [
  { value: "unclear", label: "Unclear", hint: "First meaningful action is buried" },
  { value: "clear", label: "Clear", hint: "Findable with a little guidance" },
  { value: "obvious", label: "Obvious", hint: "The path leads straight to it" },
];
const intervention: Level<"none" | "incentives" | "value">[] = [
  { value: "none", label: "None", hint: "No reason to return is designed in" },
  { value: "incentives", label: "Incentives first", hint: "Rewards to bring players back" },
  { value: "value", label: "Value first", hint: "A better experience to return to" },
];
const confidence: Level<"low" | "medium" | "high">[] = [
  { value: "low", label: "Low", hint: "Small sample, no segment read" },
  { value: "medium", label: "Medium", hint: "Clean test, one segment" },
  { value: "high", label: "High", hint: "Well-powered, read by segment" },
];

type State = {
  friction: (typeof friction)[number]["value"];
  activation: (typeof activation)[number]["value"];
  intervention: (typeof intervention)[number]["value"];
  confidence: (typeof confidence)[number]["value"];
};

const problemState: State = { friction: "high", activation: "unclear", intervention: "none", confidence: "medium" };
/** The documented strategy: reduce friction before adding incentives; a clearer first-session path. */
const documentedLevers: Omit<State, "confidence"> = { friction: "low", activation: "clear", intervention: "value" };

const directions = ["Likely decline", "Roughly flat", "Modest lift", "Meaningful lift"] as const;
const directionShort = ["Decline", "Flat", "Modest lift", "Meaningful lift"] as const;

function reason(s: State) {
  const score =
    { high: -2, medium: 0, low: 2 }[s.friction] +
    { unclear: -1, clear: 1, obvious: 2 }[s.activation] +
    { none: 0, incentives: 1, value: 1 }[s.intervention];
  const dir = score <= -1 ? 0 : score <= 1 ? 1 : score <= 3 ? 2 : 3;

  const lever =
    s.friction === "high" ? { name: "Onboarding friction", move: "reduce setup before the first moment of value" }
    : s.activation === "unclear" ? { name: "Activation quality", move: "make the first meaningful action obvious" }
    : s.intervention === "incentives" ? { name: "Retention intervention", move: "shift from incentives to a value-led reason to return" }
    : s.intervention === "none" ? { name: "Retention intervention", move: "design a value-led reason to come back" }
    : s.confidence === "low" ? { name: "Experiment confidence", move: "strengthen the read before scaling" }
    : { name: "No bottleneck left", move: "confirm the lift lasts before scaling further" };

  const durability =
    s.intervention === "incentives" ? "Fragile. The lift may fade when incentives stop, and cost rises."
    : s.intervention === "value" ? "Durable. The reason to return is built into the journey."
    : dir >= 2 ? "Plausible, but nothing yet gives players a reason to come back."
    : "Weak. There is no reason to return yet.";

  const read = { low: "Directional only", medium: "Credible for the tested segment", high: "Strong enough to scale" }[s.confidence];

  const decision =
    dir === 0 ? { call: "Don’t ship", why: "Expected direction is negative. Go back to the funnel diagnosis before building more." }
    : dir === 1 ? { call: "Iterate", why: "The change isn’t expected to move behavior yet. Work on the bottleneck lever first." }
    : s.confidence === "low" ? { call: "Test further", why: "The direction looks right, but the read is too weak to scale. Extend the test and read it by segment." }
    : s.intervention === "incentives" ? { call: "Iterate", why: "The lift leans on incentives. Fix the journey before paying for retention." }
    : s.confidence === "medium" ? { call: "Ship to the tested segment", why: "Direction and read agree for this segment. Expand once other segments confirm." }
    : { call: "Ship and scale", why: "Direction, durability, and confidence agree. Keep a holdout to confirm the lift lasts." };

  return { dir, lever, durability, read, decision };
}

/**
 * Problem → lever → hypothesis → expected direction → decision.
 * Visitors change qualitative levers and watch the reasoning update.
 */
export function DecisionSimulator() {
  const [s, setS] = useState<State>(problemState);
  const r = reason(s);
  const set = <K extends keyof State>(k: K, v: State[K]) => setS((p) => ({ ...p, [k]: v }));
  const mirrorsDocumented = s.friction === documentedLevers.friction && s.activation === documentedLevers.activation && s.intervention === documentedLevers.intervention;

  return (
    <figure aria-label="Illustrative product decision simulator" className="overflow-hidden rounded-2xl border border-line bg-panel">
      {/* The label comes first and stays visible: this is not historical performance. */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-background px-5 py-3 sm:px-7">
        <p className="text-sm font-medium text-ink">Onboarding decision model</p>
        <p className="inline-flex items-center gap-2 text-xs text-ink">
          <EvidenceTag kind="illustrative" />
          <span className="font-medium">Not historical performance</span>
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.15fr]">
        <div className="border-b border-line p-5 sm:p-7 lg:border-r lg:border-b-0">
          <p className="font-mono text-[11px] tracking-wide text-muted uppercase">Levers</p>
          <div className="mt-4 grid gap-6">
            <LeverGroup label="Onboarding friction" levels={friction} value={s.friction} onChange={(v) => set("friction", v)} />
            <LeverGroup label="Activation quality" levels={activation} value={s.activation} onChange={(v) => set("activation", v)} />
            <LeverGroup label="Retention intervention" levels={intervention} value={s.intervention} onChange={(v) => set("intervention", v)} />
            <LeverGroup label="Experiment confidence" levels={confidence} value={s.confidence} onChange={(v) => set("confidence", v)} />
          </div>
          <div className="mt-7 flex flex-wrap gap-2 border-t border-line pt-5">
            <button type="button" onClick={() => setS(problemState)} className="h-9 rounded-full border border-line-strong px-4 text-xs text-ink transition-colors hover:border-ink">
              Reset to the problem state
            </button>
            <button
              type="button"
              aria-pressed={mirrorsDocumented}
              onClick={() => setS((p) => ({ ...p, ...documentedLevers }))}
              className="h-9 rounded-full border border-line-strong px-4 text-xs text-ink transition-colors hover:border-ink aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent"
            >
              Apply the documented strategy
            </button>
          </div>
          <p className="mt-3 text-xs leading-5 text-muted">
            “Documented strategy” sets the levers the case study describes: reduce friction before adding incentives, and clarify the first-session path. The result shown is still illustrative.
          </p>
        </div>

        <div aria-live="polite" className="p-5 sm:p-7">
          <p className="font-mono text-[11px] tracking-wide text-muted uppercase">Reasoning</p>
          <ol className="mt-4">
            <Step n={1} title="Problem">
              New players lose momentum before they reach the first meaningful action.
            </Step>
            <Step n={2} title="Lever">
              <span className="font-medium text-ink">{r.lever.name}</span>: {r.lever.move}.
            </Step>
            <Step n={3} title="Hypothesis">
              {r.lever.name === "No bottleneck left"
                ? "If the journey stays as is, the lift should persist past the first week, confirmed against a holdout and read by segment."
                : `If we ${r.lever.move}, then more new players should reach the first meaningful action and return in their first week, read by Day-7 retention and by segment.`}
            </Step>
            <Step n={4} title="Expected direction">
              <DirectionScale dir={r.dir} />
              <dl className="mt-3 grid gap-1 text-xs sm:grid-cols-[6.5rem_1fr]">
                <dt className="text-muted">Durability</dt><dd className="text-ink">{r.durability}</dd>
                <dt className="text-muted">Read quality</dt><dd className="text-ink">{r.read}</dd>
              </dl>
            </Step>
            <Step n={5} title="Decision" last>
              <span key={r.decision.call} className="fade-up inline-flex rounded-full bg-ink px-3 py-1 text-sm text-panel">{r.decision.call}</span>
              <span className="mt-2 block">{r.decision.why}</span>
            </Step>
          </ol>
        </div>
      </div>

      <figcaption className="border-t border-line bg-background px-5 py-4 text-xs leading-5 text-muted sm:px-7">
        <span className="font-medium text-ink">Illustrative model, not historical performance.</span>{" "}
        Historical outcomes shown elsewhere in this portfolio are documented results. This simulator is only an interactive illustration of how I reason about product levers; it has no data behind it and produces no numbers.
      </figcaption>
    </figure>
  );
}

function LeverGroup<T extends string>({ label, levels, value, onChange }: { label: string; levels: Level<T>[]; value: T; onChange: (v: T) => void }) {
  const name = useId();
  const current = levels.find((l) => l.value === value)!;
  return (
    <fieldset>
      <legend className="flex w-full items-baseline justify-between gap-3 text-sm text-ink">
        {label}
      </legend>
      <div className="mt-2 grid grid-cols-3 gap-1 rounded-xl border border-line bg-background p-1">
        {levels.map((l) => (
          <label key={l.value} className="cursor-pointer text-center">
            <input type="radio" name={name} value={l.value} checked={value === l.value} onChange={() => onChange(l.value)} className="peer sr-only" />
            <span className="block rounded-lg px-2 py-2 text-xs text-muted transition-colors peer-checked:bg-ink peer-checked:text-panel peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-accent hover:text-ink peer-checked:hover:text-panel">
              {l.label}
            </span>
          </label>
        ))}
      </div>
      <p className="mt-1.5 text-xs text-muted">{current.hint}</p>
    </fieldset>
  );
}

function Step({ n, title, children, last }: { n: number; title: string; children: React.ReactNode; last?: boolean }) {
  return (
    <li className="relative grid grid-cols-[2rem_1fr] gap-3 pb-6 last:pb-0">
      {!last ? <span aria-hidden className="absolute top-7 bottom-1 left-[11px] w-px bg-line-strong" /> : null}
      <span aria-hidden className="flex h-6 w-6 items-center justify-center rounded-full border border-line-strong bg-background font-mono text-[10px] text-muted">{n}</span>
      <div>
        <p className="text-xs font-medium tracking-[0.14em] text-accent uppercase">{title}</p>
        <div className="mt-1.5 text-sm leading-6 text-muted">{children}</div>
      </div>
    </li>
  );
}

/** A qualitative, ordered scale: four states, no values, no axis. */
function DirectionScale({ dir }: { dir: number }) {
  return (
    <div>
      <p className="text-sm font-medium text-ink">{directions[dir]} <span className="font-normal text-muted">in early retention</span></p>
      <div role="img" aria-label={`Expected direction: ${directions[dir]}`} className="mt-2 grid grid-cols-4 gap-[2px]">
        {directions.map((d, i) => (
          <span
            key={d}
            className={`h-2 transition-colors duration-300 first:rounded-l-full last:rounded-r-full ${i === dir ? (dir === 0 ? "bg-ink" : "bg-accent") : "bg-data-track"}`}
          />
        ))}
      </div>
      <div aria-hidden className="mt-1 hidden grid-cols-4 text-[10px] text-muted sm:grid">
        {directionShort.map((d, i) => <span key={d} className={i === dir ? "text-ink" : ""}>{d}</span>)}
      </div>
    </div>
  );
}
