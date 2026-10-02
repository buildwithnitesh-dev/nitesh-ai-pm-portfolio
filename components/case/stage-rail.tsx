"use client";

import { useEffect, useState } from "react";

export type RailItem = { id: string; label: string };

/** The id of the section crossing the reading line (just under the sticky header). */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");
  useEffect(() => {
    const els = key.split("|").map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const current = els.find((el) => visible.get(el.id));
        if (current) setActive(current.id);
      },
      { rootMargin: "-25% 0px -70% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);
  return active;
}

/**
 * The stage rail: a sticky list of decision stages on desktop that marks where
 * the reader is and what they have passed; a collapsed "Stages" list on phones,
 * where the header's reading-progress line shows position instead.
 */
export function StageRail({ items, label = "Stages" }: { items: readonly RailItem[]; label?: string }) {
  const active = useActiveSection(items.map((i) => i.id));
  const activeIndex = items.findIndex((i) => i.id === active);

  return (
    <>
      <nav aria-label={label} className="sticky top-28 hidden lg:block">
        <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{label}</p>
        <ol className="mt-4 border-l border-line">
          {items.map((item, i) => {
            const on = item.id === active;
            const done = activeIndex > -1 && i < activeIndex;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`-ml-px flex items-baseline gap-3 border-l-2 py-1.5 pl-4 text-sm transition-colors ${on ? "border-accent text-ink" : done ? "border-accent/30 text-muted hover:text-ink" : "border-transparent text-subtle hover:text-ink"}`}
                >
                  <span className="font-mono text-[10px] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <details className="group rounded-xl border border-line bg-panel lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm text-ink [&::-webkit-details-marker]:hidden">
          <span>{label} <span className="text-muted">· {items.length}</span></span>
          <span aria-hidden className="text-muted transition-transform duration-200 group-open:rotate-45">+</span>
        </summary>
        <ol className="grid grid-cols-2 border-t border-line px-2 py-2">
          {items.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="flex items-baseline gap-3 rounded-md px-3 py-2.5 text-sm text-ink hover:bg-background">
                <span className="font-mono text-[10px] text-subtle">{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
}
