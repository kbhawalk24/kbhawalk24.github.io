'use client'

import { Activity, ChartColumn, Compass, GitFork, KeyRound, Search, ShieldCheck, Workflow, type LucideIcon } from 'lucide-react'

import { INTUIT_CHAPTER } from '@/lib/home-content'
import { cn } from '@/lib/utils'

// Between the hero and the work: what was mine at Intuit and what ran
// through the team. One dark pill at the top, a solid line down to the box
// of the two areas I owned, a dashed line to the box of the six the team
// covered. The solid and dashed outlines are the diagram's own notation,
// not card borders.

const ICONS: Record<string, LucideIcon> = {
  search: Search,
  compass: Compass,
  workflow: Workflow,
  activity: Activity,
  'git-fork': GitFork,
  'shield-check': ShieldCheck,
  'key-round': KeyRound,
  'chart-column': ChartColumn,
}

const TONE = {
  ic: { panel: 'bg-track-ic/10', text: 'text-track-ic' },
  strategy: { panel: 'bg-track-strategy/10', text: 'text-track-strategy' },
  management: { panel: 'bg-track-management/10', text: 'text-track-management' },
}

export function IntuitChapter() {
  const c = INTUIT_CHAPTER
  return (
    <section id="intuit" className="relative z-10 scroll-mt-28">
      <div className="mx-auto grid w-full max-w-6xl items-start gap-10 px-6 py-16 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-16 md:px-10 md:py-24 lg:px-14">
        <div>
          <p className="label-micro text-muted-foreground">{c.eyebrow}</p>
          <h2 className="mt-3 text-balance font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{c.heading}</h2>
          <p className="mt-5 max-w-[30rem] text-pretty font-sans text-lg leading-[1.6] text-muted-foreground">{c.text}</p>
        </div>

        <div>
          <div className="flex md:justify-center">
            <div className="inline-flex items-center gap-3 rounded-full bg-primary py-1.5 pl-1.5 pr-5 text-primary-foreground">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary-foreground/15 font-heading text-sm font-bold">{c.pill.initial}</span>
              <span className="font-sans text-sm leading-tight">
                <span className="font-semibold">{c.pill.text}</span>
                <span className="opacity-70"> · {c.pill.meta}</span>
              </span>
            </div>
          </div>

          {/* The connectors: solid to owned, dashed to directed. Phones stack the boxes, so no lines. */}
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="hidden h-10 w-full md:block" aria-hidden="true">
            <path d="M50 0 V16 H26 V40" fill="none" stroke="var(--foreground)" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            <path d="M50 16 H74 V40" fill="none" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="4 4" vectorEffect="non-scaling-stroke" />
          </svg>

          <div className="mt-4 grid gap-5 md:mt-0 md:grid-cols-2">
            <div className="rounded-[16px] p-4 ring-[1.5px] ring-foreground">
              <p className="label-micro text-foreground">
                {c.owned.label} <span className="normal-case tracking-normal text-muted-foreground">· {c.owned.meta}</span>
              </p>
              <div className="mt-4 flex flex-col gap-3">
                {c.owned.items.map((it) => {
                  const Icon = ICONS[it.icon]
                  const tone = TONE[it.tone]
                  return (
                    <div key={it.title} className={cn('rounded-[12px] p-4', tone.panel)}>
                      <p className={cn('flex items-center gap-2 font-heading text-lg font-semibold leading-tight', tone.text)}>
                        <Icon className="size-4 shrink-0" aria-hidden="true" />
                        {it.title}
                      </p>
                      <p className={cn('mt-2 text-pretty font-sans text-sm leading-relaxed', tone.text)}>{it.text}</p>
                      <a
                        href={it.href}
                        className="mt-3 inline-flex min-h-8 items-center gap-1 rounded-full bg-card px-3 text-xs font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:ring-foreground/30"
                      >
                        Case study <span aria-hidden="true">↓</span>
                      </a>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="rounded-[16px] border-[1.5px] border-dashed border-foreground/40 p-4">
              <p className="label-micro text-foreground">
                {c.directed.label} <span className="normal-case tracking-normal text-muted-foreground">· {c.directed.meta}</span>
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {c.directed.items.map((it) => {
                  const Icon = ICONS[it.icon]
                  return (
                    <li key={it.title} className={cn('min-w-0 rounded-[12px] p-3', TONE.management.panel)}>
                      <p className={cn('flex items-start gap-1.5 font-sans text-[13px] font-semibold leading-snug', TONE.management.text)}>
                        <Icon className="mt-px size-3.5 shrink-0" aria-hidden="true" />
                        <span className="min-w-0">{it.title}</span>
                      </p>
                      <p className={cn('mt-1 font-sans text-xs leading-snug', TONE.management.text, 'opacity-80')}>{it.text}</p>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
