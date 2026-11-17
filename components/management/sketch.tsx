'use client'

import { useEffect, useRef } from 'react'
import rough from 'roughjs'
import type { RoughSVG } from 'roughjs/bin/svg'

// Hand-drawn illustrations for "How I manage" (16 Nov 2026), rendered with
// Rough.js so they read as whiteboard sketches. Each drawing is a list of
// rough shapes; the lines draw themselves in the first time the sketch comes
// on screen (not with reduced motion). All decorative: the words beside each
// one carry the meaning.

export const B = '#1f4a8a'
export const MID = '#9db9ee'
export const PALE = '#cfdff9'

export type Draw = (rc: RoughSVG) => SVGGElement[]

export function Sketch({ w, h, draw, seed = 7, className, stretch = false }: { w: number; h: number; draw: Draw; seed?: number; className?: string; stretch?: boolean }) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const rc = rough.svg(svg, { options: { seed, roughness: 1.15, bowing: 1.1, stroke: B, strokeWidth: 2, fillWeight: 1.4, hachureGap: 5 } })
    svg.replaceChildren(...draw(rc))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const paths = [...svg.querySelectorAll('path')]
    const set = (shown: boolean) =>
      paths.forEach((p, i) => {
        const len = p.getTotalLength()
        p.style.strokeDasharray = `${len}`
        p.style.transition = shown ? `stroke-dashoffset 420ms cubic-bezier(0.22, 1, 0.36, 1) ${Math.min(i * 10, 180)}ms` : 'none'
        p.style.strokeDashoffset = shown ? '0' : `${len}`
      })
    // Visible by default: the sketch is only hidden if the observer reports
    // it off screen first, and it then draws in once.
    let armed = false
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (armed) requestAnimationFrame(() => set(true))
          io.disconnect()
        } else if (!armed) {
          armed = true
          set(false)
        }
      },
      { threshold: 0.3 },
    )
    io.observe(svg)
    return () => io.disconnect()
  }, [draw, seed])
  return <svg ref={ref} aria-hidden="true" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio={stretch ? 'none' : undefined} className={className} />
}

export const solid = (fill: string) => ({ fill, fillStyle: 'solid' as const })
export const hatch = (fill: string) => ({ fill, fillStyle: 'hachure' as const })
export const person = (rc: RoughSVG, x: number, y: number, s = 1, fill = PALE) => [
  rc.circle(x, y, 15 * s, solid(fill)),
  rc.path(`M${x - 13 * s},${y + 27 * s} a${13 * s},${15 * s} 0 0 1 ${26 * s},0 z`, solid(fill)),
]

/** One designer for every 85 engineers, to scale. 640 by 130. */
export const drawRatio: Draw = (rc) => [
  rc.circle(46, 64, 46, { ...hatch(B), hachureGap: 3, fillWeight: 2 }),
  rc.ellipse(46, 64, 84, 78, { strokeWidth: 1.5, roughness: 2 }),
  ...Array.from({ length: 85 }, (_, i) => rc.circle(130 + (i % 17) * 30, 20 + Math.floor(i / 17) * 22, 13, { ...solid(MID), stroke: 'none', roughness: 0.6 })),
]

/** The road the work travels, with four stops. 1000 by 90, stretched to fit. */
export const drawRoad: Draw = (rc) => [
  rc.curve([[0, 50], [125, 30], [250, 58], [375, 30], [500, 58], [625, 30], [750, 58], [875, 30], [1000, 46]], { strokeWidth: 2.5, roughness: 1.6 }),
  ...[125, 375, 625, 875].map((x) => rc.circle(x, 31, 26, solid(B))),
]

/** The four process stops. 150 by 100 each. */
export const drawSteps: Draw[] = [
  (rc) => [
    rc.rectangle(22, 10, 70, 82, solid('#fff')),
    rc.line(36, 32, 78, 32, { stroke: MID }),
    rc.line(36, 46, 78, 46, { stroke: MID }),
    rc.line(36, 60, 58, 60, { stroke: MID }),
    rc.path('M84 70 l34 -34 12 12 -34 34 -16 4 z', hatch(MID)),
  ],
  (rc) => [
    rc.path('M8 18 h26 c24 0 20 32 42 32', {}),
    rc.path('M8 50 h68', {}),
    rc.path('M8 82 h26 c24 0 20 -32 42 -32', {}),
    rc.rectangle(80, 24, 56, 52, hatch(MID)),
    rc.line(92, 42, 124, 42),
    rc.line(92, 58, 112, 58),
  ],
  (rc) => [
    rc.rectangle(14, 38, 70, 50, solid('#fff')),
    rc.rectangle(24, 26, 70, 50, solid('#fff')),
    rc.rectangle(34, 14, 70, 50, hatch(MID)),
    rc.circle(112, 62, 34, solid('#fff')),
    rc.line(124, 76, 140, 92, { strokeWidth: 3.5 }),
  ],
  (rc) => [
    rc.rectangle(12, 12, 96, 64, solid('#fff')),
    rc.line(12, 30, 108, 30),
    rc.line(60, 76, 60, 90),
    rc.line(44, 90, 76, 90),
    rc.rectangle(26, 42, 36, 22, { ...solid(PALE), stroke: 'none' }),
    rc.circle(112, 62, 42, solid(B)),
    rc.path('M101 62 l8 8 14 -16', { stroke: '#fff', strokeWidth: 4, roughness: 0.6 }),
  ],
]

/** Guide: one figure ahead of three. 260 by 130. */
export const drawFirst: Draw = (rc) => [
  rc.line(8, 112, 252, 112, { stroke: MID, strokeLineDash: [2, 9] }),
  ...[40, 88, 136].flatMap((x) => person(rc, x, 62, 1.1)),
  ...person(rc, 206, 48, 1.5, B),
  rc.path('M234 16 l5 -13 5 13 13 5 -13 5 -5 13 -5 -13 -13 -5 z', solid(B)),
]

/** Guide: one designer per domain. 260 by 130. */
export const drawDomains: Draw = (rc) =>
  [44, 130, 216].flatMap((x) => [...person(rc, x, 20, 1.1), rc.line(x, 56, x, 78), rc.rectangle(x - 34, 80, 68, 40, hatch(MID))])

/** Guide: a promotion case as a stack of slides. 260 by 130. */
export const drawDeck: Draw = (rc) => [
  rc.rectangle(40, 34, 150, 88, solid('#fff')),
  rc.rectangle(58, 20, 150, 88, solid('#fff')),
  rc.rectangle(76, 6, 150, 88, hatch(PALE)),
  rc.path('M96 76 l26 -26 20 16 34 -40', { strokeWidth: 3 }),
  rc.path('M162 24 h16 v16', { strokeWidth: 3 }),
]

/** A slide outline, stretched to its tile. */
export const drawSlide: Draw = (rc) => [rc.rectangle(3, 3, 154, 94, { ...solid('#fff'), roughness: 1.5 })]

/** The four trade-offs. 200 by 60 each. */
export const drawTradeoffs: Draw[] = [
  (rc) => [rc.line(12, 30, 188, 30, { stroke: MID, strokeWidth: 6 }), rc.circle(118, 30, 28, solid(B))],
  (rc) => [rc.rectangle(8, 10, 72, 40, solid(B)), rc.path('M90 30 h22 m-8 -8 l9 8 -9 8', { strokeWidth: 2.5 }), rc.rectangle(122, 10, 72, 40, hatch(MID))],
  (rc) => [
    rc.path('M8 34 h50 c24 0 24 -18 48 -18 h74 m-10 -9 l11 9 -11 9', { strokeWidth: 2.5 }),
    rc.path('M58 34 c24 0 24 16 48 16 h22', { stroke: MID }),
    rc.path('M136 42 l12 14 m0 -14 l-12 14', { stroke: MID, strokeWidth: 2.5 }),
  ],
  (rc) => [0, 1, 2, 3, 4, 5].map((i) => rc.rectangle(14 + i * 30, 44 - i * 7, 20, 10 + i * 7, i < 3 ? solid(B) : hatch(MID))),
]

/** Mechanisms: three roles brought into one room. 300 by 150. */
export const drawRoom: Draw = (rc) => [
  rc.rectangle(92, 56, 116, 82, hatch(PALE)),
  rc.circle(150, 98, 42, solid(B)),
  rc.path('M139 98 l8 8 14 -16', { stroke: '#fff', strokeWidth: 4, roughness: 0.6 }),
  ...person(rc, 30, 34, 1.3),
  ...person(rc, 150, 14, 1.1),
  ...person(rc, 270, 34, 1.3),
  rc.line(56, 70, 90, 84),
  rc.line(244, 70, 210, 84),
]

/** Mechanisms: the same work told upward and downward. 300 by 150. */
export const drawUpDown: Draw = (rc) => [
  rc.rectangle(96, 6, 108, 34, solid('#fff')),
  rc.line(112, 23, 188, 23, { stroke: MID }),
  rc.rectangle(22, 110, 108, 34, solid('#fff')),
  rc.rectangle(170, 110, 108, 34, solid('#fff')),
  rc.line(38, 127, 114, 127, { stroke: MID }),
  rc.line(186, 127, 262, 127, { stroke: MID }),
  rc.circle(150, 76, 34, solid(B)),
  rc.path('M150 56 v-12 m-8 8 l8 -9 8 9', { strokeWidth: 2.5 }),
  rc.path('M134 88 l-40 18 m4 -12 l-6 13 14 2', { strokeWidth: 2.5 }),
  rc.path('M166 88 l40 18 m-4 -12 l6 13 -14 2', { strokeWidth: 2.5 }),
]

/** Two people and the four headings of a 1:1. 260 by 130. */
export const drawOneOnOne: Draw = (rc) => [
  ...person(rc, 36, 40, 1.4),
  ...person(rc, 224, 40, 1.4, B),
  rc.rectangle(84, 14, 92, 104, solid('#fff')),
  ...[34, 56, 78, 100].flatMap((y) => [rc.rectangle(94, y - 6, 12, 12, solid(MID)), rc.line(114, y, 164, y, { stroke: MID })]),
]

/** A query and the chart it returns. 260 by 130. */
export const drawQuery: Draw = (rc) => [
  rc.rectangle(10, 14, 106, 100, solid('#fff')),
  rc.line(24, 36, 74, 36),
  rc.line(24, 54, 100, 54, { stroke: MID }),
  rc.line(24, 72, 88, 72, { stroke: MID }),
  rc.line(24, 90, 62, 90),
  rc.path('M124 64 h18 m-8 -8 l9 8 -9 8', { strokeWidth: 2.5 }),
  rc.line(156, 112, 252, 112),
  ...[0, 1, 2, 3].map((i) => rc.rectangle(164 + i * 22, 96 - i * 20, 14, 16 + i * 20, i === 3 ? solid(B) : hatch(MID))),
]

/** Seven rough concepts, one chosen. 260 by 130. */
export const drawSeven: Draw = (rc) => [
  ...[0, 1, 2, 3, 4, 5, 6].map((i) => {
    const x = 8 + (i % 4) * 62 + (i > 3 ? 31 : 0)
    const y = i > 3 ? 72 : 10
    return rc.rectangle(x, y, 52, 46, i === 5 ? hatch(B) : solid('#fff'))
  }),
  rc.ellipse(127, 95, 84, 66, { strokeWidth: 1.5, roughness: 2 }),
]

/** Search: a lens over a list of results. 260 by 130. */
export const drawSearch: Draw = (rc) => [
  rc.rectangle(20, 12, 150, 26, solid('#fff')),
  ...[56, 80, 104].flatMap((y) => [rc.rectangle(20, y - 8, 16, 16, hatch(MID)), rc.line(46, y, 150, y, { stroke: MID })]),
  rc.circle(196, 62, 62, solid('#fff')),
  rc.line(218, 86, 246, 116, { strokeWidth: 4 }),
]

/** A table being defined: a header and its columns. 260 by 130. */
export const drawSchema: Draw = (rc) => [
  rc.rectangle(30, 12, 200, 106, solid('#fff')),
  rc.rectangle(30, 12, 200, 26, hatch(MID)),
  rc.line(30, 64, 230, 64),
  rc.line(30, 90, 230, 90),
  rc.line(110, 12, 110, 118),
  rc.circle(226, 106, 36, solid(B)),
  rc.path('M216 106 h20 m-10 -10 v20', { stroke: '#fff', strokeWidth: 4, roughness: 0.6 }),
]

/** An empty frame for an artifact still to come, stretched to its slot. */
export const drawSlot: Draw = (rc) => [rc.rectangle(4, 4, 392, 112, { roughness: 1.8, strokeLineDash: [9, 9], strokeWidth: 1.6 })]

/** The line the seven areas sit on. 1400 by 40, stretched to fit. */
export const drawLifecycle: Draw = (rc) => [
  rc.curve([[0, 22], [100, 16], [300, 24], [500, 16], [700, 24], [900, 16], [1100, 24], [1300, 16], [1400, 20]], { strokeWidth: 2.5, roughness: 1.5 }),
]

/** One small drawing per area, each on a white disc that sits on the line:
 *  a lens, a key, a branching graph, a pulse, a shield with a tick, a cursor
 *  and two joined stages. 64 by 64. */
const disc = (rc: RoughSVG) => rc.circle(32, 32, 58, { ...solid('#fff'), strokeWidth: 2.2 })
export const drawAreas: Record<string, Draw> = {
  Discovery: (rc) => [disc(rc), rc.circle(28, 28, 20, solid(PALE)), rc.line(36, 36, 46, 46, { strokeWidth: 3.2 })],
  Access: (rc) => [disc(rc), rc.circle(23, 32, 15, solid(PALE)), rc.line(31, 32, 48, 32, { strokeWidth: 2.6 }), rc.line(42, 32, 42, 39, { strokeWidth: 2.6 }), rc.line(47, 32, 47, 38, { strokeWidth: 2.6 })],
  Lineage: (rc) => [disc(rc), rc.line(22, 32, 42, 21), rc.line(22, 32, 42, 43), rc.circle(20, 32, 12, solid(B)), rc.circle(43, 21, 11, solid(PALE)), rc.circle(43, 43, 11, solid(PALE))],
  Observability: (rc) => [disc(rc), rc.path('M13 34 h9 l5 -13 l8 24 l5 -11 h11', { strokeWidth: 2.6 })],
  'Data maturity': (rc) => [disc(rc), rc.path('M32 14 l14 5 v11 c0 10 -7 15 -14 19 c-7 -4 -14 -9 -14 -19 v-11 z', solid(PALE)), rc.path('M25 31 l5 6 l9 -11', { strokeWidth: 2.8 })],
  Instrumentation: (rc) => [disc(rc), rc.path('M25 17 v25 l7 -6 l5 11 l5 -2 l-5 -11 l9 -1 z', solid(PALE))],
  'Pipeline authoring': (rc) => [disc(rc), rc.rectangle(13, 24, 14, 16, solid(PALE)), rc.rectangle(38, 24, 14, 16, solid(B)), rc.path('M28 32 h8 m-4 -4 l4 4 l-4 4', { strokeWidth: 2.4 })],
}
