import Link from "next/link";
import { contact, nav, profile } from "@/content/portfolio";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="flex items-center gap-2.5 text-xl font-extrabold tracking-[-0.02em] text-ink"><span aria-hidden className="h-2.5 w-2.5 rotate-45 bg-accent" />{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.role} · {profile.positioning}</p>
          <p className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <a href={`mailto:${contact.email}`} className="inline-flex min-h-6 items-center gap-1 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">{contact.email}</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center gap-1 text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">LinkedIn <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span></a>
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            <li><Link href="/" className="inline-flex min-h-6 items-center hover:text-ink">Home</Link></li>
            {nav.map((i) => <li key={i.href}><Link href={i.href} className="inline-flex min-h-6 items-center hover:text-ink">{i.label}</Link></li>)}
            <li><a href={contact.resumeUrl} download className="inline-flex min-h-6 items-center hover:text-ink">Resume<span className="sr-only"> (PDF)</span></a></li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
