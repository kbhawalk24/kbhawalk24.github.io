import { describe, expect, it } from 'vitest'
import { ROLES, TRACKS } from './timeline-data'

describe('timeline data integrity', () => {
  it('gives every role a summary, and entries where it has track work', () => {
    for (const role of ROLES) {
      expect(role.summary.length, `${role.id} has no summary`).toBeGreaterThan(40)
    }
    expect(ROLES.filter((r) => r.entries.length > 0).length).toBeGreaterThanOrEqual(4)
  })

  it('gives every entry a known track, or a tag when the role is outside design', () => {
    for (const role of ROLES) {
      for (const entry of role.entries) {
        if (entry.track) expect(TRACKS[entry.track], `${entry.headline} has unknown track`).toBeDefined()
        else expect(entry.tag, `${entry.headline} has neither track nor tag`).toBeTruthy()
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
    const anchors = new Set(['/#work', '/about#in-public', '/work/agentic-discovery', '/work/search-2', '/work/scaling-platform-design', '/work/catalog-data-map-lineage', '/work/catalog-data-map-lineage#onboarding', '/work/605-tv-analytics'])
    const broken = ROLES.flatMap((role) =>
      role.entries
        .filter((entry) => entry.href && !anchors.has(entry.href))
        .map((entry) => `${entry.headline} → ${entry.href}`),
    )
    expect(broken).toEqual([])
  })
})

describe('timeline impact discipline', () => {
  it('gives every entry at most one impact figure and no em-dashes', () => {
    for (const role of ROLES) {
      for (const entry of role.entries) {
        const text = JSON.stringify(entry)
        expect(text.includes('\u2014'), `${entry.headline} has an em-dash`).toBe(false)
        expect(Array.isArray((entry as unknown as { impact?: unknown }).impact)).toBe(false)
      }
    }
  })
})
