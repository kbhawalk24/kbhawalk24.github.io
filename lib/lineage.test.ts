import { describe, expect, it } from 'vitest'
import { DEFAULT_NODE, EDGES, NODES, STAGES } from './lineage'

describe('career lineage data', () => {
  const ids = new Set(NODES.map((n) => n.id))

  it('has unique node ids and a default that exists', () => {
    expect(ids.size).toBe(NODES.length)
    expect(ids.has(DEFAULT_NODE)).toBe(true)
  })

  it('connects every node and only joins nodes that exist', () => {
    for (const [from, to] of EDGES) {
      expect(ids.has(from), `unknown source ${from}`).toBe(true)
      expect(ids.has(to), `unknown target ${to}`).toBe(true)
    }
    const touched = new Set(EDGES.flat())
    const orphans = NODES.filter((n) => !touched.has(n.id)).map((n) => n.id)
    expect(orphans).toEqual([])
  })

  it('puts every node in a known stage', () => {
    const stages = new Set(STAGES.map((s) => s.id))
    for (const n of NODES) expect(stages.has(n.stage), n.id).toBe(true)
  })

  it('links only to routes that exist', () => {
    const anchors = new Set([
      '/#work',
      '/timeline#at-a-glance',
      '/about',
      '/about#how-i-manage',
      '/work/agentic-discovery',
      '/work/search-2',
      '/work/scaling-platform-design',
      '/work/self-service-onboarding',
      '/work/catalog-data-map-lineage',
      '/work/605-tv-analytics',
    ])
    const broken = NODES.flatMap((n) => n.links.filter((l) => !anchors.has(l.href)).map((l) => `${n.id} → ${l.href}`))
    expect(broken).toEqual([])
  })

  it('uses no em-dashes', () => {
    const text = JSON.stringify(NODES) + JSON.stringify(STAGES)
    expect(text.includes('—')).toBe(false)
  })
})
