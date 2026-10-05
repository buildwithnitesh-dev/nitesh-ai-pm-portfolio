import Link from "next/link";

/** The site's one back affordance: oxblood, 15px, a 44px tap target, the arrow nudging left on hover. */
export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group inline-flex min-h-11 items-center gap-2 text-[15px] font-medium text-accent">
      <span aria-hidden className="transition-transform group-hover:-translate-x-1">←</span> {label}
    </Link>
  );
}
