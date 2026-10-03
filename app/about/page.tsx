import { Container } from "@/components/container";
import { CopyEmail } from "@/components/home/copy-email";
import { ResumeCta } from "@/components/resume-cta";
import Link from "next/link";
import { Arrow, Mono, SectionHeader, button } from "@/components/ui";
import { about, arc, contact, principles, profile, roles, status } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/about",
  title: "About",
  description: "Nitesh Tiwari, Senior Product Manager: from sole Android developer to release management, gaming, growth, EdTech personalization and AI, and the four principles behind the work. ~7 years in product management, 10+ years in technology.",
});

export default function AboutPage() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-14 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:gap-16">
          <SectionHeader as="h1" label="About" title={about.opening} intro={about.intro} />
          {/* No photo: an identity card from the canonical profile stands in, deliberately text-only. */}
          <aside aria-label="At a glance" className="border-t-2 border-ink pt-5">
            <p className="font-serif text-3xl leading-none">{profile.name}</p>
            <dl className="mt-5 grid gap-3 text-[15px] leading-6">
              {([["Role", profile.role], ["Focus", profile.positioning], ["Experience", profile.experience], ["Based in", profile.location], ...(status.availability ? [["Status", status.availability]] as const : [])] as const).map(([k, v]) => (
                <div key={k} className="grid grid-cols-[6.5rem_1fr] gap-3">
                  <dt><Mono className="text-muted">{k}</Mono></dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        <section aria-labelledby="phases" className="mt-16">
          <h2 id="phases" className="font-medium text-[13px] text-accent">What each phase taught me</h2>
          <ol className="mt-6 border-t border-ink">
            {about.phases.map((p, i) => (
              <li key={p.verb} className="grid gap-3 border-b border-line py-7 md:grid-cols-[12rem_minmax(0,1fr)_minmax(0,0.8fr)] md:gap-10">
                <div>
                  <Mono className="text-subtle">{String(i + 1).padStart(2, "0")} · {arc[i].years}</Mono>
                  <p className="mt-1 font-serif text-4xl leading-none text-ink">{p.verb}</p>
                  <p className="mt-2 text-sm text-muted">{arc[i].org}</p>
                </div>
                <p className="text-lg leading-8 text-ink">{p.text}</p>
                <p className="text-sm leading-6 text-muted md:border-l md:border-line md:pl-6">{arc[i].proof}</p>
              </li>
            ))}
          </ol>
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
