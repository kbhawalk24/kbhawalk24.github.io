'use client'

import type fd from '@/content/impact/finding-data.json'
import { cn } from '@/lib/utils'
import { AFTER_MS, AFTER_START_MS, BEFORE_MS, TOTAL_MS, phase } from '@/components/impact/timing'
import { ImpactFrame, useImpactClock } from '@/components/impact/impact-frame'
import { countText, toneBar, toneText } from '@/components/impact/parts'

export type FindingDataImpact = typeof fd

/** "From 45 minutes to 4 minutes." Two duration bars on one time axis,
 *  then three count-up tiles. */
export function FindingDataViz({ data }: { data: FindingDataImpact }) {
  const { ref, elapsed, reduced, replay, settled } = useImpactClock(TOTAL_MS)
  const p1 = phase(elapsed, 0, BEFORE_MS)
  const p2 = phase(elapsed, AFTER_START_MS, AFTER_MS)
  const { bars, tiles } = data
  const max = bars.before.minutes

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
      <div className="grid gap-8 lg:grid-cols-[3fr_2fr] lg:gap-12">
        <div>
          <DurationBar label={bars.before.label} value={bars.before.value} pct={(bars.before.minutes / max) * 100 * p1} tone="before" />
          <DurationBar label={bars.after.label} value={bars.after.value} pct={(bars.after.minutes / max) * 100 * p2} tone="after" className="mt-5" />
          {/* The ruler: 0, 15, 30, 45 min. */}
          <div className="relative mt-3 h-6 border-t border-foreground/15" aria-hidden="true">
            {bars.axis.map((tick, i) => {
              const left = (Number(tick) / max) * 100
              const last = i === bars.axis.length - 1
              return (
                <span
                  key={tick}
                  className={cn('absolute top-0 whitespace-nowrap font-sans text-xs tabular-nums text-muted-foreground', last ? '-translate-x-full' : i === 0 ? '' : '-translate-x-1/2')}
                  style={{ left: `${left}%` }}
                >
                  <span className="block h-1.5 w-px bg-foreground/25" style={{ marginLeft: last ? 'auto' : i === 0 ? 0 : '50%' }} />
                  {tick}
                  {last ? ` ${bars.unit}` : ''}
                </span>
              )
            })}
          </div>
        </div>

        <ol className="grid grid-cols-3 gap-3 lg:grid-cols-1">
          {tiles.map((t) => (
            <li key={t.label} className="rounded-[10px] bg-card-soft p-3">
              <p className="font-heading text-lg font-semibold leading-tight tracking-tight tabular-nums sm:text-xl">
                {!('fromHidden' in t && t.fromHidden) && (
                  <>
                    <span className="text-muted-foreground">{t.from}</span>
                    <span aria-hidden="true" className="mx-1.5 text-muted-foreground">
                      →
                    </span>
                  </>
                )}
                <span className="text-accent-brand">{countText(t.from, t.to, p2)}</span>
              </p>
              <p className="mt-1 text-pretty font-sans text-xs leading-snug text-foreground">{t.label}</p>
              <p className="mt-1 font-sans text-xs text-muted-foreground">{t.date}</p>
            </li>
          ))}
        </ol>
      </div>
    </ImpactFrame>
  )
}

function DurationBar({
  label,
  value,
  pct,
  tone,
  className,
}: {
  label: string
  value: string
  pct: number
  tone: 'before' | 'after'
  className?: string
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="font-sans text-sm text-foreground">{label}</p>
        <p className={cn('font-heading text-xl font-semibold tabular-nums', toneText[tone])}>{value}</p>
      </div>
      <div className="mt-1.5 h-4 overflow-hidden rounded-full bg-foreground/[6%]" aria-hidden="true">
        <div className={cn('h-full rounded-full', toneBar[tone])} style={{ width: `${Math.max(pct, 0)}%` }} />
      </div>
    </div>
  )
}
