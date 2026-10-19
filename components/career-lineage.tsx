'use client'

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { DEFAULT_NODE, EDGES, NODES, STAGES, type LineageNode, type Stage } from '@/lib/lineage'
import { TRACKS } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { EASE_OUT, Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// The career as a lineage graph. From 1024px up: four stage columns with the
// edges drawn in an SVG overlay, and an inspect panel beside the graph. Below
// that: the same nodes stacked by stage, with the panel opening under the
// selected node. Edges are measured from the node cards, so the graph reflows
// with the text.

interface Edge {
  id: string
  d: string
  from: string
  to: string
}

const WIDE = '(min-width: 1024px)'

export function CareerLineage({ heading = 'h2' }: { heading?: 'h1' | 'h2' }) {
  const Heading = heading
  const [selectedId, setSelectedId] = useState(DEFAULT_NODE)
  const [wide, setWide] = useState(false)
  const [edges, setEdges] = useState<Edge[]>([])
  const graphRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef(new Map<string, HTMLButtonElement>())
  const inView = useInView(graphRef, { once: true, margin: '-15% 0px' })
  const reduceMotion = useReducedMotion()

  const selected = NODES.find((n) => n.id === selectedId) ?? NODES[0]
  const connected = new Set(
    EDGES.filter(([a, b]) => a === selectedId || b === selectedId).flat(),
  )

  useEffect(() => {
    const mq = window.matchMedia(WIDE)
    const update = () => setWide(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  const measure = useCallback(() => {
    const container = graphRef.current
    if (!container) return
    const box = container.getBoundingClientRect()
    if (box.width === 0) return
    const next: Edge[] = []
    for (const [from, to] of EDGES) {
      const a = nodeRefs.current.get(from)?.getBoundingClientRect()
      const b = nodeRefs.current.get(to)?.getBoundingClientRect()
      if (!a || !b || a.width === 0 || b.width === 0) continue
      const x1 = a.right - box.left
      const y1 = a.top + a.height / 2 - box.top
      const x2 = b.left - box.left
      const y2 = b.top + b.height / 2 - box.top
      const dx = Math.max(24, (x2 - x1) / 2)
      next.push({ id: `${from}-${to}`, from, to, d: `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}` })
    }
    setEdges(next)
  }, [])

  useLayoutEffect(() => {
    if (!wide) return
    measure()
    const ro = new ResizeObserver(() => measure())
    if (graphRef.current) ro.observe(graphRef.current)
    for (const el of nodeRefs.current.values()) ro.observe(el)
    document.fonts?.ready.then(measure).catch(() => {})
    return () => ro.disconnect()
  }, [wide, measure])

  // Below 1024px the panel opens under the tapped node; from 1024px up it sits
  // under the graph, so bring it into view only when it is off-screen.
  const select = useCallback(
    (id: string) => {
      setSelectedId(id)
      if (!window.matchMedia(WIDE).matches) return
      requestAnimationFrame(() => {
        document
          .getElementById('lineage-panel')
          ?.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' })
      })
    },
    [reduceMotion],
  )

  const setNodeRef = (id: string) => (el: HTMLButtonElement | null) => {
    if (el) nodeRefs.current.set(id, el)
    else nodeRefs.current.delete(id)
  }

  return (
    <section id="timeline" className="relative z-10 scroll-mt-28">
      <div className={cn('mx-auto max-w-6xl px-6 md:px-10 lg:px-14', heading === 'h1' ? 'pt-8 md:pt-10' : 'pt-20 md:pt-28')}>
        <Reveal className="max-w-3xl">
          <Heading
            className={cn(
              'font-heading tracking-tight',
              heading === 'h1' ? 'text-4xl font-extrabold md:text-5xl' : 'text-3xl font-semibold md:text-4xl',
            )}
          >
            Career timeline
            <HeadingDot />
          </Heading>
          <p className="mt-6 max-w-[62ch] text-pretty font-sans text-lg leading-[1.6] text-foreground">
            Drawn the way the platform draws data: upstream, transform, materialized, downstream. Select a node to
            inspect it.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1" aria-label="Legend">
            {(['ic', 'strategy', 'management'] as const).map((t) => (
              <li key={t} className="inline-flex items-center gap-2 label-micro text-muted-foreground">
                <span aria-hidden="true" className={cn('size-2 rounded-full', trackStyles[t].dot)} />
                {TRACKS[t].label}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-10">
          {/* Graph */}
          <div ref={graphRef} className="relative">
            {wide && (
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
                aria-hidden="true"
              >
                {edges.map((e, i) => {
                  const active = e.from === selectedId || e.to === selectedId
                  return (
                    <motion.path
                      key={e.id}
                      d={e.d}
                      fill="none"
                      strokeLinecap="round"
                      className={cn(
                        'transition-[stroke,stroke-width,opacity] duration-200',
                        active ? 'stroke-accent-brand opacity-100' : 'stroke-foreground opacity-[0.14]',
                      )}
                      strokeWidth={active ? 2 : 1.5}
                      initial={reduceMotion ? false : { pathLength: 0 }}
                      animate={inView || reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                      transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.1 + i * 0.08 }}
                    />
                  )
                })}
              </svg>
            )}

            <div className="grid gap-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0">
              {STAGES.map((stage) => (
                <StageColumn
                  key={stage.id}
                  stage={stage}
                  nodes={NODES.filter((n) => n.stage === stage.id)}
                  selectedId={selectedId}
                  connected={connected}
                  wide={wide}
                  onSelect={select}
                  setNodeRef={setNodeRef}
                  inlinePanel={!wide ? <Panel node={selected} id="lineage-panel-inline" className="mt-3" /> : null}
                />
              ))}
            </div>
          </div>

          {/* Inspect panel, from 1024px up: under the graph, full width */}
          {wide && <Panel node={selected} id="lineage-panel" className="mt-8" />}
        </div>

        <Reveal className="mt-16 border-t border-border pt-12 md:mt-20 md:pt-16">
          <p className="label-micro text-muted-foreground">Education</p>
          <div className="mt-3 grid gap-2 font-sans text-base">
            <p>
              <span className="font-semibold">MS in Information, Human-Computer Interaction</span>{' '}
              <span className="text-muted-foreground">- University of Michigan, Ann Arbor (2017)</span>
            </p>
            <p>
              <span className="font-semibold">BE in Computer Engineering</span>{' '}
              <span className="text-muted-foreground">- University of Pune (2012)</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function StageColumn({
  stage,
  nodes,
  selectedId,
  connected,
  wide,
  onSelect,
  setNodeRef,
  inlinePanel,
}: {
  stage: { id: Stage; label: string; note: string }
  nodes: LineageNode[]
  selectedId: string
  connected: Set<string>
  wide: boolean
  onSelect: (id: string) => void
  setNodeRef: (id: string) => (el: HTMLButtonElement | null) => void
  inlinePanel: React.ReactNode
}) {
  return (
    <div className="flex flex-col">
      <p className="label-micro text-muted-foreground">
        {stage.label} <span className="text-muted-foreground/70">· {stage.note}</span>
      </p>
      <ul className="mt-4 flex flex-1 flex-col justify-center gap-5 lg:gap-6">
        {nodes.map((node) => {
          const isSelected = node.id === selectedId
          const dim = wide && !isSelected && !connected.has(node.id)
          return (
            <li key={node.id}>
              <motion.button
                ref={setNodeRef(node.id)}
                type="button"
                onClick={() => onSelect(node.id)}
                aria-pressed={isSelected}
                aria-controls={wide ? 'lineage-panel' : 'lineage-panel-inline'}
                className={cn(
                  'relative block w-full rounded-[14px] p-4 text-left shadow-soft transition-[background-color,opacity,box-shadow] duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
                  isSelected ? 'bg-accent-brand/10 shadow-[0_0_0_2px_var(--accent-brand)]' : 'bg-card hover:bg-card-soft',
                  dim && 'opacity-60',
                )}
                whileTap={{ scale: 0.985 }}
                transition={{ duration: 0.12 }}
              >
                <span className={cn('label-micro block', trackStyles[node.track].accentText)}>{node.kicker}</span>
                <span className="mt-1.5 block font-heading text-lg font-semibold leading-tight tracking-tight text-foreground">
                  {node.title}
                </span>
                <span className="mt-1 block font-sans text-sm leading-snug text-muted-foreground">{node.line}</span>
              </motion.button>
              {isSelected && inlinePanel}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Panel({ node, id, className }: { node: LineageNode; id: string; className?: string }) {
  return (
    <div
      id={id}
      aria-live="polite"
      className={cn('rounded-[14px] bg-card-soft p-5 shadow-soft md:p-6 lg:p-8', className)}
    >
      <motion.div
        key={node.id}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22, ease: EASE_OUT }}
      >
        <div className="lg:grid lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
        <div>
        <p className={cn('label-micro', trackStyles[node.track].accentText)}>
          {TRACKS[node.track].label} · {node.period}
        </p>
        <h3 className="mt-2 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight">{node.title}</h3>
        <p className="mt-3 text-pretty font-sans text-base leading-relaxed text-foreground/90">{node.body}</p>
        </div>
        <div className="mt-5 lg:mt-0">
        {node.metrics.length > 0 && (
          <dl>
            {node.metrics.map((m) => (
              <div key={m.label} className="flex items-baseline justify-between gap-4 border-t border-foreground/10 py-2.5 first:border-t-0 first:pt-0">
                <dt className="font-sans text-sm leading-snug text-muted-foreground">{m.label}</dt>
                <dd className="shrink-0 font-heading text-base font-semibold tabular-nums text-foreground">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}

        <ul className={cn('grid gap-2', node.metrics.length > 0 && 'mt-5')}>
          {node.links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="inline-flex min-h-11 items-center gap-2 font-sans text-sm font-semibold text-accent-brand transition-colors hover:underline"
              >
                {l.label} <span aria-hidden="true">→</span>
              </Link>
            </li>
          ))}
        </ul>
        </div>
        </div>
      </motion.div>
    </div>
  )
}
