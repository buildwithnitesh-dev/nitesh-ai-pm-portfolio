import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { ResumeCta } from "@/components/resume-cta";
import { Arrow, button } from "@/components/ui";
import { contact, deltas, hero, profile } from "@/content/portfolio";

/**
 * 5-second scan: who (identity line), what he believes (thesis), how he works
 * (lede), and three proof points, visible together in the first screen on
 * desktop. Static and server-rendered: the H1 is the largest paint.
 */
export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="grid gap-12 pt-12 pb-14 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.85fr)] lg:items-center lg:gap-16 lg:pt-20 lg:pb-20">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-accent uppercase">{hero.identity}</p>
          <h1 id="hero-title" className="mt-6 font-serif text-[3.1rem] leading-[1] tracking-tight text-balance text-ink sm:text-7xl lg:text-[5.4rem]">
            {hero.headline}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">{hero.lede}</p>
          <p className="mt-5 font-mono text-xs tracking-[0.04em] text-ink">{profile.experience}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#work" className={`group ${button.primary}`}>Explore the work <Arrow /></a>
            <ResumeCta label="Resume" className={button.secondary} />
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="text-sm text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent sm:ml-2">
              LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* The proof panel: the same dark surface as the share card. */}
        <aside aria-label="Proof" className="on-dark rounded-2xl bg-dark px-6 py-2 text-panel sm:px-8">
          <ul>
            {hero.proof.map((id) => (
              <li key={id} className="border-b border-white/10 py-6 last:border-0">
                <Delta id={id} size="md" tone="dark" />
              </li>
            ))}
          </ul>
          <p className="border-t border-white/10 py-4 font-mono text-[11px] leading-5 text-panel/60">
            {deltas.learners.after} {deltas.learners.label.toLowerCase()} · {deltas.learners.method}
          </p>
        </aside>
      </Container>
    </section>
  );
}
