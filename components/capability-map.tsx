'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { trackStyles } from '@/lib/track-styles'
import { BRANCHES, type Branch, type Leaf, type LeafGroup } from '@/lib/capability-map'
import type { Track } from '@/lib/timeline-data'

// The capability map beside the hero's about text, in two layouts that
// share one data file (lib/capability-map.ts):
//   mind map  (default)  three branches on the left, leaves to the right,
//                        the Intuit branch split into designed / owned
//   hub       (?map=a)   a centre node, Where on the left, Craft and
//                        How I manage on the right
// Curves are drawn after layout from measured positions, so they follow
// the text wherever it wraps. Identity is never colour alone: every group
// has a caption and every leaf has an icon and a label.

const STROKE: Record<Track, string> = {
  ic: 'var(--track-ic)',
  strategy: 'var(--track-strategy)',
  management: 'var(--track-management)',
}

interface Edge {
  from: string
  to: string
  tone: Track
}
interface Curve {
  d: string
  tone: Track
}

/** Measures `[data-anchor]` elements inside `ref` and returns one cubic
 *  curve per edge, in the container's coordinate space. Redrawn on resize. */
function useCurves(ref: React.RefObject<HTMLDivElement | null>, edges: Edge[], minWidth: number) {
  const [curves, setCurves] = useState<Curve[]>([])
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    let frame = 0
    const draw = () => {
      const box = root.getBoundingClientRect()
      if (box.width < minWidth) {
        setCurves([])
        return
      }
      const next: Curve[] = []
      for (const e of edges) {
        const a = root.querySelector<HTMLElement>(`[data-anchor="${e.from}"]`)
        const b = root.querySelector<HTMLElement>(`[data-anchor="${e.to}"]`)
        if (!a || !b) continue
        const ra = a.getBoundingClientRect()
        const rb = b.getBoundingClientRect()
        // A hidden anchor (the hub below `sm`) measures 0×0; no curve then.
        if (ra.width === 0 || rb.width === 0) continue
        const leftward = rb.left + rb.width / 2 < ra.left + ra.width / 2
        const x1 = (leftward ? ra.left : ra.right) - box.left + (leftward ? -4 : 4)
        const y1 = ra.top + ra.height / 2 - box.top
        const x2 = (leftward ? rb.right : rb.left) - box.left + (leftward ? 6 : -6)
        const y2 = rb.top + rb.height / 2 - box.top
        const mx = x1 + (x2 - x1) / 2
        next.push({ d: `M${x1} ${y1}C${mx} ${y1},${mx} ${y2},${x2} ${y2}`, tone: e.tone })
      }
      setCurves(next)
    }
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(draw)
    }
    schedule()
    const ro = new ResizeObserver(schedule)
    ro.observe(root)
    window.addEventListener('resize', schedule)
    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('resize', schedule)
    }
  }, [ref, edges, minWidth])
  return curves
}

function Curves({ curves }: { curves: Curve[] }) {
  return (
    <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
      {curves.map((c, i) => (
        <path key={i} d={c.d} fill="none" stroke={STROKE[c.tone]} strokeWidth="1.25" strokeOpacity="0.7" />
      ))}
    </svg>
  )
}

function leafId(branch: string, g: number, i: number) {
  return `${branch}-${g}-${i}`
}

function LeafRow({
  leaf,
  tone,
  id,
  circle = false,
  reverse = false,
}: {
  leaf: Leaf
  tone: Track
  id: string
  circle?: boolean
  reverse?: boolean
}) {
  const Icon = leaf.icon
  const style = trackStyles[tone]
  const icon = circle ? (
    <span className={cn('inline-flex size-6 shrink-0 items-center justify-center rounded-full', style.badgeFlat)}>
      <Icon className="size-3.5" aria-hidden="true" />
    </span>
  ) : (
    <Icon className={cn('size-3.5 shrink-0', style.accentText)} aria-hidden="true" />
  )
  const text = 'font-sans text-[13px] leading-snug text-foreground'
  return (
    <li
      data-anchor={id}
      className={cn('group relative flex items-center gap-2 py-0.5', reverse && 'sm:flex-row-reverse sm:text-right')}
    >
      {icon}
      {leaf.detail ? (
        <>
          <button
            type="button"
            aria-describedby={`${id}-detail`}
            className={cn(
              text,
              'rounded-sm text-left underline decoration-dotted decoration-foreground/40 underline-offset-[3px] hover:decoration-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40',
              reverse && 'sm:text-right',
            )}
          >
            {leaf.label}
          </button>
          <div
            id={`${id}-detail`}
            role="tooltip"
            className={cn(
              'pointer-events-none absolute top-full z-20 mt-1 w-64 max-w-[80vw] rounded-[10px] bg-primary px-3 py-2 font-sans text-xs leading-relaxed text-primary-foreground opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-within:opacity-100',
              reverse ? 'left-0 sm:left-auto sm:right-0' : 'left-0',
            )}
          >
            {leaf.detail}
          </div>
        </>
      ) : (
        <span className={text}>{leaf.label}</span>
      )}
    </li>
  )
}

function Group({
  branch,
  group,
  index,
  circle,
  reverse,
}: {
  branch: Branch
  group: LeafGroup
  index: number
  circle?: boolean
  reverse?: boolean
}) {
  return (
    <div>
      {group.caption && (
        <p className={cn('mb-1 label-micro', trackStyles[group.tone].accentText, reverse && 'sm:text-right')}>
          {group.caption}
        </p>
      )}
      <ul className="grid gap-0.5">
        {group.leaves.map((leaf, i) => (
          <LeafRow
            key={leaf.label}
            leaf={leaf}
            tone={group.tone}
            id={leafId(branch.id, index, i)}
            circle={circle}
            reverse={reverse}
          />
        ))}
      </ul>
    </div>
  )
}

function edgesFor(branches: Branch[], from: (b: Branch) => string): Edge[] {
  return branches.flatMap((b) =>
    b.groups.flatMap((g, gi) => g.leaves.map((_, li) => ({ from: from(b), to: leafId(b.id, gi, li), tone: g.tone }))),
  )
}

const MIND_EDGES = edgesFor(BRANCHES, (b) => `trunk-${b.id}`)
const HUB_EDGES = edgesFor(BRANCHES, () => 'hub')

/** Layout c: branches on the left, leaves on the right. */
export function CapabilityMindMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const curves = useCurves(ref, MIND_EDGES, 300)
  return (
    <div ref={ref} className={cn('relative', className)} aria-label="What I can do, at a glance">
      <Curves curves={curves} />
      <ol className="relative grid gap-7">
        {BRANCHES.map((b) => {
          const Icon = b.icon
          return (
            <li key={b.id} className="grid grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-x-8">
              <div data-anchor={`trunk-${b.id}`} className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={cn(
                    'inline-flex size-8 items-center justify-center rounded-full',
                    trackStyles[b.tone].badgeFlat,
                  )}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="label-micro text-foreground">{b.label}</span>
              </div>
              <div className="grid gap-3">
                {b.groups.map((g, gi) => (
                  <Group key={gi} branch={b} group={g} index={gi} />
                ))}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

/** Layout a: a centre node, Where on the left, Craft and How I manage on
 *  the right. Below `sm` it stacks, the hub is hidden, and the measuring
 *  hook skips curves whose anchor is hidden. */
export function CapabilityHub({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const curves = useCurves(ref, HUB_EDGES, 300)
  const [where, ...rest] = BRANCHES
  return (
    <div
      ref={ref}
      className={cn('relative grid grid-cols-1 gap-6 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center sm:gap-x-5', className)}
      aria-label="What I can do, at a glance"
    >
      <Curves curves={curves} />
      <div className="relative grid gap-4">
        {where.groups.map((g, gi) => (
          <Group key={gi} branch={where} group={g} index={gi} circle reverse />
        ))}
      </div>
      <div
        data-anchor="hub"
        className="relative hidden size-12 items-center justify-center rounded-full bg-primary font-heading text-xs font-semibold text-primary-foreground sm:flex"
      >
        Kanchi
      </div>
      <div className="relative grid gap-5">
        {rest.map((b) => (
          <div key={b.id}>
            <p className="mb-1 label-micro text-foreground">{b.label}</p>
            {b.groups.map((g, gi) => (
              <Group key={gi} branch={b} group={g} index={gi} circle />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

/** The hero slot. `?map=a` shows the hub for review; the mind map is the
 *  default. Remove the switch once one is chosen. */
export function CapabilityMap({ className }: { className?: string }) {
  const [variant, setVariant] = useState<'a' | 'c'>('c')
  useEffect(() => {
    try {
      const v = new URLSearchParams(window.location.search).get('map')
      // eslint-disable-next-line react-hooks/set-state-in-effect -- read once from the URL after mount
      if (v === 'a') setVariant('a')
    } catch {
      /* no URL access; keep the default */
    }
  }, [])
  return variant === 'a' ? <CapabilityHub className={className} /> : <CapabilityMindMap className={className} />
}
