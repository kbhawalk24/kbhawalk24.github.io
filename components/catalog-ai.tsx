'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { RoughSVG } from 'roughjs/bin/svg'

import { event } from '@/lib/analytics'
import { B, MID, PALE, Sketch, solid, type Draw } from '@/components/management/sketch'

// The "Leveraging AI" tab on the catalog homepage (17 Nov 2026, second pass).
// Her brief: "a narrative without any screenshots whatsoever, maybe some
// illustrations but it needs to be a very crisp story". So: one opening
// sentence, then four short beats, each with a
// small hand-drawn picture (Rough.js, the Management tab's hand) and one
// paragraph. No screenshots, no figures, no table. Every fact was checked
// against the sources by the content reviewer
// (private/reviews/home/ai-content-review.md) and is worded as on the
// Management tab and the data agent case study, so the tabs agree. No heading
// shows at the top: the tab row already says "Leveraging AI".

const line = (rc: RoughSVG, x1: number, y1: number, x2: number, y2: number, stroke = B, w = 2.2) => rc.line(x1, y1, x2, y2, { stroke, strokeWidth: w })

/** Notes pooled in one place, and one question put to all of them. 120 by 96. */
const drawResearch: Draw = (rc) => [
  rc.rectangle(10, 22, 44, 52, { ...solid('#fff'), roughness: 1.3 }),
  rc.rectangle(22, 14, 44, 52, { ...solid(PALE), roughness: 1.3 }),
  rc.rectangle(34, 6, 44, 52, { ...solid('#fff'), roughness: 1.3 }),
  line(rc, 42, 20, 70, 20, MID),
  line(rc, 42, 31, 70, 31, MID),
  line(rc, 42, 42, 62, 42, MID),
  rc.circle(84, 62, 34, { ...solid('#fff'), strokeWidth: 2.6 }),
  line(rc, 96, 75, 112, 91, B, 3.2),
]

/** A prototype that runs: a window with code in it. 120 by 96. */
const drawPrototype: Draw = (rc) => [
  rc.rectangle(8, 10, 104, 76, { ...solid('#fff'), roughness: 1.3 }),
  line(rc, 8, 28, 112, 28),
  rc.circle(20, 19, 6, { ...solid(MID), stroke: 'none' }),
  rc.circle(31, 19, 6, { ...solid(MID), stroke: 'none' }),
  rc.path('M46 44 L32 57 L46 70', { strokeWidth: 2.6 }),
  rc.path('M74 44 L88 57 L74 70', { strokeWidth: 2.6 }),
  line(rc, 65, 40, 55, 74, B, 2.4),
]

/** A short video for each launch. 120 by 96. */
const drawVideo: Draw = (rc) => [
  rc.rectangle(8, 12, 104, 64, { ...solid(PALE), roughness: 1.3 }),
  rc.path('M50 30 L50 58 L76 44 Z', { ...solid(B), roughness: 0.9 }),
  line(rc, 8, 88, 112, 88, MID, 3),
  line(rc, 8, 88, 48, 88, B, 3),
  rc.circle(48, 88, 9, { ...solid(B), stroke: 'none' }),
]

/** The agent and the rules it follows: an answer with its checks. 120 by 96. */
const drawAgent: Draw = (rc) => [
  rc.path('M12 10 H108 V66 H44 L26 84 V66 H12 Z', { ...solid('#fff'), roughness: 1.2 }),
  ...[24, 38, 52].flatMap((y) => [rc.path(`M24 ${y} l5 6 l10 -11`, { strokeWidth: 2.6 }), line(rc, 48, y + 2, y === 38 ? 84 : 96, y + 2, MID)]),
]

const BEATS: { id: string; draw: Draw; heading: string; text: string }[] = [
  {
    id: 'research',
    draw: drawResearch,
    heading: 'Research the whole team could question',
    text: 'Technical users rarely sit for repeated interviews, so the team pooled what it had in Marvin, a research tool with AI analysis built in: 2,890 notes from user visits, eight surveys and the questions people asked in Slack help channels. One question could then be put to all of them at once. That evidence put two features on the roadmap that had not been on it, and both shipped in 2025.',
  },
  {
    id: 'prototypes',
    draw: drawPrototype,
    heading: 'Prototypes in code',
    text: 'I built my prototypes in code with Claude, Cursor and v0, and every designer on my team took the practice up. On the redesign of lineage, the view of what feeds a table, one of them prototyped in code alongside the developers, and development took 90% less time.',
  },
  {
    id: 'videos',
    draw: drawVideo,
    heading: 'A video for every launch',
    text: 'The people using the platform needed more than a release note, so I started making a short AI-made video for each launch. The team took the practice up, and engineering later copied the format for its own launches.',
  },
  {
    id: 'agent',
    draw: drawAgent,
    heading: 'The rules for an AI agent',
    text: 'I also design AI that other people use. When engineering stood up Intuit’s data agent, an AI assistant inside Cursor and Claude that answers questions about the company’s data, I audited its live sessions and wrote the rules it follows. It reads the person’s Collections, their saved sets of data, before it searches anything else. It never invents a table name, never shows a query that has not been verified, and asks before it runs one. In its first 90 days the agent had 711 active users, and the time from a question to a verified answer fell from 45 minutes to 4.',
  },
]

const PROSE = 'font-sans text-[17px] leading-[1.65] text-[#33332f] md:text-lg md:leading-[1.65]'
const LINK = 'group inline-flex min-h-11 items-center gap-1.5 font-sans text-base font-bold text-accent-brand'

export function CatalogAi() {
  return (
    <section aria-labelledby="ai-h" className="relative z-10">
      <div className="mx-auto max-w-6xl px-6 pb-14 md:px-10 lg:px-14">
        <h2 id="ai-h" className="sr-only">
          Leveraging AI
        </h2>
        <p className="font-heading text-2xl font-semibold leading-[1.3] tracking-[-0.015em] text-foreground">
          I try an AI tool on my own design work first. Only then do I ask my team to use it.
        </p>
        <p className={`mt-4 ${PROSE}`}>
          From August 2024 to July 2026 I was the Product Design Manager for Intuit’s enterprise data platform, the internal platform where people at the company find and get access to its data. These are the four places AI entered the work there.
        </p>
        <ol className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-2">
          {BEATS.map((b, i) => (
            <li key={b.id} className="flex flex-col gap-3">
              <Sketch w={120} h={96} draw={b.draw} seed={11 + i} className="h-20 w-[100px]" />
              <h3 className="font-heading text-xl font-semibold leading-[1.25] tracking-[-0.01em] text-foreground">{b.heading}</h3>
              <p className={PROSE}>{b.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 flex flex-wrap gap-x-10 gap-y-1">
          <Link href="/#management" {...event('leadership', { via: 'ai' })} className={LINK}>
            <span className="group-hover:underline">How the team worked, on the Management tab</span>
            <ArrowRight aria-hidden="true" className="size-4 transition-[translate] duration-150 group-hover:translate-x-0.5" />
          </Link>
          <Link href="/work/agentic-discovery/" {...event('work-card', { card: 'agentic-discovery', via: 'read' })} className={LINK}>
            <span className="group-hover:underline">Read the data agent case study</span>
            <ArrowRight aria-hidden="true" className="size-4 transition-[translate] duration-150 group-hover:translate-x-0.5" />
          </Link>
        </p>
      </div>
    </section>
  )
}
