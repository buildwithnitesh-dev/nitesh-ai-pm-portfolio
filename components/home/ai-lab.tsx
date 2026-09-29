import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, EvidenceMark, EvidenceTag, SectionHeading, button } from "@/components/ui";
import { AiSystemFlow } from "@/components/viz/ai-system-flow";
import { LoopDiagram } from "@/components/viz/loop-diagram";
import { aiCapabilities, aiLoop } from "@/content/portfolio";

export function AiLab() {
  return (
    <section id="ai" aria-labelledby="ai-title" className="on-dark scroll-mt-24 border-b border-line bg-dark py-16 text-panel lg:py-22">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1fr_28rem] lg:items-center lg:gap-16">
          <div>
            <SectionHeading
              id="ai-title"
              tone="dark"
              index="05"
              eyebrow="AI product lab"
              title="AI is one step in a product loop. The loop is what I design."
              description="The model is one step inside it. The product work is everything around the model: where rules are enough, how confidence is shown, what happens when it’s wrong, and who can overrule it."
            />
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/work/ai-learner-diagnostic" className={`group ${button.onDark}`}>View the AI prototype <Arrow /></Link>
              <EvidenceTag kind="prototype" tone="dark" />
            </div>
            {/* Professional AI work and the independent prototype are kept visibly separate. */}
            <dl className="mt-10 grid gap-px overflow-hidden rounded-xl bg-white/10 sm:grid-cols-2">
              <div className="bg-ink-raised p-5">
                <dt className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-panel/70 uppercase"><EvidenceMark kind="verified" tone="dark" />Professional · Edfora</dt>
                <dd className="mt-2 text-sm leading-6 text-panel/85">
                  The Adaptive Assignment Engine matched learner ability against question parameters, with an LLM API adjusting difficulty from performance history.{" "}
                  <Link href="/work/adaptive-assignment-engine" className="text-panel underline decoration-white/30 underline-offset-4 hover:decoration-accent-soft">Case 01</Link>
                </dd>
              </div>
              <div className="bg-ink-raised p-5">
                <dt className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-panel/70 uppercase"><EvidenceMark kind="prototype" tone="dark" />Independent · portfolio project</dt>
                <dd className="mt-2 text-sm leading-6 text-panel/85">
                  The AI Learner Diagnostic: a self-built prototype of this loop. No real users, no production results.
                </dd>
              </div>
            </dl>
          </div>
          <LoopDiagram steps={aiLoop} tone="dark" label="The AI product loop: assess, diagnose, explain, recommend, practice, evaluate, adapt" />
        </div>

        <div className="mt-12">
          <AiSystemFlow />
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
          {aiCapabilities.map(([t, b], i) => (
            <li key={t} className="bg-dark p-7 sm:p-9">
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
