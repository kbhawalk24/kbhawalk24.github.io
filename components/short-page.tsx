'use client'

import { event } from '@/lib/analytics'
import Link from 'next/link'
import { MotionConfig } from 'motion/react'
import { cn } from '@/lib/utils'
import type { Block, ChipIcon, InlineLink, PageFact, PageVisual, ShortPage } from '@/lib/pages/types'
import { Boxes, Brain, ChartColumn, ClipboardList, Code, KeyRound, Megaphone, MessageSquare, Rocket, RotateCcw, Search, Table2, UserRound, Wrench } from 'lucide-react'
import { TINTS, tintPanel, tintText } from '@/lib/tint'
import { Reveal } from '@/components/motion-primitives'
import { ContactFooter } from '@/components/contact-footer'
import { HeadingDot } from '@/components/heading-dot'
import { SiteHeader } from '@/components/site-header'
import { WithSectionNav } from '@/components/section-nav'
import { VideoEmbed } from '@/components/video-embed'
import { HeroVideo } from '@/components/hero-video'
import { PrototypeEmbed } from '@/components/prototype-embed'

// The case study page, built to five rules.
//
// Grid: text sits in a 46rem column; visuals and supporting blocks span the
// full measure. Cards are three across, never four. Two images share a row
// only when their aspect ratios match; otherwise each is full width.
//
// Surfaces: a white card (`bg-card shadow-soft`) or nothing. No grey panels.
//
// Type: heading (h2), subhead (card titles), body, small. The mono micro
// label is used for eyebrows and captions only.
//
// Spacing: 8, 16, 24, 48, 96. Card padding 24. Gap between cards 16.
// Gap between blocks 24. Sections are 96 apart.
//
// Content: each section is an eyebrow, a heading, one lead paragraph, one
// visual and at most one supporting block. The data files hold to that.

const CARD = 'rounded-[14px] bg-card p-6 shadow-soft'
const SUBHEAD = 'font-heading text-xl font-semibold leading-tight tracking-tight'
const BODY = 'text-pretty text-[17px] leading-[1.65] text-foreground/90'
const SMALL = 'text-pretty font-sans text-sm leading-relaxed text-muted-foreground'
const CAPTION = 'text-pretty font-sans text-sm leading-relaxed text-muted-foreground'

const WIDE_BLOCKS = new Set(['steps', 'cards', 'tension', 'table', 'video', 'quotes', 'statement', 'clips', 'chips', 'journey', 'compare', 'anatomy', 'donut', 'timeline'])

const CHIP_ICONS: Record<ChipIcon, React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>> = {
  chart: ChartColumn, code: Code, megaphone: Megaphone, wrench: Wrench, brain: Brain, boxes: Boxes, clipboard: ClipboardList,
  search: Search, message: MessageSquare, person: UserRound, key: KeyRound, table: Table2, restart: RotateCcw,
}

function readMinutes(page: ShortPage) {
  const words = page.sections
    .flatMap((sec) => sec.blocks)
    .map((b) => {
      if (b.type === 'p') return b.text
      if (b.type === 'list') return b.items.map((i) => i.lead + ' ' + i.text).join(' ')
      if (b.type === 'cards') return b.items.map((i) => i.title + ' ' + i.text).join(' ')
      if (b.type === 'tension') return b.items.map((i) => i.tension + ' ' + i.decision).join(' ')
      if (b.type === 'quotes') return b.items.map((i) => i.text).join(' ')
      if (b.type === 'statement') return b.rows.map((r) => r.text).join(' ')
      if (b.type === 'steps') return b.items.map((i) => i.title + ' ' + (i.quote ?? '')).join(' ')
      if (b.type === 'clips') return b.items.map((i) => i.title + ' ' + i.text).join(' ')
      if (b.type === 'table') return b.rows.flat().join(' ')
      if (b.type === 'subhead') return b.text
      if (b.type === 'chips') return b.items.map((i) => i.label).join(' ')
      if (b.type === 'journey') return b.items.map((i) => i.title).join(' ')
      if (b.type === 'compare') return b.panels.map((i) => i.text).join(' ')
      if (b.type === 'anatomy') return b.lines.map((i) => i.text).join(' ')
      if (b.type === 'donut') return b.segments.map((i) => i.label + ' ' + (i.text ?? '')).join(' ')
      if (b.type === 'timeline') return b.items.map((i) => i.title + ' ' + i.text).join(' ')
      return ''
    })
    .join(' ')
    .split(/\s+/).length
  return Math.max(3, Math.round(words / 220))
}

/** Text with its inline links, each phrase linked at its first occurrence. */
function Linked({ text, links }: { text: string; links?: InlineLink[] }) {
  if (!links?.length) return <>{text}</>
  const out: React.ReactNode[] = []
  let rest = text
  links.forEach((l, i) => {
    const at = rest.indexOf(l.text)
    if (at < 0) return
    out.push(rest.slice(0, at))
    out.push(
      <a key={i} href={l.href} className="font-medium text-foreground underline decoration-foreground/40 underline-offset-[3px] hover:decoration-foreground">
        {l.text}
      </a>,
    )
    rest = rest.slice(at + l.text.length)
  })
  out.push(rest)
  return <>{out}</>
}

function BlockView({ block }: { block: Block }) {
  if (block.type === 'chips') {
    return (
      <ul className="flex flex-wrap gap-2.5">
        {block.items.map((c) => {
          const Icon = c.icon ? CHIP_ICONS[c.icon] : null
          return (
            <li key={c.label} className="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-card py-2 pl-3 pr-4 shadow-soft">
              {Icon && <Icon className="size-4 text-accent-brand" aria-hidden />}
              <span className="font-heading text-lg font-semibold leading-none tabular-nums text-accent-brand">{c.count}</span>
              <span className="font-sans text-sm text-foreground">{c.label}</span>
            </li>
          )
        })}
      </ul>
    )
  }
  if (block.type === 'journey') {
    return (
      <figure>
        <ol className="grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {block.items.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                'relative flex min-h-28 flex-col justify-between rounded-[12px] p-4',
                step.outside ? 'border border-dashed border-foreground/25 bg-transparent' : 'bg-card shadow-soft ring-1 ring-accent-brand/40',
              )}
            >
              <span className={cn('label-micro', step.outside ? 'text-muted-foreground' : 'text-accent-brand')}>{String(i + 1).padStart(2, '0')}</span>
              <span className="mt-3 text-pretty font-sans text-[15px] font-medium leading-snug text-foreground">{step.title}</span>
              <span className={cn(SMALL, 'mt-3 text-xs')}>{step.outside ? 'Outside the catalog' : 'In the catalog'}</span>
            </li>
          ))}
        </ol>
        {block.caption && <figcaption className={cn(CAPTION, 'mt-3')}>{block.caption}</figcaption>}
      </figure>
    )
  }
  if (block.type === 'compare') {
    return (
      <ul className={cn('grid gap-4', block.panels.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2')}>
        {block.panels.map((panel) => (
          <li key={panel.label} className={cn(CARD, panel.accent && 'ring-1 ring-accent-brand/40')}>
            <p className={cn('label-micro', panel.accent ? 'text-accent-brand' : 'text-muted-foreground')}>{panel.label}</p>
            <p className={cn(BODY, 'mt-3')}>{panel.text}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {panel.pills.map((pill) => (
                <li key={pill} className={cn('rounded-full px-3 py-1 font-sans text-[13px] font-medium', panel.accent ? 'bg-accent-brand/10 text-accent-brand' : 'bg-foreground/[0.06] text-foreground')}>
                  {pill}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    )
  }
  if (block.type === 'anatomy') {
    return (
      <figure className={cn(CARD, 'grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-center')}>
        <div className="min-w-0 rounded-[12px] bg-card-soft p-4 sm:p-5">
          <div className="rounded-[10px] bg-card p-4 shadow-soft ring-1 ring-foreground/10">
            <p className="label-micro text-muted-foreground">{block.kind}</p>
            <p className="mt-1 font-mono text-[15px] font-semibold text-foreground">{block.name}</p>
            <ol className="mt-3 grid gap-2">
              {block.lines.map((line, i) => (
                <li key={i} className="flex items-baseline justify-between gap-4 border-t border-border pt-2 first:border-t-0 first:pt-0">
                  <span className="min-w-0 break-words font-sans text-sm text-foreground/90">
                    <span className="mr-2 tabular-nums text-muted-foreground">{i + 1}</span>
                    {line.text}
                  </span>
                  <span className={cn('shrink-0 rounded-full px-2 py-0.5 label-micro', line.group === block.groups[0] ? 'bg-accent-brand/10 text-accent-brand' : 'bg-foreground/[0.06] text-muted-foreground')}>{line.group}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
        <div>
          <ul className="grid gap-3">
            {block.groups.map((g, gi) => (
              <li key={g} className="flex items-start gap-3">
                <span className={cn('mt-1.5 size-2.5 shrink-0 rounded-full', gi === 0 ? 'bg-accent-brand' : 'bg-foreground/30')} aria-hidden />
                <span className={BODY}>
                  <span className="font-semibold">{g}:</span>{' '}
                  {block.lines.filter((l) => l.group === g).length} of the {block.lines.length} lines
                </span>
              </li>
            ))}
          </ul>
          {block.caption && <figcaption className={cn(CAPTION, 'mt-4')}>{block.caption}</figcaption>}
        </div>
      </figure>
    )
  }
  if (block.type === 'donut') {
    const total = block.segments.reduce((a, b) => a + b.value, 0)
    const r = 42
    const circ = 2 * Math.PI * r
    const fills = ['var(--accent-brand)', 'color-mix(in oklab, var(--accent-brand) 45%, var(--card))', 'color-mix(in oklab, var(--foreground) 18%, var(--card))', 'color-mix(in oklab, var(--foreground) 8%, var(--card))']
    let offset = 0
    const arcs = block.segments.map((seg, i) => {
      const len = (seg.value / total) * circ
      const el = <circle key={i} cx="50" cy="50" r={r} fill="none" stroke={fills[i] ?? fills[3]} strokeWidth="14" strokeDasharray={`${len - 2} ${circ - len + 2}`} strokeDashoffset={-offset} transform="rotate(-90 50 50)" />
      offset += len
      return el
    })
    return (
      <figure className={cn(CARD, 'grid items-center gap-6 sm:grid-cols-[12rem_minmax(0,1fr)]')}>
        <div className="relative mx-auto w-44">
          <svg viewBox="0 0 100 100" className="w-full" role="img" aria-label={`${block.total}: ${block.segments.map((s) => `${s.label} ${s.value}%`).join(', ')}`}>
            {arcs}
          </svg>
          <p className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-heading text-2xl font-semibold leading-none tracking-tight text-foreground">{block.total.split(' ')[0]}</span>
            <span className={cn(SMALL, 'mt-1 text-xs')}>{block.total.split(' ').slice(1).join(' ')}</span>
          </p>
        </div>
        <div>
          <ul className="grid gap-3">
            {block.segments.map((seg, i) => (
              <li key={seg.label} className="flex items-start gap-3 border-t border-border pt-3 first:border-t-0 first:pt-0">
                <span className="mt-2 size-2.5 shrink-0 rounded-full" style={{ background: fills[i] ?? fills[3] }} aria-hidden />
                <span className="font-heading text-2xl font-semibold leading-none tabular-nums text-foreground">{seg.value}%</span>
                <span className="min-w-0">
                  <span className="block font-sans text-[15px] font-medium leading-snug text-foreground">{seg.label}</span>
                  {seg.text && <span className={cn(SMALL, 'mt-0.5 block')}>{seg.text}</span>}
                </span>
              </li>
            ))}
          </ul>
          {block.note && <figcaption className={cn(CAPTION, 'mt-4')}>{block.note}</figcaption>}
        </div>
      </figure>
    )
  }
  if (block.type === 'timeline') {
    return (
      <ol className="relative grid gap-6 border-l border-border pl-6">
        {block.items.map((item, i) => (
          <li key={item.title} className="relative">
            <span className={cn('absolute -left-[1.85rem] top-1.5 size-3 rounded-full ring-4 ring-background', i === block.items.length - 1 ? 'bg-foreground' : 'bg-accent-brand')} aria-hidden />
            <p className="label-micro text-accent-brand">{item.when}</p>
            <p className={cn(SUBHEAD, 'mt-1 text-lg')}>{item.title}</p>
            <p className={cn(SMALL, 'mt-1 max-w-[40rem]')}>{item.text}</p>
            {item.state && <span className="mt-2 inline-block rounded-full bg-foreground/[0.06] px-2.5 py-1 label-micro text-muted-foreground">{item.state}</span>}
          </li>
        ))}
      </ol>
    )
  }
  if (block.type === 'subhead') {
    return (
      <h3 className="mt-6 flex items-baseline gap-3 font-heading text-xl font-semibold tracking-tight md:text-2xl">
        {block.number && <span className="label-micro shrink-0 text-accent-brand">{block.number}</span>}
        <span>{block.text}</span>
      </h3>
    )
  }
  if (block.type === 'video') {
    return (
      <figure className={cn(CARD, 'p-2')}>
        <VideoEmbed id={block.youtube} start={block.start} title={block.title} />
        <figcaption className={cn(CAPTION, 'px-4 pb-3 pt-4')}>
          {block.caption}{' '}
          <a href={block.href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-foreground">
            Watch on YouTube<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </figcaption>
      </figure>
    )
  }
  if (block.type === 'statement') {
    return (
      <figure className={CARD}>
        <dl className="grid gap-x-6 gap-y-4 md:grid-cols-[10rem_minmax(0,1fr)]">
          {block.rows.map((r) => (
            <div key={r.label} className="contents">
              <dt className={cn(SMALL, 'font-semibold text-accent-brand md:pt-1')}>{r.label}</dt>
              <dd className={SUBHEAD}>{r.text}</dd>
            </div>
          ))}
        </dl>
        <figcaption className={cn(CAPTION, 'mt-6')}>{block.who}</figcaption>
      </figure>
    )
  }
  if (block.type === 'quotes') {
    return (
      <ul className={cn('grid gap-4', block.items.length === 1 ? 'max-w-[46rem]' : block.items.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3')}>
        {block.items.map((q) => (
          <li key={q.text} className="flex flex-col border-l-2 border-accent-brand pl-5">
            <blockquote className={BODY}>“{q.text}”</blockquote>
            <p className={cn(SMALL, 'mt-auto pt-4')}>
              {q.who}
              {q.when && <span> · {q.when}</span>}
            </p>
          </li>
        ))}
      </ul>
    )
  }
  if (block.type === 'cards') {
    return (
      <ul className={cn('grid gap-4', block.items.length === 4 ? 'sm:grid-cols-2' : 'sm:grid-cols-3')}>
        {block.items.map((item) => (
          <li key={item.title} className={CARD}>
            {item.value && <p className="font-heading text-3xl font-semibold leading-none tracking-tight tabular-nums text-accent-brand">{item.value}</p>}
            <p className={cn(SUBHEAD, item.value && 'mt-4')}>{item.title}</p>
            <p className={cn(SMALL, 'mt-2')}>{item.text}</p>
          </li>
        ))}
      </ul>
    )
  }
  if (block.type === 'tension') {
    return (
      <ol className={cn(CARD, 'divide-y divide-border p-0')}>
        {block.items.map((item, i) => (
          <li key={i} className={cn('grid gap-4 p-6 md:gap-8', item.image ? 'md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center' : 'md:grid-cols-2')}>
            {/* With an image, the crop of the design sits beside the row's text. */}
            {item.image && (
              <div className="flex items-center justify-center self-stretch rounded-[10px] bg-card-soft p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image.src} width={item.image.width} height={item.image.height} alt={item.image.alt} loading="lazy" decoding="async" className="h-auto max-h-[26rem] w-full rounded-[6px] object-contain" />
              </div>
            )}
            <div className={cn(item.image && 'flex flex-col gap-5')}>
              <div>
                <p className={cn(SMALL, 'font-semibold')}>What the evidence said</p>
                <p className={cn(BODY, 'mt-2')}>{item.tension}</p>
              </div>
              <div className={cn(!item.image && 'md:hidden')}>
                <p className={cn(SMALL, 'font-semibold text-accent-brand')}>What I decided, and what it cost</p>
                <p className={cn(BODY, 'mt-2')}>{item.decision}</p>
              </div>
            </div>
            {!item.image && (
              <div className="hidden md:block">
                <p className={cn(SMALL, 'font-semibold text-accent-brand')}>What I decided, and what it cost</p>
                <p className={cn(BODY, 'mt-2')}>{item.decision}</p>
              </div>
            )}
          </li>
        ))}
      </ol>
    )
  }
  if (block.type === 'clips') {
    return (
      <figure>
        <ul className={cn('grid gap-4', block.items.length === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-3')}>
          {block.items.map((c) => (
            <li key={c.src} className={cn(CARD, 'flex flex-col p-3')}>
              <video src={c.src} width={c.width} height={c.height} className="w-full rounded-[8px] bg-card-soft" autoPlay muted loop playsInline preload="metadata" aria-label={c.alt} />
              <p className={cn(SUBHEAD, 'mt-4 text-base')}>{c.title}</p>
              <p className={cn(SMALL, 'mt-1.5')}>{c.text}</p>
            </li>
          ))}
        </ul>
        {block.caption && <figcaption className={cn(CAPTION, 'mt-3')}>{block.caption}</figcaption>}
      </figure>
    )
  }
  if (block.type === 'steps') {
    return (
      <figure>
        <ol className="grid gap-4 sm:grid-cols-3">
          {block.items.map((step, i) => (
            <li key={step.title} className={cn(CARD, 'flex flex-col')}>
              <p className={SMALL}>
                <span className="tabular-nums">{i + 1}</span> · {step.tools}
              </p>
              <p className={cn(SUBHEAD, 'mt-2')}>{step.title}</p>
              {step.quote && (
                <p className={cn(SMALL, 'mt-3 text-foreground/85')}>
                  “{step.quote}”{step.who && <span className="text-muted-foreground"> {step.who}</span>}
                </p>
              )}
              {step.time && <p className={cn(SMALL, 'mt-auto pt-4 font-semibold text-accent-brand')}>{step.time}</p>}
            </li>
          ))}
        </ol>
        {block.caption && <figcaption className={cn(CAPTION, 'pt-4')}>{block.caption}</figcaption>}
      </figure>
    )
  }
  if (block.type === 'table') {
    return (
      <div className={cn(CARD, 'min-w-0 max-w-full overflow-x-auto p-2 [scrollbar-width:thin]')} style={{ contain: 'inline-size' }}>
        <table className="w-full min-w-[640px] border-collapse text-left font-sans text-sm">
          <thead>
            <tr>
              {block.head.map((h) => (
                <th key={h} className="border-b border-border px-4 py-3 align-bottom text-sm font-semibold text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                {row.map((cell, j) => (
                  <td key={j} className={cn('px-4 py-3 align-top leading-relaxed', j === 0 ? 'text-muted-foreground' : 'text-foreground/90', j === 2 && 'font-semibold tabular-nums text-foreground')}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {block.caption && <p className={cn(CAPTION, 'px-4 pb-2 pt-4')}>{block.caption}</p>}
      </div>
    )
  }
  if (block.type === 'list') {
    return (
      <ul className="grid gap-3 pl-5">
        {block.items.map((item) => (
          <li key={item.lead} className={cn('list-disc', BODY)}>
            <span className="font-semibold text-foreground">{item.lead}</span> {item.text}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <p className={BODY}>
      <Linked text={block.text} links={block.links} />
    </p>
  )
}

export function ShortPageLayout({ page }: { page: ShortPage }) {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader onHome={false} />

      <main
        id="main"
        className="mx-auto max-w-[82rem] px-6 pb-24 pt-32 md:px-10 lg:px-14"
        style={page.hero && page.hero.tint !== TINTS.neutral ? ({ '--accent-brand': page.hero.tint } as React.CSSProperties) : undefined}
      >
        {page.hero && page.hero.tint !== TINTS.neutral && (
          /* The wash takes the page's colour: the same two blooms as the site's violet, mixed from the hero tint. */
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 -z-10"
            style={{
              background: `radial-gradient(circle 1100px at 0% 100%, color-mix(in oklab, ${page.hero.tint} 16%, var(--card)) 0%, transparent 72%), radial-gradient(circle 900px at 100% 0%, color-mix(in oklab, ${page.hero.tint} 8%, var(--card)) 0%, transparent 70%), var(--background)`,
            }}
          />
        )}
        <WithSectionNav chapters={page.sections.map((s) => ({ id: s.id, title: s.short ?? s.heading }))}>
          <article className="max-w-[68rem]">
            <header>
              <p className="label-micro text-accent-brand">
                {page.roleTag} <span className="text-muted-foreground">· {page.period} · {readMinutes(page)} min read</span>
              </p>
              <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight md:text-5xl">{page.title}</h1>
              <p className="mt-4 text-pretty font-sans text-lg leading-[1.6] text-muted-foreground">{page.description}</p>
            </header>

            {page.hero && <HeroVideo hero={page.hero} className="mt-12" />}

            {page.facts && page.facts.length > 0 && <Facts facts={page.facts} tint={page.hero?.tint ?? TINTS.neutral} />}

            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {page.stats.map((s) => (
                <li key={s.label} className={CARD}>
                  <p className="font-heading text-3xl font-semibold leading-none tracking-tight tabular-nums text-accent-brand">{s.value}</p>
                  <p className={cn(SMALL, 'mt-3')}>{s.label}</p>
                </li>
              ))}
            </ul>

            <Visuals visuals={visualsAfter(page, undefined)} className="mt-12" />

            {page.sections.map((section) => (
              <Reveal key={section.id} as="section" className="mt-24">
                <div id={section.id} className="scroll-mt-28">
                  {section.eyebrow && <p className="label-micro text-accent-brand">{section.eyebrow}</p>}
                  <h2 className={cn('font-heading text-2xl font-semibold tracking-tight md:text-3xl', section.eyebrow && 'mt-3')}>
                    {section.heading}
                    <HeadingDot />
                  </h2>
                  <div className="mt-6 grid gap-6">
                    <SectionBlocks blocks={section.blocks} lead={visualsLead(page, section.id)} />
                    <Visuals visuals={visualsAfter(page, section.id)} />
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal as="section" className="mt-24">
              <aside aria-label="What this unlocked next" className={CARD}>
                <p className="label-micro text-muted-foreground">What this unlocked next</p>
                <p className={cn(BODY, 'mt-3 max-w-[46rem]')}>{page.next.text}</p>
                {page.next.href ? (
                  <Link href={page.next.href} {...event('next-case', { from: page.slug })} className="mt-4 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand transition-colors hover:underline">
                    {page.next.label} <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <p className="mt-4 font-sans text-base font-semibold text-foreground">{page.next.label}</p>
                )}
              </aside>
            </Reveal>
          </article>
        </WithSectionNav>
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

function visualsAfter(page: ShortPage, after: string | undefined) {
  return (page.visuals ?? []).filter((v) => v.after === after && !v.lead)
}
function visualsLead(page: ShortPage, after: string) {
  return (page.visuals ?? []).filter((v) => v.after === after && v.lead)
}

const STRIPES = {
  backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 10px, color-mix(in oklab, var(--foreground) 7%, transparent) 10px 11px)',
}

/** Two visuals share a row only when their aspect ratios are within 10%. */
function sameAspect(a: PageVisual, b: PageVisual) {
  if (!a.width || !a.height || !b.width || !b.height) return false
  const ra = a.width / a.height
  const rb = b.width / b.height
  return Math.abs(ra - rb) / Math.max(ra, rb) < 0.1
}

/** Blocks in source order; the lead visual sits after the opening run of paragraphs. */
function SectionBlocks({ blocks, lead }: { blocks: Block[]; lead: PageVisual[] }) {
  const firstWide = blocks.findIndex((b) => b.type !== 'p')
  const cut = firstWide < 0 ? blocks.length : firstWide
  const render = (block: Block, i: number) => (
    <div key={i} className={cn('min-w-0', !WIDE_BLOCKS.has(block.type) && 'max-w-[46rem]')}>
      <BlockView block={block} />
    </div>
  )
  return (
    <>
      {blocks.slice(0, cut).map(render)}
      <Visuals visuals={lead} />
      {blocks.slice(cut).map((b, i) => render(b, i + cut))}
    </>
  )
}

function Visuals({ visuals, className }: { visuals: PageVisual[]; className?: string }) {
  if (visuals.length === 0) return null
  const pair = visuals.length === 2 && sameAspect(visuals[0], visuals[1])
  return (
    <ul className={cn('grid gap-4', pair && 'md:grid-cols-2', className)}>
      {visuals.map((v) => (
        <li key={v.id}>
          <figure className={cn(CARD, 'p-2')}>
            {v.src && v.prototype?.interactive ? (
              <PrototypeEmbed embed={v.prototype.embed} poster={v.src} width={v.width ?? 1440} height={v.height ?? 1024} alt={v.alt} />
            ) : v.src ? (
              v.kind === 'video' ? (
                <video src={v.src} width={v.width} height={v.height} className="w-full rounded-[10px] bg-card-soft" controls muted loop playsInline preload="metadata" aria-label={v.alt} />
              ) : (
                <a href={v.src} target="_blank" rel="noopener noreferrer" className="block cursor-zoom-in rounded-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={v.src} width={v.width} height={v.height} alt={v.alt} loading="lazy" decoding="async" className="h-auto w-full rounded-[10px] bg-card-soft" />
                  <span className="sr-only"> (opens full size in a new tab)</span>
                </a>
              )
            ) : (
              <div role="img" aria-label={`Image to come: ${v.alt}`} className="flex aspect-[16/10] items-end rounded-[10px] bg-card-soft p-4" style={STRIPES}>
                <span className="rounded-full bg-card px-3 py-1 label-micro text-muted-foreground shadow-soft">Image to come</span>
              </div>
            )}
            <figcaption className={cn(CAPTION, 'px-4 pb-3 pt-4')}>{v.caption}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  )
}

const FACT_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties; 'aria-hidden'?: boolean }>> = {
  Role: UserRound, Scope: Boxes, Research: Search, Shipped: Rocket, Team: UserRound,
}

/** The opening facts as a transposed table: one row per label, read top to
 *  bottom in the order Role, Scope, Research, Shipped; the facts of a row
 *  run across it so each group stays together. An icon in the page's tint
 *  marks the label; everything else is hairlines and type. */
function Facts({ facts, tint }: { facts: PageFact[]; tint: string }) {
  return (
    <dl className={cn(CARD, 'mt-12 divide-y divide-border overflow-hidden p-0')}>
      {facts.map((f) => {
        const Icon = FACT_ICONS[f.label]
        return (
          <div key={f.label} className="grid sm:grid-cols-[11rem_minmax(0,1fr)]">
            <dt className="flex items-center gap-3 px-5 pt-4 sm:py-4 sm:pr-4">
              {Icon && (
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full" style={{ backgroundColor: `color-mix(in oklab, ${tint} 12%, var(--card))` }}>
                  <Icon className="size-4" style={tintText(tint)} aria-hidden />
                </span>
              )}
              <span className="font-heading text-base font-semibold tracking-tight text-foreground">{f.label}</span>
            </dt>
            {f.lines ? (
              <dd className="flex flex-col gap-y-1.5 px-5 pb-4 pt-2 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-7 sm:border-l sm:border-border sm:py-4">
                {f.lines.map((line) => (
                  <span key={line.text + (line.note ?? '')} className="font-sans text-[15px] leading-snug text-foreground">
                    <span className="font-medium">{line.text}</span>
                    {line.note && <span className="text-muted-foreground"> {line.note}</span>}
                  </span>
                ))}
              </dd>
            ) : (
              <dd className="px-5 pb-4 pt-2 text-pretty font-sans text-[15px] leading-relaxed text-foreground sm:border-l sm:border-border sm:py-4">{f.value}</dd>
            )}
          </div>
        )
      })}
    </dl>
  )
}
