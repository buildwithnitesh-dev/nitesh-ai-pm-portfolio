import { Container } from "@/components/container";
import { SectionHeading } from "@/components/section-heading";
import { about } from "@/content/portfolio";
export function AboutSection() {
  return <section id="about" className="scroll-mt-24 border-b border-line py-20 lg:py-24"><Container>
    <SectionHeading eyebrow={about.eyebrow} title={about.title} description={about.body}/>
    <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{about.highlights.map(x => <li key={x} className="border border-line bg-panel/60 p-6 text-sm leading-7 text-muted">{x}</li>)}</ul>
  </Container></section>;
}