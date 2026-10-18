'use client'

import type bp from '@/content/impact/building-the-platform.json'
import { AFTER_START_MS, BEFORE_MS, TOTAL_MS, phase } from '@/components/impact/timing'
import { ImpactFrame, useImpactClock } from '@/components/impact/impact-frame'

export type PlatformImpact = typeof bp

/** Each of the four later points appears this many ms after the previous. */
const STEP_MS = 220
const POINT_MS = 300

const log = Math.log10

/** "From 45 days to under 4 minutes." A ladder on a log time axis with the
 *  five dated points top to bottom, and beside it the three-point monthly
 *  users step line. */
export function PlatformViz({ data }: { data: PlatformImpact }) {
  const { ref, elapsed, reduced, replay, settled } = useImpactClock(TOTAL_MS)
  const { ladder, users } = data

  return (
    <ImpactFrame
      id={data.id}
      heading={data.heading}
      summary={data.summary}
      source={data.source}
      frameRef={ref}
      reduced={reduced}
      settled={settled}
      onReplay={replay}
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
        <Ladder elapsed={elapsed} points={ladder.points} units={ladder.units} axisLabel={ladder.axisLabel} />
        <Users elapsed={elapsed} label={users.label} points={users.points} />
      </div>
    </ImpactFrame>
  )
}

function Ladder({
  elapsed,
  points,
  units,
  axisLabel,
}: {
  elapsed: number
  points: { value: string; minutes: number; date: string; tag: string }[]
  units: string[]
  axisLabel: string
}) {
  const W = 360
  const H = 320
  const top = 24
  const bottom = H - 24
  const x = 72
  const maxV = points[0].minutes
  const minV = points[points.length - 1].minutes
  const y = (v: number) => top + ((log(maxV) - log(v)) / (log(maxV) - log(minV))) * (bottom - top)
  // Unit boundaries on the axis: one day and one hour, in minutes.
  const dayY = y(1440)
  const hourY = y(60)
  const unitBands = [
    { label: units[0], at: (top + dayY) / 2 },
    { label: units[1], at: (dayY + hourY) / 2 },
    { label: units[2], at: (hourY + bottom) / 2 },
  ]
  // Labels keep a minimum gap even where points sit close on the log axis;
  // each is pushed down from the one above, then the stack is pulled back
  // up if it ran past the bottom.
  const GAP = 34
  const labelYs = points.map((pt) => y(pt.minutes))
  for (let i = 1; i < labelYs.length; i++) labelYs[i] = Math.max(labelYs[i], labelYs[i - 1] + GAP)
  const overflow = labelYs[labelYs.length - 1] - (bottom - 2)
  if (overflow > 0) for (let i = 0; i < labelYs.length; i++) labelYs[i] -= overflow
  for (let i = labelYs.length - 2; i >= 0; i--) labelYs[i] = Math.min(labelYs[i], labelYs[i + 1] - GAP)

  return (
    <div>
      <p className="font-sans text-sm text-foreground">Time to find, get access to and use data</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-auto w-full max-w-md" role="presentation">
        <line x1={x} y1={top} x2={x} y2={bottom} className="stroke-foreground/15" strokeWidth={1} />
        {[dayY, hourY].map((yy, i) => (
          <line key={i} x1={x - 6} y1={yy} x2={x + 6} y2={yy} className="stroke-foreground/25" strokeWidth={1} />
        ))}
        {unitBands.map((b) => (
          <text key={b.label} x={x - 12} y={b.at} textAnchor="end" dominantBaseline="middle" className="fill-muted-foreground font-sans text-[11px]">
            {b.label}
          </text>
        ))}
        <text x={x - 12} y={bottom + 16} textAnchor="end" className="fill-muted-foreground font-mono text-[10px] uppercase tracking-wider">
          {axisLabel}
        </text>

        {points.map((pt, i) => {
          const p = i === 0 ? phase(elapsed, 0, BEFORE_MS) : phase(elapsed, AFTER_START_MS + (i - 1) * STEP_MS, POINT_MS)
          const cy = y(pt.minutes)
          const ly = labelYs[i]
          const prev = i > 0 ? y(points[i - 1].minutes) : cy
          const before = i === 0
          const lx = x + 28
          return (
            <g key={pt.value}>
              {i > 0 && (
                <line x1={x} y1={prev} x2={x} y2={prev + (cy - prev) * p} className="stroke-accent-brand" strokeWidth={2} strokeLinecap="round" />
              )}
              <circle cx={x} cy={cy} r={6 * p} className={before ? 'fill-foreground/40' : 'fill-accent-brand'} />
              <g style={{ opacity: p }}>
                {/* Leader from the point to its label, where labels had to move apart. */}
                <line x1={x + 8} y1={cy} x2={lx - 6} y2={ly} className="stroke-foreground/20" strokeWidth={1} />
                <text x={lx} y={ly + 4} className={`font-heading text-[16px] font-semibold ${before ? 'fill-muted-foreground' : 'fill-accent-brand'}`}>
                  {pt.value}
                </text>
                <text x={lx} y={ly + 19} className="fill-muted-foreground font-sans text-[11px]">
                  {pt.date} · {pt.tag}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/** Months since the first point, for the x axis. */
const MONTH_OFFSETS = [0, 11, 31]

function Users({ elapsed, label, points }: { elapsed: number; label: string; points: { value: string; n: number; date: string }[] }) {
  const W = 360
  const H = 200
  const left = 24
  const right = W - 90
  const top = 28
  const bottom = H - 36
  const max = Math.max(...points.map((p) => p.n))
  const span = MONTH_OFFSETS[MONTH_OFFSETS.length - 1]
  const x = (i: number) => left + (MONTH_OFFSETS[i] / span) * (right - left)
  const y = (n: number) => bottom - (n / max) * (bottom - top)

  const p0 = phase(elapsed, 0, BEFORE_MS)
  const pStep = phase(elapsed, AFTER_START_MS, 500)
  const p2 = phase(elapsed, AFTER_START_MS + 500, 400)

  // The step from the first to the second point: along, then up.
  const x0 = x(0)
  const y0 = y(points[0].n)
  const x1 = x(1)
  const y1 = y(points[1].n)
  const alongLen = x1 - x0
  const upLen = y0 - y1
  const total = alongLen + upLen
  const drawn = total * pStep
  const alongDrawn = Math.min(alongLen, drawn)
  const upDrawn = Math.max(0, drawn - alongLen)

  return (
    <div>
      <p className="font-sans text-sm text-foreground">{label}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-2 h-auto w-full max-w-md" role="presentation">
        <line x1={left} y1={bottom} x2={right + 60} y2={bottom} className="stroke-foreground/15" strokeWidth={1} />
        <line x1={x0} y1={y0} x2={x0 + alongDrawn} y2={y0} className="stroke-accent-brand" strokeWidth={2} />
        {upDrawn > 0 && <line x1={x1} y1={y0} x2={x1} y2={y0 - upDrawn} className="stroke-accent-brand" strokeWidth={2} />}
        {points.map((pt, i) => {
          const p = i === 0 ? p0 : i === 1 ? (pStep >= 1 ? 1 : 0) : p2
          const before = i === 0
          const cx = x(i)
          const cy = y(pt.n)
          const anchor = i === points.length - 1 ? 'end' : 'start'
          const tx = i === points.length - 1 ? cx + 8 : cx + 8
          return (
            <g key={pt.value} style={{ opacity: i === 1 ? p : 1 }}>
              <circle cx={cx} cy={cy} r={6 * (i === 1 ? 1 : p)} className={before ? 'fill-foreground/40' : 'fill-accent-brand'} />
              <g style={{ opacity: p }}>
                <text x={i === points.length - 1 ? cx + 10 : tx} y={cy - 10} textAnchor={i === points.length - 1 ? 'start' : anchor} className={`font-heading text-[16px] font-semibold ${before ? 'fill-muted-foreground' : 'fill-accent-brand'}`}>
                  {pt.value}
                </text>
                <text x={cx} y={bottom + 16} textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'} className="fill-muted-foreground font-sans text-[11px]">
                  {pt.date}
                </text>
              </g>
            </g>
          )
        })}
      </svg>
      <p className="mt-1 font-sans text-xs text-muted-foreground">No line where there was no monthly measurement.</p>
    </div>
  )
}
