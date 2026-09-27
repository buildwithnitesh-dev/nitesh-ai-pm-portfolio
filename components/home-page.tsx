import { AiLab } from "@/components/home/ai-lab";
import { CapabilityMap } from "@/components/home/capability-map";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Thinking } from "@/components/home/thinking";
import { Work } from "@/components/home/work";

/**
 * Narrative order is deliberate: proof (impact, work), then what the proof
 * demonstrates (capabilities), how I think, and only then biography.
 */
export function HomePage() {
  return <><Hero/><Impact/><Work/><CapabilityMap/><Thinking/><AiLab/><Experience/><Contact/></>;
}
