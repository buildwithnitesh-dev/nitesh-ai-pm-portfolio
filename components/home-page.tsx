import { AiLab } from "@/components/home/ai-lab";
import { CapabilityMap } from "@/components/home/capability-map";
import { Contact } from "@/components/home/contact";
import { Container } from "@/components/container";
import { Decisions } from "@/components/home/decisions";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Thinking } from "@/components/home/thinking";
import { Work } from "@/components/home/work";

/**
 * Recruiter order: proof (impact, work), then who did it (experience), then
 * the depth behind it (decisions, capabilities, thinking, AI lab).
 */
export function HomePage() {
  return (
    <>
      <Hero/><Impact/><Work/><Experience/>
      {/* The decision log follows the timeline; its roles link down to it. */}
      <div className="border-b border-line pb-16 lg:pb-22">
        <Container><Decisions/></Container>
      </div>
      <CapabilityMap/><Thinking/><AiLab/><Contact/>
    </>
  );
}
