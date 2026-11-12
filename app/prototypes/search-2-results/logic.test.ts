import { describe, expect, it } from 'vitest'
import { ASSETS, NOW, type Asset } from './data'
import {
  DEFAULT_FILTERS,
  activeFilterCount,
  compact,
  facetOptions,
  formatDate,
  highlight,
  paginate,
  plural,
  search,
  tabCount,
  tokenize,
  usageLine,
  withinDays,
  type Filters,
} from './logic'

const f = (over: Partial<Filters> = {}): Filters => ({ ...DEFAULT_FILTERS, ...over })
const names = (as: Asset[]) => as.map((a) => a.name)

describe('query', () => {
  it('treats blank and whitespace-only queries as browse-all', () => {
    expect(tokenize('   ')).toEqual([])
    const all = search(ASSETS, '  ', f({ hideTemporary: false, hideDeprecated: false }), 'name')
    expect(all.results).toHaveLength(ASSETS.length)
  })

  it('needs every word, in any order and any case', () => {
    const a = search(ASSETS, 'ACCOUNT mint', f(), 'relevance').results
    const b = search(ASSETS, 'mint account', f(), 'relevance').results
    expect(names(a)).toEqual(names(b))
    expect(names(a)).not.toContain('payroll_runs')
  })

  it('returns nothing, without throwing, for regex characters and nonsense', () => {
    for (const q of ['(', '[a-z]+', '.*', '\\', 'zzzzqx']) {
      expect(search(ASSETS, q, f(), 'relevance').matched).toBe(0)
    }
  })

  it('ranks an exact name match first', () => {
    expect(search(ASSETS, 'customer_account', f(), 'relevance').results[0].name).toBe('customer_account')
  })
})

describe('filters', () => {
  it('hides temporary and deprecated assets by default and reports how many', () => {
    const r = search(ASSETS, 'customer account', f(), 'relevance')
    expect(r.results.some((a) => a.temporary || a.deprecated)).toBe(false)
    expect(r.hidden).toBeGreaterThan(0)
    const shown = search(ASSETS, 'customer account', f({ hideTemporary: false, hideDeprecated: false }), 'relevance')
    expect(shown.results.length).toBe(r.results.length + r.hidden)
  })

  it('Tables and Columns chips narrow by kind, both on equals both off', () => {
    const tables = search(ASSETS, 'mint', f({ tables: true }), 'name').results
    const cols = search(ASSETS, 'mint', f({ columns: true }), 'name').results
    expect(tables.every((a) => a.kind === 'table')).toBe(true)
    expect(cols.every((a) => a.kind === 'column')).toBe(true)
    expect(search(ASSETS, 'mint', f({ tables: true, columns: true }), 'name').results).toHaveLength(
      search(ASSETS, 'mint', f(), 'name').results.length,
    )
  })

  it('Kafka and CDC combine as either-or', () => {
    const r = search(ASSETS, '', f({ kafka: true, cdc: true }), 'name').results
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((a) => a.alsoAs.length > 0)).toBe(true)
  })

  it('domain filter drops assets that have no domain', () => {
    const r = search(ASSETS, '', f({ domains: ['Credit'] }), 'name').results
    expect(names(r)).toEqual(['credit_score_by_account'])
  })

  it('120-day filters use refresh and last-use dates, and never-used counts as not used', () => {
    expect(withinDays('2026-07-12', 120, NOW)).toBe(true)
    expect(withinDays('2026-07-11', 120, NOW)).toBe(false)
    expect(withinDays(null, 120, NOW)).toBe(false)
    expect(withinDays('not a date', 120, NOW)).toBe(false)
    const used = search(ASSETS, '', f({ used120: true }), 'name').results
    expect(names(used)).not.toContain('mint_account_closure_reasons')
  })

  it('maturity picks one level', () => {
    const r = search(ASSETS, '', f({ maturity: 5 }), 'name').results
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((a) => a.maturity === 5)).toBe(true)
  })

  it('can filter down to nothing while the query still matches', () => {
    const r = search(ASSETS, 'mint account', f({ maturity: 0 }), 'name')
    expect(r.results).toHaveLength(0)
    expect(r.matched).toBeGreaterThan(0)
  })

  it('counts active filters against the defaults', () => {
    expect(activeFilterCount(DEFAULT_FILTERS)).toBe(0)
    expect(activeFilterCount(f({ schemas: ['a', 'b'], hideTemporary: false, maturity: 3 }))).toBe(4)
  })

  it('facet options only count assets the query matches', () => {
    const opts = facetOptions(ASSETS, 'payroll', (a) => a.schema)
    expect(opts).toEqual([{ value: 'qbo_payroll_core', count: 1 }])
  })
})

describe('sorting', () => {
  it('sorts by name, usage and refresh date, stably', () => {
    const byName = names(search(ASSETS, '', f(), 'name').results)
    expect(byName).toEqual([...byName].sort((a, b) => a.localeCompare(b)))
    const byDate = search(ASSETS, '', f(), 'updated').results.map((a) => a.updated)
    expect(byDate).toEqual([...byDate].sort().reverse())
  })
})

describe('pagination', () => {
  it('clamps out-of-range and junk pages', () => {
    const items = Array.from({ length: 23 }, (_, i) => i)
    expect(paginate(items, 99)).toMatchObject({ page: 3, pages: 3, from: 21, to: 23 })
    expect(paginate(items, 0).page).toBe(1)
    expect(paginate(items, Number.NaN).page).toBe(1)
    expect(paginate([], 1)).toMatchObject({ page: 1, pages: 1, from: 0, to: 0, items: [] })
    expect(paginate(items.slice(0, 10), 1)).toMatchObject({ pages: 1, from: 1, to: 10 })
  })
})

describe('formatting', () => {
  it('shortens large numbers and marks unknown ones', () => {
    expect(compact(0)).toBe('0')
    expect(compact(999)).toBe('999')
    expect(compact(1200)).toBe('1.2K')
    expect(compact(30_190_000)).toBe('30.19M')
    expect(compact(12_800_000_000)).toBe('12.8B')
    expect(compact(null)).toBe('–')
  })

  it('pluralises and words zero usage', () => {
    expect(plural(1, 'query', 'queries')).toBe('1 query')
    expect(plural(1234, 'query', 'queries')).toBe('1,234 queries')
    expect(usageLine(0, 0)).toBe('No queries yet')
    expect(usageLine(1, 1)).toBe('1 query by 1 user')
  })

  it('caps tab badges and formats dates in UTC', () => {
    expect(tabCount(12)).toBe('12')
    expect(tabCount(1500)).toBe('1K+')
    expect(formatDate('2024-05-17')).toBe('May 17, 2024')
    expect(formatDate('garbage')).toBe('Unknown date')
  })

  it('highlights every occurrence without regex', () => {
    expect(highlight('account_account', ['account'])).toEqual([
      { text: 'account', hit: true },
      { text: '_', hit: false },
      { text: 'account', hit: true },
    ])
    expect(highlight('a.b', ['.'])).toEqual([
      { text: 'a', hit: false },
      { text: '.', hit: true },
      { text: 'b', hit: false },
    ])
    expect(highlight('', ['x'])).toEqual([])
  })
})
