import { AiLab } from "@/components/home/ai-lab";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { HowIWork } from "@/components/home/how-i-work";
import { Impact } from "@/components/home/impact";
import { Work } from "@/components/home/work";

/**
 * Recruiter order: proof (impact, work), then who did it (experience), then
 * how the decisions get made (principles, decision log, capabilities), the
 * AI lab, and contact.
 */
export function HomePage() {
  return <><Hero/><Impact/><Work/><Experience/><HowIWork/><AiLab/><Contact/></>;
}
