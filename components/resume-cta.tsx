import { contact } from "@/content/portfolio";

/**
 * Résumé CTA. With a real file configured (`contact.resumeUrl`) it downloads it;
 * without one it opens a pre-addressed request email — it never points at a URL
 * that doesn't exist.
 */
export function ResumeCta({ className = "" }: { className?: string }) {
  if (contact.resumeUrl) {
    return (
      <a href={contact.resumeUrl} download className={className}>
        Download résumé <span className="text-xs opacity-70">(PDF)</span>
      </a>
    );
  }
  const subject = encodeURIComponent("Résumé request — Nitesh Tiwari");
  return (
    <a href={`mailto:${contact.email}?subject=${subject}`} className={className}>
      Request résumé <span aria-hidden>↗</span><span className="sr-only">(opens your email app)</span>
    </a>
  );
}
