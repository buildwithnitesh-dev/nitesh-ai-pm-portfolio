import Link from "next/link";
import { Container } from "@/components/container";
import { aiLearnerDiagnostic } from "@/content/case-studies";
import { DiagnosticDemo } from "@/components/diagnostic-demo";

export function AiLearnerDiagnosticPage() {
  const c = aiLearnerDiagnostic;
  return <main>
    <section className="border-b border-line"><Container className="py-16 lg:py-24"><Link href="/#work" className="text-sm text-muted hover:text-ink">← Back to selected work</Link>
      <p className="mt-12 text-xs font-medium tracking-[0.22em] text-accent uppercase">{c.type}</p><h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">{c.title}</h1>
      <p className="mt-6 max-w-3xl text-xl leading-8 text-muted">{c.subtitle}</p>
      <div className="mt-8 inline-flex rounded-full border border-line bg-panel px-4 py-2 text-sm text-muted">Working prototype · Evaluation-led AI product</div>
    </Container></section>
    <DiagnosticDemo />
    <section className="py-16 lg:py-24"><Container className="max-w-4xl"><div className="grid gap-4 md:grid-cols-2">{c.sections.map(([t,b],i)=><article key={t} className="border border-line bg-panel p-7 sm:p-9"><p className="text-xs uppercase tracking-[0.18em] text-accent">0{i+1}</p><h2 className="mt-3 font-serif text-2xl text-ink">{t}</h2><p className="mt-4 text-sm leading-7 text-muted">{b}</p></article>)}</div>
      <div className="mt-12 border border-line p-8"><p className="text-xs uppercase tracking-[0.18em] text-accent">Product PM lens</p><p className="mt-3 max-w-3xl text-base leading-8 text-muted">The prototype demonstrates the product loop and decision design. The interactive demo uses deterministic logic so the experience is reliable and transparent; a production version would connect the same product flow to an LLM, curated retrieval, evaluation datasets, and human controls. No real-user adoption or model-performance results are claimed.</p></div>
    </Container></section>
  </main>;
}