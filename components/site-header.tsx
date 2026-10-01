"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, profile } from "@/content/portfolio";
import { useActiveSection } from "./hooks";
import { Container } from "./container";
import { ResumeCta } from "./resume-cta";

const sectionIds = nav.map((item) => item.id);

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isCaseStudy = pathname.startsWith("/work/");
  // Orientation: on the homepage, the nav shows where you are in the story.
  const active = useActiveSection(sectionIds, isHome);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/90 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/#top" onClick={() => setOpen(false)} className="font-serif text-lg tracking-tight text-ink transition-colors hover:text-accent">
          {profile.name}
        </Link>
        {/* Nav and CTA sit together on the right: 28px between items (px-3 + gap-1 + px-3), 34px before the CTA. */}
        <div className="hidden items-center gap-[22px] xl:flex">
          <nav aria-label="Primary" className="flex items-center gap-1">
            {nav.map((item) => {
              const current = active === item.id;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "location" : undefined}
                  className={`relative rounded-full px-3 py-2 text-sm transition-colors ${current ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {item.label}
                  <span
                    aria-hidden
                    className={`absolute inset-x-3 -bottom-[13px] h-[2px] origin-left bg-accent transition-transform duration-300 ${current ? "scale-x-100" : "scale-x-0"}`}
                  />
                </Link>
              );
            })}
          </nav>
          {/* Recruiters come for the résumé: it is the one filled action in the header. */}
          <ResumeCta label="Résumé" className="inline-flex gap-1 rounded-full bg-ink px-4 py-2 text-sm text-panel transition-colors hover:bg-accent" />
        </div>
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line transition-colors hover:border-ink xl:hidden"
        >
          <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
          <span aria-hidden className="relative block h-3 w-4">
            <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-200 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
            <span className={`absolute top-1/2 left-0 h-[1.5px] w-4 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-200 ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
          </span>
        </button>
      </Container>
      {isCaseStudy ? <ReadingProgress /> : null}
      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-background xl:hidden">
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ol className="flex flex-col">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "location" : undefined}
                    className="flex items-baseline gap-4 rounded-lg px-2 py-3 text-base text-ink transition-colors hover:bg-panel aria-[current]:text-accent"
                  >
                    <span className="w-6 font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
          <ResumeCta label="Résumé" onClick={() => setOpen(false)} className="mt-3 flex h-12 items-center justify-center gap-1 rounded-full bg-ink text-sm text-panel" />
        </Container>
      </div>
    </header>
  );
}

/** Long case studies get a progress line so readers know how much is left. */
function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return (
    <div aria-hidden className="absolute inset-x-0 -bottom-px h-[2px]">
      <div ref={barRef} className="h-full origin-left bg-accent" style={{ transform: "scaleX(0)" }} />
    </div>
  );
}
