import { Hero } from "@/components/home/hero";
import { AboutTeaser, AiLabTeaser, CareerArc, Contact, Decisions, Domains, Proof, SelectedWork } from "@/components/home/sections";

/**
 * Homepage order, by the questions a hiring manager asks:
 * who is this (hero) → can he prove it (proof, work) → does it transfer
 * (same PM, different domains) → how does he decide (decisions, AI) →
 * how did he get here (career, about) → how do I reach him (contact).
 */
export function HomePage() {
  return (
    <>
      <Hero />
      <Proof />
      <SelectedWork />
      <Domains />
      <Decisions />
      <AiLabTeaser />
      <CareerArc />
      <AboutTeaser />
      <Contact />
    </>
  );
}
