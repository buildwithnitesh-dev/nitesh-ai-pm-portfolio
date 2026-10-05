import type { Evidence } from "@/content/portfolio";

/**
 * The kind of evidence behind a number, as one small text label: Measured,
 * Reported, Derived or Observed. Text only, so it reads the same to every
 * reader; the caveats stay in the supporting text beside it.
 */
export function ProofLabel({ kind, before, className = "" }: { kind: Evidence; before?: Evidence; className?: string }) {
  return (
    <span className={`inline-block text-[11px] leading-5 font-semibold tracking-[0.08em] whitespace-nowrap text-ink uppercase ${className}`}>
      {before && before !== kind ? <>{before}<span aria-hidden className="font-normal text-subtle"> → </span><span className="sr-only"> to </span></> : null}
      {kind}
    </span>
  );
}

/** The same label as plain words, for accessible names and plain-text outputs. */
export function proofText(kind: Evidence, before?: Evidence) {
  return before && before !== kind ? `${before} to ${kind.toLowerCase()}` : kind;
}
