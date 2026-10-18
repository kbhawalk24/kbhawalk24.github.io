'use client'

import { cn } from '@/lib/utils'
import { trackStyles } from '@/lib/track-styles'
import {
  DOMAIN_GROUPS,
  EXPERTISE_AXIS,
  EXPERTISE_SPANS,
  OWNER_LABEL,
  OWNER_TAG,
  type DomainArea,
} from '@/lib/domain-map'
import type { Track } from '@/lib/timeline-data'

// The domain map: the areas of Intuit's data platform, each marked by who
// designed it (me, my strategy with my team designing, or my team), then
// the expertise spans on one time axis. Identity is never colour alone:
// every cell carries its owner tag in text, and the legend spells the tags
// out. Sized to sit beside the hero's about text without outgrowing it.

const OWNERS: Track[] = ['ic', 'strategy', 'management']

function Cell({ area }: { area: DomainArea }) {
  const style = trackStyles[area.owner]
  return (
    <li className="group relative">
      <button
        type="button"
        aria-describedby={`${area.id}-detail`}
        className="flex min-h-8 w-full items-center gap-2 rounded-[10px] bg-card px-2.5 py-1 text-left shadow-soft transition-[box-shadow] hover:shadow-cta focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
      >
        <span aria-hidden="true" className={cn('size-2 shrink-0 rounded-full', style.dot)} />
        <span className="min-w-0 flex-1 font-sans text-xs font-semibold leading-tight text-foreground">
          {area.label}
        </span>
        <span className="shrink-0 label-micro text-muted-foreground">
          {OWNER_TAG[area.owner]}
          <span className="sr-only">: {OWNER_LABEL[area.owner]}</span>
        </span>
      </button>
      {/* The detail, on hover and keyboard focus. */}
      <div
        id={`${area.id}-detail`}
        role="tooltip"
        className="pointer-events-none absolute left-0 top-full z-20 mt-1.5 w-64 max-w-[80vw] rounded-[10px] bg-primary px-3 py-2 font-sans text-xs leading-relaxed text-primary-foreground opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        <span className="label-micro opacity-70">{area.years}</span>
        <br />
        {area.detail}
      </div>
    </li>
  )
}

function Legend() {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="Who designed each area">
      {OWNERS.map((o) => (
        <li key={o} className="flex items-center gap-1.5 label-micro text-muted-foreground">
          <span aria-hidden="true" className={cn('size-2 rounded-full', trackStyles[o].dot)} />
          <span>
            <span className="text-foreground">{OWNER_TAG[o]}</span> {OWNER_LABEL[o].toLowerCase()}
          </span>
        </li>
      ))}
    </ul>
  )
}

function Expertise() {
  const span = EXPERTISE_AXIS.to - EXPERTISE_AXIS.from
  const pct = (y: number) => ((y - EXPERTISE_AXIS.from) / span) * 100
  const ticks = [2014, 2017, 2021, 2024]
  const cols = 'grid grid-cols-[minmax(0,10.5rem)_1fr] items-center gap-3'
  return (
    <div>
      <p className="label-micro text-foreground">Expertise, by year</p>
      <ol className="mt-1.5 grid gap-0.5">
        {EXPERTISE_SPANS.map((s) => (
          <li key={s.id} className={cols}>
            <span className="truncate font-sans text-xs text-foreground" title={s.note}>
              {s.label}
            </span>
            <span className="relative block h-1.5" aria-label={`${s.label}, ${s.note}`}>
              <span
                className="absolute inset-y-0 rounded-full bg-accent-brand"
                style={{ left: `${pct(s.from)}%`, width: `${pct(s.to) - pct(s.from)}%` }}
              />
            </span>
          </li>
        ))}
      </ol>
      <div className={cn(cols, 'mt-1')}>
        <span />
        <div className="relative h-4">
          {ticks.map((t) => (
            <span
              key={t}
              className="absolute top-0 -translate-x-1/2 label-micro tabular-nums text-muted-foreground"
              style={{ left: `${pct(t)}%` }}
            >
              {t}
            </span>
          ))}
          <span className="absolute right-0 top-0 label-micro text-muted-foreground">now</span>
        </div>
      </div>
    </div>
  )
}

export function DomainMap({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-4', className)} aria-label="What I owned at Intuit, and my expertise">
      <div>
        <p className="label-micro text-foreground">Intuit’s data platform, 2021–2026</p>
        <div className="mt-1.5">
          <Legend />
        </div>
        <div className="mt-2.5 grid gap-2">
          {DOMAIN_GROUPS.map((g) => (
            <section key={g.id} aria-label={g.label}>
              <p className="label-micro text-muted-foreground">{g.label}</p>
              <ul className="mt-1 grid grid-cols-1 gap-1 sm:grid-cols-2">
                {g.areas.map((a) => (
                  <Cell key={a.id} area={a} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
      <Expertise />
    </div>
  )
}
