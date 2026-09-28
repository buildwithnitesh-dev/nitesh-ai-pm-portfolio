import { contact } from "@/content/portfolio";

/** Résumé CTA: downloads the résumé PDF served from /public. */
export function ResumeCta({ className = "" }: { className?: string }) {
  return (
    <a href={contact.resumeUrl} download className={className}>
      Download Resume <span aria-hidden>↗</span><span className="sr-only">(PDF)</span>
    </a>
  );
}
