import { Hero } from "@/components/home/hero";
import { AiLabTeaser, CareerArc, Contact, ProofWall, SelectedWork } from "@/components/home/sections";

/**
 * The homepage reads at three depths: 5 seconds (hero), 30 seconds (proof and
 * the three stories), and the arc and AI Lab for the reader who stays. Every
 * number has one home on this page; the deep material lives on its own pages.
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <ProofWall />
      <SelectedWork />
      <CareerArc />
      <AiLabTeaser />
      <Contact />
    </>
  );
}
