import { Hero } from "@/components/home/hero";
import { AiLabTeaser, CareerArc, Contact, DomainTransfer, SelectedWork } from "@/components/home/sections";

/**
 * The homepage reads at three depths: 15 seconds (who, what kind of PM, the
 * thesis and three results), the three decision stories right after, then the
 * range across domains, the career, AI judgment and contact for the reader who
 * stays. The deep material lives on its own pages.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <DomainTransfer />
      <CareerArc />
      <AiLabTeaser />
      <Contact />
    </>
  );
}
