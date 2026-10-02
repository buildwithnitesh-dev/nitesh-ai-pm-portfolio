import type { Metadata } from "next";
import { HomePage } from "@/components/home-page";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <main id="main" className="flex-1"><HomePage /></main>;
}
