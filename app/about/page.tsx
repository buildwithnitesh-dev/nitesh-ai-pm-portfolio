import { Container } from "@/components/container";
import { CopyEmail } from "@/components/home/copy-email";
import { ResumeCta } from "@/components/resume-cta";
import Image from "next/image";
import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { Arrow, Mono, button } from "@/components/ui";
import { about, arc, contact, principles, profile, roles, technical } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/about",
  title: "About",
  description: "Nitesh Tiwari, Senior Product Manager: from sole Android developer to release management, gaming, growth, EdTech personalization and AI, and the four principles behind the work. ~7 years in product management, 10+ years in technology.",
});

// Checked at build time (the page is static): the portrait shows only once the real photo is in /public.
const hasPortrait = existsSync(join(process.cwd(), "public", about.portrait.src));

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <aside aria-label="Profile" className="sm:max-lg:grid sm:max-lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] sm:max-lg:items-end sm:max-lg:gap-8">
            {hasPortrait ? (
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-line">
                <Image src={about.portrait.src} alt={about.portrait.alt} fill preload sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
              </div>
            ) : null}
            <div className={`border-t-2 border-ink pt-4 ${hasPortrait ? "mt-5 sm:max-lg:mt-0" : ""}`}>
              <p className="font-serif text-3xl leading-none text-ink">{profile.name}</p>
              <p className="mt-2 text-[15px] font-medium text-ink">{profile.role}</p>
              <p className="mt-1 text-[13px] leading-5 text-muted">{profile.experience}</p>
              <p className="text-[13px] leading-5 text-muted">{profile.location}</p>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className="mt-3 inline-flex min-h-6 items-center gap-1 text-[13px] font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span></a>
            </div>
          </aside>

          <div className="border-l-2 border-accent pl-4 min-[375px]:pl-5 sm:pl-8 lg:self-start">
            <p className="text-[13px] font-medium text-accent">About</p>
            <h1 className="mt-3 font-serif text-[1.8rem] leading-[1.1] text-ink min-[375px]:text-[2.1rem] min-[375px]:leading-[1.08] sm:text-5xl">{about.headline}</h1>
            <p className="mt-4 text-[15px] font-semibold tracking-wide text-ink">{profile.positioning}</p>
            <div className="mt-6 grid max-w-2xl gap-4 text-[17px] leading-8 text-ink/85">
              {about.bio.map((b) => <p key={b.slice(0, 24)}>{b}</p>)}
            </div>
            <div className="mt-7 grid gap-3 min-[375px]:grid-cols-2 sm:flex sm:flex-wrap">
              <Link href="/work" className={`${button.primary} px-5 min-[375px]:col-span-2`}>View my work <Arrow /></Link>
              <ResumeCta label="Download résumé" className={`${button.secondary} px-3 sm:px-5`} />
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className={`${button.secondary} px-3 sm:px-5`}>LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span></a>
            </div>
          </div>
        </div>

        <ul aria-label="Capabilities" className="mt-12 grid grid-cols-2 border-t border-ink lg:mt-16 lg:grid-cols-4">
          {about.capabilities.map((c, i) => (
            <li key={c.name} className={`border-b border-line py-4 pr-4 lg:border-b-0 lg:py-5 lg:pr-6 ${i % 2 ? "pl-4 border-l border-line" : ""} ${i > 0 ? "lg:border-l lg:border-line lg:pl-6" : ""}`}>
              <p className="text-[15px] font-bold text-ink">{c.name}</p>
              <p className="mt-1 text-[14px] leading-6 text-muted">{c.text}</p>
            </li>
          ))}
        </ul>

        <section aria-labelledby="phases" className="mt-16">
          <h2 id="phases" className="font-medium text-[13px] text-accent">What each role taught me, and what I build now</h2>
          <ol className="mt-6 border-t border-ink">
            {about.phases.map((p, i) => {
              // The last entry is independent product building, not a role: unnumbered, and labelled as such.
              const independent = "independent" in arc[i];
              return (
              <li key={p.verb} className={`grid gap-3 py-7 md:grid-cols-[12rem_minmax(0,1fr)_minmax(0,0.8fr)] md:gap-10 ${independent ? "border-b border-dashed border-line-strong" : "border-b border-line"}`}>
                <div>
                  <Mono className={independent ? "text-accent" : "text-subtle"}>{independent ? `${arc[i].years} · independent, not a role` : `${String(i + 1).padStart(2, "0")} · ${arc[i].years}`}</Mono>
                  <p className={`mt-1 font-serif text-4xl leading-none ${independent ? "text-accent" : "text-ink"}`}>{p.verb}</p>
                  <p className="mt-2 text-sm text-muted">{independent ? `${arc[i].role} · ${arc[i].org}` : arc[i].org}</p>
                </div>
                <p className="text-lg leading-8 text-ink">{p.text}</p>
                <p className="text-sm leading-6 text-muted md:border-l md:border-line md:pl-6">{arc[i].proof}</p>
              </li>
              );
            })}
          </ol>
        </section>

        <section id="technical" aria-labelledby="technical-title" className="mt-20 scroll-mt-24">
          <h2 id="technical-title" className="font-serif text-4xl text-ink">{technical.title}</h2>
          <blockquote className="mt-6 max-w-3xl border-l-2 border-accent pl-5">
            <p className="font-serif text-2xl leading-snug text-ink sm:text-3xl">{technical.insight.text}</p>
            <p className="mt-3 text-[13px] font-medium text-muted"><Link href={technical.insight.href} className="inline-flex min-h-6 items-center underline decoration-line-strong underline-offset-4 hover:text-accent hover:decoration-accent">{technical.insight.source}</Link></p>
          </blockquote>
          <dl className="mt-8 border-t border-ink">
            {technical.items.map((t) => (
              <div key={t.term} className="grid gap-1 border-b border-line py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-8">
                <dt className="text-[15px] font-bold text-ink">{t.term}</dt>
                <dd className="max-w-3xl text-[15px] leading-7 text-ink/85">{t.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="approach" aria-labelledby="approach-title" className="mt-20 scroll-mt-24">
          <h2 id="approach-title" className="font-serif text-4xl text-ink">How I work</h2>
          <p className="mt-3 max-w-2xl text-base leading-7 text-muted">Four principles, each with a place in the work where it shows.</p>
          <ol className="mt-8 border-t border-ink">
            {principles.map((p) => (
              <li key={p.n} className="grid gap-5 border-b border-line py-8 lg:grid-cols-[4rem_minmax(0,1fr)_minmax(0,1fr)] lg:gap-10">
                <p className="tabular-nums text-2xl text-accent">{p.n}</p>
                <div>
                  <h3 className="font-serif text-3xl leading-tight text-ink">{p.title}</h3>
                  <p className="mt-3 text-base leading-7 text-muted">{p.body}</p>
                </div>
                <Link href={p.example.href} className="group block border-l-2 border-accent pl-5 transition-colors">
                  <Mono className="text-accent">Where it shows</Mono>
                  <p className="mt-2 text-[15px] leading-7 text-ink">{p.example.text}</p>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent group-hover:underline">{p.example.label} <Arrow /></p>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="experience" className="mt-20">
          <h2 id="experience" className="font-serif text-4xl text-ink">Experience</h2>
          <ol className="mt-6 border-t border-ink">
            {roles.map((r) => (
              <li key={r.id} id={r.id} className="grid scroll-mt-24 gap-4 border-b border-line py-8 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-10">
                <div>
                  <Mono className="text-muted">{r.period}</Mono>
                  <p className="mt-1 text-[13px] text-subtle">{r.location}</p>
                </div>
                <div>
                  <h3 className="font-serif text-3xl leading-tight text-ink">{r.company} <span className="text-muted">· {r.title}</span></h3>
                  <p className="mt-2 text-[15px] leading-7 text-muted">{r.summary}</p>
                  <ul className="mt-4 grid gap-2">
                    {r.highlights.map((h) => <li key={h} className="flex gap-3 text-[15px] leading-7 text-ink/85"><span aria-hidden className="mt-3 h-1 w-1 shrink-0 rounded-full bg-accent" />{h}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="contact" className="mt-20 grid gap-8 border-t-2 border-ink pt-10 lg:grid-cols-2 lg:items-end">
          <div>
            <h2 id="contact" className="font-serif text-4xl leading-tight text-ink">Hiring for a product role? Let&apos;s talk.</h2>
            <p className="mt-3 text-sm leading-6 text-muted">Open to {contact.lookingFor}. {profile.location}.</p>
          </div>
          <div>
            <CopyEmail email={contact.email} />
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              <a href={`mailto:${contact.email}`} className={`${button.primary} px-4`}>Email</a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className={`${button.secondary} px-4`}>LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span></a>
              <ResumeCta label="Resume" className={`${button.secondary} px-4`} />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
