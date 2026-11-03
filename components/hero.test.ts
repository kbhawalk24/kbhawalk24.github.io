import { describe, expect, it } from 'vitest'
import { ABOUT, HERO } from '@/lib/home-content'

const NINE_AREAS =
  'finding and understanding data, access, lineage, health monitoring, reliability, usage tracking, pipeline authoring, publishing and ingestion'

describe('hero copy', () => {
  it('leads with what she designs, not a title', () => {
    expect(HERO.headline.lead).toBe('I design')
    expect(HERO.headline.rest.length).toBeGreaterThan(10)
    expect(HERO.headline.rest).not.toMatch(/manager|principal/i)
  })

  it('keeps the name as the eyebrow', () => {
    expect(HERO.name).toBe('Kanchi Bhawalkar')
  })

  it('has no em dashes anywhere', () => {
    const text = JSON.stringify(HERO) + JSON.stringify(ABOUT)
    expect(text).not.toContain('—')
  })
})

describe('about copy', () => {
  it('names all nine Intuit product areas in full', () => {
    const intuit = ABOUT.history.find((h) => h.org === 'Intuit')
    expect(intuit && 'tail' in intuit ? intuit.tail : '').toContain(NINE_AREAS)
  })

  it('keeps the actual titles in the experience rows', () => {
    const titles = ABOUT.experience.map((r) => r.title)
    expect(titles).toContain('Product Design Manager and principal IC')
    expect(titles).toContain('Principal Product Designer')
    expect(titles).toContain('Senior Product Designer')
    expect(titles).toContain('Product Designer, first design hire')
  })

  it('tags every link with a key for its event', () => {
    for (const l of ABOUT.links) expect(l.key).toMatch(/^[a-z]+$/)
  })
})
