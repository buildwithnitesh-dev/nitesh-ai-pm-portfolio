"use client";
import { useState } from "react";
import { nav, profile } from "@/content/portfolio";
import { Container } from "./container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="#top" className="font-serif text-lg tracking-tight text-ink">{profile.name}</a>
        <nav aria-label="Primary" className="hidden items-center gap-5 xl:flex">
          {nav.map((item) => <a key={item.href} href={item.href} className="text-sm text-muted hover:text-ink">{item.label}</a>)}
        </nav>
        <a href="#contact" className="hidden rounded-full bg-ink px-4 py-2 text-sm text-panel hover:bg-accent xl:inline-flex">Get in touch</a>
        <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line xl:hidden">
          <span className="sr-only">Toggle navigation</span><span aria-hidden>☰</span>
        </button>
      </Container>
      {open ? <div className="border-t border-line bg-background xl:hidden">
        <Container className="flex flex-col gap-1 py-4">
          {nav.map((item) => <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-lg px-2 py-3 text-base text-ink">{item.label}</a>)}
        </Container>
      </div> : null}
    </header>
  );
}