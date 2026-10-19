import { describe, expect, it } from 'vitest'
import { ROLES, STATS, TRACKS } from './timeline-data'

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

  it('has a unique headline per entry', () => {
    const headlines = ROLES.flatMap((role) => role.entries.map((e) => e.headline))
    const seen = new Set<string>()
    const duplicates = headlines.filter((h) => (seen.has(h) ? true : (seen.add(h), false)))
    expect(duplicates).toEqual([])
  })

  it('points every entry href at a route that exists', () => {
    // The short case study pages that exist, plus the homepage work section
    // for entries whose page is not built yet.
    const anchors = new Set(['/#work', '/work/agentic-discovery', '/work/search-2', '/work/scaling-platform-design', '/work/self-service-onboarding', '/work/catalog-data-map-lineage', '/work/605-tv-analytics'])
    const broken = ROLES.flatMap((role) =>
      role.entries
        .filter((entry) => entry.href && !anchors.has(entry.href))
        .map((entry) => `${entry.headline} → ${entry.href}`),
    )
    expect(broken).toEqual([])
  })
})
