'use client'

import type s6 from '@/content/impact/605.json'
import { cn } from '@/lib/utils'
import { AFTER_START_MS, BEFORE_MS, TOTAL_MS, phase } from '@/components/impact/timing'
import { ImpactFrame, useImpactClock } from '@/components/impact/impact-frame'
import { RangeBar, toneText } from '@/components/impact/parts'

export type SixOFiveImpact = typeof s6

/** "Thirty-two reports became two pages. Fifteen audiences became five."
 *  Three short sequences: 32 tiles collapse to 2; render time on one axis;
 *  the workaround clock. */
export function SixOFiveViz({ data }: { data: SixOFiveImpact }) {
  const { ref, elapsed, reduced, replay, settled } = useImpactClock(TOTAL_MS)
  const { reports, render, workaround } = data
  const pCollapse = phase(elapsed, AFTER_START_MS, 700)
  const pPages = phase(elapsed, AFTER_START_MS + 700, 300)
  const pBefore = phase(elapsed, 0, BEFORE_MS)
  const pAfter = phase(elapsed, AFTER_START_MS, 800)

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
      <div className="grid gap-8 md:grid-cols-3 md:gap-8">
        <div>
          <p className="font-sans text-sm text-foreground">{reports.label}</p>
          <p className="mt-1 font-heading text-xl font-semibold tabular-nums">
            <span className={toneText.before}>{reports.before} reports</span>
            <span aria-hidden="true" className="mx-1.5 text-muted-foreground">
              →
            </span>
            <span className={toneText.after}>{reports.after} pages</span>
          </p>
          <div className="mt-3 grid max-w-[14rem] grid-cols-8 gap-1.5" aria-hidden="true">
            {Array.from({ length: reports.count }, (_, k) => {
              const appear = phase(elapsed, k * 12, 200)
              const kept = k < reports.keep
              const scale = kept ? appear * (1 + 0.12 * pPages) : appear * (1 - pCollapse)
              return (
                <i
                  key={k}
                  className={cn('block aspect-[4/5] rounded-[3px]', kept && pPages > 0 ? 'bg-accent-brand' : 'bg-foreground/30')}
                  style={{ transform: `scale(${Math.max(0, scale)})`, opacity: kept ? 1 : 1 - pCollapse }}
                />
              )
            })}
          </div>
        </div>

        <div>
          <p className="font-sans text-sm text-foreground">{render.label}</p>
          <div className="mt-3 grid gap-2">
            <RangeBar value={render.before.value} low={render.before.low} high={render.before.high} max={render.max} p={pBefore} tone="before" />
            <RangeBar value={render.after.value} low={render.after.low} high={render.after.high} max={render.max} p={pAfter} tone="after" />
          </div>
        </div>

        <div>
          <p className="font-sans text-sm text-foreground">{workaround.label}</p>
          <div className="mt-3 grid gap-3">
            {workaround.steps.map((s, i) => {
              const last = i === workaround.steps.length - 1
              const p = last ? pAfter : phase(elapsed, i * 200, BEFORE_MS - 200)
              return (
                <RangeBar key={s.value} value={s.value} low={s.low} high={s.high} max={workaround.max} p={p} tone={last ? 'after' : 'before'} label={s.label} />
              )
            })}
          </div>
        </div>
      </div>
    </ImpactFrame>
  )
}
