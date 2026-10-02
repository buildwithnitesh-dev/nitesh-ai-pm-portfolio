import Link from "next/link";
import type { BuildStatus } from "@/content/ai-diagnostic";
/**
 * Design-system primitives. Two typographic voices carry the system:
 * Instrument Serif for statements, Geist Mono for evidence (numbers, methods,
 * labels). Evidence marks say what kind of claim something is, so a reader
 * never has to guess what is documented and what is reasoning.
 */

export type EvidenceKind = "verified" | "reasoning" | "illustrative" | "prototype";

export const evidence: Record<EvidenceKind, { label: string }> = {
  verified: { label: "Documented outcome" },
  reasoning: { label: "Product reasoning" },
  illustrative: { label: "Illustrative model" },
  prototype: { label: "Independent prototype" },
};

export function EvidenceMark({ kind, tone = "light", className = "" }: { kind: EvidenceKind; tone?: "light" | "dark"; className?: string }) {
  const base = `inline-block h-2.5 w-2.5 shrink-0 ${className}`;
  const fill = tone === "dark" ? "bg-accent-soft" : "bg-accent";
  const stroke = tone === "dark" ? "border-accent-soft" : "border-accent";
  if (kind === "verified") return <span aria-hidden className={`${base} rounded-full ${fill}`} />;
  if (kind === "reasoning") return <span aria-hidden className={`${base} rounded-full border-[1.5px] ${stroke}`} />;
  if (kind === "illustrative") return <span aria-hidden className={`${base} rotate-45 border-[1.5px] border-dashed ${tone === "dark" ? "border-panel/60" : "border-subtle"}`} />;
  return (
    <span aria-hidden className={`${base} relative overflow-hidden rounded-[2px] border-[1.5px] ${stroke}`}>
      <span className={`absolute inset-y-0 left-0 w-1/2 ${fill}`} />
    </span>
  );
}

/** A quiet, mono label for the kind of claim; used sparingly, where the distinction matters. */
export function EvidenceTag({ kind, tone = "light", label }: { kind: EvidenceKind; tone?: "light" | "dark"; label?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] uppercase ${tone === "dark" ? "text-panel/70" : "text-muted"}`}>
      <EvidenceMark kind={kind} tone={tone} />
      {label ?? evidence[kind].label}
    </span>
  );
}

/** Mono, uppercase micro-label: methods, stage names, metadata. */
export function Mono({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-[0.12em] uppercase ${className}`}>{children}</span>;
}

/** Section header: a mono index and label, then a serif statement. */
export function SectionHeader({
  id, index, label, title, intro, tone = "light", as: As = "h2",
}: { id?: string; index?: string; label: string; title: React.ReactNode; intro?: React.ReactNode; tone?: "light" | "dark"; as?: "h1" | "h2" }) {
  const dark = tone === "dark";
  return (
    <div className="max-w-3xl">
      <p className={`flex items-baseline gap-3 font-mono text-[11px] tracking-[0.16em] uppercase ${dark ? "text-accent-soft/80" : "text-accent"}`}>
        {index ? <span className={dark ? "text-panel/50" : "text-subtle"}>{index}</span> : null}
        {label}
      </p>
      <As id={id} className={`mt-4 font-serif text-[2.1rem] leading-[1.08] tracking-tight text-balance sm:text-5xl ${dark ? "text-panel" : "text-ink"}`}>{title}</As>
      {intro ? <p className={`mt-5 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${dark ? "text-panel/70" : "text-muted"}`}>{intro}</p> : null}
    </div>
  );
}

const buttonBase = "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm transition-colors duration-200";
export const button = {
  primary: `${buttonBase} bg-ink text-panel hover:bg-accent`,
  secondary: `${buttonBase} border border-line-strong text-ink hover:border-ink hover:bg-panel`,
  onDark: `${buttonBase} border border-white/25 text-panel hover:border-white/50 hover:bg-white/10`,
};

/** Arrow that nudges forward when its parent `group` is hovered or focused. */
export function Arrow({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 ${className}`}>→</span>;
}

/** An underlined text link with an arrow, for "go deeper" paths. */
export function MoreLink({ href, children, tone = "light" }: { href: string; children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <Link href={href} className={`group inline-flex min-h-6 items-center gap-2 text-sm underline decoration-1 underline-offset-[6px] ${tone === "dark" ? "text-panel decoration-white/30 hover:decoration-accent-soft" : "text-ink decoration-line-strong hover:decoration-accent"}`}>
      {children} <Arrow />
    </Link>
  );
}


/**
 * Build status, drawn so the four states never read as equivalent: a solid
 * mark for working code, an outline for a written design, a dashed outline
 * for plans, and a struck ring for what has never been run.
 */
export function StatusMark({ status, tone = "light" }: { status: BuildStatus; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const base = "inline-block h-2.5 w-2.5 shrink-0 rounded-full";
  if (status === "Implemented") return <span aria-hidden className={`${base} ${dark ? "bg-accent-soft" : "bg-accent"}`} />;
  if (status === "Designed") return <span aria-hidden className={`${base} border-[1.5px] ${dark ? "border-accent-soft" : "border-accent"}`} />;
  if (status === "Planned") return <span aria-hidden className={`${base} border-[1.5px] border-dashed ${dark ? "border-panel/50" : "border-subtle"}`} />;
  return (
    <span aria-hidden className={`${base} relative border-[1.5px] ${dark ? "border-panel/50" : "border-subtle"}`}>
      <span className={`absolute top-1/2 left-1/2 h-[1.5px] w-[130%] -translate-x-1/2 -translate-y-1/2 -rotate-45 ${dark ? "bg-panel/50" : "bg-subtle"}`} />
    </span>
  );
}

export function StatusLabel({ status, tone = "light" }: { status: BuildStatus; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const strong = status === "Implemented" || status === "Designed";
  return (
    <span className={`inline-flex items-center gap-2 text-xs whitespace-nowrap ${strong ? (dark ? "text-panel" : "text-ink") : dark ? "text-panel/60" : "text-muted"}`}>
      <StatusMark status={status} tone={tone} />
      {status}
    </span>
  );
}

