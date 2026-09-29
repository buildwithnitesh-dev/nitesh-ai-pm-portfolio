/**
 * Small design-system primitives shared by every page.
 * Evidence labels are the core pattern: every claim on the site says what kind
 * of claim it is, so a reader never has to guess what is real data.
 */

export type EvidenceKind = "verified" | "reasoning" | "illustrative" | "prototype";

export const evidence: Record<EvidenceKind, { label: string; hint: string }> = {
  verified: { label: "Documented outcome", hint: "Result from professional work" },
  reasoning: { label: "Product reasoning", hint: "How I framed and decided" },
  illustrative: { label: "Illustrative model", hint: "Explains logic, not real data" },
  prototype: { label: "Independent prototype", hint: "Self-built; no real-user results" },
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

export function EvidenceTag({ kind, tone = "light" }: { kind: EvidenceKind; tone?: "light" | "dark" }) {
  const text = tone === "dark" ? "text-panel/80 border-white/15" : "text-muted border-line bg-panel";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs ${text}`}>
      <EvidenceMark kind={kind} tone={tone} />
      {evidence[kind].label}
    </span>
  );
}

export function EvidenceLegend({ kinds = ["verified", "reasoning", "illustrative", "prototype"] as EvidenceKind[] }: { kinds?: EvidenceKind[] }) {
  return (
    <div className="border-y border-line py-4">
      <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">How to read this portfolio</p>
      <dl className="mt-3 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
        {kinds.map((k) => (
          <div key={k}>
            <dt className="flex items-center gap-3 text-sm font-medium text-ink"><EvidenceMark kind={k} />{evidence[k].label}</dt>
            <dd className="pl-[22px] text-xs leading-5 text-muted">{evidence[k].hint}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Eyebrow({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-xs font-medium tracking-[0.22em] text-accent uppercase ${className}`}>{children}</p>;
}

export function SectionHeading({
  id, eyebrow, title, description, index, tone = "light",
}: { id?: string; eyebrow: string; title: string; description?: string; index?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <div className="max-w-3xl">
      <Eyebrow className={dark ? "text-accent-soft/80" : ""}>{index ? <span className={`mr-3 ${dark ? "text-panel/60" : "text-subtle"}`}>{index}</span> : null}{eyebrow}</Eyebrow>
      <h2 id={id} className={`mt-3 font-serif text-3xl leading-tight tracking-tight sm:text-[2.6rem] sm:leading-[1.1] ${dark ? "text-panel" : "text-ink"}`}>{title}</h2>
      {description ? <p className={`mt-4 text-base leading-7 sm:text-lg sm:leading-8 ${dark ? "text-panel/70" : "text-muted"}`}>{description}</p> : null}
    </div>
  );
}

const buttonBase = "inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm transition-colors duration-200";
export const button = {
  primary: `${buttonBase} bg-ink text-panel hover:bg-accent`,
  secondary: `${buttonBase} border border-line-strong text-ink hover:border-ink hover:bg-panel`,
  onDark: `${buttonBase} border border-white/20 text-panel hover:border-white/40 hover:bg-white/10`,
};

/** Arrow that nudges forward when its parent `group` is hovered or focused, signalling "this goes somewhere". */
export function Arrow({ className = "" }: { className?: string }) {
  return <span aria-hidden className={`inline-block transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 ${className}`}>→</span>;
}
