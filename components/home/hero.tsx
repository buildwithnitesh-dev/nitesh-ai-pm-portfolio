import { Container } from "@/components/container";
import { Arrow, EvidenceMark, button } from "@/components/ui";
import { BeforeAfter } from "@/components/viz/before-after";
import { ResumeCta } from "@/components/resume-cta";
import { ProductIntelligenceNetwork } from "@/components/home/product-intelligence-network";
import { ThinkingLoop } from "@/components/viz/thinking-loop";
import { about, contact, hero, profile, retentionHeadline } from "@/content/portfolio";

export function Hero() {
  return (
    // `relative isolate`: the decorative network sits behind the Hero content and is clipped to the Hero.
    <section aria-labelledby="hero-title" className="relative isolate border-b border-line">
      <ProductIntelligenceNetwork />
      <Container className="grid gap-14 pt-11.5 pb-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-center lg:gap-16 lg:pt-16 lg:pb-16">
        <div data-network-quiet>
          {/* Each term stays whole; lines break only after a separator. */}
          <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
            {hero.eyebrow.split("  ·  ").map((t, i, all) => (
              <span key={t}><span className="whitespace-nowrap">{t}{i < all.length - 1 ? "\u00a0·" : ""}</span>{i < all.length - 1 ? " " : ""}</span>
            ))}
          </p>
          <h1 id="hero-title" className="mt-5 max-w-4xl font-serif text-5xl leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-[4.9rem]">
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">{hero.lede}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={hero.primaryCta.href} className={`group ${button.primary}`}>{hero.primaryCta.label} <Arrow /></a>
            <ResumeCta className={button.secondary} />
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        </div>
        <div data-network-quiet>
          <GlanceCard />
          <ThinkingLoop />
        </div>
      </Container>
    </section>
  );
}

/** A product-UI style summary: the three facts a recruiter screens for, before reading anything else. */
function GlanceCard() {
  return (
    <aside aria-label="At a glance" className="rounded-2xl border border-line bg-panel shadow-[0_1px_0_rgba(17,17,16,0.04),0_24px_60px_-28px_rgba(17,17,16,0.18)]">
      <div className="border-b border-line px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ink">{profile.name}</p>
            <p className="text-xs text-muted">Senior PM · {profile.experience}</p>
          </div>
          <a href="#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs whitespace-nowrap text-accent transition-colors hover:bg-accent-tint">
            <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
            Open to roles
          </a>
        </div>
        {/* Full width under the role line, so it wraps across the card rather than beside the pill. */}
        <p className="mt-1.5 text-xs leading-5 text-ink">{about.facts.find(([k]) => k === "Domains")?.[1]}</p>
      </div>

      <div className="px-6 py-4">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs text-muted">{retentionHeadline.label}</p>
          <p className="flex items-center gap-1.5 text-[11px] text-muted"><EvidenceMark kind="verified" /> Documented</p>
        </div>
        <p className="mt-1 text-3xl font-semibold tracking-tight whitespace-nowrap text-ink min-[360px]:text-4xl">12.2% → 25.4%</p>
        <div className="mt-3">
          <BeforeAfter compact beforeLabel="Control" afterLabel="Redesign" before={retentionHeadline.before} after={retentionHeadline.after} caption={retentionHeadline.context} />
        </div>
      </div>

      {/* Stacked below 400px so each value stays on one line; side by side above. */}
      <dl className="grid border-t border-line min-[400px]:grid-cols-2">
        <div className="border-b border-line px-6 py-3 min-[400px]:border-r min-[400px]:border-b-0">
          <dt className="text-xs text-muted">Assignment completion · Edfora</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight whitespace-nowrap text-ink">18% → 45%</dd>
        </div>
        <div className="px-6 py-3">
          <dt className="text-xs text-muted">Learners reached · Edfora</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink">100K+</dd>
        </div>
      </dl>

      {/* Résumé tools as one quiet keyword line; the label sits inline so the list wraps at full width. */}
      <p className="border-t border-line px-6 py-2.5 text-[11px] leading-5 text-muted">
        <span className="mr-2 font-mono tracking-[0.14em] text-subtle uppercase">Tools</span>
        {profile.tools.map((t, i) => <span key={t}><span className="whitespace-nowrap">{t}</span>{i < profile.tools.length - 1 ? "\u00a0· " : ""}</span>)}
      </p>

      <div className="flex items-center justify-between gap-4 rounded-b-2xl border-t border-line bg-background/60 px-6 py-3 text-xs text-muted">
        <span className="truncate">{contact.email}</span>
        <a href="#metrics" className="group shrink-0 text-ink hover:text-accent">All outcomes <Arrow /></a>
      </div>
    </aside>
  );
}
