import Image from "next/image";

/**
 * Behavioural Loops hero: one configurable behavioural system with two sides,
 * students (Glorifire) and faculty and stakeholders (Stakeholder platform).
 * The student side carries a real Glorifire screen, as supplied (cropped only
 * to leave out a learner's name and photo). The faculty side stays an
 * editorial diagram: no faculty screen is on record, so none is drawn.
 * Nothing here implies an outcome, an owner of the configuration, or point
 * values beyond myPlan's 100.
 */
const student = [
  { name: "Action", text: "A behaviour-based actionable item" },
  { name: "Reward", text: "Points · Streaks · Badges" },
  { name: "Progression", text: "Avatars · Rank / Level" },
  { name: "Recognition", text: "Leaderboards · Hall of Fame" },
] as const;

const myPlan = ["System-generated myPlan", "Faculty confirm Correct / Incorrect", "100 points for accurate feedback"] as const;

const screen = { src: "/work/glorifire-myrewards.webp", width: 1596, height: 426 };

const value = "text-[17px] leading-7 font-semibold tracking-[-0.01em] text-ink";

export function EcosystemMap() {
  return (
    <figure aria-label="One configurable behavioural system across students and faculty">
      <div className="border-l-2 border-accent pl-4">
        <p className="text-[13px] font-medium text-accent">The product idea</p>
        <p className="mt-1 text-xl leading-7 font-semibold tracking-[-0.01em] text-ink sm:text-2xl sm:leading-8">One configurable behavioural system, connecting student engagement and faculty workflows.</p>
        <p className="mt-2 max-w-2xl text-[15px] leading-6 text-muted">Rewards attach to configurable behaviour-based actionable items, so the same mechanics serve both sides as one behavioural loop rather than isolated point mechanics.</p>
      </div>

      <section aria-label="Student side" className="mt-7 border-t border-ink pt-5">
        <p className="text-[15px] font-bold text-ink">Students <span className="font-normal text-muted">· Glorifire</span></p>
        <figure className="mt-3">
          {/* Below sm the screen keeps a legible width and scrolls sideways rather than shrinking to illegibility. */}
          <div role="region" aria-label="Glorifire student screen, scrolls sideways on small screens" tabIndex={0} className="w-0 min-w-full overflow-x-auto border border-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto sm:overflow-visible">
          <a href={screen.src} target="_blank" rel="noreferrer" className="block w-[720px] max-w-none sm:w-auto">
            <Image
              src={screen.src}
              width={screen.width}
              height={screen.height}
              sizes="(min-width: 1280px) 1072px, (min-width: 640px) calc(100vw - 4rem), 720px"
              alt="Glorifire student home showing the myRewards panel: myPoints, myStreaks, myBadges and myLeaderboard"
              className="block h-auto w-full"
            />
            <span className="sr-only">(opens the screen at full size in a new tab)</span>
          </a>
          </div>
          <figcaption className="mt-2 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 text-[13px] leading-5 text-muted">
            <span>Product evidence: Glorifire student experience. Screens are shown as supplied; this case does not reproduce the full product surface. Cropped at the right edge to leave out a learner&apos;s name and photo.</span>
            <span className="sm:hidden">Swipe to see the whole screen, or <a href={screen.src} target="_blank" rel="noreferrer" className="inline-flex min-h-6 items-center gap-1 font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent ">open it full size <span aria-hidden>↗</span><span className="sr-only">(opens in a new tab)</span></a>.</span>
          </figcaption>
        </figure>

        <ol className="mt-5 grid border-t border-line lg:grid-cols-4">
          {student.map((s, i) => (
            <li key={s.name} className={`grid grid-cols-[2rem_minmax(0,1fr)] py-2.5 lg:block lg:py-3 lg:pr-5 ${i > 0 ? "border-t border-line lg:border-t-0 lg:border-l lg:pl-5" : ""}`}>
              <span className="pt-0.5 text-[13px] tabular-nums text-subtle">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[13px] font-medium text-muted">{s.name}{i < student.length - 1 ? <span aria-hidden className="text-subtle"> →</span> : null}</p>
                <p className={value}>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="Faculty and stakeholder side" className="mt-6 border-t border-ink pt-5">
        <p className="text-[15px] font-bold text-ink">Faculty and stakeholders <span className="font-normal text-muted">· Stakeholder platform</span></p>
        <ul className="mt-3 grid border-t border-line lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.4fr)]">
          <li className="py-2.5 lg:py-3 lg:pr-5">
            <p className="text-[13px] font-medium text-muted">Visibility</p>
            <p className={value}>Analytics · Leaderboards</p>
          </li>
          <li className="border-t border-line py-2.5 lg:border-t-0 lg:border-l lg:py-3 lg:px-5">
            <p className="text-[13px] font-medium text-muted">Actionable items</p>
            <p className={value}>Configurable behaviour-based actionable items</p>
          </li>
          <li className="border-t border-line py-2.5 lg:border-t-0 lg:border-l lg:py-3 lg:pl-5">
            <p className="text-[13px] font-medium text-accent">myPlan feedback loop</p>
            <ol className="mt-1 grid gap-1 text-[15px] leading-6 text-ink">
              {myPlan.map((m, i) => (
                <li key={m} className={i === myPlan.length - 1 ? "font-semibold" : ""}>{m}{i < myPlan.length - 1 ? <span aria-hidden className="text-subtle"> →</span> : null}</li>
              ))}
            </ol>
          </li>
        </ul>
      </section>
      <figcaption className="mt-1 border-t border-line pt-3 text-[13px] leading-5 text-muted">The student screen shows the experience as it shipped. Faculty-side screens aren&apos;t reproduced. Engagement figures are reported, not causally attributed: see Evidence.</figcaption>
    </figure>
  );
}
