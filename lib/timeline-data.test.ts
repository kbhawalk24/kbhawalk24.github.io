import { describe, expect, it } from 'vitest'
import { ROLES, STATS, TRACKS } from './timeline-data'
import { CASE_STUDIES } from './case-studies'

describe('timeline data integrity', () => {
  it('gives every role at least one entry', () => {
    for (const role of ROLES) {
      expect(role.entries.length, `${role.id} has no entries`).toBeGreaterThan(0)
    }
  })

  it('uses a valid, known track for every entry', () => {
    const validTracks = Object.keys(TRACKS)
    for (const role of ROLES) {
      for (const entry of role.entries) {
        expect(validTracks, `${role.id}: "${entry.headline}"`).toContain(entry.track)
      }
    }
  })

  it('has a unique headline per entry (headlines key the case-study lookup)', () => {
    const headlines = ROLES.flatMap((role) => role.entries.map((e) => e.headline))
    const seen = new Set<string>()
    const duplicates = headlines.filter((h) => (seen.has(h) ? true : (seen.add(h), false)))
    expect(duplicates).toEqual([])
  })

  it('has no orphaned CASE_STUDIES entries — every key must match a real timeline headline', () => {
    const headlines = new Set(ROLES.flatMap((role) => role.entries.map((e) => e.headline)))
    const orphaned = Object.keys(CASE_STUDIES).filter((key) => !headlines.has(key))
    expect(orphaned).toEqual([])
  })

  it('gives every timeline entry a matching case study', () => {
    const missing = ROLES.flatMap((role) =>
      role.entries.filter((entry) => !CASE_STUDIES[entry.headline]).map((e) => e.headline),
    )
    expect(missing).toEqual([])
  })

  it('gives every case study at least one approach step, outcome, and metric', () => {
    for (const [headline, study] of Object.entries(CASE_STUDIES)) {
      expect(study.approach.length, headline).toBeGreaterThan(0)
      expect(study.outcomes.length, headline).toBeGreaterThan(0)
      expect(study.metrics.length, headline).toBeGreaterThan(0)
    }
  })
})

describe('STATS', () => {
  it('has a label for every stat', () => {
    for (const stat of STATS) {
      expect(stat.label.length).toBeGreaterThan(0)
      expect(stat.value.length).toBeGreaterThan(0)
    }
  })
})
