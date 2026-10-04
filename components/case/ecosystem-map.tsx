/**
 * Behavioural Loops hero: one configurable behavioural system with two sides,
 * students (Glorifire) and faculty and stakeholders (Stakeholder platform).
 * Only components on record are drawn; nothing here implies an outcome, an
 * owner of the configuration, or point values beyond myPlan's 100.
 */
const student = [
  { name: "Action", text: "A behaviour-based actionable item" },
  { name: "Reward", text: "Points · Streaks · Badges" },
  { name: "Progression", text: "Avatars · Rank / Level" },
  { name: "Recognition", text: "Leaderboards · Hall of Fame" },
] as const;

const myPlan = ["System-generated myPlan", "Faculty confirm Correct / Incorrect", "100 points for accurate feedback"] as const;

export function EcosystemMap() {
  return (
    <figure aria-label="One configurable behavioural system across students and faculty">
      <div className="flex gap-3 border-l-2 border-accent pl-4">
        <div>
          <p className="text-[13px] font-medium text-accent">The product idea</p>
          <p className="mt-1 text-xl leading-7 font-semibold tracking-[-0.01em] text-ink sm:text-2xl sm:leading-8">One configurable behavioural system, connecting student engagement and faculty workflows.</p>
          <p className="mt-2 max-w-2xl text-[15px] leading-6 text-muted">Rewards attach to configurable behaviour-based actionable items, so the same mechanics serve both sides instead of a set of isolated game features.</p>
        </div>
      </div>

      <div className="mt-7 grid border-t border-ink lg:grid-cols-2">
        <section aria-label="Student side" className="py-5 lg:pr-10">
          <p className="text-[15px] font-bold text-ink">Students <span className="font-normal text-muted">· Glorifire</span></p>
          <ol className="mt-3">
            {student.map((s, i) => (
              <li key={s.name} className="grid grid-cols-[2rem_minmax(0,1fr)] border-t border-line py-2.5 first:border-t-0">
                <span className="pt-0.5 text-[13px] tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-[13px] font-medium text-muted">{s.name}{i < student.length - 1 ? <span aria-hidden className="text-subtle"> →</span> : null}</p>
                  <p className="text-[17px] leading-7 font-semibold tracking-[-0.01em] text-ink">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-label="Faculty and stakeholder side" className="border-t border-line py-5 lg:border-t-0 lg:border-l lg:pl-10">
          <p className="text-[15px] font-bold text-ink">Faculty and stakeholders <span className="font-normal text-muted">· Stakeholder platform</span></p>
          <ul className="mt-3">
            <li className="py-2.5">
              <p className="text-[13px] font-medium text-muted">Visibility</p>
              <p className="text-[17px] leading-7 font-semibold tracking-[-0.01em] text-ink">Analytics · Leaderboards</p>
            </li>
            <li className="border-t border-line py-2.5">
              <p className="text-[13px] font-medium text-muted">Actionable items</p>
              <p className="text-[17px] leading-7 font-semibold tracking-[-0.01em] text-ink">Configurable behaviour-based actionable items</p>
            </li>
            <li className="border-t border-line py-2.5">
              <p className="text-[13px] font-medium text-accent">myPlan feedback loop</p>
              <ol className="mt-1 grid gap-1 text-[15px] leading-6 text-ink sm:flex sm:flex-wrap sm:items-baseline sm:gap-x-2">
                {myPlan.map((m, i) => (
                  <li key={m} className={i === myPlan.length - 1 ? "font-semibold" : ""}>{m}{i < myPlan.length - 1 ? <span aria-hidden className="text-subtle"> →</span> : null}</li>
                ))}
              </ol>
            </li>
          </ul>
        </section>
      </div>
      <figcaption className="border-t border-line pt-3 text-[13px] leading-5 text-muted">The system as documented in the platform&apos;s screens, which aren&apos;t reproduced here. No engagement, retention or business outcome is attributed to it.</figcaption>
    </figure>
  );
}
