import Link from "next/link";
import { Container } from "@/components/container";
import { Arrow, Mono, SectionHeader } from "@/components/ui";
import { principles } from "@/content/portfolio";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({
  path: "/approach",
  title: "Approach",
  description: "How Nitesh Tiwari works as a Senior Product Manager: diagnose before building, one outcome decides, experiments can fail, and AI needs evaluation. Each principle linked to a real example.",
});

export default function ApproachPage() {
  return (
    <main id="main" className="flex-1">
      <Container className="py-14 lg:py-20">
        <SectionHeader as="h1" label="Approach" title="Four principles, each with a receipt." intro="No principle here without a place in the work where it shows." />
        <ol className="mt-14 border-t border-ink">
          {principles.map((p) => (
            <li key={p.n} className="grid gap-6 border-b border-line py-12 lg:grid-cols-[6rem_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
              <p className="font-mono text-4xl text-accent">{p.n}</p>
              <div>
                <h2 className="font-serif text-4xl leading-tight text-ink">{p.title}</h2>
                <p className="mt-4 text-lg leading-8 text-muted">{p.body}</p>
              </div>
              <Link href={p.example.href} className="group block rounded-xl border border-line bg-panel p-6 transition-colors hover:border-ink">
                <Mono className="text-accent">Where it shows</Mono>
                <p className="mt-3 text-base leading-7 text-ink">{p.example.text}</p>
                <p className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.08em] text-ink uppercase">{p.example.label} <Arrow /></p>
              </Link>
            </li>
          ))}
        </ol>
      </Container>
    </main>
  );
}
