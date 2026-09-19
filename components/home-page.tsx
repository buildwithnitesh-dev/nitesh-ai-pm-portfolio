import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import {
  aiCapabilities,
  caseStudies,
  contact,
  experience,
  expertise,
  hero,
  philosophy,
  profile,
  signals,
} from "@/content/portfolio";

export function HomePage() {
  return (
    <>
      <Hero />
      <Impact />
      <Expertise />
      <Work />
      <Experience />
      <Ai />
      <Thinking />
      <Contact />
    </>
  );
}

function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative overflow-hidden border-b border-line"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(28,74,68,0.09),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(22,21,19,0.04),transparent_40%)]"
      />
      <Container className="relative grid gap-16 py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:items-end lg:py-28">
        <div>
          <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
            {hero.eyebrow}
          </p>
          <h1
            id="hero-heading"
            className="mt-5 max-w-3xl font-serif text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl lg:text-[3.35rem]"
          >
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted sm:text-lg">
            {hero.lede}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={hero.primaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm text-panel transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="inline-flex h-12 items-center justify-center rounded-full border border-line px-6 text-sm text-ink transition-colors hover:border-ink/30 hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {hero.secondaryCta.label}
            </a>
          </div>
        </div>

        <aside className="border border-line bg-panel p-7">
          <p className="text-xs tracking-[0.18em] text-muted uppercase">
            Currently
          </p>
          <p className="mt-3 font-serif text-2xl leading-snug text-ink">
            {profile.role}
          </p>
          <dl className="mt-8 space-y-5">
            <div>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">
                Experience
              </dt>
              <dd className="mt-1 text-sm text-ink">{profile.experience} shipping products</dd>
            </div>
            <div>
              <dt className="text-xs tracking-[0.16em] text-muted uppercase">
                Domains
              </dt>
              <dd className="mt-1 text-sm leading-6 text-ink">
                {profile.domains.join("  ·  ")}
              </dd>
            </div>
          </dl>
        </aside>
      </Container>
    </section>
  );
}

function Impact() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="scroll-mt-24 border-b border-line py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="impact-heading"
          eyebrow="Selected signals"
          title="A decade of product work, distilled."
          description="These are the facts of the practice — not vanity metrics. Named outcomes belong with the case studies still to come."
        />
        <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {signals.map((item) => (
            <li key={item.label} className="bg-background p-7">
              <p className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">
                {item.value}
              </p>
              <p className="mt-3 text-sm font-medium text-ink">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.detail}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Expertise() {
  return (
    <section
      id="expertise"
      aria-labelledby="expertise-heading"
      className="scroll-mt-24 border-b border-line py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="expertise-heading"
          eyebrow="Product leadership"
          title="Where I spend my judgment."
        />
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item) => (
            <li
              key={item.title}
              className="border border-line bg-panel/60 p-7"
            >
              <h3 className="font-serif text-xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Work() {
  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="scroll-mt-24 border-b border-line py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="work-heading"
          eyebrow="Featured case studies"
          title="Three domains. One product craft."
          description="Detailed company write-ups will live here. For now, these are the problem spaces I have spent a career inside — framed the way I would brief a hiring manager."
        />
        <ol className="mt-14 divide-y divide-line border-y border-line">
          {caseStudies.map((study) => (
            <li
              key={study.index}
              className="grid gap-6 py-10 lg:grid-cols-[7rem_1fr_14rem] lg:gap-12"
            >
              <p className="font-serif text-2xl text-accent">{study.index}</p>
              <div>
                <p className="text-xs tracking-[0.18em] text-muted uppercase">
                  {study.domain}
                </p>
                <h3 className="mt-2 font-serif text-2xl leading-snug text-ink sm:text-3xl">
                  {study.title}
                </h3>
                <p className="mt-4 max-w-2xl text-base leading-7 text-muted">
                  {study.summary}
                </p>
              </div>
              <ul className="flex flex-wrap content-start gap-2 lg:justify-end">
                {study.focus.map((tag) => (
                  <li
                    key={tag}
                    className="h-8 rounded-full border border-line px-3 text-xs leading-8 text-muted"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 border-b border-line py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="experience-heading"
          eyebrow="Experience"
          title="A career shaped by three kinds of users."
        />
        <ol className="mt-12 space-y-0">
          {experience.map((item) => (
            <li
              key={item.period}
              className="grid gap-3 border-t border-line py-8 sm:grid-cols-[10rem_1fr] sm:gap-10"
            >
              <p className="text-xs tracking-[0.18em] text-accent uppercase">
                {item.period}
              </p>
              <div>
                <h3 className="font-serif text-2xl text-ink">{item.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted sm:text-base">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Ai() {
  return (
    <section
      id="ai"
      aria-labelledby="ai-heading"
      className="scroll-mt-24 border-b border-line bg-ink py-20 text-panel lg:py-24"
    >
      <Container>
        <p className="text-xs font-medium tracking-[0.22em] text-accent-soft/80 uppercase">
          AI product capabilities
        </p>
        <h2
          id="ai-heading"
          className="mt-3 max-w-2xl font-serif text-3xl leading-tight tracking-tight sm:text-4xl"
        >
          Intelligence belongs in the product only when it changes the outcome.
        </h2>
        <ul className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2">
          {aiCapabilities.map((item) => (
            <li key={item.title} className="bg-ink p-7 sm:p-8">
              <h3 className="font-serif text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-panel/70">{item.body}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function Thinking() {
  return (
    <section
      id="thinking"
      aria-labelledby="thinking-heading"
      className="scroll-mt-24 border-b border-line py-20 lg:py-24"
    >
      <Container>
        <SectionHeading
          id="thinking-heading"
          eyebrow="How I think"
          title="A short product philosophy."
        />
        <ol className="mt-12 grid gap-10 lg:grid-cols-3">
          {philosophy.map((item, index) => (
            <li key={item.title}>
              <p className="font-serif text-sm text-accent">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 font-serif text-2xl text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-24 py-20 lg:py-28"
    >
      <Container>
        <div className="border border-line bg-panel px-6 py-14 sm:px-12 lg:px-16">
          <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
            {contact.eyebrow}
          </p>
          <h2
            id="contact-heading"
            className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-ink sm:text-5xl"
          >
            {contact.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted">
            {contact.body}
          </p>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-muted">
            {contact.note}
          </p>
          <a
            href="#work"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm text-panel transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Review the work first
          </a>
        </div>
      </Container>
    </section>
  );
}
