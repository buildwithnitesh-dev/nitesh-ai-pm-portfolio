import Link from "next/link";
import { contact, footer, nav } from "@/content/portfolio";
import { Container } from "./container";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-12">
      <Container className="grid gap-10 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="font-serif text-2xl text-ink">{footer.credit}</p>
          <p className="mt-1 text-sm text-muted">{footer.line}</p>
          <a href={`mailto:${contact.email}`} className="mt-4 inline-block text-sm text-ink underline decoration-line-strong underline-offset-4 hover:decoration-accent">{contact.email}</a>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
            {nav.map((i) => <li key={i.href}><Link href={i.href} className="hover:text-ink">{i.label}</Link></li>)}
            <li><Link href="/#top" className="hover:text-ink">Back to top ↑</Link></li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
