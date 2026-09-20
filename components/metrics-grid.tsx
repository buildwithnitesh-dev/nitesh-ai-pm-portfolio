import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { metrics } from "@/content/portfolio";
export function MetricsGrid() {
  return <section id="metrics" className="scroll-mt-24 border-b border-line py-20 lg:py-24"><Container>
    <SectionHeading eyebrow="Verified impact" title="Results from the work — not projections." description="Selected outcomes from professional product work. Metrics are intentionally stated with the precision available."/>
    <ul className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map(([value,label,detail]) => <li key={label} className="bg-background p-7"><p className="font-serif text-3xl tracking-tight text-ink sm:text-4xl">{value}</p><p className="mt-3 text-sm font-medium text-ink">{label}</p><p className="mt-2 text-sm leading-6 text-muted">{detail}</p></li>)}
    </ul>
  </Container></section>;
}