import { Hero } from "@/components/home/hero";
import { AboutContact, AiLabTeaser, ApproachTeaser, CareerArc, DecisionsPreview, ProofWall, SelectedWork } from "@/components/home/sections";

/**
 * The homepage reads at four depths: 5 seconds (hero), 30 seconds (proof and
 * career), 2 minutes (selected work and decisions), and an invitation to the
 * deep pages (AI Lab, approach, about).
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <ProofWall />
      <CareerArc />
      <SelectedWork />
      <DecisionsPreview />
      <AiLabTeaser />
      <ApproachTeaser />
      <AboutContact />
    </>
  );
}
