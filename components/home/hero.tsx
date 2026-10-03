import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { ResumeCta } from "@/components/resume-cta";
import { Arrow, button } from "@/components/ui";
import { contact, hero, profile } from "@/content/portfolio";

/**
 * 5-second scan, in reading order: the role, the thesis, the specialization,
 * then the one result the thesis comes from. Static and server-rendered: the
 * H1 is the largest paint.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid gap-12 pt-12 pb-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16 lg:pt-20 lg:pb-20">
        <div>
          <p className="text-base font-semibold tracking-[0.14em] text-ink uppercase sm:text-lg">{hero.role}</p>
          <h1 id="hero-title" className="mt-5 font-serif text-[3.1rem] leading-[1] tracking-tight text-balance text-ink sm:text-7xl lg:text-[5.4rem]">
            {hero.headline}
          </h1>
          <p className="mt-6 text-xl tracking-tight text-accent sm:text-2xl">{hero.positioning}</p>
          <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{hero.lede}</p>
          <p className="mt-5 font-mono text-xs tracking-[0.04em] text-ink">{profile.experience}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#work" className={`group ${button.primary}`}>Explore the work <Arrow /></a>
            <ResumeCta label="Resume" className={button.secondary} />
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center gap-1 self-start text-sm text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent sm:ml-2 sm:self-auto">
              LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* The result the thesis comes from, on the same dark surface as the share card. */}
        <aside aria-label="Proof" className="on-dark rounded-2xl bg-dark p-6 text-panel sm:p-8">
          <p className="text-sm text-panel/60">Where the thesis comes from</p>
          <div className="mt-6"><Delta id={hero.proof} size="md" tone="dark" link="/work/onboarding-funnel-redesign" /></div>
          <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-6 text-panel/75">Only ~12% of new users played on day one. Five changes to the first 60 seconds, tested against a 30% control.</p>
        </aside>
      </Container>
    </section>
  );
}
