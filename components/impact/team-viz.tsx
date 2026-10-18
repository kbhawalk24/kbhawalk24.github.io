'use client'

import type tw from '@/content/impact/my-teams-work.json'
import { cn } from '@/lib/utils'
import { AFTER_START_MS, phase } from '@/components/impact/timing'
import { ImpactFrame, useImpactClock } from '@/components/impact/impact-frame'
import { RangeBar, toneText } from '@/components/impact/parts'

export type TeamImpact = typeof tw

/** Rows stagger inside the after phase; this viz's clock is a little longer
 *  than the shared one and still under the 2.5 s cap. */
export const TW_TOTAL_MS = 2300
const ROW_STAGGER_MS = 120
const ROW_MS = 500

/** "What changed in the two years I led the team." Five paired before/after
 *  bars on their own scales, a 17-dot incident row going out to 0, and a
 *  clean-data fill bar. */
export function TeamViz({ data }: { data: TeamImpact }) {
  const { ref, elapsed, reduced, replay, settled } = useImpactClock(TW_TOTAL_MS)
  const { rows, incidents, clean } = data
  const pIncidents = phase(elapsed, AFTER_START_MS + 200, 800)
  const pClean = phase(elapsed, AFTER_START_MS, 900)
  const litDots = incidents.count - Math.round(incidents.count * pIncidents)

  return (
    <ImpactFrame
      id={data.id}
      heading={data.heading}
      summary={data.summary}
      source={data.source}
      frameRef={ref}
      reduced={reduced}
      settled={settled}
      onReplay={replay}
    >
      <ol className="grid gap-5">
        {rows.map((row, i) => {
          const pBefore = phase(elapsed, i * 80, 400)
          const pAfter = phase(elapsed, AFTER_START_MS + i * ROW_STAGGER_MS, ROW_MS)
          return (
            <li key={row.label} className="grid gap-2 sm:grid-cols-[12rem_1fr] sm:items-center sm:gap-6">
              <div>
                <p className="font-sans text-sm text-foreground">{row.label}</p>
                <p className="font-sans text-xs text-muted-foreground">{row.date}</p>
              </div>
              <div className="grid gap-1.5">
                <RangeBar value={row.before.value} low={row.before.low} high={row.before.high} max={row.max} p={pBefore} tone="before" />
                <RangeBar value={row.after.value} low={row.after.low} high={row.after.high} max={row.max} p={pAfter} tone="after" />
              </div>
            </li>
          )
        })}
      </ol>

      <div className="mt-8 grid gap-6 border-t border-foreground/10 pt-6 md:grid-cols-2">
        <div>
          <p className="font-sans text-sm text-foreground">{incidents.label}</p>
          <p className="font-sans text-xs text-muted-foreground">
            {incidents.date}
            {incidents.shared ? ' · shared by many teams' : ''}
          </p>
          <p className="mt-2 font-heading text-xl font-semibold tabular-nums">
            <span className={toneText.before}>{incidents.before}</span>
            <span aria-hidden="true" className="mx-1.5 text-muted-foreground">
              →
            </span>
            <span className={toneText.after}>{incidents.after}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5" aria-hidden="true">
            {Array.from({ length: incidents.count }, (_, k) => (
              <i
                key={k}
                className={cn('block size-3 rounded-full transition-colors duration-150', k < litDots ? 'bg-foreground/30' : 'bg-foreground/[8%]')}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="font-sans text-sm text-foreground">{clean.label}</p>
          <p className="font-sans text-xs text-muted-foreground">
            {clean.date}
            {clean.shared ? ' · shared by many teams' : ''}
          </p>
          <p className="mt-2 font-heading text-xl font-semibold tabular-nums">
            <span className={toneText.before}>{clean.before}</span>
            <span aria-hidden="true" className="mx-1.5 text-muted-foreground">
              →
            </span>
            <span className={toneText.after}>{clean.after}</span>
          </p>
          <div className="relative mt-2 h-4 overflow-hidden rounded-full bg-foreground/[6%]" aria-hidden="true">
            <div className="absolute inset-y-0 left-0 bg-foreground/30" style={{ width: `${clean.beforePct}%` }} />
            <div className="absolute inset-y-0 left-0 rounded-full bg-accent-brand" style={{ width: `${clean.beforePct + (clean.afterPct - clean.beforePct) * pClean}%` }} />
          </div>
        </div>
      </div>
    </ImpactFrame>
  )
}
