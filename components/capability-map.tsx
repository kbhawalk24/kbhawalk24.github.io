'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import { Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { trackStyles } from '@/lib/track-styles'
import { BRANCHES, type Branch, type Leaf, type LeafGroup } from '@/lib/capability-map'
import type { Track } from '@/lib/timeline-data'

// The capability map beside the hero's about text: three branches on the
// left (Where, Craft, How I manage), their leaves on the right. One curve
// runs from each branch to each of its groups; inside a group the leaves
// hang off a thin vertical spine with short ticks, so the picture stays
// calm however many leaves a group has. Curves are measured after layout,
// so they follow the text wherever it wraps. Identity is never colour
// alone: every group has a caption and every leaf an icon and a label.

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

/** One cubic curve per edge, from the right edge of `from` to the left
 *  edge of `to`, in the container's coordinate space. Redrawn on resize. */
function useCurves(ref: React.RefObject<HTMLDivElement | null>, edges: Edge[]) {
  const [curves, setCurves] = useState<Curve[]>([])
  useLayoutEffect(() => {
    const root = ref.current
    if (!root) return
    let frame = 0
    const draw = () => {
      const box = root.getBoundingClientRect()
      const next: Curve[] = []
      for (const e of edges) {
        const a = root.querySelector<HTMLElement>(`[data-anchor="${e.from}"]`)
        const b = root.querySelector<HTMLElement>(`[data-anchor="${e.to}"]`)
        if (!a || !b) continue
        const ra = a.getBoundingClientRect()
        const rb = b.getBoundingClientRect()
        if (ra.width === 0 || rb.width === 0) continue
        const x1 = ra.right - box.left + 6
        const y1 = ra.top + ra.height / 2 - box.top
        const x2 = rb.left - box.left - 2
        const y2 = rb.top + rb.height / 2 - box.top
        const mx = x1 + (x2 - x1) * 0.55
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
  }, [ref, edges])
  return curves
}

function groupId(branch: string, g: number) {
  return `group-${branch}-${g}`
}

const EDGES: Edge[] = BRANCHES.flatMap((b) =>
  b.groups.map((g, gi) => ({ from: `trunk-${b.id}`, to: groupId(b.id, gi), tone: g.tone })),
)

function LeafRow({ leaf, tone, id }: { leaf: Leaf; tone: Track; id: string }) {
  const Icon = leaf.icon
  const text = 'font-sans text-[13px] leading-snug text-foreground'
  return (
    <li className="group relative flex items-center gap-2.5 py-1 before:absolute before:-left-4 before:top-1/2 before:h-px before:w-3 before:bg-current/40">
      <Icon className={cn('size-3.5 shrink-0', trackStyles[tone].accentText)} aria-hidden="true" />
      {leaf.detail ? (
        <>
          <button
            type="button"
            aria-describedby={`${id}-detail`}
            className={cn(
              text,
              'inline-flex items-center gap-1.5 rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40',
            )}
          >
            {leaf.label}
            <Info className="size-3 text-muted-foreground transition-colors group-hover:text-foreground" aria-hidden="true" />
            <span className="sr-only"> (hover or focus for the full list)</span>
          </button>
          <div
            id={`${id}-detail`}
            role="tooltip"
            className="pointer-events-none absolute left-6 top-full z-20 mt-1 w-64 max-w-[80vw] rounded-[10px] bg-primary px-3 py-2 font-sans text-xs leading-relaxed text-primary-foreground opacity-0 shadow-soft transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
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

function Group({ branch, group, index }: { branch: Branch; group: LeafGroup; index: number }) {
  const style = trackStyles[group.tone]
  return (
    <div data-anchor={groupId(branch.id, index)}>
      {group.caption && <p className={cn('mb-1.5 label-micro', style.accentText)}>{group.caption}</p>}
      {/* The spine: the list carries the track colour so the border and the
          ticks (currentColor) match the curve that reaches it. */}
      <ul className={cn('ml-1.5 grid border-l border-current/40 pl-4', style.accentText)}>
        {group.leaves.map((leaf, i) => (
          <LeafRow key={leaf.label} leaf={leaf} tone={group.tone} id={`${groupId(branch.id, index)}-${i}`} />
        ))}
      </ul>
    </div>
  )
}

/** The hero slot: the mind map. */
export function CapabilityMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const curves = useCurves(ref, EDGES)
  return (
    <div ref={ref} className={cn('relative', className)} aria-label="What I can do, at a glance">
      <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
        {curves.map((c, i) => (
          <path key={i} d={c.d} fill="none" stroke={STROKE[c.tone]} strokeWidth="1.25" strokeOpacity="0.6" />
        ))}
      </svg>
      <ol className="relative grid gap-10">
        {BRANCHES.map((b) => {
          const Icon = b.icon
          return (
            <li key={b.id} className="grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-x-7">
              <div data-anchor={`trunk-${b.id}`} className="flex flex-col items-center gap-2 text-center">
                <span className={cn('inline-flex size-9 items-center justify-center rounded-full', trackStyles[b.tone].badgeFlat)}>
                  <Icon className="size-4" aria-hidden="true" />
                </span>
                <span className="label-micro text-foreground">{b.label}</span>
              </div>
              <div className="grid gap-5">
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
