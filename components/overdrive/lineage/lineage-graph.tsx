'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { X } from 'lucide-react'
import { event } from '@/lib/analytics'
import { EASE_OUT } from '@/components/motion-primitives'
import { tintPanel } from '@/lib/tint'
import {
  EDGES,
  KIND_LABEL,
  YEARS,
  computeLayout,
  edgePath,
  lineageOf,
  yearX,
  type Placed,
} from './graph-data'

const track = (item: string) => event('overdrive', { page: 'lineage', item })

/** The desktop lineage graph: SVG, columns by year, lanes by kind. */
export function LineageGraph() {
  const [measured, setMeasured] = useState<Map<string, number>>()
  const layout = useMemo(() => computeLayout(measured), [measured])
  const reduced = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const nodeRefs = useRef(new Map<string, SVGGElement>())
  const linkRef = useRef<HTMLAnchorElement>(null)

  const [hover, setHover] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)
  const [pinned, setPinned] = useState<string | null>(null)
  const [open, setOpen] = useState<string | null>(null)

  const active = hover ?? focused ?? pinned ?? open
  const lineage = useMemo(() => (active ? lineageOf(active) : null), [active])

  // Tab order runs left to right, then top to bottom.
  const ordered = useMemo(() => [...layout.nodes].sort((a, b) => a.left - b.left || a.top - b.top), [layout])
  const paths = useMemo(
    () => EDGES.map((e) => edgePath(layout.byId.get(e.from)!, layout.byId.get(e.to)!)),
    [layout],
  )

  // Once fonts load, size every pill to its real text and lay out again.
  useEffect(() => {
    let live = true
    document.fonts.ready.then(() => {
      if (!live) return
      const m = new Map<string, number>()
      nodeRefs.current.forEach((g, id) => {
        const texts = [...g.querySelectorAll('text')]
        m.set(id, Math.max(...texts.map((t) => t.getComputedTextLength() + Number(t.getAttribute('x') ?? 0))))
      })
      setMeasured(m)
    })
    return () => {
      live = false
    }
  }, [])

  // Packets pause whenever the graph is off screen (or hidden on phones).
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || reduced) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) svg.unpauseAnimations()
      else svg.pauseAnimations()
    })
    io.observe(svg)
    return () => io.disconnect()
  }, [reduced])

  // Drag to pan with a mouse; trackpads and touch scroll natively.
  const drag = useRef<{ x: number; left: number; moved: boolean; id: number } | null>(null)
  const swallowClick = useRef(false)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || e.button !== 0 || !scrollRef.current) return
    if ((e.target as Element).closest('[data-card]')) return
    drag.current = { x: e.clientX, left: scrollRef.current.scrollLeft, moved: false, id: e.pointerId }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current
    const el = scrollRef.current
    if (!d || !el) return
    const dx = e.clientX - d.x
    if (!d.moved && Math.abs(dx) > 5) {
      d.moved = true
      el.setPointerCapture(d.id)
      el.dataset.dragging = 'true'
    }
    if (d.moved) el.scrollLeft = d.left - dx
  }
  const endDrag = () => {
    const d = drag.current
    const el = scrollRef.current
    if (d?.moved && el) {
      swallowClick.current = true
      if (el.hasPointerCapture(d.id)) el.releasePointerCapture(d.id)
      delete el.dataset.dragging
      setTimeout(() => (swallowClick.current = false), 0)
    }
    drag.current = null
  }

  const close = useCallback(() => {
    const id = open
    setOpen(null)
    if (id) nodeRefs.current.get(id)?.focus()
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, close])

  useEffect(() => {
    if (open) requestAnimationFrame(() => linkRef.current?.focus({ preventScroll: true }))
  }, [open])

  // Esc also clears a pinned highlight when no card is open.
  useEffect(() => {
    if (!pinned || open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPinned(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pinned, open])

  const activate = (n: Placed) => {
    if (swallowClick.current) return
    if (n.card) {
      // Keep the node clear of the card, which sits on the right.
      const el = scrollRef.current
      if (el && open !== n.id && n.left + n.w > el.scrollLeft + el.clientWidth - 440) {
        el.scrollTo({ left: Math.max(0, n.left - 160), behavior: reduced ? 'auto' : 'smooth' })
      }
      setOpen((cur) => (cur === n.id ? null : n.id))
      setPinned(null)
    } else {
      setPinned((cur) => (cur === n.id ? null : n.id))
      setOpen(null)
    }
  }

  const openNode = open ? layout.byId.get(open) : undefined

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="lineage-scroll cursor-grab overflow-x-auto overflow-y-hidden overscroll-x-contain data-[dragging=true]:cursor-grabbing data-[dragging=true]:select-none"
      >
        <svg
          ref={svgRef}
          width={layout.width}
          height={layout.height}
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          role="group"
          aria-label="Lineage graph of Kanchi Bhawalkar’s career, 2017 to 2026: roles, case studies, the seven Intuit product areas and the figures they led to. Focus a node to trace its upstream and downstream path; case studies open a summary."
          className="block select-none"
        >
          <defs>
            <filter id="lineage-shadow" x="-10%" y="-30%" width="120%" height="180%">
              <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="rgb(23 21 28)" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* Year columns */}
          <g aria-hidden="true">
            {YEARS.map((y) => (
              <g key={y}>
                <line
                  x1={yearX(y) - 10}
                  x2={yearX(y) - 10}
                  y1={layout.header - 10}
                  y2={layout.height - 8}
                  stroke="color-mix(in oklab, var(--accent-brand) 18%, transparent)"
                  strokeDasharray="2 6"
                />
                <text x={yearX(y)} y={layout.header - 22} className="fill-foreground font-heading text-[17px] font-semibold tracking-tight">
                  {y}
                </text>
              </g>
            ))}
            {layout.lanes.map((l) => (
              <text key={l.label} x={24} y={l.top + 14} className="label-micro fill-muted-foreground">
                {l.label}
              </text>
            ))}
          </g>

          {/* Edges, with a packet travelling each one */}
          <g aria-hidden="true">
            {EDGES.map((e, i) => {
              const on = !lineage || lineage.edges.has(i)
              const lit = lineage?.edges.has(i)
              return (
                <g key={`${e.from}-${e.to}`} className="transition-opacity duration-200" style={{ opacity: on ? 1 : 0.14 }}>
                  <path
                    d={paths[i]}
                    fill="none"
                    stroke={lit ? 'var(--accent-brand)' : 'color-mix(in oklab, var(--accent-brand) 32%, #c9d3e3)'}
                    strokeWidth={lit ? 2 : 1.4}
                    className="transition-[stroke] duration-200"
                  />
                  {!reduced && (
                    <circle r={lit ? 3.6 : 2.8} fill="var(--accent-brand)">
                      <animateMotion
                        dur={`${2.6 + (i % 5) * 0.45}s`}
                        begin={`-${(i * 0.73) % 3}s`}
                        repeatCount="indefinite"
                        path={paths[i]}
                      />
                    </circle>
                  )}
                </g>
              )
            })}
          </g>

          {/* Nodes, in tab order */}
          <g>
            {ordered.map((n) => {
              const on = !lineage || lineage.nodes.has(n.id)
              const isActive = active === n.id
              const isCase = n.kind === 'case'
              const role = lineage?.up.has(n.id) ? 'upstream of the selection' : lineage?.down.has(n.id) ? 'downstream of the selection' : ''
              return (
                <g
                  key={n.id}
                  ref={(el) => {
                    if (el) nodeRefs.current.set(n.id, el)
                    else nodeRefs.current.delete(n.id)
                  }}
                  data-node={n.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${KIND_LABEL[n.kind]}: ${n.card?.title ?? n.label}${n.meta ? `, ${n.meta}` : ''}${n.caption ? `, ${n.caption}` : ''}${role && !isActive ? `, ${role}` : ''}`}
                  aria-haspopup={isCase ? 'dialog' : undefined}
                  aria-expanded={isCase ? open === n.id : undefined}
                  aria-pressed={!isCase ? pinned === n.id : undefined}
                  {...track(`node-${n.id}`)}
                  onMouseEnter={() => setHover(n.id)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setFocused(n.id)}
                  onBlur={() => setFocused(null)}
                  onClick={() => activate(n)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      activate(n)
                    }
                  }}
                  className="lineage-node cursor-pointer outline-none transition-opacity duration-200"
                  style={{ opacity: on ? 1 : 0.28 }}
                  transform={`translate(${n.left},${n.top})`}
                >
                  <NodePill n={n} active={isActive} />
                </g>
              )
            })}
          </g>
        </svg>
      </div>

      <AnimatePresence>
        {openNode?.card && (
          <motion.div
            key={openNode.id}
            data-card
            role="dialog"
            aria-labelledby={`lineage-card-${openNode.id}`}
            initial={{ opacity: 0, y: 18, scale: 0.96, clipPath: 'inset(0 0 40% 0 round 18px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, clipPath: 'inset(0 0 0% 0 round 18px)' }}
            exit={{ opacity: 0, y: 10, scale: 0.98, transition: { duration: 0.18 } }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            style={{ transformOrigin: 'top right' }}
            className="absolute right-6 top-12 z-10 max-h-[calc(100%-3.5rem)] w-[24rem] overflow-y-auto rounded-[18px] bg-card p-4 shadow-soft lg:right-14"
          >
            <CaseCard n={openNode} linkRef={linkRef} onClose={close} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NodePill({ n, active }: { n: Placed; active: boolean }) {
  const r = n.h / 2
  const ring = active ? 'var(--accent-brand)' : 'transparent'
  if (n.kind === 'case') {
    return (
      <>
        <rect width={n.w} height={n.h} rx={r} fill="var(--accent-brand)" filter="url(#lineage-shadow)" />
        <rect x={-3} y={-3} width={n.w + 6} height={n.h + 6} rx={r + 3} fill="none" stroke={ring} strokeWidth={2} className="lineage-ring" />
        <text x={16} y={19} className="label-micro" fill="color-mix(in oklab, white 72%, var(--accent-brand))">
          {n.meta}
        </text>
        <text x={16} y={37} className="font-sans text-[14px] font-bold" fill="white">
          {n.label}
        </text>
      </>
    )
  }
  const dot = n.kind === 'role' ? 'var(--foreground)' : n.kind === 'area' ? 'var(--track-ic)' : 'var(--accent-brand)'
  return (
    <>
      <rect width={n.w} height={n.h} rx={r} fill="var(--card)" filter="url(#lineage-shadow)" />
      <rect x={-3} y={-3} width={n.w + 6} height={n.h + 6} rx={r + 3} fill="none" stroke={ring} strokeWidth={2} className="lineage-ring" />
      <circle cx={18} cy={n.h / 2} r={3.5} fill={dot} />
      {n.kind === 'area' ? (
        <text x={30} y={22} className="font-sans text-[13px] font-semibold fill-foreground">
          {n.label}
        </text>
      ) : n.kind === 'figure' ? (
        n.caption ? (
          <>
            <text x={30} y={22} className="font-heading text-[16px] font-bold" fill="var(--accent-brand)">
              {n.label}
            </text>
            <text x={30} y={39} className="font-sans text-[12px] fill-muted-foreground">
              {n.caption}
            </text>
          </>
        ) : (
          <text x={30} y={30} className="font-sans text-[14px] font-bold" fill="var(--accent-brand)">
            {n.label}
          </text>
        )
      ) : (
        <>
          <text x={30} y={19} className="label-micro fill-muted-foreground">
            {n.meta}
          </text>
          <text x={30} y={37} className="font-sans text-[14px] font-bold fill-foreground">
            {n.label}
          </text>
        </>
      )}
    </>
  )
}

function CaseCard({
  n,
  linkRef,
  onClose,
}: {
  n: Placed
  linkRef: React.RefObject<HTMLAnchorElement | null>
  onClose: () => void
}) {
  const c = n.card!
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <p className="label-micro pt-1 text-muted-foreground">{n.meta}</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close the case study summary"
          {...track('card-close')}
          className="-mr-1 -mt-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card-soft hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
      <h3 id={`lineage-card-${n.id}`} className="mt-1 font-heading text-xl font-semibold leading-tight tracking-tight">
        {c.title}
      </h3>
      {c.cover && (
        <div className="mt-3 overflow-hidden rounded-[12px] p-3" style={tintPanel(c.cover.tint)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={c.cover.src} alt={c.cover.alt} className="block aspect-[16/9] w-full rounded-[8px] object-cover object-top" loading="lazy" />
        </div>
      )}
      <p className="mt-3 font-sans text-sm leading-relaxed text-muted-foreground">{c.line}</p>
      <p className="mt-3 font-heading text-2xl font-bold tracking-tight text-accent-brand">{c.stats[0].value}</p>
      <p className="font-sans text-sm text-muted-foreground">{c.stats[0].label}</p>
      {c.href && (
        <Link
          ref={linkRef}
          href={c.href}
          {...track(`read-${c.slug}`)}
          className="mt-4 inline-flex min-h-11 items-center rounded-full bg-foreground px-5 font-sans text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          Read the case study →
        </Link>
      )}
    </>
  )
}
