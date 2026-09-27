"use client";

import Link from "next/link";
import { useId, useState } from "react";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/ui";
import { capabilities, caseStudies, metrics, type Capability, type CapabilityId, type CaseSlug } from "@/content/portfolio";

/* ── Layout (percent coordinates inside the map) ─────────────────────────── */

const capPos: Record<CapabilityId, { x: number; y: number }> = {
  "ai-product": { x: 50, y: 9 },
  personalization: { x: 29, y: 31 },
  "consumer-ux": { x: 71, y: 31 },
  growth: { x: 11, y: 55 },
  "product-analytics": { x: 36, y: 55 },
  experimentation: { x: 64, y: 55 },
  gamification: { x: 89, y: 55 },
};

type EvidenceId = CaseSlug | "outcomes";
const evidencePos: Record<EvidenceId, { x: number; y: number }> = {
  "adaptive-assignment-engine": { x: 12, y: 89 },
  "onboarding-funnel-redesign": { x: 37, y: 89 },
  "ai-learner-diagnostic": { x: 63, y: 89 },
  outcomes: { x: 88, y: 89 },
};

const byId = Object.fromEntries(capabilities.map((c) => [c.id, c])) as Record<CapabilityId, Capability>;
const evidenceOf = (c: Capability): EvidenceId[] => [...c.cases.map((k) => k.slug), ...(c.metrics.length ? (["outcomes"] as const) : [])];
const capsFor = (e: EvidenceId) => capabilities.filter((c) => evidenceOf(c).includes(e)).map((c) => c.id);
const neighbours = (id: CapabilityId) => [...byId[id].buildsOn, ...capabilities.filter((c) => c.buildsOn.includes(id)).map((c) => c.id)];

const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const my = (a.y + b.y) / 2;
  return `M${a.x} ${a.y} C${a.x} ${my} ${b.x} ${my} ${b.x} ${b.y}`;
};

/**
 * Demonstrated capabilities as a map: capability → evidence → case study.
 * Hover or focus previews connections; click pins a capability and opens its
 * evidence. Nothing here is self-rated — every edge ends at something on this site.
 */
export function CapabilityMap() {
  const [selected, setSelected] = useState<CapabilityId | null>(null);
  const [hover, setHover] = useState<{ kind: "cap"; id: CapabilityId } | { kind: "ev"; id: EvidenceId } | null>(null);

  // What is "lit": hover previews, otherwise the pinned selection.
  const focusCap = hover?.kind === "cap" ? hover.id : hover ? null : selected;
  const focusEv = hover?.kind === "ev" ? hover.id : null;
  const litCaps = new Set<CapabilityId>(
    focusCap ? [focusCap, ...neighbours(focusCap)] : focusEv ? capsFor(focusEv) : [],
  );
  const litEv = new Set<EvidenceId>(focusCap ? evidenceOf(byId[focusCap]) : focusEv ? [focusEv] : []);
  const anyLit = !!(focusCap || focusEv);

  return (
    <section
      id="expertise"
      aria-labelledby="capabilities-title"
      onKeyDown={(e) => { if (e.key === "Escape" && selected) setSelected(null); }}
      className="on-dark scroll-mt-24 border-b border-line bg-ink py-20 text-panel lg:py-28"
    >
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="capabilities-title"
            tone="dark"
            index="03"
            eyebrow="Product capability map"
            title="Demonstrated capabilities — each one traceable to evidence."
            description="Not a self-rated skill list. Every capability connects to a case study or a documented outcome on this site; follow a line to check it."
          />
          <p className="inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] tracking-wide text-panel/80 lg:self-auto">
            <span className="text-cap-cyan">Capability</span> → <span className="text-cap-violet">Evidence</span> → Case study
          </p>
        </div>

        {/* Wide screens: the map. */}
        <div className="mt-14 hidden items-start gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="relative rounded-2xl border border-white/10 bg-ink-raised p-8">
            <div className="relative aspect-[16/11]" onMouseLeave={() => setHover(null)}>
              <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
                {/* Evidence edges: capability → case study / outcomes. */}
                {capabilities.flatMap((c) =>
                  evidenceOf(c).map((ev) => {
                    const on = litEv.has(ev) && (focusCap ? focusCap === c.id : litCaps.has(c.id));
                    const supporting = c.cases.find((k) => k.slug === ev)?.role === "supporting";
                    return (
                      <path
                        key={`${c.id}-${ev}`}
                        d={curve(capPos[c.id], { x: evidencePos[ev].x, y: evidencePos[ev].y - 6 })}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={on ? 1.5 : 1}
                        className={`transition-[stroke,stroke-opacity] duration-300 ${on ? "stroke-cap-violet" : "stroke-white"}`}
                        strokeOpacity={on ? (supporting ? 0.55 : 0.9) : anyLit ? 0.03 : 0.07}
                      />
                    );
                  }),
                )}
                {/* Structure edges: which capabilities a capability is built on. */}
                {capabilities.flatMap((c) =>
                  c.buildsOn.map((b) => {
                    const on = !!focusCap && (focusCap === c.id || focusCap === b);
                    return (
                      <path
                        key={`${c.id}-${b}`}
                        d={curve(capPos[c.id], capPos[b])}
                        fill="none"
                        vectorEffect="non-scaling-stroke"
                        strokeWidth={on ? 1.5 : 1}
                        className={`transition-[stroke,stroke-opacity] duration-300 ${on ? "stroke-cap-cyan" : "stroke-white"}`}
                        strokeOpacity={on ? 0.85 : anyLit ? 0.08 : 0.22}
                      />
                    );
                  }),
                )}
              </svg>

              <ul aria-label="Capabilities">
                {capabilities.map((c) => {
                  const p = capPos[c.id];
                  const isSel = selected === c.id;
                  const lit = litCaps.has(c.id);
                  const primary = focusCap === c.id || (focusEv !== null && lit);
                  return (
                    <li key={c.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                      <button
                        type="button"
                        aria-pressed={isSel}
                        onClick={() => setSelected(isSel ? null : c.id)}
                        onMouseEnter={() => setHover({ kind: "cap", id: c.id })}
                        onFocus={() => setHover({ kind: "cap", id: c.id })}
                        onBlur={() => setHover(null)}
                        className="group flex flex-col items-center gap-2.5 rounded-lg px-2 py-1 outline-offset-4"
                      >
                        <span
                          aria-hidden
                          className={`block h-3 w-3 rounded-full border transition-all duration-300 ${
                            primary || isSel
                              ? "border-cap-cyan bg-cap-cyan shadow-[0_0_0_5px_rgba(143,211,222,0.12),0_0_22px_rgba(143,211,222,0.45)]"
                              : lit
                                ? "border-cap-cyan bg-ink shadow-[0_0_0_4px_rgba(143,211,222,0.08)]"
                                : anyLit
                                  ? "border-white/25 bg-ink"
                                  : "border-white/60 bg-ink group-hover:border-cap-cyan"
                          }`}
                        />
                        <span className={`rounded bg-ink-raised px-1.5 text-sm whitespace-nowrap transition-colors duration-300 ${primary || isSel ? "text-panel" : lit ? "text-panel/90" : "text-panel/70 group-hover:text-panel"}`}>
                          {c.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>

              <div aria-hidden className="absolute inset-x-0 top-[74%] flex items-center gap-3">
                <span className="h-px flex-1 bg-white/10" />
                <span className="bg-ink-raised px-2 font-mono text-[10px] tracking-[0.18em] text-panel/60 uppercase">Evidence</span>
                <span className="h-px flex-1 bg-white/10" />
              </div>

              <ul aria-label="Evidence">
                {(Object.keys(evidencePos) as EvidenceId[]).map((ev) => {
                  const p = evidencePos[ev];
                  const cs = caseStudies.find((c) => c.slug === ev);
                  const lit = litEv.has(ev);
                  return (
                    <li key={ev} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                      <Link
                        href={cs ? cs.href : "/#metrics"}
                        onMouseEnter={() => setHover({ kind: "ev", id: ev })}
                        onFocus={() => setHover({ kind: "ev", id: ev })}
                        onBlur={() => setHover(null)}
                        className={`flex flex-col items-center gap-0.5 rounded-md border px-3 py-2 text-center text-xs leading-4 whitespace-nowrap transition-all duration-300 ${
                          lit
                            ? "border-cap-violet/70 bg-ink-raised text-panel shadow-[inset_0_0_0_1px_rgba(184,173,242,0.25),0_0_24px_rgba(184,173,242,0.18)]"
                            : "border-white/15 bg-ink-raised text-panel/75 hover:border-white/40 hover:text-panel"
                        }`}
                      >
                        <span aria-hidden className={`font-mono text-[10px] ${lit ? "text-cap-violet" : "text-panel/60"}`}>{cs ? `Case ${cs.index}` : "Impact ↗"}</span>
                        {cs ? cs.short : "Documented outcomes"}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4 text-xs text-panel/70">
              <span className="flex items-center gap-5">
                <span className="flex items-center gap-2"><span aria-hidden className="h-px w-5 bg-cap-cyan" />Built on</span>
                <span className="flex items-center gap-2"><span aria-hidden className="h-px w-5 bg-cap-violet" />Evidenced by</span>
              </span>
              <span>Hover to preview · click to pin · Esc to reset</span>
            </div>
          </div>

          <aside aria-live="polite" className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
            {selected ? (
              <>
                <CapabilityDetail c={byId[selected]} onPick={setSelected} />
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="mt-8 inline-flex h-9 items-center rounded-full border border-white/20 px-4 text-xs text-panel/80 transition-colors hover:border-white/50 hover:text-panel"
                >
                  ← Show all capabilities
                </button>
              </>
            ) : (
              <Overview onPick={setSelected} />
            )}
          </aside>
        </div>

        {/* Phones and tablets: the same data as a stacked, one-at-a-time list. */}
        <MobileCapabilities />
      </Container>
    </section>
  );
}

function Overview({ onPick }: { onPick: (id: CapabilityId) => void }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.16em] text-panel/60 uppercase">All capabilities</p>
      <p className="mt-3 font-serif text-2xl leading-snug">Pick a capability to see what I practice and where it is proven.</p>
      <dl className="mt-6 grid grid-cols-3 gap-3 border-y border-white/10 py-4 text-center">
        <div><dt className="text-[11px] text-panel/60">Capabilities</dt><dd className="mt-1 text-xl font-semibold">{capabilities.length}</dd></div>
        <div><dt className="text-[11px] text-panel/60">Case studies</dt><dd className="mt-1 text-xl font-semibold">{caseStudies.length}</dd></div>
        <div><dt className="text-[11px] text-panel/60">Outcomes</dt><dd className="mt-1 text-xl font-semibold">{metrics.length}</dd></div>
      </dl>
      <ul className="mt-5 grid gap-1">
        {capabilities.map((c) => (
          <li key={c.id}>
            <button type="button" onClick={() => onPick(c.id)} className="group flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm text-panel/80 transition-colors hover:bg-white/5 hover:text-panel">
              {c.title}
              <span className="text-[11px] text-panel/60">{evidenceSummary(c)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function evidenceSummary(c: Capability) {
  const parts = [];
  if (c.cases.length) parts.push(`${c.cases.length} case${c.cases.length > 1 ? "s" : ""}`);
  if (c.metrics.length) parts.push(`${c.metrics.length} outcome${c.metrics.length > 1 ? "s" : ""}`);
  return parts.join(" · ");
}

/** Capability → what I practice → evidence → relevant case studies. */
function CapabilityDetail({ c, onPick }: { c: Capability; onPick?: (id: CapabilityId) => void }) {
  const ms = c.metrics.map((id) => metrics.find((m) => m.id === id)!).filter(Boolean);
  const related = [...c.buildsOn, ...capabilities.filter((x) => x.buildsOn.includes(c.id)).map((x) => x.id)];
  return (
    <div className="fade-up">
      <p className="font-mono text-[11px] tracking-[0.16em] text-cap-cyan uppercase">Capability</p>
      <h3 className="mt-2 font-serif text-3xl leading-tight">{c.title}</h3>

      <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-panel/60 uppercase">→ What I practice</p>
      <p className="mt-2 text-sm leading-6 text-panel/85">{c.practice}</p>

      <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-cap-violet uppercase">→ Evidence</p>
      <ul className="mt-3 grid gap-3 text-sm">
        {c.cases.map((k) => {
          const cs = caseStudies.find((x) => x.slug === k.slug)!;
          return (
            <li key={k.slug} className="border-l border-white/15 pl-3">
              <span className="text-panel">{cs.title}</span>
              <span className="ml-2 text-[11px] text-panel/60">{k.role === "primary" ? "Core" : "Supporting"}{cs.evidence === "prototype" ? " · prototype" : ""}</span>
              <span className="mt-0.5 block leading-5 text-panel/70">{k.note}</span>
            </li>
          );
        })}
        {ms.map((m) => (
          <li key={m.id} className="border-l border-white/15 pl-3">
            <span className="font-semibold text-panel">{m.value}</span> <span className="text-panel/85">{m.label}</span>
            <span className="ml-2 text-[11px] text-panel/60">Verified</span>
            <span className="mt-0.5 block leading-5 text-panel/70">{m.detail.split(". ")[0].replace(/\.$/, "")}.</span>
          </li>
        ))}
        {c.context ? (
          <li className="border-l border-white/15 pl-3 leading-5 text-panel/70">
            <span className="text-panel/85">Experience:</span> {c.context}
          </li>
        ) : null}
      </ul>

      {c.cases.length ? (
        <>
          <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-panel/60 uppercase">→ Relevant case studies</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {c.cases.map((k) => {
              const cs = caseStudies.find((x) => x.slug === k.slug)!;
              return (
                <li key={k.slug}>
                  <Link href={cs.href} className="group inline-flex items-center gap-2 rounded-full border border-cap-violet/40 px-3 py-1.5 text-xs text-panel transition-colors hover:border-cap-violet hover:bg-cap-violet/10">
                    <span className="font-mono text-cap-violet">{cs.index}</span>{cs.short}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <p className="mt-6 text-xs leading-5 text-panel/70">No dedicated case study yet — the evidence is the documented outcome above.</p>
      )}

      {onPick && related.length ? (
        <p className="mt-6 text-xs text-panel/70">
          Connected:{" "}
          {related.map((r, i) => (
            <span key={r}>
              {i ? ", " : ""}
              <button type="button" onClick={() => onPick(r)} className="text-panel underline decoration-white/30 underline-offset-4 hover:decoration-cap-cyan">{byId[r].title}</button>
            </span>
          ))}
        </p>
      ) : null}
    </div>
  );
}

function MobileCapabilities() {
  const [open, setOpen] = useState<CapabilityId | null>(null);
  const base = useId();
  return (
    <div className="mt-10 lg:hidden">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-panel/70">Tap a capability to open its evidence.</p>
        {open ? (
          <button type="button" onClick={() => setOpen(null)} className="text-xs text-panel/80 underline decoration-white/30 underline-offset-4">Collapse</button>
        ) : null}
      </div>
      <ol className="mt-4 border-l border-white/15">
        {capabilities.map((c) => {
          const isOpen = open === c.id;
          const panelId = `${base}-${c.id}`;
          return (
            <li key={c.id} className="relative pl-6">
              <span
                aria-hidden
                className={`absolute top-[22px] -left-[6.5px] h-3 w-3 rounded-full border transition-all duration-300 ${isOpen ? "border-cap-cyan bg-cap-cyan shadow-[0_0_18px_rgba(143,211,222,0.45)]" : "border-white/50 bg-ink"}`}
              />
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : c.id)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-serif text-2xl">{c.title}</span>
                <span className="flex shrink-0 items-center gap-3 text-[11px] text-panel/65">
                  {evidenceSummary(c)}
                  <span aria-hidden className={`text-base text-panel/70 transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </span>
              </button>
              <div id={panelId} hidden={!isOpen} className="pb-6">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
                  <CapabilityDetail c={c} />
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
