import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, EvidenceTag, SectionHeading, button } from "@/components/ui";
import { LoopDiagram } from "@/components/viz/loop-diagram";
import { aiCapabilities, aiLoop } from "@/content/portfolio";

export function AiLab() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="on-dark scroll-mt-24 border-b border-line bg-ink py-20 text-panel lg:py-28">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_28rem] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="ai-title"
              tone="dark"
              index="06"
              eyebrow="AI product lab"
              title="I treat AI as a product system — not a feature checkbox."
              description="This loop is the product. The model is one step inside it; evaluation and human control are what make it shippable."
            />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/work/ai-learner-diagnostic" className={`group ${button.onDark}`}>View AI product <Arrow /></Link>
              <EvidenceTag kind="prototype" tone="dark" />
            </div>
          </div>
          <LoopDiagram steps={aiLoop} tone="dark" label="The AI product loop: assess, diagnose, explain, recommend, practice, evaluate, adapt" />
        </div>

        <ol className="mt-20 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
          {aiCapabilities.map(([t, b], i) => (
            <li key={t} className="bg-ink p-7 sm:p-9">
              <p className="font-mono text-xs text-accent-soft/60">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-3 font-serif text-2xl">{t}</h3>
              <p className="mt-3 text-sm leading-7 text-panel/70">{b}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
