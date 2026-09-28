import { Container } from "@/components/container";
import { Eyebrow, button } from "@/components/ui";
import { CopyEmail } from "@/components/home/copy-email";
import { ResumeCta } from "@/components/resume-cta";
import { about, contact } from "@/content/portfolio";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 pt-10 pb-16 lg:pt-14 lg:pb-22">
      <Container>
        <div className="grid gap-12 rounded-2xl border border-line bg-panel px-6 py-10 sm:px-12 sm:py-10 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:px-16">
          <div>
            <Eyebrow><span className="mr-3 text-subtle">07</span>{contact.eyebrow}</Eyebrow>
            <h2 id="contact-title" className="mt-4 max-w-3xl font-serif text-4xl leading-tight text-ink sm:text-5xl">{contact.title}</h2>
            <p className="mt-6 max-w-2xl text-base leading-8 text-muted">{contact.body}</p>
            <dl className="mt-8 grid max-w-2xl border-t border-line text-sm">
              {about.facts.filter(([k]) => k !== "Scale").map(([k, v]) => (
                <div key={k} className="grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="text-ink">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="grid gap-3">
            {/* Many recruiters paste an address into an ATS rather than open a mail client — so both are first-class. */}
            <CopyEmail email={contact.email} />
            <div className="grid gap-3 sm:grid-cols-2">
              <a href={`mailto:${contact.email}`} className={button.primary}>Email Nitesh</a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" className={button.secondary}>
                LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>
            <ResumeCta className={button.secondary} />
          </div>
        </div>
      </Container>
    </section>
  );
}
