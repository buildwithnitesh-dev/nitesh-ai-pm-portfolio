import { About } from "@/components/home/about";
import { AiLab } from "@/components/home/ai-lab";
import { Contact } from "@/components/home/contact";
import { Experience } from "@/components/home/experience";
import { Expertise } from "@/components/home/expertise";
import { Hero } from "@/components/home/hero";
import { Impact } from "@/components/home/impact";
import { Work } from "@/components/home/work";

/**
 * Narrative order is deliberate: proof (impact, work) before biography,
 * so a time-boxed reader meets evidence first.
 */
export function HomePage() {
  return <><Hero/><Impact/><Work/><About/><Expertise/><Experience/><AiLab/><Contact/></>;
}
