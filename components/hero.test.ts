import { describe, expect, it } from 'vitest'
import {
  mapClamp,
  ILLUSTRATION_FADE_RANGE,
  BIO_OPACITY_RANGE,
  BIO_BLUR_RANGE,
} from './hero'

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

  it('supports ascending output ranges too', () => {
    expect(mapClamp(0.5, 0.4, 0.62, 0, 1)).toBeCloseTo((0.5 - 0.4) / (0.62 - 0.4))
  })
})

describe('hero crossfade timing', () => {
  it('finishes hiding the illustration no later than the bio starts appearing', () => {
    // The illustration must be fully gone (opacity 0) by the scroll position
    // where the bio begins fading in, so the handoff reads as one motion
    // rather than a moment with both elements faded/overlapping.
    expect(ILLUSTRATION_FADE_RANGE.end).toBeLessThanOrEqual(BIO_OPACITY_RANGE.start)
  })

  it('keeps the bio blur-in ahead of (or equal to) the bio opacity fade-in', () => {
    // Sharpness should resolve no later than opacity does, so the text never
    // reads as "faded but sharp" or lags visibly behind full opacity.
    expect(BIO_BLUR_RANGE.end).toBeLessThanOrEqual(BIO_OPACITY_RANGE.end)
  })

  it('starts the bio fade-in no later than the point the name finishes rising (v=0.62)', () => {
    // The name's rise-from-bottom animation completes at v=0.62 (hardcoded
    // in Hero's nameY transform). Starting the bio fade any earlier causes
    // it to render underneath the still-animating name.
    expect(BIO_OPACITY_RANGE.start).toBeLessThanOrEqual(0.62)
  })

  it('produces the expected opacity/blur values at key scroll checkpoints', () => {
    const illustrationOpacityAt = (v: number) =>
      mapClamp(v, ILLUSTRATION_FADE_RANGE.start, ILLUSTRATION_FADE_RANGE.end, 1, 0)
    const bioOpacityAt = (v: number) =>
      mapClamp(v, BIO_OPACITY_RANGE.start, BIO_OPACITY_RANGE.end, 0, 1)

    // At the top of the hero, illustration is fully visible and bio is invisible.
    expect(illustrationOpacityAt(0)).toBe(1)
    expect(bioOpacityAt(0)).toBe(0)

    // Right when the bio starts fading in, the illustration has already
    // finished fading out (the crossfade handoff point).
    expect(illustrationOpacityAt(BIO_OPACITY_RANGE.start)).toBe(0)
    expect(bioOpacityAt(BIO_OPACITY_RANGE.start)).toBe(0)

    // By the end of the bio range, it's fully opaque.
    expect(bioOpacityAt(BIO_OPACITY_RANGE.end)).toBe(1)
  })
})
