"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { contact, nav, profile } from "@/content/portfolio";
import { Container } from "./container";
import { ResumeCta } from "./resume-cta";

/** Five destinations, the résumé as the one filled action, and the email in reach on desktop. */
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isCurrent = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

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
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/92 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" onClick={() => setOpen(false)} className="group flex min-h-11 items-center gap-2.5 text-ink">
          <span aria-hidden className="h-2.5 w-2.5 rotate-45 bg-accent" />
          <span className="text-[17px] font-extrabold tracking-[-0.02em] transition-colors group-hover:text-accent">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          <nav aria-label="Primary" className="flex items-center gap-1">
            {nav.map((item) => {
              const current = isCurrent(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  className={`relative rounded-md px-3 py-2 text-[15px] font-medium transition-colors ${current ? "text-ink" : "text-muted hover:text-ink"}`}
                >
                  {item.label}
                  <span aria-hidden className={`absolute inset-x-3 -bottom-[13px] h-[2px] origin-left bg-accent transition-transform duration-300 ${current ? "scale-x-100" : "scale-x-0"}`} />
                </Link>
              );
            })}
          </nav>
          <a href={`mailto:${contact.email}`} className="text-sm text-muted transition-colors hover:text-ink">{contact.email}</a>
          <ResumeCta label="Resume" className="inline-flex gap-1 rounded-md bg-ink px-4 py-2 text-sm font-medium text-panel transition-colors hover:bg-accent" />
        </div>

        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line transition-colors hover:border-ink lg:hidden"
        >
          <span className="sr-only">{open ? "Close navigation" : "Open navigation"}</span>
          <span aria-hidden className="relative block h-3 w-4">
            <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-200 ${open ? "top-1/2 rotate-45" : "top-0"}`} />
            <span className={`absolute top-1/2 left-0 h-[1.5px] w-4 bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
            <span className={`absolute left-0 h-[1.5px] w-4 bg-ink transition-transform duration-200 ${open ? "top-1/2 -rotate-45" : "top-full"}`} />
          </span>
        </button>
      </Container>

      {/* Reading progress on long pages: pure CSS, driven by page scroll where supported. */}
      {pathname.startsWith("/work/") || pathname.startsWith("/ai-lab/") ? (
        <div aria-hidden className="absolute inset-x-0 -bottom-px h-[2px]"><div className="scroll-progress h-full bg-accent" /></div>
      ) : null}

      <div id="mobile-nav" hidden={!open} className="border-t border-line bg-background lg:hidden">
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              <li>
                <Link href="/" onClick={() => setOpen(false)} aria-current={pathname === "/" ? "page" : undefined} className="block rounded-lg px-2 py-3 text-base text-ink hover:bg-panel aria-[current]:text-accent">Home</Link>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={isCurrent(item.href) ? "page" : undefined}
                    className="block rounded-lg px-2 py-3 text-base text-ink hover:bg-panel aria-[current]:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ResumeCta label="Resume" onClick={() => setOpen(false)} className="mt-3 flex h-12 items-center justify-center gap-1 rounded-md bg-ink text-sm font-medium text-panel" />
          <a href={`mailto:${contact.email}`} className="mt-3 block text-center text-sm text-muted">{contact.email}</a>
        </Container>
      </div>
    </header>
  );
}
