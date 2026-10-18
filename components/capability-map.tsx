'use client'

import { Compass, Tv } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackStyles } from '@/lib/track-styles'
import {
  BEFORE,
  INITIATIVES,
  INVOLVEMENT_LABEL,
  STAGES,
  type InitiativeId,
  type Involvement,
  type Stage,
} from '@/lib/capability-map'

// The map beside the hero's about text (data in lib/capability-map.ts).
// Section one: "Led design and strategy for", the seven lifecycle stages
// in order, a marker per stage for how it was mine, and two rails on the
// right for the horizontal initiatives, each rail a line through the span
// it covered with a mark at every stage it touched. Section two: 605.
// Identity is never colour alone: markers are explained in a legend, the
// two rails differ in shape, and every row carries its words.

const DOT: Record<Involvement, string> = {
  ic: 'bg-track-ic',
  management: 'bg-track-management',
  strategy: 'bg-track-strategy',
  none: 'ring-1 ring-inset ring-foreground/25',
}

/** First and last stage index each rail spans. */
function span(id: InitiativeId) {
  const idx = STAGES.map((s, i) => (s.initiatives.includes(id) ? i : -1)).filter((i) => i >= 0)
  return { from: idx[0], to: idx[idx.length - 1] }
}

function Rail({ id, stageIndex }: { id: InitiativeId; stageIndex: number }) {
  const init = INITIATIVES.find((i) => i.id === id)!
  const { from, to } = span(id)
  const stage = STAGES[stageIndex]
  const inSpan = stageIndex >= from && stageIndex <= to
  const touched = stage.initiatives.includes(id)
  return (
    <span className="relative flex h-full w-3.5 items-center justify-center self-stretch">
      {inSpan && (
        <span
          aria-hidden="true"
          className={cn(
            'absolute left-1/2 w-px -translate-x-1/2 bg-track-strategy/40',
            stageIndex === from ? 'top-1/2' : 'top-0',
            stageIndex === to ? 'bottom-1/2' : 'bottom-0',
          )}
        />
      )}
      {touched && (
        <span
          className={cn('relative size-2 bg-track-strategy', init.shape === 'circle' ? 'rounded-full' : 'rounded-[2px]')}
        >
          <span className="sr-only">{init.label}</span>
        </span>
      )}
    </span>
  )
}

function StageRow({ stage, index }: { stage: Stage; index: number }) {
  return (
    <li className="grid grid-cols-[minmax(0,1fr)_0.875rem_0.875rem] items-stretch gap-x-2">
      <div className="flex items-start gap-2.5 py-1.5">
        <span className="label-micro w-3 shrink-0 pt-[3px] tabular-nums text-muted-foreground">{stage.n}</span>
        <span aria-hidden="true" className={cn('mt-[5px] size-2.5 shrink-0 rounded-full', DOT[stage.mine])} />
        <span className="min-w-0">
          <span className="block font-sans text-[13px] font-semibold leading-snug text-foreground">
            {stage.name}
            <span className="sr-only">, {INVOLVEMENT_LABEL[stage.mine]}</span>
          </span>
          <span className="block font-sans text-[11px] leading-snug text-muted-foreground">{stage.what}</span>
        </span>
      </div>
      <Rail id="clean" stageIndex={index} />
      <Rail id="access" stageIndex={index} />
    </li>
  )
}

function Legend() {
  const items: Involvement[] = ['ic', 'management', 'none']
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="How each stage was mine">
      {items.map((m) => (
        <li key={m} className="flex items-center gap-1.5 label-micro text-muted-foreground">
          <span aria-hidden="true" className={cn('size-2 rounded-full', DOT[m])} />
          {INVOLVEMENT_LABEL[m]}
        </li>
      ))}
    </ul>
  )
}

/** The hero slot. */
export function CapabilityMap({ className }: { className?: string }) {
  return (
    <div className={cn('grid gap-7', className)} aria-label="What I led design and strategy for, at a glance">
      <section aria-labelledby="led-heading">
        <header className="flex items-center gap-2.5">
          <span className={cn('inline-flex size-8 items-center justify-center rounded-full', trackStyles.strategy.badgeFlat)}>
            <Compass className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p id="led-heading" className="label-micro text-foreground">
              Led design and strategy for
            </p>
            <p className="font-sans text-xs text-muted-foreground">Intuit’s data platform, end to end · 2021–2026</p>
          </div>
        </header>
        <div className="mt-3">
          <Legend />
        </div>
        <ol className="mt-2 grid">
          {STAGES.map((s, i) => (
            <StageRow key={s.n} stage={s} index={i} />
          ))}
        </ol>
        <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 label-micro text-muted-foreground">
          <span className="text-foreground">Across stages, strategy mine</span>
          {INITIATIVES.map((i) => (
            <span key={i.id} className="flex items-center gap-1.5">
              <span
                aria-hidden="true"
                className={cn('size-2 bg-track-strategy', i.shape === 'circle' ? 'rounded-full' : 'rounded-[2px]')}
              />
              {i.label}
            </span>
          ))}
        </p>
      </section>

      <section aria-labelledby="before-heading">
        <header className="flex items-center gap-2.5">
          <span className={cn('inline-flex size-8 items-center justify-center rounded-full', trackStyles.ic.badgeFlat)}>
            <Tv className="size-4" aria-hidden="true" />
          </span>
          <div>
            <p id="before-heading" className="label-micro text-foreground">
              {BEFORE.caption}
            </p>
            <p className="font-sans text-xs text-muted-foreground">{BEFORE.line}</p>
          </div>
        </header>
        <ul className={cn('ml-4 mt-3 grid border-l border-current/40 pl-4', trackStyles.ic.accentText)}>
          {BEFORE.products.map((p) => {
            const Icon = p.icon
            return (
              <li
                key={p.name}
                className="relative flex items-center gap-2.5 py-1 before:absolute before:-left-4 before:top-1/2 before:h-px before:w-3 before:bg-current/40"
              >
                <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                <span className="font-sans text-[13px] leading-snug text-foreground">{p.name}</span>
              </li>
            )
          })}
        </ul>
      </section>
    </div>
  )
}
