import { describe, expect, it } from 'vitest'
import { ROLES, TRACKS } from './timeline-data'
import { ROUTES } from './routes'
import { CASE_STUDIES } from '@/content/work'

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

  it('points every href at a real route and section id', () => {
    const anchors = new Set<string>(ROUTES)
    for (const study of CASE_STUDIES) {
      const ids = [
        'summary',
        'impact',
        'outcomes',
        'differently',
        'credits',
        study.primer?.id,
        study.problem?.id,
        ...study.decisions.map((s) => s.id),
        ...(study.sections ?? []).map((s) => s.id),
      ].filter(Boolean)
      for (const id of ids) anchors.add(`${study.href}#${id}`)
    }
    const hrefs = ROLES.flatMap((role) => [
      ...(role.caseStudy ? [role.caseStudy.href] : []),
      ...role.entries.flatMap((e) => (e.href ? [e.href] : [])),
    ])
    const broken = hrefs.filter((h) => !anchors.has(h))
    expect(broken).toEqual([])
  })

  it('carries none of the strings the brief removes', () => {
    const text = JSON.stringify(ROLES)
    for (const banned of ['~', 'three designers', '24 launches', '11%', 'Data Copilot', '$20M', 'Sunnyvale', 'engineers and', 'team of']) {
      expect(text, `found "${banned}"`).not.toContain(banned)
    }
  })
})
