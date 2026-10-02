import { Delta } from "@/components/delta";
import { EvidenceTag, Mono } from "@/components/ui";
import type { Visual } from "@/content/cases";

/** Renders one stage's visual. Every visual is static, server-rendered markup. */
export function StageVisual({ v }: { v: Visual }) {
  switch (v.type) {
    case "facts":
      return (
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {v.items.map((f) => (
            <div key={f.term} className="bg-panel p-5">
              <dt><Mono className="text-muted">{f.term}</Mono></dt>
              <dd className="mt-1.5 text-sm leading-6 text-ink">{f.value}</dd>
            </div>
          ))}
        </dl>
      );

    case "signal":
      return (
        <ul className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {v.items.map((s) => (
            <li key={s.label} className="bg-panel p-6">
              <p className="font-sans text-5xl font-semibold tracking-tight text-ink tabular-nums">{s.value}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{s.label}</p>
            </li>
          ))}
        </ul>
      );

    case "readings":
      return (
        <figure>
          <ol className="grid gap-3 md:grid-cols-2">
            {v.items.map((r) => (
              <li key={r.label} className={`rounded-xl border p-5 ${r.chosen ? "border-accent bg-accent-soft" : "border-line bg-panel"}`}>
                <p className={`text-sm font-medium ${r.chosen ? "text-accent" : "text-ink"}`}>{r.label}{r.chosen ? <span className="ml-2 font-mono text-[10px] tracking-[0.12em] uppercase">· What the funnel showed</span> : null}</p>
                <dl className="mt-3 grid gap-3 text-sm">
                  <div><dt><Mono className="text-muted">Where the loss is</Mono></dt><dd className="mt-1 leading-6 text-ink/85">{r.where}</dd></div>
                  <div><dt><Mono className="text-muted">What you build</Mono></dt><dd className="mt-1 leading-6 text-ink/85">{r.build}</dd></div>
                </dl>
              </li>
            ))}
          </ol>
          <figcaption className="mt-3 text-xs leading-5 text-muted">The numbers are documented; the contrast between the two readings is product reasoning.</figcaption>
        </figure>
      );

    case "hypothesis":
      return (
        <dl className="grid gap-4 rounded-xl border-l-4 border-accent bg-accent-soft p-6">
          {([["If", v.if], ["Then", v.then], ["Measured by", v.measure]] as const).map(([k, t]) => (
            <div key={k} className="grid gap-1 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt><Mono className="text-accent">{k}</Mono></dt>
              <dd className="text-base leading-7 text-ink">{t}</dd>
            </div>
          ))}
        </dl>
      );

    case "options":
      return (
        <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line">
          {v.items.map((o, i) => (
            <li key={o.name} className={`grid gap-3 p-5 sm:p-6 md:grid-cols-[13rem_1fr_1fr] md:gap-8 ${o.chosen ? "bg-accent-soft" : "bg-panel"}`}>
              <div>
                <Mono className="text-subtle">Option {String.fromCharCode(65 + i)}</Mono>
                <p className="mt-1 font-serif text-xl leading-snug text-ink">{o.name}</p>
                {o.chosen ? <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-accent uppercase"><span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />Chosen</p> : null}
              </div>
              <div><Mono className="text-muted">Works because</Mono><p className="mt-1 text-sm leading-6 text-ink/85">{o.works}</p></div>
              <div><Mono className={o.chosen ? "text-accent" : "text-muted"}>{o.chosen ? "Costs" : "Falls short because"}</Mono><p className="mt-1 text-sm leading-6 text-ink/85">{o.fails}</p></div>
            </li>
          ))}
        </ol>
      );

    case "path":
      return (
        <figure className="rounded-xl border border-line bg-panel p-5 sm:p-6">
          <figcaption className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink">{v.title}</span>
            <EvidenceTag kind="verified" label="Documented" />
          </figcaption>
          <ol className="mt-5 grid gap-2 md:grid-cols-5">
            {v.steps.map((s, i) => (
              <li key={s.step} className="relative rounded-lg border border-line bg-background p-4">
                <Mono className="text-subtle">{String(i + 1).padStart(2, "0")}</Mono>
                <p className="mt-1 text-sm font-medium text-ink">{s.step}</p>
                <p className="mt-2 text-sm leading-5 text-accent">{s.change}</p>
              </li>
            ))}
          </ol>
        </figure>
      );

    case "ledger":
      return (
        <figure className="overflow-hidden rounded-xl border border-line bg-panel">
          <dl className="grid gap-px bg-line sm:grid-cols-3">
            {v.items.map((e) => (
              <div key={e.label} className="bg-panel p-5 sm:p-6">
                <dt className="sr-only">{e.label}</dt>
                <dd className="font-sans text-4xl font-semibold tracking-tight text-ink tabular-nums">{e.value}</dd>
                <dd className="mt-1.5 text-sm leading-6 text-ink">{e.label}</dd>
                {e.detail ? <dd className="font-mono text-[11px] text-muted">{e.detail}</dd> : null}
              </div>
            ))}
          </dl>
          {v.note ? <figcaption className="border-t border-line px-5 py-3 text-xs leading-5 text-muted sm:px-6">{v.note}</figcaption> : null}
        </figure>
      );

    case "fit":
      return (
        <figure className="rounded-xl border border-line bg-panel p-5 sm:p-6">
          <figcaption className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-sm font-medium text-ink">Task difficulty vs. learner readiness</span>
            <EvidenceTag kind="illustrative" />
          </figcaption>
          <ol className="mt-5 grid gap-2 sm:grid-cols-3">
            {[["Too hard", "Frustration, then drop-off"], ["Right fit", "The learner keeps going"], ["Too easy", "Little to learn, then drift"]].map(([t, e], i) => (
              <li key={t} className={`rounded-lg border p-4 ${i === 1 ? "border-accent bg-accent-soft" : "border-line bg-background"}`}>
                <p className={`text-sm font-medium ${i === 1 ? "text-accent" : "text-ink"}`}>{t}</p>
                <p className="mt-1 text-sm leading-5 text-muted">{e}</p>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-5 text-muted">A fixed sequence puts every learner at the same difficulty, so some land on each side of the fit.</p>
        </figure>
      );

    case "system":
      return (
        <figure className="rounded-xl border border-line bg-panel p-5 sm:p-6">
          <figcaption className="text-sm font-medium text-ink">The adaptive loop, as the PRD defines it</figcaption>
          <ol className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
            {v.steps.map((s, i) => (
              <li key={s.step} className="rounded-lg border border-line bg-background p-4">
                <Mono className="text-accent">{String(i + 1).padStart(2, "0")} · {s.step}</Mono>
                <p className="mt-2 text-sm leading-5 text-ink">{s.detail}</p>
              </li>
            ))}
          </ol>
          <div className="mt-5 border-t border-line pt-4">
            <Mono className="text-muted">Edge cases the PRD defines</Mono>
            <ul className="mt-2 grid gap-1 text-sm leading-6 text-ink/85 sm:grid-cols-3">
              {v.edge.map((e) => <li key={e} className="flex gap-2"><span aria-hidden className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />{e}</li>)}
            </ul>
          </div>
        </figure>
      );

    case "experiment":
      return (
        <figure aria-label={`Controlled rollout: ${v.control}% control, ${v.treatment}% treatment, ${v.duration}, ${v.users} users`} className="rounded-xl border border-line bg-panel p-5 sm:p-6">
          <div aria-hidden className="flex h-3 overflow-hidden rounded-full">
            <span className="bg-data-before" style={{ width: `${v.control}%` }} />
            <span className="bg-data-after" style={{ width: `${v.treatment}%` }} />
          </div>
          <div aria-hidden className="mt-3 grid gap-1 text-sm sm:flex sm:justify-between">
            <p><span className="font-semibold text-ink">{v.control}% control</span> <span className="text-muted">· existing onboarding</span></p>
            <p><span className="font-semibold text-ink">{v.treatment}% treatment</span> <span className="text-muted">· redesigned onboarding</span></p>
          </div>
          <dl aria-hidden className="mt-5 grid grid-cols-3 gap-4 border-t border-line pt-4">
            {([["Duration", v.duration], ["Users", v.users], ["Measured", v.measures]] as const).map(([k, val]) => (
              <div key={k}><dt><Mono className="text-muted">{k}</Mono></dt><dd className="mt-1 text-sm font-medium text-ink">{val}</dd></div>
            ))}
          </dl>
        </figure>
      );

    case "deltas":
      return (
        <div className="rounded-xl border border-line bg-panel p-6 sm:p-8">
          <div className="grid gap-8 divide-y divide-line [&>*+*]:pt-8">
            {v.ids.map((id, i) => <Delta key={id} id={id} size={i === 0 ? "lg" : "md"} explain />)}
          </div>
          {v.notes ? (
            <ul className="mt-6 grid gap-1 border-t border-line pt-4 text-sm leading-6 text-muted">
              {v.notes.map((n) => <li key={n}>{n}</li>)}
            </ul>
          ) : null}
        </div>
      );

    case "caveat":
      return (
        <aside className="flex gap-4 rounded-xl border-2 border-accent bg-accent-soft p-6">
          <span aria-hidden className="mt-1 inline-block h-3 w-3 shrink-0 rounded-full border-2 border-accent" />
          <div>
            <Mono className="text-accent">Attribution note</Mono>
            <p className="mt-2 text-base leading-7 text-ink">{v.text}</p>
            {v.also ? <p className="mt-2 text-base leading-7 text-ink">{v.also}</p> : null}
          </div>
        </aside>
      );

    case "levers":
      return (
        <figure>
          <ol className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            {v.groups.map((g) => (
              <li key={g.lever} className={`p-5 ${g.incentive ? "bg-background" : "bg-panel"}`}>
                <p className="font-serif text-2xl text-ink">{g.lever}</p>
                <ul className="mt-3 grid gap-1.5 text-sm leading-6 text-ink/85">
                  {g.changes.map((c) => <li key={c} className="flex gap-2"><span aria-hidden className={`mt-2.5 h-1 w-1 shrink-0 rounded-full ${g.incentive ? "bg-ink" : "bg-accent"}`} />{c}</li>)}
                </ul>
              </li>
            ))}
          </ol>
          <figcaption className="mt-3 text-xs leading-5 text-muted">The five changes, by the lever each one pulls. They shipped as one treatment.</figcaption>
        </figure>
      );

    case "isolation":
      return (
        <figure className="overflow-hidden rounded-xl border border-line bg-panel">
          {/* Phones: one card per arm. */}
          <ol className="divide-y divide-line sm:hidden">
            {v.arms.map((a) => (
              <li key={a.arm} className="px-5 py-4">
                <p className="flex items-baseline gap-3"><span className="font-serif text-xl text-ink">{a.arm}</span><span className="text-xs text-muted">{a.on.some(Boolean) ? v.factors.filter((_, i) => a.on[i]).join(" + ") : "No changes"}</span></p>
                <p className="mt-1 text-sm leading-6 text-ink/85">{a.answers}</p>
              </li>
            ))}
          </ol>
          <div className="hidden sm:block">
            <table className="w-full text-left text-sm">
              <caption className="sr-only">Proposed experiment arms: which changes each arm includes, and what it answers</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-5 py-3 font-normal"><Mono className="text-muted">Arm</Mono></th>
                  {v.factors.map((f) => <th key={f} scope="col" className="px-3 py-3 text-center font-normal"><Mono className="text-muted">{f}</Mono></th>)}
                  <th scope="col" className="px-5 py-3 font-normal"><Mono className="text-muted">What it answers</Mono></th>
                </tr>
              </thead>
              <tbody>
                {v.arms.map((a) => (
                  <tr key={a.arm} className="border-b border-line/70 last:border-0">
                    <th scope="row" className="px-5 py-3.5 font-serif text-xl font-normal text-ink">{a.arm}</th>
                    {a.on.map((on, i) => (
                      <td key={v.factors[i]} className="px-3 py-3.5 text-center">
                        {on ? <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-full bg-accent" /> : <span aria-hidden className="inline-block h-px w-3 bg-line-strong align-middle" />}
                        <span className="sr-only">{on ? "included" : "not included"}</span>
                      </td>
                    ))}
                    <td className="px-5 py-3.5 leading-6 text-ink/85">{a.answers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="border-t border-line px-5 py-4 text-sm leading-6 text-muted">{v.note}</figcaption>
        </figure>
      );

    case "chain":
      return (
        <figure>
          <ol className="grid gap-3 sm:grid-cols-4">
            {v.links.map((l, i) => (
              <li key={l.metric} className={`relative rounded-lg border p-4 ${l.measured ? "border-accent/50 bg-panel" : "border-dashed border-line-strong"}`}>
                <Mono className={l.measured ? "text-accent" : "text-subtle"}>{l.measured ? "Measured" : "Not measured"}</Mono>
                <p className={`mt-1.5 text-base ${l.measured ? "text-ink" : "text-muted"}`}>{l.metric}</p>
                {i < v.links.length - 1 ? <span aria-hidden className="absolute top-1/2 -right-2.5 hidden -translate-y-1/2 text-subtle sm:block">→</span> : null}
              </li>
            ))}
          </ol>
          <figcaption className="mt-3 text-xs leading-5 text-muted">{v.note}</figcaption>
        </figure>
      );

    case "record":
      return (
        <dl className="grid gap-px overflow-hidden rounded-xl border border-line bg-line">
          {v.rows.map((r) => (
            <div key={r.term} className="grid gap-1 bg-panel px-5 py-3.5 sm:grid-cols-[9.5rem_1fr] sm:gap-6">
              <dt><Mono className={r.term === "Chose" ? "text-accent" : "text-muted"}>{r.term}</Mono></dt>
              <dd className={`text-sm leading-6 ${r.term === "Chose" ? "font-medium text-ink" : "text-ink/85"}`}>{r.text}</dd>
            </div>
          ))}
        </dl>
      );

    case "next":
      return (
        <ol className="grid gap-3">
          {v.items.map((n, i) => (
            <li key={n} className="flex gap-4 rounded-xl border border-dashed border-line-strong bg-panel p-5">
              <Mono className="mt-1 text-accent">{String(i + 1).padStart(2, "0")}</Mono>
              <p className="text-base leading-7 text-ink">{n}</p>
            </li>
          ))}
        </ol>
      );
  }
}
