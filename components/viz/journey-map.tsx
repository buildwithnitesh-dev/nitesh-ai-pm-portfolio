import { EvidenceTag } from "@/components/ui";

export type JourneyStep = { step: string; note: string; friction?: boolean };

/**
 * A journey as the user experiences it: each stage carries the question the
 * user is silently asking, and friction points are marked where the work focused.
 * Horizontal on wide screens, a vertical rail on phones.
 */
export function JourneyMap({ steps, title, caption }: { steps: readonly JourneyStep[]; title: string; caption?: string }) {
  return (
    <figure aria-label={title} className="rounded-xl border border-line bg-panel p-5 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p aria-hidden className="text-sm font-medium text-ink">{title}</p>
        <EvidenceTag kind="illustrative" />
      </div>
      <ol className="mt-6 grid lg:grid-flow-col lg:auto-cols-fr lg:gap-3">
          {steps.map((s, i) => (
            <li key={s.step} className="relative flex gap-4 pb-6 last:pb-0 lg:block lg:pb-0">
              {/* Rail: vertical on mobile, horizontal on desktop. */}
              <span aria-hidden className={`absolute top-3 left-[11px] h-full w-px bg-line-strong lg:top-[11px] lg:left-6 lg:h-px lg:w-full ${i === steps.length - 1 ? "hidden" : ""}`} />
              <span
                aria-hidden
                className={`relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[10px] ${s.friction ? "border-accent bg-accent text-panel" : "border-line-strong bg-panel text-muted"}`}
              >
                {i + 1}
              </span>
              <div className="lg:mt-4">
                <p className="text-sm font-medium text-ink">{s.step}</p>
                <p className="mt-1 text-sm leading-5 text-muted">{s.note}</p>
                {s.friction ? (
                  <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] text-accent">
                    <span aria-hidden>▲</span> Friction point
                  </p>
                ) : null}
              </div>
            </li>
          ))}
      </ol>
      {caption ? <figcaption className="mt-6 border-t border-line pt-4 text-xs leading-5 text-muted">{caption}</figcaption> : null}
    </figure>
  );
}
