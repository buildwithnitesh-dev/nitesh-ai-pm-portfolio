"use client";

import { useState } from "react";
import { nav, profile } from "@/content/portfolio";
import { Container } from "./container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a
          href="#top"
          className="font-serif text-lg tracking-tight text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {profile.name}
        </a>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-6 xl:flex"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-ink px-4 py-2 text-sm text-panel transition-colors hover:bg-accent xl:inline-flex focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          Get in touch
        </a>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink xl:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden="true" className="relative block h-3 w-4">
            <span
              className={`absolute top-0.5 left-0 block h-px w-4 bg-current transition ${open ? "top-1.5 rotate-45" : ""}`}
            />
            <span
              className={`absolute bottom-0.5 left-0 block h-px w-4 bg-current transition ${open ? "bottom-1.5 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </Container>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-line bg-background xl:hidden"
        >
          <Container className="flex flex-col gap-1 py-4">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="rounded-lg px-2 py-3 text-base text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={close}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-ink px-4 py-3 text-sm text-panel"
            >
              Get in touch
            </a>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
