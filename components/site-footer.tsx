import { footer, nav } from "@/content/portfolio";
import { Container } from "./container";
export function SiteFooter() {
  return <footer className="border-t border-line py-10"><Container className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
    <div><p className="font-serif text-xl text-ink">{footer.credit}</p><p className="mt-1 text-sm text-muted">{footer.line}</p></div>
    <nav aria-label="Footer"><ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">{nav.map(i => <li key={i.href}><a href={i.href} className="hover:text-ink">{i.label}</a></li>)}</ul></nav>
  </Container></footer>;
}