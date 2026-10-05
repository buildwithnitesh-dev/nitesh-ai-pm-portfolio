"use client";

import { useEffect, useState } from "react";

export function CopyEmail({ email }: { email: string }) {
  // On narrow phones the address may need two lines; prefer breaking right after the "@".
  const at = email.indexOf("@");
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
    <div className="flex items-center justify-between gap-3 rounded-md border border-line-strong bg-panel py-1.5 pr-1.5 pl-4">
      <span className="min-w-0 tabular-nums text-sm text-ink [overflow-wrap:anywhere]">
        {at > 0 ? <>{email.slice(0, at + 1)}<wbr />{email.slice(at + 1)}</> : email}
      </span>
      <button
        type="button"
        onClick={copy}
        className="h-9 shrink-0 rounded-md bg-accent-soft px-4 text-[13px] text-accent transition-colors hover:bg-accent-tint"
      >
        {state === "copied" ? "Copied ✓" : state === "failed" ? "Select to copy" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Email address copied to clipboard" : state === "failed" ? "Copy failed. Select the address to copy it." : ""}
      </span>
    </div>
  );
}
