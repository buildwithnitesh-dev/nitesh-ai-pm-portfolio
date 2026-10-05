import Link from "next/link";
import { Container } from "@/components/container";
import { Delta } from "@/components/delta";
import { ResumeCta } from "@/components/resume-cta";
import { ProductIntelligenceNetwork } from "@/components/home/product-intelligence-network";
import { StageMarker } from "@/components/trace";
import { Arrow, button } from "@/components/ui";
import { contact, hero, profile, status } from "@/content/portfolio";

/**
 * Who, what kind of PM, what he believes, then three results that prove it:
 * activation, a strategic trade-off, incentive economics. Static and
 * server-rendered; the thesis is the largest paint.
 */
export function Hero() {
  const [first, ...rest] = hero.positioning.split(" × ");
  return (
    // `relative isolate`: the decorative network sits behind the Hero content and is clipped to the Hero.
    <section aria-labelledby="hero-title" className="relative isolate border-b border-line">
      <ProductIntelligenceNetwork />
      <Container className="pt-7 pb-10 sm:pt-9 lg:pt-12 lg:pb-12">
        <p data-network-quiet className="text-[17px] font-extrabold tracking-[0.05em] text-ink uppercase min-[375px]:text-xl min-[375px]:tracking-[0.08em] lg:text-[22px]">{hero.role}</p>
        <p data-network-quiet className="mt-1.5 text-xl leading-tight text-muted min-[375px]:text-[22px] lg:text-[26px]">
          {first}
          {rest.map((r) => <span key={r}> <span className="text-accent">×</span> {r}</span>)}
        </p>
        <h1 data-network-quiet id="hero-title" className="mt-5 sm:mt-6 max-w-6xl font-serif text-[2.15rem] leading-[1.02] min-[375px]:text-[2.6rem] text-balance text-ink sm:text-[3.5rem] lg:text-[4.25rem] xl:text-[4.75rem]">
          {/* A no-break space before the last word keeps it from standing alone on a line. */}
          {hero.headline.replace(/ (\S+)$/, "\u00a0$1")}
        </h1>
        <div className="mt-6 grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div data-network-quiet>
            <p className="max-w-2xl text-lg leading-8 text-muted">{hero.lede}</p>
            <p className="mt-4 text-[15px] tabular-nums text-ink">{profile.experience}<span className="text-muted"> · Edfora · Witzeal · Baazi Games</span></p>
            {status.availability ? <p className="mt-1 text-[15px] text-ink">{status.availability.replace(/ · .*/, "")}<span className="text-muted">{status.availability.replace(/^[^·]*(?= · )/, "")}</span></p> : null}
          </div>
          {/* From 375px the two buttons share a row on phones, so the first result reaches the first screen; narrower phones stack them. */}
          <div data-network-quiet className="grid gap-3 min-[375px]:grid-cols-[auto_minmax(0,1fr)] min-[375px]:gap-x-2.5 sm:flex sm:flex-row sm:items-center sm:gap-3">
            <a href="#work" className={`group ${button.primary}`}>Explore the work <Arrow /></a>
            <ResumeCta label="Resume" className={button.secondary} />
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center gap-1 self-start justify-self-start text-[15px] min-[375px]:col-span-2 font-medium text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent sm:ml-2 sm:self-auto">
              LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>

        {/* Two results, each with how it was measured and where it happened. */}
        <section data-network-quiet aria-label="Proof" className="mt-6 border-t border-ink pt-5 sm:mt-9 sm:pt-6 lg:mt-10">
          <p className="flex items-center gap-2.5 text-[15px] font-semibold text-ink"><StageMarker kind="outcome" />Selected product outcomes</p>
          <ul className="mt-4 grid gap-7 sm:mt-5 md:grid-cols-2 md:gap-8">
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
