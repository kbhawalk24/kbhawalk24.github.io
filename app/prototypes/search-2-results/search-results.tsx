'use client'

/* eslint-disable @next/next/no-img-element */
import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { ASSETS, OTHER_RESULTS, type Asset, type ColumnAsset, type OtherResult, type OtherTab, type TableAsset } from './data'
import {
  DEFAULT_FILTERS,
  activeFilterCount,
  compact,
  facetOptions,
  formatDate,
  highlight,
  matchesOther,
  paginate,
  plural,
  search,
  tabCount,
  tokenize,
  usageLine,
  type Filters,
  type SortKey,
} from './logic'

// Built from Figma "Search 2.0", node 1990:15917, at its 1440px desktop size,
// and driven by the dummy data in ./data. Fonts: the design uses AvenirNext
// forINTUIT; Avenir Next is the closest face installed on macOS.

const A = '/prototypes/search-2'
const FONT = "'AvenirNext forINTUIT', 'Avenir Next', 'Avenir', system-ui, sans-serif"

const OTHER_TABS: OtherTab[] = ['Data Map', 'CDC Attributes', 'Dashboards', 'ML Models and Features', 'Queries', 'Slack', 'People']
type Tab = 'Overview' | 'Tables' | OtherTab
const TABS: Tab[] = ['Overview', 'Tables', ...OTHER_TABS]

const SORTS: { value: SortKey; label: string }[] = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'popular', label: 'Most used' },
  { value: 'updated', label: 'Recently refreshed' },
  { value: 'name', label: 'Name, A to Z' },
]

const MATURITY = [
  { level: 0, star: 'star-red', color: '#d52b1e', bg: '#f0f4f6' },
  { level: 1, star: 'star-red', color: '#d52b1e', bg: '#f0f4f6' },
  { level: 2, star: 'star-gray', color: '#6b6c72', bg: '#f0f4f6' },
  { level: 3, star: 'star-green', color: '#108000', bg: '#e9ffed' },
  { level: 4, star: 'star-green', color: '#108000', bg: '#e9ffed' },
  { level: 5, star: 'star-green', color: '#108000', bg: '#e9ffed' },
] as const

type Details = { title: string; subtitle: string; description: string | null; fields: [string, string][] }

export function SearchResults() {
  const [draft, setDraft] = useState('mint account')
  const [query, setQuery] = useState('mint account')
  const [tab, setTab] = useState<Tab>('Tables')
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [sort, setSort] = useState<SortKey>('relevance')
  const [details, setDetails] = useState<Details | null>(null)
  const cardRef = useRef<HTMLElement>(null)

  const tokens = useMemo(() => tokenize(query), [query])
  const outcome = useMemo(() => search(ASSETS, query, filters, sort), [query, filters, sort])

  // Tab badges count what the query finds, independent of the sidebar filters.
  const counts = useMemo(() => {
    const c = {} as Record<Tab, number>
    c.Tables = search(ASSETS, query, DEFAULT_FILTERS, 'relevance').results.length
    for (const t of OTHER_TABS) c[t] = OTHER_RESULTS.filter((r) => r.tab === t && matchesOther(r, tokens)).length
    c.Overview = c.Tables + OTHER_TABS.reduce((n, t) => n + c[t], 0)
    return c
  }, [query, tokens])

  // Any change to what is listed sends the list back to page 1.
  const signature = JSON.stringify([query, filters, sort, tab])
  const [pager, setPager] = useState({ signature, page: 1 })
  // Reset during render (not in an effect) so the stale page never paints, and so
  // returning to an earlier filter set does not resurrect its old page.
  if (pager.signature !== signature) setPager({ signature, page: 1 })
  const page = pager.signature === signature ? pager.page : 1
  const goToPage = (p: number) => {
    setPager({ signature, page: p })
    cardRef.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })
  }

  const set = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((f) => ({ ...f, [key]: value }))
  const flip = (key: 'tables' | 'columns' | 'dataMapOnly' | 'kafka' | 'cdc' | 'hideTemporary' | 'hideDeprecated' | 'refreshed120' | 'used120') =>
    setFilters((f) => ({ ...f, [key]: !f[key] }))
  const clearAll = () => setFilters(DEFAULT_FILTERS)

  const submit = (value: string) => {
    const next = value.trim().slice(0, 200)
    setDraft(next)
    setQuery(next)
  }

  const openAsset = (a: Asset) => setDetails(assetDetails(a))
  const openOther = (r: OtherResult) =>
    setDetails({ title: r.title, subtitle: r.subtitle, description: r.description, fields: r.meta.map((m, i) => [i === 0 ? 'Details' : '', m]) })

  return (
    <div className="relative min-h-screen min-w-[1200px] bg-[#eff4f9] text-[#393a3d] antialiased" style={{ fontFamily: FONT }}>
      {/* Global nav / Data Explorer */}
      <header className="relative h-10 w-full bg-[#205ea3]">
        <div className="absolute left-2 top-1/2 flex -translate-y-1/2 items-center gap-4">
          <span className="relative size-9 opacity-80">
            <img src={`${A}/nav-menu.svg`} alt="" width={24} height={24} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          </span>
          <div className="flex items-center gap-2">
            <img src={`${A}/nav-brand.svg`} alt="" width={24} height={24} />
            <p className="text-[18px] font-semibold leading-6 text-white">Data Discovery</p>
          </div>
        </div>

        <form
          role="search"
          onSubmit={(e) => {
            e.preventDefault()
            submit(draft)
          }}
          className="absolute left-[calc(50%-280px)] top-0.5 h-9 w-[400px] rounded-[4px] border border-[#e3e5e8] bg-white focus-within:border-[#0077c5] focus-within:shadow-[0_0_0_1px_#0077c5]"
        >
          <img src={`${A}/search.svg`} alt="" width={24} height={24} className="pointer-events-none absolute left-2 top-[5px]" />
          <input
            type="search"
            aria-label="Search data"
            placeholder="Search tables, columns, dashboards…"
            maxLength={200}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Escape' && draft) {
                e.preventDefault()
                setDraft('')
              }
            }}
            className="absolute left-10 right-9 top-[5px] h-6 bg-transparent text-[16px] font-medium leading-6 text-[#393a3d] outline-none placeholder:text-[#babec5] [&::-webkit-search-cancel-button]:hidden"
          />
          {draft && (
            <button
              type="button"
              aria-label="Clear search"
              onClick={() => submit('')}
              className="absolute right-1.5 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-[4px] hover:bg-[#6b6c72]/10"
            >
              <img src={`${A}/close.svg`} alt="" width={24} height={24} className="size-4" />
            </button>
          )}
        </form>

        <div className="absolute bottom-[20%] right-6 top-[20%] flex items-center gap-4">
          <img src={`${A}/nav-search.svg`} alt="" width={24} height={24} />
          <img src={`${A}/nav-help.svg`} alt="" width={24} height={24} />
          <img src={`${A}/nav-avatar.svg`} alt="" width={24} height={24} />
        </div>
      </header>

      {/* Page heading and results card share one gutter, so their left edges line up. */}
      <div className="px-[60px]">
      <div className="flex h-[63px] items-start pt-[15px]">
        <h1 className="text-[24px] font-semibold leading-8">Search Results</h1>
      </div>

      {/* Results card */}
      <main ref={cardRef} className="relative w-full max-w-[1314px] scroll-mt-4 bg-white px-6 pb-16 pt-4">
        <TabBar tab={tab} counts={counts} onChange={setTab} />

        {tab === 'Tables' && (
          <div className="mt-8 flex gap-10">
            <FilterPanel filters={filters} query={query} set={set} flip={flip} clearAll={clearAll} />
            <section aria-label="Table and column results" className="min-w-0 flex-1">
              <div className="flex h-8 items-center gap-4">
                <Chip on={filters.tables} onClick={() => flip('tables')}>
                  Tables
                </Chip>
                <Chip on={filters.columns} onClick={() => flip('columns')}>
                  Columns
                </Chip>
                <SortSelect value={sort} onChange={setSort} />
              </div>
              <TablesResults
                outcome={outcome}
                query={query}
                tokens={tokens}
                filters={filters}
                page={page}
                onPage={goToPage}
                onOpen={openAsset}
                onShowHidden={() => setFilters((f) => ({ ...f, hideTemporary: false, hideDeprecated: false }))}
                onClearAll={clearAll}
                counts={counts}
                onTab={setTab}
              />
            </section>
          </div>
        )}

        {tab === 'Overview' && (
          <Overview query={query} tokens={tokens} counts={counts} onTab={setTab} onOpenAsset={openAsset} onOpenOther={openOther} />
        )}

        {tab !== 'Tables' && tab !== 'Overview' && (
          <OtherResults
            tab={tab}
            query={query}
            tokens={tokens}
            page={page}
            onPage={goToPage}
            onOpen={openOther}
            counts={counts}
            onTab={setTab}
          />
        )}
      </main>
      </div>
      <div className="h-[60px]" />

      {details && <DetailsDialog details={details} onClose={() => setDetails(null)} />}
    </div>
  )
}

/* ---------- Tabs ---------- */

function TabBar({ tab, counts, onChange }: { tab: Tab; counts: Record<Tab, number>; onChange: (t: Tab) => void }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: KeyboardEvent, i: number) => {
    const next = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : e.key === 'Home' ? 0 : e.key === 'End' ? TABS.length - 1 : null
    if (next === null) return
    e.preventDefault()
    const j = (next + TABS.length) % TABS.length
    onChange(TABS[j])
    refs.current[j]?.focus()
  }
  return (
    <div
      role="tablist"
      aria-label="Result types"
      className="relative flex h-9 w-full items-start overflow-x-auto overflow-y-hidden shadow-[inset_0_-2px_0_#e3e5e8] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {TABS.map((t, i) => {
        const active = t === tab
        const n = counts[t]
        return (
          <button
            key={t}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="tab"
            aria-selected={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(t)}
            onKeyDown={(e) => onKey(e, i)}
            className="group relative flex shrink-0 flex-col items-stretch rounded-[4px] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#0077c5]"
          >
            <span className="flex items-center gap-2 px-4 py-1">
              <span className={`text-[16px] font-medium leading-6 ${active ? 'text-[#393a3d]' : 'text-[#6b6c72] group-hover:text-[#393a3d]'}`}>{t}</span>
              <span
                className={`flex h-4 items-center rounded-[4px] px-1 text-[12px] font-semibold uppercase leading-4 ${
                  t === 'Overview' || n === 0 ? 'bg-[#e7e7e7] text-[#393a3d]' : 'bg-[#e0edff] text-[#3c4348]'
                }`}
                aria-label={plural(n, 'result')}
              >
                {tabCount(n)}
              </span>
            </span>
            <span className={`h-1 w-full ${active ? 'bg-[#0077c5]' : 'bg-transparent group-hover:bg-[#e3e5e8]'}`} />
          </button>
        )
      })}
    </div>
  )
}

/* ---------- Filters ---------- */

type FlipKey = 'tables' | 'columns' | 'dataMapOnly' | 'kafka' | 'cdc' | 'hideTemporary' | 'hideDeprecated' | 'refreshed120' | 'used120'

function FilterPanel({
  filters: f,
  query,
  set,
  flip,
  clearAll,
}: {
  filters: Filters
  query: string
  set: <K extends keyof Filters>(key: K, value: Filters[K]) => void
  flip: (key: FlipKey) => void
  clearAll: () => void
}) {
  const [open, setOpen] = useState({ usage: true, schema: true, domains: true })
  const active = activeFilterCount(f)
  const schemas = useMemo(() => facetOptions(ASSETS, query, (a) => a.schema), [query])
  const domains = useMemo(() => facetOptions(ASSETS, query, (a) => a.domain), [query])
  const hiddenOff = !f.hideTemporary && !f.hideDeprecated

  return (
    <aside aria-label="Filters" className="relative flex w-[233px] shrink-0 flex-col items-start gap-4">
      <div className="flex w-full items-center justify-between pb-4 pt-1 shadow-[inset_0_-1px_0_#c3ced5]">
        <p className="text-[16px] font-semibold leading-6 text-[#21262a]">Filters</p>
        {active > 0 && (
          <button type="button" onClick={clearAll} className="rounded-[4px] text-[14px] font-semibold leading-6 text-[#0077c5] hover:underline">
            Clear all ({active})
          </button>
        )}
      </div>
      <Checkbox checked={f.dataMapOnly} onChange={() => flip('dataMapOnly')} label="Only show tables in data map" />
      <Rule src="line-180" />
      <p className="text-[16px] font-medium leading-6 text-[#393a3d]">Data also available as</p>
      <Checkbox checked={f.kafka} onChange={() => flip('kafka')} label="Kafka topics" />
      <Checkbox checked={f.cdc} onChange={() => flip('cdc')} label="CDC" />
      <Rule src="line-180" />
      <div className="flex h-6 w-full items-center justify-between">
        <p className="text-[16px] font-medium leading-6 text-[#393a3d]">Hidden Results</p>
        <button
          type="button"
          disabled={hiddenOff}
          onClick={() => {
            set('hideTemporary', false)
            set('hideDeprecated', false)
          }}
          className="text-right text-[16px] font-semibold leading-6 text-[#0077c5] hover:underline disabled:cursor-default disabled:text-[#babec5] disabled:no-underline"
        >
          Clear
        </button>
      </div>
      <Checkbox checked={f.hideTemporary} onChange={() => flip('hideTemporary')} label="Hide temporary data" />
      <Checkbox checked={f.hideDeprecated} onChange={() => flip('hideDeprecated')} label="Hide deprecated data" />
      <Rule src="line-180" />

      <SectionHeading open={open.usage} onToggle={() => setOpen((o) => ({ ...o, usage: !o.usage }))} controls="filter-usage">
        Usage
      </SectionHeading>
      {open.usage && (
        <div id="filter-usage" className="flex w-full flex-col gap-4">
          <Checkbox checked={f.refreshed120} onChange={() => flip('refreshed120')} label="Only show tables refreshed in last 120 days" />
          <Checkbox checked={f.used120} onChange={() => flip('used120')} label="Only show tables used in last 120 days" />
        </div>
      )}
      <Rule src="line-177" />

      <SectionHeading open={open.schema} onToggle={() => setOpen((o) => ({ ...o, schema: !o.schema }))} controls="filter-schema">
        Schema
      </SectionHeading>
      {open.schema && (
        <FacetList
          id="filter-schema"
          label="schemas"
          options={schemas}
          selected={f.schemas}
          onChange={(v) => set('schemas', v)}
        />
      )}
      <Rule src="line-178" />

      <SectionHeading open={open.domains} onToggle={() => setOpen((o) => ({ ...o, domains: !o.domains }))} controls="filter-domains">
        Datamap Domains
      </SectionHeading>
      {open.domains && (
        <FacetList
          id="filter-domains"
          label="domains"
          options={domains}
          selected={f.domains}
          onChange={(v) => set('domains', v)}
        />
      )}
      <Rule src="line-178" />

      <p id="maturity-label" className="text-[16px] font-medium leading-6 text-[#393a3d]">
        Data Maturity
      </p>
      <MaturityControl value={f.maturity} onChange={(v) => set('maturity', v)} />
    </aside>
  )
}

function Checkbox({
  checked,
  onChange,
  label,
  suffix,
  truncate = false,
}: {
  checked: boolean
  onChange: () => void
  label: string
  suffix?: ReactNode
  truncate?: boolean
}) {
  // One size everywhere: a 20px box at the column edge, the label 8px after it,
  // and the box level with the first line when a label wraps.
  return (
    <label className="group flex min-h-6 w-full cursor-pointer items-start gap-2 py-0.5">
      <span className="relative size-5 shrink-0">
        <input type="checkbox" checked={checked} onChange={onChange} className="peer absolute inset-0 m-0 cursor-pointer opacity-0" />
        <span
          className={`pointer-events-none absolute inset-0 rounded-[4px] border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#0077c5] ${
            checked ? 'border-[#0077c5] bg-[#0077c5]' : 'border-[#8d9096] bg-white group-hover:border-[#0077c5]'
          }`}
        >
          {checked && <img src={`${A}/check.svg`} alt="" width={20} height={20} className="absolute -left-px -top-px" />}
        </span>
      </span>
      <span
        title={truncate ? label : undefined}
        className={`min-w-px flex-1 text-[14px] leading-5 text-[#21262a] ${truncate ? 'truncate' : 'break-words'}`}
      >
        {label}
      </span>
      {suffix}
    </label>
  )
}

function Rule({ src }: { src: 'line-177' | 'line-178' | 'line-180' }) {
  // Zero-height in the layout, as in Figma: the 1px stroke sits just above.
  return (
    <div className="relative h-0 w-full shrink-0 overflow-visible">
      <img src={`${A}/${src}.svg`} alt="" width={233} height={1} className="absolute -top-px left-0 block" />
    </div>
  )
}

function SectionHeading({ open, onToggle, controls, children }: { open: boolean; onToggle: () => void; controls: string; children: ReactNode }) {
  return (
    <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={controls} className="flex h-6 items-center gap-1 rounded-[4px] hover:text-[#0077c5]">
      <span className="text-[16px] font-medium leading-6">{children}</span>
      <img
        src={`${A}/caret-down.svg`}
        alt=""
        width={24}
        height={24}
        className={`transition-transform duration-150 ${open ? '' : '-rotate-90'}`}
      />
    </button>
  )
}

const FACET_LIMIT = 4

function FacetList({
  id,
  label,
  options,
  selected,
  onChange,
}: {
  id: string
  label: string
  options: { value: string; count: number }[]
  selected: string[]
  onChange: (v: string[]) => void
}) {
  const [filter, setFilter] = useState('')
  const [expanded, setExpanded] = useState(false)
  const needle = filter.trim().toLowerCase()
  // Selected values stay listed even when the query no longer matches them, so they can be unticked.
  const all = [...options, ...selected.filter((s) => !options.some((o) => o.value === s)).map((value) => ({ value, count: 0 }))]
  const matching = needle ? all.filter((o) => o.value.toLowerCase().includes(needle)) : all
  const shown = expanded || needle ? matching : matching.slice(0, FACET_LIMIT)
  const toggle = (v: string) => onChange(selected.includes(v) ? selected.filter((s) => s !== v) : [...selected, v])

  return (
    <div id={id} className="flex w-full flex-col gap-3">
      <label className="relative block h-9 w-full shrink-0 rounded-[4px] border border-[#8d9096] bg-white focus-within:border-[#0077c5] focus-within:shadow-[0_0_0_1px_#0077c5]">
        <img src={`${A}/filter-search.svg`} alt="" width={24} height={24} className="absolute left-[7px] top-[5px]" />
        <span className="sr-only">Search {label}</span>
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          onKeyDown={(e) => e.key === 'Escape' && setFilter('')}
          placeholder="Search..."
          className="absolute left-[39px] right-2 top-[5px] h-6 bg-transparent text-[16px] font-medium leading-6 text-[#393a3d] outline-none placeholder:text-[#babec5]"
        />
      </label>
      {shown.length > 0 ? (
        <div className="flex w-full flex-col gap-1">
          {shown.map((o) => (
            <Checkbox
              key={o.value}
              checked={selected.includes(o.value)}
              onChange={() => toggle(o.value)}
              label={o.value}
              truncate
              suffix={<span className="min-w-6 shrink-0 text-right text-[12px] tabular-nums leading-5 text-[#6b6c72]">{o.count}</span>}
            />
          ))}
        </div>
      ) : (
        <p className="text-[14px] leading-5 text-[#6b6c72]">
          {all.length === 0 ? `No ${label} for this search.` : `No ${label} match “${filter.trim()}”.`}
        </p>
      )}
      {!needle && matching.length > FACET_LIMIT && (
        <button type="button" onClick={() => setExpanded((x) => !x)} className="self-start text-[14px] font-semibold leading-5 text-[#0077c5] hover:underline">
          {expanded ? 'Show fewer' : `Show ${matching.length - FACET_LIMIT} more`}
        </button>
      )}
    </div>
  )
}

function MaturityControl({ value, onChange }: { value: Filters['maturity']; onChange: (v: Filters['maturity']) => void }) {
  const values: Filters['maturity'][] = ['All', 0, 1, 2, 3, 4, 5]
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const onKey = (e: KeyboardEvent, i: number) => {
    const d = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0
    if (!d) return
    e.preventDefault()
    const j = (i + d + values.length) % values.length
    onChange(values[j])
    refs.current[j]?.focus()
  }
  return (
    <div role="radiogroup" aria-labelledby="maturity-label" className="isolate flex h-6 w-full items-start bg-white">
      {values.map((v, i) => {
        const active = value === v
        const m = v === 'All' ? null : MATURITY[v]
        const position = i === 0 ? 'start' : i === values.length - 1 ? 'end' : 'middle'
        const shape = position === 'start' ? 'rounded-l-[4px] border' : position === 'end' ? 'rounded-r-[4px] border' : 'border-b border-l border-t'
        return (
          <button
            key={String(v)}
            ref={(el) => {
              refs.current[i] = el
            }}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={v === 'All' ? 'All maturity levels' : `Maturity ${v} stars`}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(v)}
            onKeyDown={(e) => onKey(e, i)}
            className={`relative flex h-6 min-w-0 flex-1 items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0077c5] ${shape} ${
              position === 'end' ? '' : 'mr-[-2px]'
            } ${active ? 'border border-[#00828d] bg-[#e1f9ff]' : 'border-[#c3ced5] hover:bg-[#f4f5f8]'}`}
            style={{ zIndex: active ? 8 : 7 - i }}
          >
            {m ? (
              <span className="flex shrink-0 items-center gap-1 rounded-full px-1" style={{ background: m.bg }}>
                <img src={`${A}/${m.star}.svg`} alt="" width={10} height={10} />
                <span className="text-[12px] font-semibold leading-4" style={{ color: m.color }}>
                  {m.level}
                </span>
              </span>
            ) : (
              <span className={`text-[12px] font-semibold leading-4 ${active ? 'text-[#00828d]' : 'text-[#393a3d]'}`}>All</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`flex h-8 shrink-0 items-center rounded-[20px] px-3 py-1.5 text-[14px] leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0077c5] ${
        on ? 'bg-[#0077c5] text-white hover:bg-[#00589c]' : 'bg-[#e3e5e8] text-[#393a3d] hover:bg-[#d4d7dc]'
      }`}
    >
      {children}
    </button>
  )
}

function SortSelect({ value, onChange }: { value: SortKey; onChange: (v: SortKey) => void }) {
  return (
    <label className="ml-auto flex h-9 w-[255px] shrink-0 items-center gap-2 overflow-clip rounded-[4px] border border-[#8d9096] bg-white px-2 py-[5px] focus-within:border-[#0077c5] focus-within:shadow-[0_0_0_1px_#0077c5] hover:border-[#393a3d]">
      <span className="sr-only">Sort results</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortKey)}
        className="h-[21px] flex-1 cursor-pointer appearance-none bg-transparent text-[16px] font-medium leading-[1.3] text-[#393a3d] outline-none"
      >
        {SORTS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.value === 'relevance' ? 'Sort By' : `Sort By: ${s.label}`}
          </option>
        ))}
      </select>
      <img src={`${A}/chevron-down.svg`} alt="" width={24} height={24} className="pointer-events-none" />
    </label>
  )
}

/* ---------- Tables tab results ---------- */

function TablesResults({
  outcome,
  query,
  tokens,
  filters,
  page,
  onPage,
  onOpen,
  onShowHidden,
  onClearAll,
  counts,
  onTab,
}: {
  outcome: ReturnType<typeof search>
  query: string
  tokens: string[]
  filters: Filters
  page: number
  onPage: (p: number) => void
  onOpen: (a: Asset) => void
  onShowHidden: () => void
  onClearAll: () => void
  counts: Record<Tab, number>
  onTab: (t: Tab) => void
}) {
  const { results, matched, hidden } = outcome
  const view = paginate(results, page)

  if (matched === 0) return <NoMatches query={query} counts={counts} onTab={onTab} />

  if (results.length === 0) {
    return (
      <EmptyState title="No results match these filters">
        <p>
          {plural(matched, 'table or column', 'tables and columns')} match “{query}”, but none pass the filters you have set.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          {hidden > 0 && <SecondaryButton onClick={onShowHidden}>Show {plural(hidden, 'hidden result')}</SecondaryButton>}
          {activeFilterCount(filters) > 0 && <PrimaryButton onClick={onClearAll}>Clear all filters</PrimaryButton>}
        </div>
      </EmptyState>
    )
  }

  return (
    <>
      <div className="mt-6">
        {view.items.map((a) =>
          a.kind === 'table' ? <TableRow key={a.id} a={a} tokens={tokens} onOpen={onOpen} /> : <ColumnRow key={a.id} a={a} tokens={tokens} onOpen={onOpen} />,
        )}
      </div>
      {hidden > 0 && (
        <p className="mt-4 text-[14px] leading-5 text-[#6b6c72]">
          {plural(hidden, 'temporary or deprecated result is', 'temporary or deprecated results are')} hidden.{' '}
          <button type="button" onClick={onShowHidden} className="font-semibold text-[#0077c5] hover:underline">
            Show them
          </button>
        </p>
      )}
      <Pagination view={view} total={results.length} onPage={onPage} />
    </>
  )
}

function Pagination({ view, total, onPage }: { view: ReturnType<typeof paginate<unknown>>; total: number; onPage: (p: number) => void }) {
  return (
    <nav aria-label="Pagination" className="mt-6 flex items-center justify-between">
      <p className="text-[14px] leading-5 text-[#6b6c72]">
        Showing {view.from}–{view.to} of {plural(total, 'result')}
      </p>
      {view.pages > 1 && (
        <div className="flex items-center gap-1">
          <PageButton disabled={view.page === 1} onClick={() => onPage(view.page - 1)} label="Previous page">
            <img src={`${A}/chevron-down.svg`} alt="" width={24} height={24} className="size-5 rotate-90" />
          </PageButton>
          {Array.from({ length: view.pages }, (_, i) => i + 1).map((p) => (
            <PageButton key={p} current={p === view.page} onClick={() => onPage(p)} label={`Page ${p}`}>
              {p}
            </PageButton>
          ))}
          <PageButton disabled={view.page === view.pages} onClick={() => onPage(view.page + 1)} label="Next page">
            <img src={`${A}/chevron-down.svg`} alt="" width={24} height={24} className="size-5 -rotate-90" />
          </PageButton>
        </div>
      )}
    </nav>
  )
}

function PageButton({
  children,
  onClick,
  label,
  disabled,
  current,
}: {
  children: ReactNode
  onClick: () => void
  label: string
  disabled?: boolean
  current?: boolean
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      disabled={disabled || current}
      onClick={onClick}
      className={`flex size-8 items-center justify-center rounded-[4px] text-[14px] font-semibold leading-5 ${
        current ? 'bg-[#0077c5] text-white' : 'text-[#393a3d] hover:bg-[#eff4f9] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent'
      }`}
    >
      {children}
    </button>
  )
}

/* ---------- Rows ---------- */

// Every row type shares these three columns, so icons, titles and the right-hand
// usage column line up from row to row and across tabs.
function RowShell({ icon, children, aside }: { icon: ReactNode; children: ReactNode; aside?: ReactNode }) {
  return (
    <article className="flex w-full items-start gap-4 border-b border-[#c3ced5] px-1 py-3 transition-colors hover:bg-[#f9fbfd]">
      <div className="flex w-12 shrink-0 justify-center">{icon}</div>
      <div className="min-w-0 flex-1">{children}</div>
      {aside && <div className="flex w-[242px] shrink-0 flex-col items-start gap-2">{aside}</div>}
    </article>
  )
}

function TypeIcon({ src, label }: { src?: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      {src && (
        <span className="flex size-5 items-center justify-center">
          <img src={src} alt="" width={20} height={20} className="size-5" />
        </span>
      )}
      <p className={`whitespace-nowrap text-[10px] font-semibold uppercase leading-4 text-[#859299] ${src ? "" : "mt-0.5"}`}>{label}</p>
    </div>
  )
}

function Highlighted({ text, tokens }: { text: string; tokens: string[] }) {
  return (
    <>
      {highlight(text, tokens).map((p, i) =>
        p.hit ? (
          <mark key={i} className="rounded-[2px] bg-[#fff3c4] text-inherit">
            {p.text}
          </mark>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </>
  )
}

function TitleButton({ onClick, title, children }: { onClick: () => void; title: string; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="block min-w-0 max-w-full truncate text-left text-[14px] font-semibold leading-5 text-[#2b77cc] hover:underline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0077c5]"
    >
      {children}
    </button>
  )
}

function StatusBadges({ a }: { a: Asset }) {
  return (
    <>
      {a.temporary && (
        <Badge bg="#fff4e0" color="#8a5a00">
          Temporary
        </Badge>
      )}
      {a.deprecated && (
        <Badge bg="#fdecea" color="#b0261b">
          Deprecated
        </Badge>
      )}
    </>
  )
}

function Description({ text, tokens }: { text: string | null; tokens: string[] }) {
  return text ? (
    <p className="line-clamp-2 text-[12px] leading-4 text-[#181c1f]" title={text}>
      <Highlighted text={text} tokens={tokens} />
    </p>
  ) : (
    <p className="text-[12px] italic leading-4 text-[#859299]">No description yet.</p>
  )
}

function Dot() {
  return (
    <span aria-hidden className="shrink-0 text-[12px] leading-4 text-[#393a3d]">
      ・
    </span>
  )
}

function Curation({ a }: { a: Asset }) {
  return (
    <>
      <span className="flex items-center gap-1">
        <img src={`${A}/person-tie.svg`} alt="" width={16} height={16} className="size-4" />
        <span className="text-[12px] leading-4 text-[#3492ef]">{a.owner}</span>
      </span>
      <Dot />
      <span className="flex items-center gap-1" title={`Refreshed ${formatDate(a.updated)}`}>
        <img src={`${A}/refresh.svg`} alt="Refreshed" width={16} height={16} />
        <span className="text-[12px] leading-4 text-[#6b6c72]">{formatDate(a.updated)}</span>
      </span>
    </>
  )
}

function Lineage({ entities, items }: { entities: number; items: { src: string; n: number; label: string }[] }) {
  return (
    <span className="flex items-center gap-1 text-[#393a3d]" title="Lineage">
      <span className="flex items-center gap-1" title={plural(entities, 'related entity', 'related entities')}>
        <span className="relative size-4 overflow-clip">
          <img src={`${A}/entities.svg`} alt="" width={13.3333} height={13.3333} className="absolute left-[8.33%] top-[8.33%]" />
        </span>
        <span className="text-[12px] leading-4 tabular-nums">{compact(entities)}</span>
      </span>
      <span aria-hidden className="text-[14px] leading-4">
        (
      </span>
      {items.map((it) => (
        <span key={it.src} className="flex items-center gap-1" title={plural(it.n, it.label)}>
          <img src={`${A}/${it.src}.svg`} alt="" width={16} height={16} />
          <span className="text-[12px] leading-4 tabular-nums">{compact(it.n)}</span>
        </span>
      ))}
      <span aria-hidden className="text-[14px] leading-4">
        )
      </span>
    </span>
  )
}

function Badge({ bg, color, children }: { bg: string; color: string; children: ReactNode }) {
  return (
    <span
      className="flex h-4 shrink-0 items-center justify-center gap-1 whitespace-nowrap rounded-[4px] px-1 text-[12px] font-semibold uppercase leading-4"
      style={{ background: bg, color }}
    >
      {children}
    </span>
  )
}

// Title line, location line, description and footer, with the same spacing in every row type.
function RowBody({ title, location, description, footer }: { title: ReactNode; location: ReactNode; description: ReactNode; footer?: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex h-5 min-w-0 items-center gap-2">{title}</div>
      <p className="flex min-w-0 items-center gap-1 whitespace-nowrap text-[12px] leading-4 text-[#6b6c72]">{location}</p>
      <div className="mt-1">{description}</div>
      {footer && <div className="mt-2 flex min-h-4 flex-wrap items-center gap-x-1 gap-y-1 whitespace-nowrap text-[12px] leading-4">{footer}</div>}
    </div>
  )
}

function TableRow({ a, tokens, onOpen }: { a: TableAsset; tokens: string[]; onOpen: (a: Asset) => void }) {
  return (
    <RowShell
      icon={<TypeIcon src={`${A}/icon-table.svg`} label={a.objectType === 'VIEW' ? 'view' : 'table'} />}
      aside={
        <>
          <p className="text-[12px] leading-5 text-[#393a3d]">{usageLine(a.queries, a.users)}</p>
          <span className="flex flex-wrap items-center gap-1">
            {a.objectType === 'VIEW' ? (
              <Badge bg="#f4f9ff" color="#205ea3">
                <img src={`${A}/eye.svg`} alt="" width={12} height={12} />
                VIEW
              </Badge>
            ) : (
              <Badge bg="#f4f9ff" color="#205ea3">
                TABLE
              </Badge>
            )}
            <Badge bg="#f0f4f6" color="#5d686f">
              {a.objectId}
            </Badge>
            <Badge bg="#f0f4f6" color="#5d686f">
              {a.classification}
            </Badge>
          </span>
        </>
      }
    >
      <RowBody
        title={
          <>
            <TitleButton onClick={() => onOpen(a)} title={a.name}>
              <Highlighted text={a.name} tokens={tokens} />
            </TitleButton>
            <StatusBadges a={a} />
          </>
        }
        location={
          <>
            <span>{a.store}</span>
            <span>/</span>
            <span className="truncate">{a.schema}</span>
          </>
        }
        description={<Description text={a.description} tokens={tokens} />}
        footer={
          <>
            <Curation a={a} />
            <Dot />
            <span className="flex items-center gap-2 text-[#6b6c72]">
              <span>{plural(a.columns, 'Column')}</span>
              <span>{a.rows === null ? 'Rows unknown' : `${compact(a.rows)} Rows`}</span>
              {a.health && (
                // 17px icon on a 16px line: centred without making the row taller.
                <span className="flex h-4 items-center">
                  <img
                    src={`${A}/health-donut.svg`}
                    alt={`Health score ${a.health.score} of 100`}
                    title={`Health score ${a.health.score} of 100`}
                    width={18}
                    height={17}
                    className="max-w-none"
                  />
                </span>
              )}
            </span>
            {a.lineage && (
              <span className="ml-auto pl-4">
                <Lineage
                  entities={a.lineage.entities}
                  items={[
                    { src: 'subtask', n: a.lineage.upstream, label: 'upstream source' },
                    { src: 'table-16', n: a.lineage.tables, label: 'downstream table' },
                    { src: 'grid-tile', n: a.lineage.dashboards, label: 'dashboard' },
                  ]}
                />
              </span>
            )}
          </>
        }
      />
    </RowShell>
  )
}

function ColumnRow({ a, tokens, onOpen }: { a: ColumnAsset; tokens: string[]; onOpen: (a: Asset) => void }) {
  return (
    <RowShell
      icon={<TypeIcon src={`${A}/type-decimal.svg`} label={a.dataType} />}
      aside={
        <>
          <p className="text-[12px] leading-5 text-[#393a3d]">{a.joins === 0 ? 'No joins yet' : plural(a.joins, 'join')}</p>
          {a.alsoAs.includes('cdc') && (
            <Badge bg="#e0edff" color="#205ea3">
              CDC
            </Badge>
          )}
        </>
      }
    >
      <RowBody
        title={
          <>
            <TitleButton onClick={() => onOpen(a)} title={`${a.table}.${a.name}`}>
              <span className="text-[#9aa7b0]">
                <Highlighted text={a.table} tokens={tokens} />
              </span>
              .<Highlighted text={a.name} tokens={tokens} />
            </TitleButton>
            <StatusBadges a={a} />
          </>
        }
        location={
          <>
            <span>{a.store}</span>
            <span>/</span>
            <span className="truncate">{a.schema}</span>
            <span>/</span>
            <span className="flex shrink-0 items-center gap-0.5">
              <img src={`${A}/table-12.svg`} alt="" width={12} height={12} />
              <span>{a.table}</span>
            </span>
          </>
        }
        description={<Description text={a.description} tokens={tokens} />}
        footer={
          <>
            <Curation a={a} />
            <Dot />
            {a.profile === null ? (
              <span className="text-[#6b6c72]">Not profiled</span>
            ) : (
              <span className="flex items-center gap-1">
                <span className="text-[#393a3d]">Data Profile</span>
                <span
                  className="flex h-2 overflow-clip rounded-[1px]"
                  role="img"
                  aria-label={`${Math.round(a.profile * 100)}% profiled`}
                  title={`${Math.round(a.profile * 100)}% profiled`}
                >
                  <span className="h-2 bg-[#2b77cc]" style={{ width: Math.round(45 * a.profile) }} />
                  <span className="h-2 bg-[#babec5]" style={{ width: 45 - Math.round(45 * a.profile) }} />
                </span>
              </span>
            )}
            {a.lineage && (
              <span className="ml-auto pl-4">
                <Lineage
                  entities={a.lineage.entities}
                  items={[
                    { src: 'subtask', n: a.lineage.upstream, label: 'upstream source' },
                    { src: 'table-16', n: a.lineage.tables, label: 'downstream table' },
                  ]}
                />
              </span>
            )}
          </>
        }
      />
    </RowShell>
  )
}

function OtherRow({ r, tokens, onOpen }: { r: OtherResult; tokens: string[]; onOpen: (r: OtherResult) => void }) {
  return (
    <RowShell icon={<TypeIcon label={shortType(r.tab)} />}>
      <RowBody
        title={
          <TitleButton onClick={() => onOpen(r)} title={r.title}>
            <Highlighted text={r.title} tokens={tokens} />
          </TitleButton>
        }
        location={<span className="truncate">{r.subtitle}</span>}
        description={
          <p className="line-clamp-2 text-[12px] leading-4 text-[#181c1f]">
            <Highlighted text={r.description} tokens={tokens} />
          </p>
        }
        footer={
          r.meta.length > 0 ? (
            <span className="flex items-center gap-1 text-[#6b6c72]">
              {r.meta.map((m, i) => (
                <span key={m} className="flex items-center gap-1">
                  {i > 0 && <Dot />}
                  {m}
                </span>
              ))}
            </span>
          ) : undefined
        }
      />
    </RowShell>
  )
}

function shortType(tab: OtherTab): string {
  return { 'Data Map': 'entity', 'CDC Attributes': 'cdc', Dashboards: 'dash', 'ML Models and Features': 'ml', Queries: 'sql', Slack: 'slack', People: 'person' }[tab]
}

/* ---------- Other tabs and overview ---------- */

function OtherResults({
  tab,
  query,
  tokens,
  page,
  onPage,
  onOpen,
  counts,
  onTab,
}: {
  tab: OtherTab
  query: string
  tokens: string[]
  page: number
  onPage: (p: number) => void
  onOpen: (r: OtherResult) => void
  counts: Record<Tab, number>
  onTab: (t: Tab) => void
}) {
  const results = OTHER_RESULTS.filter((r) => r.tab === tab && matchesOther(r, tokens))
  const view = paginate(results, page)
  if (results.length === 0) return <NoMatches query={query} counts={counts} onTab={onTab} where={tab} />
  return (
    <section aria-label={`${tab} results`} className="mt-6">
      {view.items.map((r) => (
        <OtherRow key={r.id} r={r} tokens={tokens} onOpen={onOpen} />
      ))}
      <Pagination view={view} total={results.length} onPage={onPage} />
    </section>
  )
}

function Overview({
  query,
  tokens,
  counts,
  onTab,
  onOpenAsset,
  onOpenOther,
}: {
  query: string
  tokens: string[]
  counts: Record<Tab, number>
  onTab: (t: Tab) => void
  onOpenAsset: (a: Asset) => void
  onOpenOther: (r: OtherResult) => void
}) {
  if (counts.Overview === 0) return <NoMatches query={query} counts={counts} onTab={onTab} />
  const tables = search(ASSETS, query, DEFAULT_FILTERS, 'relevance').results.slice(0, 3)
  return (
    <div className="mt-6 flex flex-col gap-8">
      {counts.Tables > 0 && (
        <OverviewSection title="Tables" count={counts.Tables} onViewAll={() => onTab('Tables')}>
          {tables.map((a) =>
            a.kind === 'table' ? <TableRow key={a.id} a={a} tokens={tokens} onOpen={onOpenAsset} /> : <ColumnRow key={a.id} a={a} tokens={tokens} onOpen={onOpenAsset} />,
          )}
        </OverviewSection>
      )}
      {OTHER_TABS.filter((t) => counts[t] > 0).map((t) => (
        <OverviewSection key={t} title={t} count={counts[t]} onViewAll={() => onTab(t)}>
          {OTHER_RESULTS.filter((r) => r.tab === t && matchesOther(r, tokens))
            .slice(0, 3)
            .map((r) => (
              <OtherRow key={r.id} r={r} tokens={tokens} onOpen={onOpenOther} />
            ))}
        </OverviewSection>
      ))}
    </div>
  )
}

function OverviewSection({ title, count, onViewAll, children }: { title: string; count: number; onViewAll: () => void; children: ReactNode }) {
  return (
    <section aria-label={title}>
      <div className="flex items-center justify-between border-b border-[#c3ced5] pb-2">
        <h2 className="text-[16px] font-semibold leading-6 text-[#21262a]">
          {title} <span className="text-[14px] font-medium text-[#6b6c72]">({count})</span>
        </h2>
        {count > 3 && (
          <button type="button" onClick={onViewAll} className="text-[14px] font-semibold leading-6 text-[#0077c5] hover:underline">
            View all
          </button>
        )}
      </div>
      {children}
    </section>
  )
}

/* ---------- Empty states ---------- */

function NoMatches({ query, counts, onTab, where }: { query: string; counts: Record<Tab, number>; onTab: (t: Tab) => void; where?: string }) {
  const elsewhere = (['Tables', ...OTHER_TABS] as Tab[]).filter((t) => t !== where && counts[t] > 0)
  return (
    <EmptyState title={
        query
          ? `No results${where ? ` in ${where}` : ''} for “${query}”`
          : `Nothing${where ? ` in ${where}` : ''} to show yet`
      }>
      {query && <p>Check the spelling, try fewer words, or search for a table or column name.</p>}
      {elsewhere.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <span className="w-full">Found in other places:</span>
          {elsewhere.map((t) => (
            <SecondaryButton key={t} onClick={() => onTab(t)}>
              {t} ({counts[t]})
            </SecondaryButton>
          ))}
        </div>
      )}
    </EmptyState>
  )
}

function EmptyState({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="status" className="mt-6 flex flex-col items-center rounded-[4px] border border-dashed border-[#c3ced5] px-10 py-16 text-center text-[14px] leading-5 text-[#6b6c72]">
      <img src={`${A}/search.svg`} alt="" width={24} height={24} className="mb-3 size-8 opacity-60" />
      <p className="mb-1 text-[18px] font-semibold leading-6 text-[#393a3d]">{title}</p>
      {children}
    </div>
  )
}

function PrimaryButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-9 items-center justify-center rounded-[4px] bg-[#0077c5] px-4 py-1.5 text-[14px] font-semibold leading-5 text-white hover:bg-[#00589c]"
    >
      {children}
    </button>
  )
}

function SecondaryButton({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex min-h-9 items-center justify-center rounded-[4px] border border-[#8d9096] bg-white px-4 py-1.5 text-[14px] font-semibold leading-5 text-[#393a3d] hover:border-[#393a3d] hover:bg-[#f4f5f8]"
    >
      {children}
    </button>
  )
}

/* ---------- Details dialog ---------- */

function assetDetails(a: Asset): Details {
  const common: [string, string][] = [
    ['Location', `${a.store} / ${a.schema}${a.kind === 'column' ? ` / ${a.table}` : ''}`],
    ['Owner', a.owner],
    ['Domain', a.domain ?? 'Not in a domain'],
    ['Refreshed', formatDate(a.updated)],
    ['Last used', a.lastUsed ? formatDate(a.lastUsed) : 'Never'],
    ['Maturity', `${a.maturity} of 5`],
    ['Also available as', a.alsoAs.length ? a.alsoAs.map((x) => (x === 'cdc' ? 'CDC' : 'Kafka topic')).join(', ') : 'None'],
  ]
  if (a.temporary) common.push(['Status', 'Temporary'])
  if (a.deprecated) common.push(['Status', 'Deprecated'])
  if (a.kind === 'table') {
    return {
      title: a.name,
      subtitle: `${a.objectType === 'VIEW' ? 'View' : 'Table'} · ${a.classification.toLowerCase()} · id ${a.objectId}`,
      description: a.description,
      fields: [
        ...common,
        ['Size', `${plural(a.columns, 'column')}, ${a.rows === null ? 'row count unknown' : `${compact(a.rows)} rows`}`],
        ['Usage', usageLine(a.queries, a.users)],
        ['Health', a.health ? `${a.health.score} of 100` : 'Not scored'],
      ],
    }
  }
  return {
    title: `${a.table}.${a.name}`,
    subtitle: `Column · ${a.dataType}`,
    description: a.description,
    fields: [
      ...common,
      ['Joins', a.joins === 0 ? 'None yet' : plural(a.joins, 'join')],
      ['Profiled', a.profile === null ? 'Not profiled' : `${Math.round(a.profile * 100)}%`],
    ],
  }
}

function DetailsDialog({ details, onClose }: { details: Details; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const returnTo = document.activeElement as HTMLElement | null
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    ref.current?.querySelector<HTMLElement>('button')?.focus()
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && ref.current) {
        // Keep focus inside the dialog.
        const f = [...ref.current.querySelectorAll<HTMLElement>('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])')]
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      returnTo?.focus()
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-6" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="details-title"
        className="relative flex max-h-full w-[576px] flex-col overflow-hidden rounded-[12px] border border-[#babec5] bg-white shadow-[0px_6px_24px_0px_rgba(0,0,0,0.2)]"
      >
        <div className="flex items-start justify-between gap-4 px-10 pb-4 pt-8">
          <div className="min-w-0">
            <p id="details-title" className="text-[22px] font-semibold leading-[1.3] text-[#393a3d] [overflow-wrap:anywhere]">
              {/* Long identifiers wrap after an underscore or dot, never mid-word. */}
              {details.title.split(/(?<=[_.])/).map((part, i) => (
                <span key={i}>
                  {i > 0 && <wbr />}
                  {part}
                </span>
              ))}
            </p>
            <p className="mt-1 text-[14px] leading-5 text-[#6b6c72]">{details.subtitle}</p>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="-mr-6 -mt-4 flex shrink-0 rounded-[6px] p-1.5 hover:bg-[#6b6c72]/10">
            <img src={`${A}/close.svg`} alt="" width={24} height={24} />
          </button>
        </div>
        <div className="overflow-y-auto px-10 pb-10">
          <p className={`text-[14px] leading-5 ${details.description ? 'text-[#181c1f]' : 'italic text-[#859299]'}`}>
            {details.description ?? 'No description yet.'}
          </p>
          <dl className="mt-6 grid grid-cols-[140px_1fr] gap-x-4 gap-y-2 text-[14px] leading-5">
            {details.fields.map(([k, v], i) => (
              <div key={`${k}-${i}`} className="contents">
                <dt className="text-[#6b6c72]">{k}</dt>
                <dd className="break-words text-[#393a3d]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
