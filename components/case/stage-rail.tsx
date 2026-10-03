"use client";

import { useEffect, useState } from "react";
import { StageMarker, kindOf } from "@/components/trace";

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
        <p className="font-medium text-[13px] text-muted">{label}</p>
        <ol className="mt-4 border-l border-line">
          {items.map((item, i) => {
            const on = item.id === active;
            const done = activeIndex > -1 && i < activeIndex;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`-ml-px flex items-center gap-3 border-l-2 py-1.5 pl-4 text-sm transition-colors ${on ? "border-accent font-semibold text-ink" : done ? "border-accent/30 text-muted hover:text-ink" : "border-transparent text-subtle hover:text-ink"}`}
                >
                  <StageMarker kind={kindOf(item.label)} className={on || done ? "" : "opacity-50"} />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <details className="group border-y border-ink lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[15px] font-medium text-ink [&::-webkit-details-marker]:hidden">
          <span>{label} <span className="text-muted">· {items.length}</span></span>
          <span aria-hidden className="text-muted transition-transform duration-200 group-open:rotate-45">+</span>
        </summary>
        <ol className="grid grid-cols-2 border-t border-line py-2">
          {items.map((item, i) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="flex items-center gap-3 rounded-md px-1 py-2.5 text-sm text-ink hover:text-accent">
                <StageMarker kind={kindOf(item.label)} />
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </>
  );
}
