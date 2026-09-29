import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, EvidenceTag, type EvidenceKind } from "@/components/ui";
import { career, caseStudies, type CaseSlug } from "@/content/portfolio";
import type { Chapter as ChapterData, Tldr } from "@/content/case-studies";
import { Toc, type TocItem } from "./toc";

type Meta = {
  slug: CaseSlug;
  type: string;
  title: string;
  subtitle: string;
  focus: readonly string[];
  outcome: string;
  evidence: EvidenceKind;
  note?: string;
  /** Title · company · years, for professional work. */
  role?: string;
  /** Company in the career timeline whose verified scope backs the "My role" block. */
  company?: string;
};

/**
 * Every case study shares one frame: orientation (hero + summary strip),
 * a 30-second version, then the full narrative with a chapter map.
 * Readers can stop at whichever depth answers their question.
 */
export function CaseStudyShell({ meta, tldr, toc, children }: { meta: Meta; tldr: Tldr; toc: readonly TocItem[]; children: React.ReactNode }) {
  return (
    <main id="main" className="flex-1">
      <header className="border-b border-line">
        <Container className="pt-10 pb-14 lg:pt-14 lg:pb-20">
          <nav aria-label="Breadcrumb" className="text-sm text-muted">
            <ol className="flex flex-wrap items-center gap-2">
              <li><Link href="/#work" className="hover:text-ink">← Selected work</Link></li>
              <li aria-hidden className="text-line-strong">/</li>
              <li aria-current="page" className="text-ink">{meta.title}</li>
            </ol>
          </nav>
          <p className="mt-12 text-xs font-medium tracking-[0.22em] text-accent uppercase">{meta.type}</p>
          <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-7xl">{meta.title}</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-muted">{meta.subtitle}</p>

          <dl className={`mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 ${meta.role ? "lg:grid-cols-[1.4fr_1fr_1fr_1fr]" : "lg:grid-cols-[1.5fr_1fr_1fr]"}`}>
            <div className="bg-panel p-6">
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">Outcome</dt>
              <dd className="mt-2 text-2xl leading-snug font-semibold tracking-tight text-ink">{meta.outcome}</dd>
            </div>
            <div className="bg-panel p-6">
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">Focus</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {meta.focus.map((f) => <span key={f} className="rounded-full border border-line px-3 py-1 text-xs text-ink">{f}</span>)}
              </dd>
            </div>
            {meta.role ? (
              <div className="bg-panel p-6">
                <dt className="text-xs tracking-[0.16em] text-muted uppercase">Role</dt>
                <dd className="mt-2 text-sm leading-6 text-ink">{meta.role}</dd>
              </div>
            ) : null}
            <div className={`bg-panel p-6 ${meta.role ? "" : "sm:col-span-2 lg:col-span-1"}`}>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">Evidence</dt>
              <dd className="mt-3"><EvidenceTag kind={meta.evidence} /></dd>
            </div>
          </dl>
          {meta.note ? <p className="mt-5 max-w-3xl text-xs leading-6 text-muted">{meta.note}</p> : null}
        </Container>
      </header>

      <section aria-labelledby="tldr-title" className="border-b border-line bg-panel">
        <Container className="py-12 lg:py-16">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 id="tldr-title" className="font-serif text-3xl text-ink">The 30-second version</h2>
            <a href={`#${toc[0].id}`} className="group text-sm text-muted hover:text-ink">Read the full story <span aria-hidden className="inline-block transition-transform group-hover:translate-y-0.5">↓</span></a>
          </div>
          <ol className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
            {([["Problem", tldr.problem], ["Approach", tldr.approach], ["Outcome", tldr.outcome]] as const).map(([k, v], i) => (
              <li key={k} className="md:px-8 md:first:pl-0 md:last:pr-0">
                <p className="flex items-center gap-3 text-xs tracking-[0.16em] text-muted uppercase">
                  <span className="font-mono text-accent">{i + 1}</span>{k}
                </p>
                <p className={`mt-3 text-base leading-7 ${k === "Outcome" ? "font-medium text-ink" : "text-ink/85"}`}>{v}</p>
              </li>
            ))}
          </ol>
          {meta.company ? <MyRole company={meta.company} /> : null}
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-16 lg:py-20">
        <aside><Toc items={toc} /></aside>
        <div className="grid max-w-3xl gap-20">{children}</div>
      </Container>

      <NextCase slug={meta.slug} />
    </main>
  );
}

/** Verified scope from the career timeline: ownership shown, not claimed by title. */
function MyRole({ company }: { company: string }) {
  const r = career.find((c) => c.company === company);
  if (!r) return null;
  const lists = r.owned || r.decided
    ? ([["What I owned", r.owned], ["What I decided independently", r.decided]] as const)
    : ([[`My scope at ${r.company}`, r.highlights]] as const);
  return (
    <div className="mt-10 border-t border-line pt-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-serif text-2xl text-ink">My role</h2>
        <p className="text-sm text-muted">{r.title} · {r.company} · {r.period}</p>
      </div>
      {r.owned ? <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/85">{r.summary}</p> : null}
      <div className={`mt-5 grid gap-px overflow-hidden rounded-xl border border-line bg-line ${lists.length > 1 ? "md:grid-cols-2" : ""}`}>
        {lists.map(([label, items]) => (
          items ? (
            <div key={label} className="bg-background p-5">
              <p className="text-[11px] tracking-[0.14em] text-muted uppercase">{label}</p>
              <ul className="mt-2 grid gap-1.5 text-sm leading-6 text-ink">
                {items.map((x) => <li key={x}>{x}</li>)}
              </ul>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}

/** A chapter: the unit the table of contents tracks. */
export function Chapter({ id, index, label, children }: { id: string; index: number; label: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-24">
      <div className="flex items-baseline gap-4 border-b border-line pb-4">
        <span className="font-mono text-xs text-accent">{String(index).padStart(2, "0")}</span>
        <h2 id={`${id}-title`} className="text-xs font-medium tracking-[0.22em] text-muted uppercase">{label}</h2>
      </div>
      <div className="mt-10 grid gap-12">{children}</div>
    </section>
  );
}

export function Prose({ eyebrow, title, body }: { eyebrow?: string; title: string; body: readonly string[] }) {
  return (
    <div>
      {eyebrow ? <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">{eyebrow}</p> : null}
      <h3 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-[2.1rem]">{title}</h3>
      <div className="mt-5 grid gap-4">
        {body.map((p) => <p key={p} className="text-base leading-8 text-muted sm:text-[17px]">{p}</p>)}
      </div>
    </div>
  );
}

/** Hypotheses are shown in their testable shape: if → then → measured by. */
export function Hypothesis({ text, measure }: { text: string; measure: string }) {
  const [cond, result] = text.replace(/^If\s+/i, "").split(/,\s*then\s+/i);
  const rows = [["If", cond], ["Then", result?.replace(/\.$/, "")], ["Measured by", measure]] as const;
  return (
    <div className="rounded-xl border-l-4 border-accent bg-accent-soft/60 p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">Hypothesis</p>
        <EvidenceTag kind="reasoning" />
      </div>
      <dl className="mt-5 grid gap-4">
        {rows.map(([k, v]) => (
          <div key={k} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
            <dt className="font-mono text-xs tracking-wide text-accent uppercase">{k}</dt>
            <dd className="text-base leading-7 text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-y-2 border-ink py-8">
      <p className="font-serif text-3xl leading-tight text-ink sm:text-4xl">“{children}”</p>
    </blockquote>
  );
}

function NextCase({ slug }: { slug: CaseSlug }) {
  const i = caseStudies.findIndex((c) => c.slug === slug);
  const next = caseStudies[(i + 1) % caseStudies.length];
  const prev = caseStudies[(i - 1 + caseStudies.length) % caseStudies.length];
  return (
    <nav aria-label="More case studies" className="on-dark border-t border-line bg-dark text-panel">
      <Container className="grid gap-10 py-16 lg:grid-cols-[1fr_auto] lg:items-end">
        <Link href={next.href} className="group block">
          <p className="text-xs tracking-[0.18em] text-accent-soft/70 uppercase">Next case study · {next.index}</p>
          <p className="mt-3 font-serif text-4xl leading-tight transition-colors group-hover:text-accent-soft sm:text-5xl">
            {next.title} <Arrow />
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-panel/65">{next.outcome}</p>
        </Link>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-panel/65">
          <Link href={prev.href} className="hover:text-panel">← {prev.title}</Link>
          <Link href="/#work" className="hover:text-panel">All work</Link>
        </div>
      </Container>
    </nav>
  );
}

/**
 * Renders chapters from content. Hypothesis sections take their testable shape;
 * `after` injects a visual after the section with that eyebrow, so diagrams sit
 * next to the paragraph they explain rather than in a gallery at the end.
 */
export function ChapterList({
  chapters, after = {}, measure, start = 1,
}: { chapters: readonly ChapterData[]; after?: Record<string, React.ReactNode>; measure: string; start?: number }) {
  return (
    <>
      {chapters.map((c, i) => (
        <Chapter key={c.id} id={c.id} index={start + i} label={c.label}>
          {c.sections.map((s) => (
            <div key={s.title} className="grid gap-8">
              {s.eyebrow === "Hypothesis" ? (
                <div>
                  <h3 className="font-serif text-3xl leading-tight text-ink sm:text-[2.1rem]">{s.title}</h3>
                  <div className="mt-6"><Hypothesis text={s.body[0]} measure={measure} /></div>
                  {s.body.slice(1).map((p) => <p key={p} className="mt-5 text-base leading-8 text-muted sm:text-[17px]">{p}</p>)}
                </div>
              ) : (
                <Prose eyebrow={s.eyebrow} title={s.title} body={s.body} />
              )}
              {after[s.eyebrow] ?? null}
            </div>
          ))}
        </Chapter>
      ))}
    </>
  );
}
