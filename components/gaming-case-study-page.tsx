import Link from "next/link";
import { Container } from "@/components/container";

const sections = [
  ["Context", "The product problem", "The onboarding funnel had a large amount of value concentrated in the first few sessions. The product question was how to reduce early friction and get more users to the point where the core experience could demonstrate its value."],
  ["Diagnosis", "Treat the funnel as a system", "I approached onboarding as a sequence of decisions rather than a collection of screens: entry → setup → first meaningful action → early engagement → return. Funnel behavior and user segmentation were used to identify where the experience was losing momentum."],
  ["Strategy", "Reduce friction before adding more incentives", "The redesign focused on the end-to-end onboarding journey and the moments that determined whether a new user reached meaningful product value. Experimentation was used to test changes rather than relying on opinion."],
  ["Hypothesis", "A clearer first-session path should improve early retention", "If the onboarding journey makes the first meaningful experience easier to reach and removes avoidable friction, then more users should return after the first week."],
  ["Experimentation", "Use segmentation to understand why retention moves", "The work combined funnel analysis, user segmentation, and A/B testing. The goal was not only to move the headline metric, but to understand which user behaviors and journey changes explained the movement."],
  ["Outcome", "Day-7 retention moved from 12% to 25%", "The verified outcome was an improvement in Day-7 retention from 12% to 25%. The result is presented as a professional outcome; proprietary experiment details and internal implementation data are intentionally omitted."],
  ["Learning", "Retention is won before the retention metric", "The strongest retention work often happens upstream: reduce time-to-value, make the first meaningful action obvious, and instrument the journey so the team can distinguish a real product improvement from a temporary lift."],
] as const;

export function GamingCaseStudyPage() {
  return <main>
    <section className="border-b border-line"><Container className="py-16 lg:py-24">
      <Link href="/#work" className="text-sm text-muted hover:text-ink">← Back to selected work</Link>
      <p className="mt-12 text-xs font-medium tracking-[0.22em] text-accent uppercase">Gaming · Professional experience</p>
      <h1 className="mt-4 max-w-5xl font-serif text-5xl leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">Onboarding Funnel Redesign</h1>
      <p className="mt-6 max-w-3xl text-xl leading-8 text-muted">Improving early product value and Day-7 retention through funnel thinking, segmentation, and experimentation.</p>
      <div className="mt-12 grid gap-3 sm:grid-cols-2"><div className="border border-line bg-panel p-7"><p className="text-xs uppercase tracking-[0.18em] text-muted">Verified outcome</p><p className="mt-3 font-serif text-3xl text-ink">12% → 25% Day-7 retention</p></div><div className="border border-line bg-panel p-7"><p className="text-xs uppercase tracking-[0.18em] text-muted">Product lens</p><p className="mt-3 font-serif text-3xl text-ink">Growth · Activation · Experimentation</p></div></div>
      <p className="mt-5 max-w-3xl text-xs leading-6 text-muted">This case study focuses on product reasoning and the verified outcome. Proprietary implementation details, internal data, and confidential employer information are intentionally omitted.</p>
    </Container></section>
    <section className="py-16 lg:py-24"><Container className="max-w-4xl"><div className="space-y-16">{sections.map(([eyebrow,title,body],i)=><article key={title} className="grid gap-5 border-t border-line pt-10 sm:grid-cols-[9rem_1fr] sm:gap-10"><div><p className="text-xs font-medium tracking-[0.18em] text-accent uppercase">{String(i+1).padStart(2,"0")} · {eyebrow}</p></div><div><h2 className="font-serif text-3xl leading-tight text-ink">{title}</h2><p className="mt-5 text-base leading-8 text-muted">{body}</p></div></article>)}</div></Container></section>
    <section className="border-t border-line bg-ink py-16 text-panel"><Container><div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end"><div><p className="text-xs uppercase tracking-[0.18em] text-accent-soft">Next</p><h2 className="mt-3 max-w-2xl font-serif text-3xl">See how I approach AI product problems.</h2></div><Link href="/work/ai-learner-diagnostic" className="rounded-full border border-white/20 px-5 py-3 text-sm hover:bg-white/10">View AI product →</Link></div></Container></section>
  </main>;
}
