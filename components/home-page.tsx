import { Hero } from "@/components/home/hero";
import { AboutTeaser, AiLabTeaser, CareerArc, Contact, DecisionsTeaser, DomainTransfer, SelectedWork } from "@/components/home/sections";

/**
 * The homepage reads at three depths: 15 seconds (who, what kind of PM, the
 * thesis and three results), the four deep stories right after, then range,
 * decisions, AI judgment, career and the person for the reader who stays.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <SelectedWork />
      <DomainTransfer />
      <DecisionsTeaser />
      <AiLabTeaser />
      <CareerArc />
      <AboutTeaser />
      <Contact />
    </>
  );
}
