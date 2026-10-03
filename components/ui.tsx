import Link from "next/link";
import type { BuildStatus } from "@/content/ai-diagnostic";
/**
 * Design-system primitives. One grotesk family, set heavy for statements and plain for evidence (numbers,
 * methods, labels). Evidence marks say what kind of claim something is, so a
 * reader never has to guess what is documented and what is reasoning.
 */

export type EvidenceKind = "verified" | "reasoning" | "illustrative" | "prototype";

export const evidence: Record<EvidenceKind, { label: string }> = {
  verified: { label: "Documented outcome" },
  reasoning: { label: "Product reasoning" },
  illustrative: { label: "Illustrative model" },
  prototype: { label: "Independent prototype" },
};

export function EvidenceMark({ kind, className = "" }: { kind: EvidenceKind; className?: string }) {
  const base = `inline-block h-2.5 w-2.5 shrink-0 ${className}`;
  if (kind === "verified") return <span aria-hidden className={`${base} rounded-full bg-accent`} />;
  if (kind === "reasoning") return <span aria-hidden className={`${base} rounded-full border-[1.5px] border-accent`} />;
  if (kind === "illustrative") return <span aria-hidden className={`${base} rotate-45 border-[1.5px] border-dashed border-subtle`} />;
  return (
    <span aria-hidden className={`${base} relative overflow-hidden rounded-[2px] border-[1.5px] border-accent`}>
      <span className="absolute inset-y-0 left-0 w-1/2 bg-accent" />
    </span>
  );
}

/** A quiet label for the kind of claim; used sparingly, where the distinction matters. */
export function EvidenceTag({ kind, label }: { kind: EvidenceKind; label?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-muted">
      <EvidenceMark kind={kind} />
      {label ?? evidence[kind].label}
    </span>
  );
}

/** A small sentence-case label: methods, stage names, metadata. */
export function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-medium text-[13px] ${className}`}>{children}</span>;
}

/** Section header: a short label with a rule, then a heavy statement. */
export function SectionHeader({
  id, index, label, title, intro, as: As = "h2",
}: { id?: string; index?: string; label: string; title: React.ReactNode; intro?: React.ReactNode; as?: "h1" | "h2" }) {
  return (
    <div className="max-w-3xl">
      <p className="flex items-center gap-3 text-[13px] font-medium text-accent">
        {index ? <span className="tabular-nums text-subtle">{index}</span> : null}
        <span>{label}</span>
        <span aria-hidden className="h-px w-10 bg-accent/40" />
      </p>
      <As id={id} className="mt-4 font-serif text-[2.1rem] leading-[1.05] text-balance text-ink sm:text-[3.1rem]">{title}</As>
      {intro ? <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{intro}</p> : null}
    </div>
  );
}

const buttonBase = "inline-flex h-12 items-center justify-center gap-2 rounded-md px-6 text-[15px] font-medium transition-colors duration-200";
export const button = {
  primary: `${buttonBase} bg-ink text-panel hover:bg-accent`,
  secondary: `${buttonBase} border border-ink/25 text-ink hover:border-ink hover:bg-panel`,
};

/** Arrow that nudges forward when its parent `group` is hovered or focused. */
export function Arrow({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 ${className}`}>→</span>;
}

/** An underlined text link with an arrow, for "go deeper" paths. */
export function MoreLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group inline-flex min-h-6 items-center gap-2 text-[15px] font-medium text-accent underline decoration-accent/30 decoration-1 underline-offset-[6px] hover:decoration-accent">
      {children} <Arrow />
    </Link>
  );
}

/**
 * Build status, drawn so the four states never read as equivalent: a solid
 * mark for working code, an outline for a written design, a dashed outline
 * for plans, and a struck ring for what waits on outside input.
 */
export function StatusMark({ status }: { status: BuildStatus }) {
  const base = "inline-block h-2.5 w-2.5 shrink-0 rounded-full";
  if (status === "Implemented") return <span aria-hidden className={`${base} bg-accent`} />;
  if (status === "Designed") return <span aria-hidden className={`${base} border-[1.5px] border-accent`} />;
  if (status === "Planned") return <span aria-hidden className={`${base} border-[1.5px] border-dashed border-subtle`} />;
  return (
    <span aria-hidden className={`${base} relative border-[1.5px] border-subtle`}>
      <span className="absolute top-1/2 left-1/2 h-[1.5px] w-[130%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-subtle" />
    </span>
  );
}

export function StatusLabel({ status }: { status: BuildStatus }) {
  const strong = status === "Implemented" || status === "Designed";
  return (
    <span className={`inline-flex items-center gap-2 text-[13px] font-medium whitespace-nowrap ${strong ? "text-ink" : "text-muted"}`}>
      <StatusMark status={status} />
      {status}
    </span>
  );
}
