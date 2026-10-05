import { CasePage } from "@/components/case/case-page";
import { edfora } from "@/content/cases";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({ path: "/work/adaptive-assignment-engine", title: edfora.title, description: edfora.description, type: "article" });

export default function Page() {
  return <CasePage c={edfora} />;
}
