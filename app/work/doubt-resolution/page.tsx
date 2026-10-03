import { CasePage } from "@/components/case/case-page";
import { doubt } from "@/content/cases";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({ path: "/work/doubt-resolution", title: doubt.title, description: doubt.description, type: "article" });

export default function Page() {
  return <CasePage c={doubt} />;
}
