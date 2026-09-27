"use client";

import { useEffect, useState, type RefObject } from "react";

/** Returns the id of the section currently crossing the reading line (just under the sticky header). */
export function useActiveSection(ids: readonly string[], enabled = true) {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join("|");

  useEffect(() => {
    if (!enabled) return;
    const els = key.split("|").map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const current = els.find((el) => visible.get(el.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key, enabled]);

  return enabled ? active : null;
}

/**
 * Visibility for entrance animations.
 * null  = not measured yet (server render / no JS): render the final state, never hide data.
 * false = measured and off-screen: marks may wait collapsed.
 * true  = on screen: play the entrance once.
 */
export function useInView<T extends Element>(ref: RefObject<T | null>, threshold = 0.3) {
  const [inView, setInView] = useState<boolean | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting);
      if (e.isIntersecting) observer.disconnect();
    }, { threshold });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, inView]);
  return inView;
}

/** Class for a bar that should grow from its baseline when first seen. */
export function growClass(inView: boolean | null) {
  if (inView === null) return "";
  return inView ? "grow-x" : "scale-x-0";
}
