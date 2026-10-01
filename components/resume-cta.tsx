import { contact } from "@/content/portfolio";

/** Résumé CTA: downloads the résumé PDF served from /public. */
export function ResumeCta({ className = "", label = "Download Resume", onClick }: { className?: string; label?: string; onClick?: () => void }) {
  return (
    <a href={contact.resumeUrl} download onClick={onClick} className={className}>
      {label} <span aria-hidden>↗</span><span className="sr-only">(PDF)</span>
    </a>
  );
}
