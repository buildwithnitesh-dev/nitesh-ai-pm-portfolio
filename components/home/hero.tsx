import Link from "next/link";
import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { ResumeCta } from "@/components/resume-cta";
import { StageMarker } from "@/components/trace";
import { Arrow, button } from "@/components/ui";
import { contact, hero, profile } from "@/content/portfolio";

/**
 * Who, what kind of PM, what he believes, then three results that prove it:
 * activation, a strategic trade-off, incentive economics. Static and
 * server-rendered; the thesis is the largest paint.
 */
export function Hero() {
  const [first, ...rest] = hero.positioning.split(" × ");
  return (
    <section aria-labelledby="hero-title" className="border-b border-line">
      <Container className="pt-12 pb-12 lg:pt-16 lg:pb-16">
        <p className="text-lg font-extrabold tracking-[0.08em] text-ink uppercase sm:text-xl">{hero.role}</p>
        <p className="mt-2 text-lg text-muted sm:text-xl">
          {first}
          {rest.map((r) => <span key={r}> <span className="text-accent">×</span> {r}</span>)}
        </p>
        <h1 id="hero-title" className="mt-8 max-w-5xl font-serif text-[3rem] leading-[0.98] text-balance text-ink sm:text-7xl lg:text-[6rem]">
          {hero.headline}
        </h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="max-w-2xl text-lg leading-8 text-muted">{hero.lede}</p>
            <p className="mt-4 text-[15px] tabular-nums text-ink">{profile.experience}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <a href="#work" className={`group ${button.primary}`}>Explore the work <Arrow /></a>
            <ResumeCta label="Resume" className={button.secondary} />
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center gap-1 self-start text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent sm:ml-2 sm:self-auto">
              LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Three results, each with how it was measured and where it happened. */}
        <section aria-label="Proof" className="mt-12 border-t border-ink pt-7 lg:mt-14">
          <p className="flex items-center gap-2.5 text-[15px] font-semibold text-ink"><StageMarker kind="outcome" />Three results, three kinds of judgment</p>
          <ul className="mt-6 grid gap-9 md:grid-cols-3 md:gap-8">
            {hero.proof.map((p) => (
              <li key={p.id} className="flex min-w-0 flex-col">
                <Delta id={p.id} size="sm" showContext={false} />
                <p className="mt-1 text-[13px] leading-5 text-ink">{p.context}</p>
                <p className="mt-auto pt-4"><Link href={p.href} className="group inline-flex min-h-6 items-center gap-2 text-[15px] font-medium text-accent underline decoration-accent/30 underline-offset-[6px] hover:decoration-accent">The decision behind it<span className="sr-only">: {p.context}</span> <Arrow /></Link></p>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </section>
  );
}
