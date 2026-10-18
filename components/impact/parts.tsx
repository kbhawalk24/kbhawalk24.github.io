import { cn } from '@/lib/utils'
import { formatCount, mix } from '@/components/impact/timing'

/** One accent for "after", a neutral for "before", nothing else. */
export type Tone = 'before' | 'after'

export const toneBar: Record<Tone, string> = {
  before: 'bg-foreground/30',
  after: 'bg-accent-brand',
}
export const toneBand: Record<Tone, string> = {
  before: 'bg-foreground/15',
  after: 'bg-accent-brand/35',
}
export const toneText: Record<Tone, string> = {
  before: 'text-muted-foreground',
  after: 'text-accent-brand',
}

/** A horizontal bar for a measured value on a scale 0..max, drawn to
 *  progress `p`. A range (low < high) draws solid to `low` and as a lighter
 *  band from `low` to `high`. The value is real text beside it. */
export function RangeBar({
  value,
  low,
  high = low,
  max,
  p,
  tone,
  label,
  className,
}: {
  value: string
  low: number
  high?: number
  max: number
  p: number
  tone: Tone
  label?: string
  className?: string
}) {
  const solid = Math.max(low === 0 ? 0.6 : 0, (low / max) * 100) * p
  const band = ((high - low) / max) * 100 * p
  return (
    <div className={cn('grid gap-1', className)}>
      {label && <p className="font-sans text-xs text-muted-foreground">{label}</p>}
      <div className="flex items-center gap-3">
        <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-foreground/[6%]" aria-hidden="true">
          <div className={cn('absolute inset-y-0 left-0 rounded-full', toneBar[tone])} style={{ width: `${solid}%` }} />
          {high > low && (
            <div className={cn('absolute inset-y-0', toneBand[tone])} style={{ left: `${solid}%`, width: `${band}%` }} />
          )}
        </div>
        <p className={cn('w-[7.5rem] shrink-0 font-heading text-base font-semibold leading-tight tabular-nums', toneText[tone])}>{value}</p>
      </div>
    </div>
  )
}

/** Splits "81.31%" into its number and the text around it. */
export function parseFigure(s: string) {
  const m = s.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/)
  if (!m) return null
  return { prefix: m[1], n: Number(m[2].replace(/,/g, '')), suffix: m[3] }
}

/** The text of a figure counting from `from` to `to` at progress `p`; the
 *  measured strings themselves at the ends. */
export function countText(from: string, to: string, p: number) {
  if (p <= 0) return from
  if (p >= 1) return to
  const a = parseFigure(from)
  const b = parseFigure(to)
  if (!a || !b) return to
  return `${b.prefix}${formatCount(mix(a.n, b.n, p), b.n)}${b.suffix}`
}
