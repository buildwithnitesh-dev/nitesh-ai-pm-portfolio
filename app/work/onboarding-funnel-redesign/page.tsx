import { CasePage } from "@/components/case/case-page";
import { witzeal } from "@/content/cases";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({ path: "/work/onboarding-funnel-redesign", title: witzeal.title, description: witzeal.description, type: "article" });

export default function Page() {
  return <CasePage c={witzeal} />;
}
