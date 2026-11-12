import { describe, expect, it } from 'vitest'
import { mapClamp, NAME_SETTLE, BIO_OPACITY_RANGE, BIO_BLUR_RANGE } from './hero'

describe('mapClamp', () => {
  it('returns outMin at or before inMin', () => {
    expect(mapClamp(0, 0.2, 0.6, 1, 0)).toBe(1)
    expect(mapClamp(-1, 0.2, 0.6, 1, 0)).toBe(1)
  })

  it('returns outMax at or after inMax', () => {
    expect(mapClamp(0.6, 0.2, 0.6, 1, 0)).toBe(0)
    expect(mapClamp(2, 0.2, 0.6, 1, 0)).toBe(0)
  })

  it('interpolates linearly in between', () => {
    expect(mapClamp(0.4, 0.2, 0.6, 1, 0)).toBeCloseTo(0.5)
    expect(mapClamp(0.4, 0.2, 0.6, 0, 20)).toBeCloseTo(10)
  })
})

describe('hero reveal timing', () => {
  it('starts the intro before the name has finished rising', () => {
    // The two read as one motion: the intro is already coming in while the
    // name settles, and is fully in by the time the name lands.
    expect(BIO_OPACITY_RANGE.start).toBeLessThan(NAME_SETTLE)
    expect(BIO_OPACITY_RANGE.end).toBeLessThanOrEqual(NAME_SETTLE)
  })

  it('sharpens the intro no later than it becomes fully opaque', () => {
    expect(BIO_BLUR_RANGE.end).toBeLessThanOrEqual(BIO_OPACITY_RANGE.end)
  })

  it('keeps the intro hidden at the top and fully shown once settled', () => {
    const opacityAt = (v: number) => mapClamp(v, BIO_OPACITY_RANGE.start, BIO_OPACITY_RANGE.end, 0, 1)
    expect(opacityAt(0)).toBe(0)
    expect(opacityAt(NAME_SETTLE)).toBe(1)
  })
})
