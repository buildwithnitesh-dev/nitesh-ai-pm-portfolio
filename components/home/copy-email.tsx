"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const t = setTimeout(() => setState("idle"), 2400);
    return () => clearTimeout(t);
  }, [state]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setState("copied");
    } catch {
      setState("failed");
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-full border border-line-strong bg-background py-1.5 pr-1.5 pl-5">
      <span className="truncate font-mono text-sm text-ink">{email}</span>
      <button
        type="button"
        onClick={copy}
        className="h-9 shrink-0 rounded-full bg-accent-soft px-4 text-xs text-accent transition-colors hover:bg-accent-tint"
      >
        {state === "copied" ? "Copied ✓" : state === "failed" ? "Select to copy" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Copy failed. Select the address to copy it." : ""}
      </span>
    </div>
  );
}
