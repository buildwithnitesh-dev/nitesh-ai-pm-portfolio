import Link from "next/link";
import { Container } from "@/components/container";
import { MoreLink, SectionHeader, button } from "@/components/ui";
import { work } from "@/content/portfolio";

export const metadata = { title: "Page not found", robots: { index: false } };

/** A stale or mistyped link still lands somewhere useful: the selected-work cases. */
export default function NotFound() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-20 lg:py-28">
        <SectionHeader as="h1" label="404" title="This page doesn't exist." intro="The link may be from an older version of the site. The work is all still here." />
        <ul className="mt-10 grid border-t border-ink sm:max-w-2xl">
          {work.map((c) => (
            <li key={c.slug}>
              <Link href={c.href} className="group block border-b border-line py-5">
                <span className="font-medium text-[13px] text-accent">{c.short} · {c.company}</span>
                <span className="mt-1 block font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent">{c.signal}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Link href="/" className={button.primary}>Home</Link>
          <MoreLink href="/work">All work</MoreLink>
        </div>
      </Container>
    </main>
  );
}
