import Link from "next/link";
import { Container } from "@/components/container";
import { adaptiveAssignmentEngine } from "@/content/case-studies";

export function AdaptiveAssignmentCaseStudy() {
  const c = adaptiveAssignmentEngine;
  return <main>
    <section className="border-b border-line"><Container className="py-16 lg:py-24">
      <Link href="/#work" className="text-sm text-muted hover:text-ink">← Back to selected work</Link>
      <p className="mt-12 text-xs font-medium tracking-[0.22em] text-accent uppercase">{c.type}</p>
      <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">{c.title}</h1>
      <p className="mt-6 max-w-3xl text-xl leading-8 text-muted">{c.subtitle}</p>
      <div className="mt-12 grid gap-3 sm:grid-cols-2"><div className="border border-line bg-panel p-7"><p className="text-xs uppercase tracking-[0.18em] text-muted">Verified outcome</p><p className="mt-3 font-serif text-3xl text-ink">{c.outcome}</p></div><div className="border border-line bg-panel p-7"><p className="text-xs uppercase tracking-[0.18em] text-muted">Scale</p><p className="mt-3 font-serif text-3xl text-ink">{c.scale}</p></div></div>
      <p className="mt-5 max-w-3xl text-xs leading-6 text-muted">{c.confidentiality}</p>
    </Container></section>
    <section className="py-16 lg:py-24"><Container className="max-w-4xl">
      <div className="space-y-16">{c.sections.map((s,i)=><article key={s.title} className="grid gap-5 border-t border-line pt-10 sm:grid-cols-[9rem_1fr] sm:gap-10"><div><p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">{String(i+1).padStart(2,"0")} · {s.eyebrow}</p></div><div><h2 className="font-serif text-3xl leading-tight text-ink">{s.title}</h2><div className="mt-5 space-y-4">{s.body.map(p=><p key={p} className="text-base leading-8 text-muted">{p}</p>)}</div></div></article>)}</div>
    </Container></section>
    <section className="border-t border-line bg-ink py-16 text-panel"><Container><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[0.18em] text-accent-soft">Next</p><h2 className="mt-3 max-w-2xl font-serif text-3xl">See how I approach AI product problems.</h2></div><Link href="/work/ai-learner-diagnostic" className="rounded-full border border-white/20 px-5 py-3 text-sm hover:bg-white/10">View AI product →</Link></div></Container></section>
  </main>;
}