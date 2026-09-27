import { Container } from "@/components/container";
import { EvidenceTag, SectionHeading } from "@/components/ui";
import { BeforeAfter } from "@/components/viz/before-after";
import { UpliftChart } from "@/components/viz/uplift-chart";
import { retentionHeadline } from "@/content/portfolio";

export function Impact() {
  return (
    <section id="metrics" aria-labelledby="metrics-title" className="scroll-mt-24 border-b border-line py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="metrics-title"
            index="01"
            eyebrow="Verified impact"
            title="Results from the work — not projections."
            description="Selected outcomes from professional product work, charted with exactly the precision available: ranges stay ranges, approximations stay approximate."
          />
          <EvidenceTag kind="verified" />
        </div>

        {/* Headline first: one outcome, big, then the supporting set. */}
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-[1.4fr_1fr]">
          <div className="bg-panel p-6 sm:p-9">
            <p className="text-xs tracking-[0.16em] text-muted uppercase">Headline outcome</p>
            <p className="mt-3 max-w-md font-serif text-3xl leading-tight text-ink">Day-7 retention more than doubled after an onboarding redesign.</p>
            <div className="mt-8">
              <BeforeAfter before={retentionHeadline.before} after={retentionHeadline.after} beforeLabel="Before" afterLabel="After redesign" caption={retentionHeadline.context} />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-8 bg-panel p-6 sm:p-9">
            <div>
              <p className="text-xs tracking-[0.16em] text-muted uppercase">Scale</p>
              <p className="mt-3 text-6xl font-semibold tracking-tight text-ink">100K+</p>
              <p className="mt-2 text-sm text-ink">Learners impacted</p>
              <p className="mt-1 text-sm leading-6 text-muted">Across learning, personalization, and engagement experiences.</p>
            </div>
            <div className="border-t border-line pt-5">
              <p className="text-xs tracking-[0.16em] text-muted uppercase">Growth</p>
              <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">~10% <span className="text-base font-normal text-muted">week over week</span></p>
              <p className="mt-1 text-sm leading-6 text-muted">GMV growth from A/B testing and user segmentation.</p>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <UpliftChart />
        </div>
      </Container>
    </section>
  );
}
