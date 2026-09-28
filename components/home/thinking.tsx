"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Container } from "@/components/container";
import { Arrow, Eyebrow } from "@/components/ui";
import { about } from "@/content/portfolio";
import { antiPatterns, graveyard, principles } from "@/content/thinking";

const tabs = [
  { id: "principles", label: "Principles", count: principles.length },
  { id: "avoid", label: "What I avoid", count: antiPatterns.length },
  { id: "graveyard", label: "Changed my mind", count: graveyard.length },
] as const;
type TabId = (typeof tabs)[number]["id"];

/**
 * How I think, in three views behind tabs — progressive disclosure keeps the
 * homepage short while every principle still links to where it was earned.
 */
export function Thinking() {
  const [tab, setTab] = useState<TabId>("principles");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  // Arrow keys move between tabs (WAI-ARIA tabs pattern, automatic activation).
  function onKey(e: React.KeyboardEvent, i: number) {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    const to = e.key === "Home" ? 0 : e.key === "End" ? tabs.length - 1 : dir ? (i + dir + tabs.length) % tabs.length : -1;
    if (to < 0) return;
    e.preventDefault();
    setTab(tabs[to].id);
    refs.current[to]?.focus();
  }

  return (
    <section id="about" aria-labelledby="thinking-title" className="scroll-mt-24 border-b border-line py-16 lg:py-22">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-20">
          <div>
            <Eyebrow><span className="mr-3 text-subtle">04</span>Product thinking</Eyebrow>
            <h2 id="thinking-title" className="mt-3 font-serif text-4xl leading-[1.06] tracking-tight text-ink sm:text-5xl">How I think about products.</h2>
          </div>
          <p className="max-w-xl text-base leading-8 text-muted sm:text-lg">{about.body}</p>
        </div>

        <div role="tablist" aria-label="Product thinking" className="mt-14 flex gap-6 overflow-x-auto border-b border-line sm:gap-10">
          {tabs.map((t, i) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                ref={(el) => { refs.current[i] = el; }}
                role="tab"
                id={`tab-${t.id}`}
                aria-selected={on}
                aria-controls={`panel-${t.id}`}
                tabIndex={on ? 0 : -1}
                onClick={() => setTab(t.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={`relative -mb-px flex shrink-0 items-baseline gap-2 border-b-2 pb-4 text-sm transition-colors sm:text-base ${on ? "border-ink text-ink" : "border-transparent text-muted hover:text-ink"}`}
              >
                {t.label}
                <span className="hidden font-mono text-[11px] text-subtle sm:inline">{String(t.count).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <div id="panel-principles" role="tabpanel" aria-labelledby="tab-principles" hidden={tab !== "principles"} tabIndex={0} className="pt-4">
          <ol className="grid md:grid-cols-2 md:gap-x-16">
            {principles.map((p, i) => (
              <li key={p.title} className="fade-up border-b border-line py-8" style={{ animationDelay: `${i * 40}ms` }}>
                <div className="grid grid-cols-[2.5rem_1fr] gap-2">
                  <span className="pt-2 font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-serif text-2xl leading-snug text-ink sm:text-[1.7rem]">{p.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted sm:text-base">{p.body}</p>
                    <Link href={p.evidence.href} className="group mt-4 inline-flex items-center gap-2 text-xs text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                      Evidence · {p.evidence.label} <Arrow />
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div id="panel-avoid" role="tabpanel" aria-labelledby="tab-avoid" hidden={tab !== "avoid"} tabIndex={0} className="pt-4">
          <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">Patterns I deliberately design against — and what I do instead. Lessons, not critiques of anyone else’s product.</p>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {antiPatterns.map((a, i) => (
              <li key={a.avoid} className="fade-up grid gap-3 py-6 md:grid-cols-[1fr_1.3fr_auto] md:items-baseline md:gap-10" style={{ animationDelay: `${i * 40}ms` }}>
                <p className="flex items-baseline gap-3 font-serif text-xl leading-snug text-ink">
                  <span aria-hidden className="text-sm text-subtle">✕</span>
                  <span><span className="sr-only">Avoid: </span>{a.avoid}</span>
                </p>
                <p className="text-sm leading-6 text-muted md:text-base md:leading-7">
                  <span className="mr-2 font-mono text-[11px] tracking-wide text-accent uppercase">Instead</span>{a.instead}
                </p>
                <Link href={a.evidence.href} className="text-xs whitespace-nowrap text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                  {a.evidence.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div id="panel-graveyard" role="tabpanel" aria-labelledby="tab-graveyard" hidden={tab !== "graveyard"} tabIndex={0} className="pt-4">
          <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
            Product lessons from the graveyard: tempting beliefs the work taught me to distrust. No invented post-mortems — each lesson traces back to documented work.
          </p>
          <ol className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
            {graveyard.map((g, i) => (
              <li key={g.belief} className="fade-up flex flex-col justify-between gap-6 bg-panel p-6 sm:p-8" style={{ animationDelay: `${i * 40}ms` }}>
                <div>
                  <p className="font-mono text-[11px] tracking-wide text-subtle uppercase">Buried belief</p>
                  <p className="mt-2 font-serif text-2xl leading-snug text-muted line-through decoration-line-strong decoration-1">{g.belief}</p>
                  <p className="mt-5 font-mono text-[11px] tracking-wide text-accent uppercase">What replaced it</p>
                  <p className="mt-2 text-base leading-7 text-ink">{g.lesson}</p>
                </div>
                <Link href={g.evidence.href} className="group inline-flex items-center gap-2 self-start text-xs text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
                  Evidence · {g.evidence.label} <Arrow />
                </Link>
              </li>
            ))}
          </ol>
        </div>

        <Link
          href="/work/onboarding-funnel-redesign#simulator"
          className="group mt-12 flex flex-col justify-between gap-4 rounded-2xl border border-line bg-panel p-6 transition-colors hover:border-ink sm:flex-row sm:items-center sm:p-8"
        >
          <span>
            <span className="block font-mono text-[11px] tracking-wide text-accent uppercase">See it applied · illustrative</span>
            <span className="mt-2 block font-serif text-2xl text-ink">Explore the product decision behind the onboarding redesign.</span>
            <span className="mt-1 block text-sm text-muted">Pull the levers, read the hypothesis, see the decision. An interactive illustration of reasoning — not historical performance.</span>
          </span>
          <span className="inline-flex shrink-0 items-center gap-2 text-sm text-ink">Open the simulator <Arrow /></span>
        </Link>
      </Container>
    </section>
  );
}
