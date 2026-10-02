import Link from "next/link";
import { Container } from "@/components/container";
import { MoreLink, SectionHeader, button } from "@/components/ui";
import { flagships } from "@/content/portfolio";

export const metadata = { title: "Page not found", robots: { index: false } };

/** A stale or mistyped link still lands somewhere useful: the two flagship cases. */
export default function NotFound() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-20 lg:py-28">
        <SectionHeader as="h1" label="404" title="This page doesn't exist." intro="The link may be from an older version of the site. The work is all still here." />
        <ul className="mt-10 grid gap-3 sm:max-w-2xl">
          {flagships.map((c) => (
            <li key={c.slug}>
              <Link href={c.href} className="block rounded-xl border border-line bg-panel p-5 transition-colors hover:border-ink">
                <span className="font-mono text-[11px] tracking-[0.12em] text-accent uppercase">{c.company}</span>
                <span className="mt-1 block font-serif text-2xl leading-snug text-ink">{c.opening}</span>
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
