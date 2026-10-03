import { Container } from "@/components/container";
import { ResumeCta } from "@/components/resume-cta";
import { Arrow, button } from "@/components/ui";
import { contact, hero, profile } from "@/content/portfolio";

/**
 * Who, what kind of PM, and the thesis, in one compact block that hands
 * straight over to the proof strip below it: the first evidence should be
 * visible without a long scroll.
 */
export function Hero() {
  const [first, ...rest] = hero.positioning.split(" × ");
  return (
    <section aria-labelledby="hero-title">
      <Container className="pt-8 pb-8 sm:pt-10 lg:pt-14 lg:pb-10">
        <p className="text-base font-extrabold tracking-[0.08em] text-ink uppercase sm:text-lg">
          {hero.role}
          <span className="mt-1 block font-normal tracking-normal text-muted normal-case sm:mt-0 sm:ml-3 sm:inline">
            {first}
            {rest.map((r) => <span key={r}> <span className="text-accent">×</span> {r}</span>)}
          </span>
        </p>
        <h1 id="hero-title" className="mt-5 max-w-5xl font-serif text-[2.6rem] leading-[1] text-balance text-ink sm:text-6xl lg:text-[4.6rem]">
          {hero.headline}
        </h1>
        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-10">
          <div>
            <p className="max-w-2xl text-base leading-7 text-ink/80 sm:text-lg sm:leading-8">{hero.lede}</p>
            <p className="mt-3 text-[15px] tabular-nums text-muted">{profile.experience} · EdTech and consumer gaming<a href={contact.linkedin} target="_blank" rel="noreferrer" className="flex min-h-11 w-fit items-center gap-1 font-medium text-ink underline decoration-line-strong underline-offset-4 sm:hidden">LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span></a></p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex sm:items-center">
            <a href="#work" className={`group ${button.primary} px-4 sm:px-6`}>See the work <Arrow /></a>
            <ResumeCta label="Resume" className={`${button.secondary} px-4 sm:px-6`} />
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="hidden min-h-11 items-center gap-1 text-[15px] font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent sm:ml-2 sm:inline-flex">
              LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
