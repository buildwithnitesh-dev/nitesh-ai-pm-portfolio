import { CasePage } from "@/components/case/case-page";
import { behaviour } from "@/content/cases";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({ path: "/work/behavioural-loops", title: behaviour.title, description: behaviour.description, type: "article" });

export default function Page() {
  return <CasePage c={behaviour} />;
}
