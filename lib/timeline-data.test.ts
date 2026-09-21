import { describe, expect, it } from 'vitest'
import { ROLES, STATS, TRACKS } from './timeline-data'
import { PAGES } from './site-content'

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

  it('points every entry href at a real page and chapter anchor', () => {
    const anchors = new Set(
      PAGES.flatMap((page) => [page.href, ...page.chapters.map((c) => `${page.href}#${c.id}`)]),
    )
    const broken = ROLES.flatMap((role) =>
      role.entries
        .filter((entry) => entry.href && !anchors.has(entry.href))
        .map((entry) => `${entry.headline} → ${entry.href}`),
    )
    expect(broken).toEqual([])
  })
})

describe('page content integrity', () => {
  it('gives every page a unique slug and at least one chapter', () => {
    const slugs = PAGES.map((p) => p.slug)
    expect(new Set(slugs).size, 'duplicate slugs').toBe(slugs.length)
    for (const page of PAGES) {
      expect(page.chapters.length, `${page.slug} has no chapters`).toBeGreaterThan(0)
    }
  })

  it('gives every chapter a unique id within its page', () => {
    for (const page of PAGES) {
      const ids = page.chapters.map((c) => c.id)
      expect(new Set(ids).size, `${page.slug} has duplicate chapter ids`).toBe(ids.length)
    }
  })

  it('gives every chapter body text', () => {
    for (const page of PAGES) {
      for (const chapter of page.chapters) {
        expect(chapter.body.length, `${page.slug}/${chapter.id}`).toBeGreaterThan(0)
      }
    }
  })

  // Fails loudly once drafting is done: flip a chapter's `draft` to false only
  // when its [DRAFT: …] placeholders are gone.
  it('keeps the draft flag honest — no unflagged [DRAFT: …] placeholders', () => {
    const lying = PAGES.flatMap((page) =>
      page.chapters
        .filter(
          (c) =>
            !c.draft &&
            [...c.body, c.decision?.detail ?? ''].some((t) => t.includes('[DRAFT')),
        )
        .map((c) => `${page.slug}/${c.id}`),
    )
    expect(lying).toEqual([])
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
