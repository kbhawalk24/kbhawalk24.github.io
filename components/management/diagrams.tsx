'use client'

import type { RoughSVG } from 'roughjs/bin/svg'

import { B, MID, PALE, Sketch, hatch, person, solid, type Draw } from './sketch'

// One drawn diagram per part of the Management story (16 Nov 2026): the point
// of the part as a picture, before the reader reaches its paragraphs. Where a
// part is about a change, the diagram is a before and an after. Hand-drawn with
// Rough.js like the rest of the tab; the labels are short phrases from the
// copy beside them. Decorative for screen readers: the paragraphs say it all.

const INK = '#1e2738'
const GREY = '#6b6f76'

/** A text label inside a sketch. */
const t = (x: number, y: number, text: string, o: { a?: 'start' | 'middle' | 'end'; size?: number; w?: number; fill?: string } = {}) => {
  const e = document.createElementNS('http://www.w3.org/2000/svg', 'text')
  e.setAttribute('x', String(x))
  e.setAttribute('y', String(y))
  e.setAttribute('text-anchor', o.a ?? 'middle')
  e.setAttribute('font-family', 'var(--font-sans)')
  e.setAttribute('font-size', String(o.size ?? 15))
  e.setAttribute('font-weight', String(o.w ?? 600))
  e.setAttribute('fill', o.fill ?? INK)
  e.textContent = text
  return e as unknown as SVGGElement
}

const arrow = (rc: RoughSVG, x1: number, y1: number, x2: number, y2: number, stroke = B) => {
  const a = Math.atan2(y2 - y1, x2 - x1)
  const h = 9
  return [
    rc.line(x1, y1, x2, y2, { stroke, strokeWidth: 2.2 }),
    rc.line(x2, y2, x2 - h * Math.cos(a - 0.5), y2 - h * Math.sin(a - 0.5), { stroke, strokeWidth: 2.2 }),
    rc.line(x2, y2, x2 - h * Math.cos(a + 0.5), y2 - h * Math.sin(a + 0.5), { stroke, strokeWidth: 2.2 }),
  ]
}

const box = (rc: RoughSVG, x: number, y: number, w: number, h: number, label: string, o: { fill?: string; text?: string; size?: number; grey?: boolean } = {}) => [
  rc.rectangle(x, y, w, h, { ...solid(o.fill ?? '#fff'), stroke: o.grey ? MID : B }),
  t(x + w / 2, y + h / 2 + 5, label, { size: o.size ?? 14, fill: o.text ?? (o.grey ? GREY : INK) }),
]

// 1. The situation: sixteen product managers, three designers and two more.
const situation: Draw = (rc) => [
  ...Array.from({ length: 16 }, (_, i) => person(rc, 34 + i * 33, 44, 0.95, PALE)).flat(),
  t(20, 122, 'Sixteen product managers', { a: 'start' }),
  ...[650, 700, 750].flatMap((x) => person(rc, x, 44, 0.95, B)),
  ...[820, 870].flatMap((x) => person(rc, x, 44, 0.95, '#fff')),
  t(636, 122, 'Three designers, and two more indirectly', { a: 'start' }),
]

// 2. Making the work visible: requests wired to anyone, then through one tracker.
const PMS = Array.from({ length: 16 }, (_, i) => 14 + i * 13)
const DES = [52, 112, 172]
const wires = (after: boolean): Draw => (rc) => [
  ...PMS.map((y, i) =>
    after
      ? rc.path(`M38 ${y} C 110 ${y}, 120 112, 168 112`, { stroke: MID, strokeWidth: 1.4, roughness: 0.6 })
      : rc.path(`M38 ${y} C 190 ${y}, 220 ${DES[(i * 7) % 3]}, 372 ${DES[(i * 7) % 3]}`, { stroke: MID, strokeWidth: 1.4, roughness: 0.6 }),
  ),
  ...(after
    ? [
        ...box(rc, 168, 88, 110, 48, 'one tracker', { fill: '#fff' }),
        ...DES.map((d) => rc.path(`M278 112 C 320 112, 320 ${d}, 372 ${d}`, { strokeWidth: 2.2, roughness: 0.8 })),
      ]
    : []),
  ...PMS.map((y) => rc.circle(34, y, 9, { ...solid(B), stroke: 'none', roughness: 0.5 })),
  ...DES.flatMap((d) => person(rc, 398, d - 10, 1, B)),
  t(20, 240, 'product managers', { a: 'start', size: 13, fill: GREY }),
  t(440, 240, 'designers', { a: 'end', size: 13, fill: GREY }),
]

// 3. Moving design upstream: where design joins a project.
const STAGES = ['Problem', 'Specification', 'Design', 'Build']
const stages = (at: number): Draw => (rc) => [
  ...STAGES.flatMap((s, i) => {
    const x = 6 + i * 114
    return [...box(rc, x, 96, 98, 46, s, { fill: i === at ? PALE : '#fff', grey: i < at, size: 13.5 }), ...(i < 3 ? arrow(rc, x + 100, 119, x + 112, 119, i < at ? MID : B) : [])]
  }),
  ...person(rc, 55 + at * 114, 26, 1.05, B),
  ...arrow(rc, 55 + at * 114, 62, 55 + at * 114, 90),
  t(55 + at * 114 + (at > 1 ? -26 : 26), 32, 'design joins here', { a: at > 1 ? 'end' : 'start', size: 13.5 }),
]

// 4. How the team worked: the five steps of a project as one loop, with what
// "data" meant written under the two steps that use it: the three sources that
// size a problem, and the two things measured after launch.
const LOOP = ['Size the problem', 'Prototype in code', 'Test it roughly', 'Sign off', 'Measure the result']
const NOTES: Record<number, string[]> = { 0: ['interviews', 'SQL', 'Amplitude'], 4: ['feature usage', 'post-launch metrics'] }
const loop: Draw = (rc) => [
  // The way back round, over the top.
  rc.path('M835 56 C 835 6, 87 6, 87 52', { strokeWidth: 2.2, strokeLineDash: [7, 7], roughness: 0.9 }),
  ...arrow(rc, 87, 46, 87, 58),
  t(461, 40, 'and round again on the next problem', { size: 13, fill: GREY }),
  ...LOOP.flatMap((s, i) => {
    const x = 8 + i * 187
    return [...box(rc, x, 62, 158, 54, s, { fill: i === 0 || i === 4 ? PALE : '#fff' }), ...(i < 4 ? arrow(rc, x + 161, 89, x + 184, 89) : [])]
  }),
  // The annotations: a short drawn stem under the step, then its list.
  ...Object.entries(NOTES).flatMap(([k, items]) => {
    const x = 8 + Number(k) * 187 + 22
    return [
      rc.line(x, 118, x, 132 + (items.length - 1) * 24 + 4, { strokeWidth: 1.8 }),
      ...items.flatMap((item, n) => [rc.line(x, 138 + n * 24, x + 12, 138 + n * 24, { strokeWidth: 1.8 }), t(x + 18, 143 + n * 24, item, { a: 'start', size: 14, w: 500, fill: INK })]),
    ]
  }),
]

// 5. Explaining the work: the three things she made to explain it. A deck for
// executives, a video for each launch, and a walkthrough video before a
// workflow changes.
const MADE: [string, string][] = [
  ['Executive decks', 'the long-term direction, to get it funded'],
  ['Launch videos', 'what is new, for the people using it'],
  ['Walkthrough videos', 'a workflow change, before it arrives'],
]
const screen = (rc: RoughSVG, x: number, y: number, fill: string) => [rc.rectangle(x, y, 150, 92, solid(fill)), rc.path(`M${x + 62} ${y + 30} l28 16 l-28 16 z`, solid(B))]
const made: Draw = (rc) => [
  // A deck: three slides, the top one with a rising line.
  rc.rectangle(34, 30, 150, 92, solid('#fff')),
  rc.rectangle(46, 20, 150, 92, solid('#fff')),
  rc.rectangle(58, 10, 150, 92, solid(PALE)),
  rc.line(74, 32, 150, 32, { strokeWidth: 2.4 }),
  rc.path('M76 84 l28 -22 l22 12 l34 -32', { strokeWidth: 2.6 }),
  // A launch video: a screen, a play mark and a spark for "new".
  ...screen(rc, 360, 20, PALE),
  rc.path('M524 14 l5 -12 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 z', solid(B)),
  // A walkthrough: a screen, a play mark and the steps it walks through.
  ...screen(rc, 672, 20, '#fff'),
  rc.line(690, 128, 804, 128, { strokeWidth: 2 }),
  ...[690, 747, 804].map((x, i) => rc.circle(x, 128, 13, solid(i === 0 ? B : '#fff'))),
  ...MADE.flatMap(([title, line], i) => {
    const x = 34 + i * 312
    return [t(x, 172, title, { a: 'start', size: 16, w: 700 }), t(x, 194, line, { a: 'start', size: 13.5, w: 500, fill: GREY })]
  }),
]

const BAND = 'rounded-2xl bg-accent-brand/[6%] px-5 py-6 sm:px-8 sm:py-7'

/** Before and after, side by side from md up and stacked below it. */
function Pair({ before, after, h, seed }: { before: Draw; after: Draw; h: number; seed: number }) {
  return (
    <div className={`grid items-center gap-x-10 gap-y-8 md:grid-cols-2 ${BAND}`}>
      <div>
        <p className="label-micro text-muted-foreground">Before</p>
        <Sketch w={460} h={h} draw={before} seed={seed} className="mt-2 h-auto w-full" />
      </div>
      <div>
        <p className="label-micro text-accent-brand">After</p>
        <Sketch w={460} h={h} draw={after} seed={seed + 1} className="mt-2 h-auto w-full" />
      </div>
    </div>
  )
}

/** A single wide drawing. It keeps its size and scrolls sideways on a phone,
 *  so its labels stay readable. */
function Wide({ draw, h, seed }: { draw: Draw; h: number; seed: number }) {
  return (
    <div className={`overflow-x-auto [scrollbar-width:thin] ${BAND}`}>
      <Sketch w={940} h={h} draw={draw} seed={seed} className="h-auto w-full min-w-[40rem]" />
    </div>
  )
}

const BEFORE = wires(false)
const AFTER = wires(true)
const LATE = stages(2)
const EARLY = stages(0)

export function PartDiagram({ id }: { id: string }) {
  if (id === 'situation') return <Wide draw={situation} h={136} seed={11} />
  if (id === 'visible') return <Pair before={BEFORE} after={AFTER} h={250} seed={21} />
  if (id === 'upstream') return <Pair before={LATE} after={EARLY} h={156} seed={31} />
  if (id === 'practices') return <Wide draw={loop} h={204} seed={41} />
  if (id === 'understood') return <Wide draw={made} h={206} seed={51} />
  return null
}
