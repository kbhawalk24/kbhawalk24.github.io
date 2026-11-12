import { describe, expect, it } from 'vitest'
import { AREAS, INDEX, search } from './search-index'

describe('overdrive search index', () => {
  it('shows the four case cards for an empty query', () => {
    const { results } = search('', {})
    expect(results.map((r) => r.card?.slug)).toEqual(['search-2', 'agentic-discovery', 'catalog-data-map-lineage', '605-tv-analytics'])
  })

  it('finds lineage and 605, and filters by facet', () => {
    expect(search('lineage', {}).results.length).toBeGreaterThan(0)
    const six = search('605', { org: '605' })
    expect(six.results.every((r) => r.org === '605')).toBe(true)
    expect(six.results[0].card?.slug).toBe('605-tv-analytics')
  })

  it('indexes every product area and links every entry with a trailing slash', () => {
    for (const a of AREAS) expect(INDEX.some((i) => i.type === 'Area' && i.title.toLowerCase() === a)).toBe(true)
    for (const i of INDEX) expect(i.href.split('#')[0].endsWith('/')).toBe(true)
  })

  it('has no em-dashes in the indexed copy', () => {
    for (const i of INDEX) expect(`${i.title} ${i.text} ${i.kicker}`).not.toContain('—')
  })
})
