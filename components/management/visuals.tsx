'use client'

import { useReducedMotion } from 'motion/react'

import { B, MID, PALE } from './sketch'

// Clean, moving pictures for the Management story (17 Nov 2026). Her brief: take the dynamic visuals of her management deck
// and of her "what I designed" overview as inspiration, not their text. So:
// flat shapes with a dark outline, the site's blue for what matters, grey
// bars where a screen would have words, and one small loop of motion that
// shows the idea (requests flowing into one tracker, notes flowing into one
// research base). The loops are left out for a visitor who prefers reduced
// motion; the still picture says the same thing. Decorative for screen
// readers: the paragraphs below say it all.

const INK = '#1e2738'
const LINE = '#c9ced8'
const ROW = '#f1f3f7'
const LABEL = { fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, fill: INK } as const
const NOTE = { fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, fill: '#6b6f76' } as const

/** A dot that travels along a path, again and again. */
function Runner({ d, dur, begin = 0, fill = B, r = 4.5 }: { d: string; dur: number; begin?: number; fill?: string; r?: number }) {
  return (
    <circle r={r} fill={fill} opacity="0">
      <animateMotion path={d} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
      <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.12;0.85;1" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
    </circle>
  )
}

/** A person, as in her overview: a head and shoulders with a dark outline. */
function Person({ x, y, fill }: { x: number; y: number; fill: string }) {
  return (
    <g stroke={INK} strokeWidth="2.2" fill={fill}>
      <circle cx={x} cy={y - 9} r="7.5" />
      <path d={`M${x - 13} ${y + 15} a13 13 0 0 1 26 0 z`} strokeLinejoin="round" />
    </g>
  )
}

// The three designers, told apart by colour; each tracker row carries one.
const WHO = [B, MID, '#fff']
const ROWS = [78, 112, 146, 180]
const ROW_WHO = [0, 1, 1, 2]
const SEATS = [70, 129, 188]
const PMS = Array.from({ length: 8 }, (_, i) => 38 + i * 26)
const inPath = (y: number) => `M22 ${y} C 70 ${y}, 78 129, 122 129`
const outPath = (row: number) => `M338 ${ROWS[row]} C 368 ${ROWS[row]}, 372 ${SEATS[ROW_WHO[row]]}, 402 ${SEATS[ROW_WHO[row]]}`

/** Every request into one tracker, and each row to one designer. */
function Tracker({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 460 250" aria-hidden="true" className="h-auto w-full">
      {/* Requests arriving from product managers. */}
      <g fill="none" stroke={LINE} strokeWidth="1.6">
        {PMS.map((y) => (
          <path key={y} d={inPath(y)} />
        ))}
      </g>
      {PMS.map((y) => (
        <circle key={y} cx="22" cy={y} r="5.5" fill={PALE} stroke={INK} strokeWidth="1.8" />
      ))}
      {/* The tracker: a header and four rows, each with its designer's dot. */}
      <rect x="122" y="34" width="216" height="176" rx="12" fill="#fff" stroke={INK} strokeWidth="2.4" />
      <rect x="138" y="48" width="74" height="8" rx="4" fill={INK} />
      <line x1="122" y1="64" x2="338" y2="64" stroke={INK} strokeWidth="2.4" />
      {ROWS.map((y, i) => (
        <g key={y}>
          <rect x="132" y={y - 13} width="196" height="26" rx="7" fill={ROW} />
          <rect x="142" y={y - 4} width={[62, 48, 70, 54][i]} height="8" rx="4" fill={LINE} />
          <rect x="226" y={y - 4} width="34" height="8" rx="4" fill={LINE} />
          <circle cx="284" cy={y} r="7" fill={WHO[ROW_WHO[i]]} stroke={INK} strokeWidth="1.8" />
          <rect x="300" y={y - 5} width="20" height="10" rx="5" fill={i === 0 ? B : PALE} />
        </g>
      ))}
      {/* The row being decided. */}
      <rect x="132" y={ROWS[0] - 13} width="196" height="26" rx="7" fill="none" stroke={B} strokeWidth="2.4">
        {!still && <animate attributeName="y" values={ROWS.map((y) => y - 13).join(';')} calcMode="discrete" dur="8s" repeatCount="indefinite" />}
      </rect>
      {/* Each row goes to one designer. */}
      <g fill="none" stroke={INK} strokeWidth="1.8">
        {ROWS.map((y, i) => (
          <path key={y} d={outPath(i)} />
        ))}
      </g>
      {SEATS.map((y, i) => (
        <Person key={y} x={424} y={y} fill={WHO[i]} />
      ))}
      {!still && (
        <>
          {PMS.map((y, i) => (
            <Runner key={y} d={inPath(y)} dur={2.4} begin={(i * 5) % 8 * 0.45} />
          ))}
          {ROWS.map((_, i) => (
            <Runner key={i} d={outPath(i)} dur={1.6} begin={i * 2} r={4} />
          ))}
        </>
      )}
      <text x="22" y="242" {...NOTE}>
        product managers
      </text>
      <text x="230" y="232" textAnchor="middle" {...LABEL}>
        one tracker
      </text>
      <text x="438" y="242" textAnchor="end" {...NOTE}>
        designers
      </text>
    </svg>
  )
}

const SOURCES: [string, number][] = [
  ['User visits', 62],
  ['Eight surveys', 125],
  ['Slack help channels', 188],
]
const FEED = [100, 140, 180]
const feedPath = (from: number, to: number) => `M150 ${from} C 180 ${from}, 182 ${to}, 212 ${to}`

/** Six months of research pooled into one base that anyone can search. */
function ResearchBase({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 460 250" aria-hidden="true" className="h-auto w-full">
      {SOURCES.map(([label, y], i) => (
        <g key={label}>
          <rect x="6" y={y - 17} width="144" height="34" rx="17" fill={i === 1 ? PALE : '#fff'} stroke={INK} strokeWidth="2" />
          <text x="78" y={y + 5} textAnchor="middle" {...LABEL} fontSize={13}>
            {label}
          </text>
          <path d={feedPath(y, FEED[i])} fill="none" stroke={LINE} strokeWidth="1.8" />
        </g>
      ))}
      {/* The research base: a window with a search bar and tagged notes. */}
      <rect x="212" y="22" width="240" height="206" rx="12" fill="#fff" stroke={INK} strokeWidth="2.4" />
      <line x1="212" y1="48" x2="452" y2="48" stroke={INK} strokeWidth="2.4" />
      {[228, 242, 256].map((x, i) => (
        <circle key={x} cx={x} cy="35" r="3.6" fill={[B, MID, PALE][i]} />
      ))}
      <rect x="226" y="60" width="212" height="28" rx="14" fill={ROW} />
      <circle cx="243" cy="73" r="5.5" fill="none" stroke={INK} strokeWidth="2" />
      <line x1="247" y1="77.5" x2="252" y2="82.5" stroke={INK} strokeWidth="2" strokeLinecap="round" />
      <text x="262" y="78.5" {...NOTE}>
        2,890 notes
      </text>
      {FEED.map((y, i) => (
        <g key={y}>
          <rect x="226" y={y - 2} width="212" height="32" rx="8" fill={ROW} />
          <rect x="238" y={y + 10} width={[84, 66, 96][i]} height="8" rx="4" fill={LINE} />
          <rect x="378" y={y + 6} width="48" height="16" rx="8" fill={B} />
        </g>
      ))}
      <rect x="226" y={FEED[0] - 2} width="212" height="32" rx="8" fill="none" stroke={B} strokeWidth="2.4">
        {!still && <animate attributeName="y" values={FEED.map((y) => y - 2).join(';')} calcMode="discrete" dur="6s" repeatCount="indefinite" />}
      </rect>
      {!still && SOURCES.map(([label, y], i) => <Runner key={label} d={feedPath(y, FEED[i])} dur={1.8} begin={i * 0.6} />)}
    </svg>
  )
}

const BAND = 'rounded-2xl bg-accent-brand/[6%] px-5 py-6 sm:px-8 sm:py-7'
const CAPTION = 'mt-3 font-sans text-sm leading-[1.45] text-muted-foreground'
const NAME = 'font-sans text-[15px] font-semibold leading-[1.3] text-foreground'
const SMALL = 'font-sans text-sm leading-[1.4] text-muted-foreground'

// 1. The situation: sixteen product managers, three designers and two more.
// Three rings hop along the product managers: each designer's attention.
const PM_X = Array.from({ length: 16 }, (_, i) => 30 + i * 35)
const HOPS = [
  [0, 5, 2, 7, 3],
  [6, 11, 8, 13, 9],
  [12, 4, 15, 10, 14],
]
function Situation({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 940 132" aria-hidden="true" className="h-auto w-full min-w-[40rem]">
      {PM_X.map((x) => (
        <Person key={x} x={x} y={52} fill={PALE} />
      ))}
      {HOPS.map((hops, i) => (
        <circle key={i} cx={PM_X[hops[0]]} cy="52" r="21" fill="none" stroke={B} strokeWidth="2.4">
          {!still && <animate attributeName="cx" values={hops.map((h) => PM_X[h]).join(';')} calcMode="discrete" dur={`${7 + i}s`} begin={`${i * 0.8}s`} repeatCount="indefinite" />}
        </circle>
      ))}
      <text x="16" y="116" {...LABEL}>
        Sixteen product managers
      </text>
      {[672, 716, 760].map((x) => (
        <Person key={x} x={x} y={52} fill={B} />
      ))}
      {[836, 880].map((x) => (
        <Person key={x} x={x} y={52} fill="#fff" />
      ))}
      <text x="658" y="116" {...LABEL}>
        Three designers, and two more indirectly
      </text>
    </svg>
  )
}

// 3. Moving design upstream: the marker slides from Design back to Problem.
const STAGES = ['Problem', 'Specification', 'Design', 'Build']
const STAGE_X = [56, 172, 288, 404]
function Upstream({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 460 190" aria-hidden="true" className="h-auto w-full">
      <text x="30" y="30" {...LABEL} fill={B}>
        design joins here
      </text>
      <text x="288" y="30" textAnchor="middle" {...NOTE}>
        design joined here
      </text>
      <path d="M288 84 Q172 26 56 84" fill="none" stroke={B} strokeWidth="2" strokeDasharray="2 9" strokeLinecap="round" />
      <line x1={STAGE_X[0]} y1="112" x2={STAGE_X[3]} y2="112" stroke={INK} strokeWidth="2.4" />
      {STAGES.map((s, i) => (
        <g key={s}>
          <circle cx={STAGE_X[i]} cy="112" r="9" fill="#fff" stroke={INK} strokeWidth="2.4" />
          <text x={STAGE_X[i]} y="152" textAnchor="middle" {...(i === 0 ? LABEL : NOTE)} fontSize={14}>
            {s}
          </text>
        </g>
      ))}
      <circle cx={STAGE_X[2]} cy="112" r="18" fill="none" stroke={B} strokeWidth="2" strokeDasharray="5 6" />
      <circle cx={STAGE_X[0]} cy="112" r="13" fill={B}>
        {!still && <animate attributeName="cx" values={`${STAGE_X[2]};${STAGE_X[2]};${STAGE_X[0]};${STAGE_X[0]}`} keyTimes="0;0.2;0.5;1" dur="6s" repeatCount="indefinite" />}
      </circle>
    </svg>
  )
}

/** A saved set of tables, and the agent that reads it first. */
function Collection({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 460 190" aria-hidden="true" className="h-auto w-full">
      <rect x="24" y="22" width="176" height="126" rx="12" fill="#fff" stroke={INK} strokeWidth="2.4" />
      <path d="M40 34 h14 v20 l-7 -6 l-7 6 z" fill={B} stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
      <rect x="64" y="40" width="78" height="8" rx="4" fill={INK} />
      {[74, 100, 126].map((y, i) => (
        <g key={y}>
          <rect x="36" y={y - 10} width="152" height="20" rx="6" fill={ROW} />
          <rect x="44" y={y - 5} width="10" height="10" rx="2" fill="#fff" stroke={INK} strokeWidth="1.6" />
          <rect x="62" y={y - 4} width={[84, 66, 96][i]} height="8" rx="4" fill={LINE} />
        </g>
      ))}
      <text x="112" y="176" textAnchor="middle" {...LABEL}>
        Collections
      </text>
      <line x1="208" y1="85" x2="270" y2="85" stroke={INK} strokeWidth="2" />
      <path d="M263 78 l8 7 l-8 7" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M284 30 h152 a12 12 0 0 1 12 12 v74 a12 12 0 0 1 -12 12 h-110 l-22 20 v-20 h-8 a12 12 0 0 1 -12 -12 v-74 a12 12 0 0 1 12 -12 z" fill="#fff" stroke={INK} strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M300 50 l3.5 -9 l3.5 9 l9 3.5 l-9 3.5 l-3.5 9 l-3.5 -9 l-9 -3.5 z" fill={B} />
      <rect x="326" y="50" width="92" height="8" rx="4" fill={LINE} />
      {[82, 104].map((y, i) => (
        <g key={y}>
          <path d={`M296 ${y} l5 6 l10 -11`} fill="none" stroke={B} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="326" y={y - 4} width={[100, 74][i]} height="8" rx="4" fill={LINE} />
        </g>
      ))}
      <text x="372" y="176" textAnchor="middle" {...LABEL}>
        the data agent
      </text>
      {!still && [0, 0.9].map((b) => <Runner key={b} d="M208 85 L268 85" dur={1.8} begin={b} />)}
    </svg>
  )
}

// 4. How the team worked: the five steps of a project, one small picture each.
const STEP = 'h-auto w-full'
function StepSize({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className={STEP}>
      <rect x="14" y="16" width="96" height="88" rx="10" fill={INK} />
      {[
        [26, 32, 44, MID],
        [36, 48, 62, '#fff'],
        [36, 64, 40, PALE],
        [26, 80, 54, MID],
      ].map(([x, y, w, c]) => (
        <rect key={String(y)} x={x as number} y={y as number} width={w as number} height="8" rx="4" fill={c as string} />
      ))}
      <line x1="126" y1="104" x2="190" y2="104" stroke={INK} strokeWidth="2.2" />
      {[
        [132, 30],
        [152, 52],
        [172, 76],
      ].map(([x, h], i) => (
        <rect key={x} x={x} y={104 - h} width="13" height={h} rx="2" fill={i === 2 ? B : PALE} stroke={INK} strokeWidth="1.8">
          {!still && <animate attributeName="opacity" values="0.25;1;1" keyTimes="0;0.3;1" dur="4s" begin={`${i * 0.5}s`} repeatCount="indefinite" />}
        </rect>
      ))}
    </svg>
  )
}
function StepPrototype({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className={STEP}>
      <rect x="10" y="20" width="74" height="80" rx="9" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <line x1="10" y1="36" x2="84" y2="36" stroke={INK} strokeWidth="2.2" />
      <rect x="20" y="46" width="26" height="20" rx="4" fill={PALE} />
      <rect x="52" y="48" width="24" height="7" rx="3.5" fill={LINE} />
      <rect x="20" y="74" width="54" height="7" rx="3.5" fill={LINE} />
      <rect x="20" y="86" width="30" height="8" rx="4" fill={B} />
      <line x1="90" y1="60" x2="110" y2="60" stroke={INK} strokeWidth="2" />
      <path d="M105 54 l6 6 l-6 6" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="116" y="20" width="74" height="80" rx="9" fill={INK} />
      {[
        [126, 34, 30, MID],
        [134, 48, 46, '#fff'],
        [134, 62, 34, PALE],
        [142, 76, 38, MID],
        [126, 88, 20, '#fff'],
      ].map(([x, y, w, c]) => (
        <rect key={String(y)} x={x as number} y={y as number} width={w as number} height="7" rx="3.5" fill={c as string} />
      ))}
      {!still && <Runner d="M88 60 L110 60" dur={1.5} r={4} />}
    </svg>
  )
}
const TILES = [0, 1, 2, 3, 4, 5, 6].map((i) => [16 + (i % 4) * 44 + (i > 3 ? 22 : 0), i > 3 ? 66 : 20])
function StepTest({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className={STEP}>
      {TILES.map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width="34" height="36" rx="6" fill={i === 5 ? PALE : '#fff'} stroke={INK} strokeWidth="2" />
          <rect x={x + 7} y={y + 9} width="20" height="5" rx="2.5" fill={i === 5 ? B : LINE} />
          <rect x={x + 7} y={y + 19} width="14" height="5" rx="2.5" fill={i === 5 ? B : LINE} />
        </g>
      ))}
      <rect x={TILES[5][0] - 4} y={TILES[5][1] - 4} width="42" height="44" rx="9" fill="none" stroke={B} strokeWidth="2.4">
        {!still && (
          <>
            <animate attributeName="x" values={[0, 1, 2, 3, 4, 6, 5, 5].map((i) => TILES[i][0] - 4).join(';')} calcMode="discrete" dur="8s" repeatCount="indefinite" />
            <animate attributeName="y" values={[0, 1, 2, 3, 4, 6, 5, 5].map((i) => TILES[i][1] - 4).join(';')} calcMode="discrete" dur="8s" repeatCount="indefinite" />
          </>
        )}
      </rect>
    </svg>
  )
}
function StepSignOff({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className={STEP}>
      <rect x="30" y="14" width="140" height="92" rx="10" fill="#fff" stroke={INK} strokeWidth="2.2" />
      {[36, 60, 84].map((y, i) => (
        <g key={y}>
          <circle cx="52" cy={y} r="8" fill="#fff" stroke={INK} strokeWidth="2" />
          <rect x="70" y={y - 4} width={[80, 60, 72][i]} height="8" rx="4" fill={LINE} />
          <path d={`M47 ${y} l4 4.5 l7 -8`} fill="none" stroke={B} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
            {!still && <animate attributeName="opacity" values="0;0;1;1" keyTimes={`0;${0.15 + i * 0.2};${0.22 + i * 0.2};1`} dur="6s" repeatCount="indefinite" />}
          </path>
        </g>
      ))}
    </svg>
  )
}
const TREND = 'M24 86 L52 78 L76 82 L104 58 L130 62 L176 26'
function StepMeasure({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 200 120" aria-hidden="true" className={STEP}>
      <path d="M20 14 V100 H186" fill="none" stroke={INK} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="20" y1="44" x2="186" y2="44" stroke={LINE} strokeWidth="1.6" strokeDasharray="3 6" />
      <path d={TREND} fill="none" stroke={B} strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="176" cy="26" r="6" fill={B} stroke="#fff" strokeWidth="2" />
      {!still && <Runner d={TREND} dur={3.2} r={5} />}
    </svg>
  )
}
const STEPS: { name: string; note?: string; Pic: (p: { still: boolean }) => React.ReactElement }[] = [
  { name: 'Size the problem', note: 'interviews, SQL, Amplitude', Pic: StepSize },
  { name: 'Prototype in code', Pic: StepPrototype },
  { name: 'Test it roughly', Pic: StepTest },
  { name: 'Sign off', Pic: StepSignOff },
  { name: 'Measure the result', note: 'feature usage, post-launch metrics', Pic: StepMeasure },
]

// 5. Explaining the work: the three things she made to explain it.
function MadeDeck({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 220 130" aria-hidden="true" className={STEP}>
      <rect x="24" y="30" width="150" height="90" rx="8" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <rect x="36" y="20" width="150" height="90" rx="8" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <rect x="48" y="10" width="150" height="90" rx="8" fill={PALE} stroke={INK} strokeWidth="2.2" />
      <rect x="62" y="24" width="70" height="8" rx="4" fill={INK} />
      <path d="M64 82 L92 62 L114 72 L150 40" pathLength="100" fill="none" stroke={B} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="100">
        {!still && <animate attributeName="stroke-dashoffset" values="100;0;0" keyTimes="0;0.4;1" dur="5s" repeatCount="indefinite" />}
      </path>
    </svg>
  )
}
function MadeLaunch({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 220 130" aria-hidden="true" className={STEP}>
      <rect x="10" y="14" width="130" height="100" rx="10" fill={INK} />
      <path d="M64 44 L90 59 L64 74 Z" fill="#fff" />
      <rect x="24" y="96" width="102" height="5" rx="2.5" fill="#5d6677" />
      <rect x="24" y="96" width="68" height="5" rx="2.5" fill={MID}>
        {!still && <animate attributeName="width" values="6;102" dur="5s" repeatCount="indefinite" />}
      </rect>
      {[14, 68].map((y) => (
        <g key={y}>
          <rect x="152" y={y} width="58" height="46" rx="7" fill="#fff" stroke={INK} strokeWidth="2" />
          <path d={`M175 ${y + 14} l14 9 l-14 9 z`} fill={B} />
        </g>
      ))}
    </svg>
  )
}
function MadeWalkthrough({ still }: { still: boolean }) {
  return (
    <svg viewBox="0 0 220 130" aria-hidden="true" className={STEP}>
      <rect x="35" y="10" width="150" height="82" rx="10" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <path d="M100 36 L124 51 L100 66 Z" fill={B} />
      <line x1="60" y1="112" x2="160" y2="112" stroke={INK} strokeWidth="2" />
      {[60, 110, 160].map((x, i) => (
        <circle key={x} cx={x} cy="112" r="9" fill={i === 0 ? B : '#fff'} stroke={INK} strokeWidth="2">
          {!still && <animate attributeName="fill" values={[0, 1, 2].map((k) => (k === i ? B : '#fff')).join(';')} calcMode="discrete" dur="4.5s" repeatCount="indefinite" />}
        </circle>
      ))}
    </svg>
  )
}
const MADE: { name: string; line: string; Pic: (p: { still: boolean }) => React.ReactElement }[] = [
  { name: 'Executive decks', line: 'the long-term direction, to get it funded', Pic: MadeDeck },
  { name: 'Launch videos', line: 'what is new, for the people using it', Pic: MadeLaunch },
  { name: 'Walkthrough videos', line: 'a workflow change, before it arrives', Pic: MadeWalkthrough },
]

/** The picture for a part of the story. */
export function PartVisual({ id }: { id: string }) {
  const still = !!useReducedMotion()
  if (id === 'situation')
    return (
      <div className={`overflow-x-auto [scrollbar-width:thin] ${BAND}`}>
        <Situation still={still} />
      </div>
    )
  if (id === 'visible')
    return (
      <div className={`grid gap-x-10 gap-y-8 md:grid-cols-2 ${BAND}`}>
        <figure>
          <Tracker still={still} />
          <figcaption className={CAPTION}>Every request goes into one tracker, and each designer keeps a fixed set of areas.</figcaption>
        </figure>
        <figure>
          <ResearchBase still={still} />
          <figcaption className={CAPTION}>Six months of research pooled into one base that product managers and engineers search themselves.</figcaption>
        </figure>
      </div>
    )
  if (id === 'upstream')
    return (
      <div className={`grid gap-x-10 gap-y-8 md:grid-cols-2 ${BAND}`}>
        <figure>
          <Upstream still={still} />
          <figcaption className={CAPTION}>Design moved from after the specification to the meetings where the problem is framed.</figcaption>
        </figure>
        <figure>
          <Collection still={still} />
          <figcaption className={CAPTION}>Collections, a person’s saved set of tables, shipped on August 7, 2025 and is the first thing the data agent reads.</figcaption>
        </figure>
      </div>
    )
  if (id === 'practices')
    return (
      <ol className={`grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5 ${BAND}`}>
        {STEPS.map(({ name, note, Pic }, i) => (
          <li key={name} className="flex flex-col gap-2">
            <Pic still={still} />
            <span className={NAME}>
              <span className="tabular-nums text-accent-brand">{i + 1}</span> {name}
            </span>
            {note && <span className={SMALL}>{note}</span>}
          </li>
        ))}
      </ol>
    )
  if (id === 'understood')
    return (
      <ul className={`grid gap-x-8 gap-y-8 sm:grid-cols-3 ${BAND}`}>
        {MADE.map(({ name, line, Pic }) => (
          <li key={name} className="flex flex-col gap-2">
            <Pic still={still} />
            <span className={NAME}>{name}</span>
            <span className={SMALL}>{line}</span>
          </li>
        ))}
      </ul>
    )
  return null
}

// The seven product areas, one small picture each, in the same hand.
const S = { stroke: INK, strokeWidth: 2.2, fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' } as const
const AREA: Record<string, React.ReactElement> = {
  Discovery: (
    <>
      <rect x="6" y="10" width="52" height="17" rx="5" fill="#fff" {...{ stroke: INK, strokeWidth: 2.2 }} />
      <circle cx="16" cy="18" r="4" {...S} />
      <line x1="19" y1="21" x2="22" y2="24" {...S} />
      <rect x="6" y="34" width="52" height="9" rx="3" fill={PALE} />
      <line x1="8" y1="50" x2="34" y2="50" stroke={LINE} strokeWidth="2.2" strokeLinecap="round" />
      <line x1="8" y1="57" x2="44" y2="57" stroke={LINE} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  Access: (
    <>
      {[14, 32, 50].map((y, i) => (
        <g key={y}>
          <rect x="6" y={y - 6} width="12" height="12" rx="3" fill="#fff" stroke={INK} strokeWidth="2" />
          <line x1="24" y1={y} x2="36" y2={y} stroke={LINE} strokeWidth="2.2" strokeLinecap="round" />
          <rect x="42" y={y - 5} width="17" height="10" rx="5" fill={i === 1 ? '#fff' : B} stroke={i === 1 ? LINE : B} strokeWidth="1.6" />
          <circle cx={i === 1 ? 47 : 54} cy={y} r="2.6" fill={i === 1 ? LINE : '#fff'} />
        </g>
      ))}
    </>
  ),
  Lineage: (
    <>
      <path d="M17 14 C 26 14, 24 32, 32 32 M17 32 H32 M17 50 C 26 50, 24 32, 32 32" stroke={LINE} strokeWidth="2" fill="none" />
      <path d="M32 32 C 42 32, 40 18, 48 18 M32 32 C 42 32, 40 46, 48 46" {...S} stroke={B} />
      {[14, 32, 50].map((y) => (
        <rect key={y} x="5" y={y - 6} width="12" height="12" rx="3" fill="#fff" stroke={INK} strokeWidth="2" />
      ))}
      <circle cx="32" cy="32" r="5.5" fill={INK} />
      <rect x="48" y="12" width="12" height="12" rx="3" fill={B} />
      <rect x="48" y="40" width="12" height="12" rx="3" fill={B} />
    </>
  ),
  Observability: (
    <>
      <line x1="6" y1="14" x2="58" y2="14" stroke={LINE} strokeWidth="1.8" strokeDasharray="2 4" />
      <path d="M6 40 l8 -2 l6 3 l7 -3 l5 1 l5 -20 l5 20 l6 -2 l10 1" {...S} />
      <circle cx="37" cy="18" r="6.5" fill={PALE} />
      <circle cx="37" cy="18" r="3.2" fill={B} />
      <line x1="6" y1="54" x2="58" y2="54" stroke={LINE} strokeWidth="2.2" strokeLinecap="round" />
    </>
  ),
  'Data maturity': (
    <>
      <rect x="22" y="8" width="36" height="48" rx="2" fill="none" stroke={LINE} strokeWidth="1.6" strokeDasharray="3 3" />
      {[14, 26, 38, 50].map((y, i) => (
        <g key={y}>
          <line x1="6" y1={y} x2="16" y2={y} stroke={LINE} strokeWidth="2.2" strokeLinecap="round" />
          <rect x="22" y={y - 4.5} width={[36, 28, 20, 11][i]} height="9" fill={B} />
        </g>
      ))}
    </>
  ),
  Instrumentation: (
    <>
      <path d="M22 18 L22 46 L29 39 L34 51 L39 49 L34 37 L44 37 Z" fill={B} stroke={INK} strokeWidth="2" strokeLinejoin="round" />
      <path d="M12 12 l5 5 M22 8 v6 M8 22 h6" {...S} />
      <line x1="46" y1="54" x2="58" y2="54" stroke={LINE} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="47" y="42" width="4" height="10" fill={PALE} />
      <rect x="53" y="34" width="4" height="18" fill={PALE} />
    </>
  ),
  'Pipeline authoring': (
    <>
      <rect x="4" y="23" width="16" height="18" rx="3" fill="#fff" stroke={INK} strokeWidth="2.2" />
      <path d="M20 32 h5 M23 29.5 l3 2.5 l-3 2.5" {...S} strokeWidth={1.8} />
      <rect x="27" y="25" width="14" height="14" rx="3" fill={PALE} stroke={B} strokeWidth="2" />
      <path d="M34 28.5 l1.2 2.3 l2.3 1.2 l-2.3 1.2 l-1.2 2.3 l-1.2 -2.3 l-2.3 -1.2 l2.3 -1.2 z" fill={B} />
      <path d="M41 32 h5 M44 29.5 l3 2.5 l-3 2.5" {...S} strokeWidth={1.8} />
      <rect x="48" y="24" width="14" height="16" rx="3" fill={B} />
    </>
  ),
}

export function AreaIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      {AREA[name]}
    </svg>
  )
}
