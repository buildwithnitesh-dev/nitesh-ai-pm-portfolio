import { CasePage } from "@/components/case/case-page";
import { fanblaze } from "@/content/cases";
import { pageMetadata } from "@/content/meta";

export const metadata = pageMetadata({ path: "/work/fanblaze", title: fanblaze.title, description: fanblaze.description, type: "article" });

export default function Page() {
  return <CasePage c={fanblaze} />;
}
