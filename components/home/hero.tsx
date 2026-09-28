import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, EvidenceMark, button } from "@/components/ui";
import { BeforeAfter } from "@/components/viz/before-after";
import { ResumeCta } from "@/components/resume-cta";
import { ThinkingLoop } from "@/components/viz/thinking-loop";
import { contact, hero, profile, readingPaths, retentionHeadline } from "@/content/portfolio";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid gap-14 pt-14 pb-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(20rem,0.85fr)] lg:items-center lg:gap-16 lg:pt-20">
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-5 max-w-4xl font-serif text-5xl leading-[1.03] tracking-tight text-ink sm:text-6xl lg:text-[4.9rem]">
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">{hero.lede}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={hero.primaryCta.href} className={`group ${button.primary}`}>{hero.primaryCta.label} <Arrow /></a>
            <a href={hero.secondaryCta.href} className={button.secondary}>{hero.secondaryCta.label}</a>
          </div>
          <p className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <ResumeCta className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent" />
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">
              LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        </div>
        <div>
          <GlanceCard />
          <ThinkingLoop />
        </div>
      </Container>

      <Container className="pb-16 lg:pb-20">
        <nav aria-label="Choose your reading depth">
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Short on time? Choose your depth</p>
          <ol className="mt-4 grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
            {readingPaths.map((p, i) => (
              <li key={p.title} className="bg-background">
                <Link href={p.href} className="group flex h-full items-start gap-4 p-5 transition-colors hover:bg-panel sm:p-6">
                  <span className="mt-0.5 w-14 shrink-0 font-mono text-xs text-accent">{p.time}</span>
                  <span className="flex-1">
                    <span className="flex items-baseline justify-between gap-3 text-sm font-medium text-ink">
                      {p.title}
                      <Arrow className="text-muted group-hover:text-accent" />
                    </span>
                    <span className="mt-1 block text-sm leading-6 text-muted">{p.body}</span>
                  </span>
                  <span className="sr-only">Path {i + 1} of {readingPaths.length}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </section>
  );
}

/** A product-UI style summary: the three facts a recruiter screens for, before reading anything else. */
function GlanceCard() {
  return (
    <aside aria-label="At a glance" className="rounded-2xl border border-line bg-panel shadow-[0_1px_0_rgba(17,17,16,0.04),0_24px_60px_-28px_rgba(17,17,16,0.18)]">
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
        <div>
          <p className="text-sm font-medium text-ink">{profile.name}</p>
          <p className="text-xs text-muted">Senior PM · most recently Edfora · {profile.experience}</p>
        </div>
        <a href="#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs whitespace-nowrap text-accent transition-colors hover:bg-accent-tint">
          <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
          Open to roles
        </a>
      </div>

      <div className="px-6 py-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs text-muted">{retentionHeadline.label}</p>
          <p className="flex items-center gap-1.5 text-[11px] text-muted"><EvidenceMark kind="verified" /> Verified</p>
        </div>
        <p className="mt-1 text-4xl font-semibold tracking-tight text-ink">12% → 25%</p>
        <div className="mt-4">
          <BeforeAfter compact before={retentionHeadline.before} after={retentionHeadline.after} caption={retentionHeadline.context} />
        </div>
      </div>

      <dl className="grid grid-cols-2 border-t border-line">
        <div className="border-r border-line px-6 py-4">
          <dt className="text-xs text-muted">Assignment completion · Edfora</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink">+18–25%</dd>
        </div>
        <div className="px-6 py-4">
          <dt className="text-xs text-muted">Learners reached · Edfora</dt>
          <dd className="mt-1 text-2xl font-semibold tracking-tight text-ink">100K+</dd>
        </div>
      </dl>

      <div className="flex items-center justify-between gap-4 rounded-b-2xl border-t border-line bg-background/60 px-6 py-3 text-xs text-muted">
        <span className="truncate">{contact.email}</span>
        <a href="#metrics" className="group shrink-0 text-ink hover:text-accent">All outcomes <Arrow /></a>
      </div>
    </aside>
  );
}
