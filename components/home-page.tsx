import Link from "next/link";
import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { AboutSection } from "@/components/about-section";
import { MetricsGrid } from "@/components/metrics-grid";
import { aiCapabilities, caseStudies, contact, expertise, experience, hero, profile } from "@/content/portfolio";

export function HomePage() {
  return <><Hero/><AboutSection/><MetricsGrid/><Expertise/><Work/><Experience/><Ai/><Contact/></>;
}
function Hero() {
  return <section className="relative overflow-hidden border-b border-line"><div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(28,74,68,0.09),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(22,21,19,0.04),transparent_40%)]"/>
    <Container className="relative grid gap-16 py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end lg:py-28">
      <div><p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">{hero.eyebrow}</p>
        <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.7rem]">{hero.headline}</h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">{hero.lede}</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href="#work" className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm text-panel hover:bg-accent">{hero.primaryCta.label}</a><a href="#contact" className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-sm text-ink hover:bg-panel">{hero.secondaryCta.label}</a></div>
      </div>
      <aside className="border border-line bg-panel p-7 shadow-[0_20px_60px_rgba(17,17,16,0.05)]">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">Current focus</p><p className="mt-3 font-serif text-2xl leading-snug text-ink">{profile.role}</p>
        <div className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2 lg:grid-cols-1"><div><p className="text-xs tracking-[0.16em] text-muted uppercase">Experience</p><p className="mt-1 text-sm text-ink">{profile.experience}</p></div><div><p className="text-xs tracking-[0.16em] text-muted uppercase">Focus</p><p className="mt-1 text-sm leading-6 text-ink">Growth · Consumer · AI-led experiences</p></div></div>
      </aside>
    </Container>
  </section>;
}
function Expertise() {
  return <section id="expertise" className="scroll-mt-24 border-b border-line py-20 lg:py-24"><Container><SectionHeading eyebrow="Product leadership" title="Where I spend my judgment."/>
    <ul className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{expertise.map(([t,b])=><li key={t} className="border border-line bg-panel/60 p-7"><h3 className="font-serif text-xl text-ink">{t}</h3><p className="mt-3 text-sm leading-7 text-muted">{b}</p></li>)}</ul>
  </Container></section>;
}
function Work() {
  return <section id="work" className="scroll-mt-24 border-b border-line py-20 lg:py-24"><Container><SectionHeading eyebrow="Selected work" title="Proof through product decisions." description="A mix of professional outcomes and an independent AI product build. Each case study separates verified results from product reasoning."/>
    <ol className="mt-14 divide-y divide-line border-y border-line">{caseStudies.map(s=><li key={s.index} className="grid gap-6 py-10 lg:grid-cols-[5rem_1fr_10rem] lg:gap-10">
      <p className="font-serif text-2xl text-accent">{s.index}</p><div><p className="text-xs tracking-[0.18em] text-muted uppercase">{s.domain}</p><h3 className="mt-2 font-serif text-2xl leading-snug text-ink sm:text-3xl"><Link href={s.href} className="hover:text-accent">{s.title} ↗</Link></h3><p className="mt-4 max-w-2xl text-base leading-7 text-muted">{s.summary}</p></div>
      <div className="flex flex-col items-start gap-3 lg:items-end"><p className="text-xs tracking-[0.18em] text-muted uppercase">Outcome</p><p className="font-serif text-xl text-ink">{s.index === "01" ? "18–25% completion uplift" : s.index === "02" ? "12% → 25% Day-7 retention" : "Prototype · no real-user results"}</p><ul className="flex flex-wrap gap-2 lg:justify-end">{s.tags.map(t=><li key={t} className="h-8 rounded-full border border-line px-3 text-xs leading-8 text-muted">{t}</li>)}</ul></div>
    </li>)}</ol>
  </Container></section>;
}
function Experience() {
  return <section id="experience" className="scroll-mt-24 border-b border-line py-20 lg:py-24"><Container><SectionHeading eyebrow="Experience" title="A career shaped by three kinds of product problems."/>
    <ol className="mt-12">{experience.map(([period,title,body])=><li key={period} className="grid gap-3 border-t border-line py-8 sm:grid-cols-[10rem_1fr] sm:gap-10"><p className="text-xs tracking-[0.18em] text-accent uppercase">{period}</p><div><h3 className="font-serif text-2xl text-ink">{title}</h3><p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">{body}</p></div></li>)}</ol>
  </Container></section>;
}
function Ai() {
  return <section id="ai" className="scroll-mt-24 border-b border-line bg-ink py-20 text-panel lg:py-24"><Container><p className="text-xs font-medium tracking-[0.22em] text-accent-soft/80 uppercase">AI product lab</p>
    <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end"><h2 className="max-w-3xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl">I treat AI as a product system — not a feature checkbox.</h2><Link href="/work/ai-learner-diagnostic" className="shrink-0 rounded-full border border-white/20 px-5 py-3 text-sm hover:bg-white/10">View AI product →</Link></div>
    <ul className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2">{aiCapabilities.map(([t,b])=><li key={t} className="bg-ink p-7 sm:p-8"><h3 className="font-serif text-xl">{t}</h3><p className="mt-3 text-sm leading-7 text-panel/70">{b}</p></li>)}</ul>
  </Container></section>;
}
function Contact() {
  return <section id="contact" className="scroll-mt-24 py-20 lg:py-28"><Container><div className="border border-line bg-panel px-6 py-14 sm:px-12 lg:px-16">
    <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">{contact.eyebrow}</p><h2 className="mt-4 max-w-4xl font-serif text-4xl leading-tight text-ink sm:text-5xl">{contact.title}</h2><p className="mt-6 max-w-2xl text-base leading-8 text-muted">{contact.body}</p>
    <div className="mt-9 flex flex-col gap-3 sm:flex-row"><a href={`mailto:${contact.email}`} className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm text-panel hover:bg-accent">Email Nitesh</a><a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-sm text-ink hover:bg-background">LinkedIn ↗</a></div>
  </div></Container></section>;
}