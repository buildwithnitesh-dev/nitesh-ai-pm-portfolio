const steps = ["User signal", "Problem", "Hypothesis", "Product", "Experiment", "Impact"] as const;

/**
 * How the work above was produced, drawn as a quiet system diagram under the
 * metric card: the loop ends at Impact, which ties up to the numbers, and
 * returns to the next user signal.
 */
export function ThinkingLoop() {
  return (
    <figure aria-label="How I work: user signal, problem, hypothesis, product, experiment, impact — then learn and repeat" className="mt-6">
      {/* Phones: one wrapped line — a diagram this small would not be legible. */}
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] tracking-wide text-muted uppercase sm:hidden">
        {steps.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={i === steps.length - 1 ? "text-accent" : ""}>{s}</span>
            {i < steps.length - 1 ? <span aria-hidden className="text-line-strong">→</span> : <span aria-hidden className="text-accent">↺</span>}
          </li>
        ))}
      </ol>

      {/* Wider screens: nodes on a hairline, with the return path underneath. */}
      <div aria-hidden className="relative hidden px-3 sm:block">
        <span className="absolute top-[5px] right-[calc(100%/12+0.75rem)] left-[calc(100%/12+0.75rem)] h-px bg-line-strong" />
        <ol className="relative grid grid-cols-6">
          {steps.map((s, i) => {
            const last = i === steps.length - 1;
            return (
              <li key={s} className="relative flex flex-col items-center gap-2">
                {last ? <span className="absolute -top-6 left-1/2 h-5 w-px bg-accent" /> : null}
                <span className={`block rounded-full ${last ? "h-3 w-3 bg-accent ring-4 ring-accent-soft" : "mt-px h-2.5 w-2.5 border border-line-strong bg-background"}`} />
                <span className={`text-center font-mono text-[10px] leading-tight tracking-wide uppercase ${last ? "text-accent" : "text-muted"}`}>{s}</span>
              </li>
            );
          })}
        </ol>
        <svg viewBox="0 0 600 34" preserveAspectRatio="none" className="mt-1 block h-7 w-full overflow-visible">
          <path d="M550 2 C 550 30, 500 30, 300 30 C 100 30, 50 30, 50 2" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-line-strong" />
          <path d="M46 8 L50 1 L54 8" fill="none" strokeWidth="1" vectorEffect="non-scaling-stroke" className="stroke-line-strong" />
        </svg>
        <p className="-mt-3 text-center">
          <span className="bg-background px-2 font-mono text-[10px] tracking-wide text-muted uppercase">learn → next signal</span>
        </p>
      </div>
    </figure>
  );
}
