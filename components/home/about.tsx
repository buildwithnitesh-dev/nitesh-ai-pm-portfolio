import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, Eyebrow } from "@/components/ui";
import { about, principles, profile } from "@/content/portfolio";

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24 border-b border-line py-20 lg:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <Eyebrow><span className="mr-3 text-subtle">03</span>{about.eyebrow}</Eyebrow>
            <h2 id="about-title" className="mt-3 font-serif text-4xl leading-[1.08] tracking-tight text-ink sm:text-5xl">{about.title}</h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">{about.body}</p>
            <ul aria-label="Strengths" className="mt-8 flex flex-wrap gap-2">
              {profile.strengths.map((s) => <li key={s} className="rounded-full border border-line bg-panel px-3 py-1.5 text-xs text-ink">{s}</li>)}
            </ul>
          </div>
          <dl className="self-end border-t-2 border-ink">
            {about.facts.map(([k, v]) => (
              <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-4 text-sm">
                <dt className="text-muted">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20">
          <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Principles, and where they were earned</p>
          <ul className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
            {principles.map((p) => (
              <li key={p.quote} className="bg-background">
                <Link href={p.href} className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors hover:bg-panel sm:p-8">
                  <blockquote className="font-serif text-2xl leading-snug text-ink">“{p.quote}”</blockquote>
                  <span className="flex items-center justify-between gap-3 text-xs text-muted">
                    <span>From · <span className="text-ink">{p.source}</span></span>
                    <Arrow className="group-hover:text-accent" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
