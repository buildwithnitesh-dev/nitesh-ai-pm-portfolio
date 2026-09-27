"use client";

import { useActiveSection } from "@/components/hooks";

export type TocItem = { id: string; label: string };

/** Sticky chapter list on desktop; a collapsed "On this page" disclosure on phones. */
export function Toc({ items }: { items: readonly TocItem[] }) {
  const active = useActiveSection(items.map((i) => i.id));
  const activeIndex = items.findIndex((i) => i.id === active);

  return (
    <>
      <nav aria-label="Case study chapters" className="sticky top-28 hidden lg:block">
        <p className="text-xs font-medium tracking-[0.16em] text-muted uppercase">On this page</p>
        <ol className="mt-4 border-l border-line">
          {items.map((item, i) => {
            const on = item.id === active;
            const done = activeIndex > -1 && i < activeIndex;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={on ? "location" : undefined}
                  className={`-ml-px flex items-baseline gap-3 border-l-2 py-2 pl-4 text-sm transition-colors ${
                    on ? "border-accent text-ink" : done ? "border-transparent text-muted hover:text-ink" : "border-transparent text-subtle hover:text-ink"
                  }`}
                >
                  <span className="font-mono text-[10px] tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                  {done ? <span aria-hidden className="ml-auto pr-1 text-[10px] text-accent">✓</span> : null}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>

      <details className="group rounded-xl border border-line bg-panel lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm text-ink [&::-webkit-details-marker]:hidden">
          <span>On this page <span className="text-muted">· {items.length} chapters</span></span>
          <span aria-hidden className="text-muted transition-transform duration-200 group-open:rotate-45">+</span>
        </summary>
        <ol className="border-t border-line px-2 py-2">
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
