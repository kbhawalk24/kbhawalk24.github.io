/**
 * One clock for every impact visualization and the homepage count-up.
 *
 *   0 ─ BEFORE_MS      the "before" state draws in
 *   ─ HOLD_MS          held, so the reader sees the baseline
 *   ─ AFTER_MS         the change animates to the measured "after" value
 *
 * A viz may stagger rows inside the after phase; its own total is still
 * capped by MAX_TOTAL_MS (the brief allows 1.5 to 2.5 s). Nothing loops.
 * The vitest motion check reads these constants and the component sources.
 */
export const BEFORE_MS = 600
export const HOLD_MS = 600
export const AFTER_MS = 1000
export const AFTER_START_MS = BEFORE_MS + HOLD_MS
export const TOTAL_MS = AFTER_START_MS + AFTER_MS
export const MAX_TOTAL_MS = 2500

export const clamp01 = (n: number) => Math.min(1, Math.max(0, n))
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp01(t), 3)

/** Eased progress 0 → 1 of a phase that starts at `start` and lasts `duration`. */
export function phase(elapsed: number, start: number, duration: number) {
  return easeOut((elapsed - start) / duration)
}

/** Linear interpolation on an eased progress value. */
export function mix(from: number, to: number, p: number) {
  return from + (to - from) * p
}

/** Formats a counted number the way the measured figure is written:
 *  thousands with commas, one decimal when the target has one. */
export function formatCount(n: number, target: number) {
  const decimals = Number.isInteger(target) ? 0 : (String(target).split('.')[1]?.length ?? 1)
  const rounded = decimals ? Number(n.toFixed(decimals)) : Math.round(n)
  return rounded.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
}
