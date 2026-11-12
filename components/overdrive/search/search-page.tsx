'use client'

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import Image from 'next/image'
import { MotionConfig } from 'motion/react'
import { ArrowLeft, Search, X } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { event } from '@/lib/analytics'
import { ORGS, SUGGESTIONS, TYPES, YEARS, search, type Filters, type IndexItem } from './search-index'

// /overdrive/search: an alternative homepage where the hero is a search box
// over the portfolio itself. Not linked from the nav.

const track = (item: string) => event('overdrive', { page: 'search', item })

function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Wrap a state change in a view transition when the browser has one. */
function transition(update: () => void) {
  const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown }
  if (doc.startViewTransition && !prefersReducedMotion()) {
    doc.startViewTransition(() => flushSync(update))
  } else {
    update()
  }
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function Highlight({ text, tokens }: { text: string; tokens: string[] }) {
  if (tokens.length === 0) return <>{text}</>
  const re = new RegExp(`(${[...tokens].sort((a, b) => b.length - a.length).map(escapeRe).join('|')})`, 'gi')
  const parts = text.split(re)
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="rounded-[3px] text-inherit" style={{ background: 'var(--wash-bloom)', boxShadow: '0 0 0 2px var(--wash-bloom)' }}>
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  )
}

function Chip({ label, count, pressed, onClick, name }: { label: string; count: number; pressed: boolean; onClick: () => void; name: string }) {
  const empty = count === 0 && !pressed
  return (
    <button
      type="button"
      aria-pressed={pressed}
      disabled={empty}
      onClick={onClick}
      {...track(`facet-${name}`)}
      className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[0.9375rem] font-semibold transition-colors ${
        pressed ? 'bg-accent-brand text-white' : 'bg-card text-foreground shadow-soft hover:bg-muted'
      } ${empty ? 'cursor-not-allowed opacity-40' : ''}`}
    >
      {label}
      <span className={`font-mono text-xs tabular-nums ${pressed ? 'text-white/80' : 'text-muted-foreground'}`}>{count}</span>
    </button>
  )
}

function FacetGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div role="group" aria-label={title}>
      <p className="label-micro mb-2 text-muted-foreground">{title}</p>
      {/* One scrolling row per group on a phone, so the results stay near
          the box; wrapped in the desktop sidebar. */}
      <div className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] md:-mx-10 md:px-10 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 lg:pb-0">{children}</div>
    </div>
  )
}

function Cover({ card, big }: { card: NonNullable<IndexItem['card']>; big?: boolean }) {
  const cover = card.cover
  if (!cover) return null
  return (
    <div
      className={`flex items-center justify-center overflow-hidden ${big ? 'rounded-[12px] p-4 md:p-8' : 'rounded-[8px] p-1.5'}`}
      style={{ background: cover.tint, viewTransitionName: `vt-cover-${card.slug}` }}
    >
      <Image
        src={cover.src}
        alt={big ? cover.alt : ''}
        width={cover.width ?? 1600}
        height={cover.height ?? 1000}
        className={`h-auto w-full ${big ? 'rounded-[8px]' : 'rounded-[4px]'}`}
        sizes={big ? '(min-width: 1024px) 900px, 100vw' : '120px'}
      />
    </div>
  )
}

export function SearchPage() {
  const [query, setQuery] = useState('')
  const [filters, setFilters] = useState<Filters>({})
  const [active, setActive] = useState(0)
  const [expanded, setExpanded] = useState<IndexItem | null>(null)
  const [focused, setFocused] = useState(false)
  // The timing is measured in the browser; the server render leaves it out
  // so hydration matches.
  const [mounted, setMounted] = useState(false)
  const [narrow, setNarrow] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const expandedHeadingRef = useRef<HTMLHeadingElement>(null)
  const listId = useId()
  const optionId = (i: number) => `${listId}-opt-${i}`

  const { results, counts, tokens, ms } = useMemo(() => {
    const t0 = performance.now()
    const r = search(query, filters)
    return { ...r, ms: performance.now() - t0 }
  }, [query, filters])

  // Focus the box on load, but only with a fine pointer on a wide screen, so
  // a phone does not open its keyboard over the page.
  useEffect(() => {
    setMounted(true)
    setNarrow(window.matchMedia('(max-width: 639px)').matches)
    if (window.matchMedia('(pointer: fine) and (min-width: 768px)').matches) {
      inputRef.current?.focus({ preventScroll: true })
    }
  }, [])

  useEffect(() => {
    if (expanded) expandedHeadingRef.current?.focus({ preventScroll: true })
  }, [expanded])

  const activeIndex = Math.min(active, Math.max(results.length - 1, 0))

  const setFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setActive(0)
    setFilters((f) => ({ ...f, [key]: f[key] === value ? undefined : value }))
  }

  const open = (item: IndexItem) => {
    if (item.card) {
      transition(() => setExpanded(item))
    } else {
      window.location.assign(item.href)
    }
  }

  const collapse = () => {
    const slug = expanded?.card?.slug
    transition(() => setExpanded(null))
    requestAnimationFrame(() => {
      const el = slug ? document.querySelector<HTMLElement>(`[data-slug="${slug}"]`) : null
      inputRef.current?.focus({ preventScroll: true })
      el?.scrollIntoView({ block: 'nearest' })
    })
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter') {
      const item = results[activeIndex]
      if (item) {
        e.preventDefault()
        open(item)
      }
    } else if (e.key === 'Escape') {
      e.preventDefault()
      setQuery('')
      setActive(0)
    }
  }

  useEffect(() => {
    document.getElementById(optionId(activeIndex))?.scrollIntoView({ block: 'nearest' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex])

  const anyFilter = Boolean(filters.type || filters.org || filters.year)
  const countLine = `${results.length} ${results.length === 1 ? 'result' : 'results'}${mounted ? ` in ${ms < 0.1 ? 'under 0.1' : ms.toFixed(1)} ms` : ''}`

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader onHome={false} />
      <main id="main" className="overflow-x-clip">
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-28 md:px-10 md:pt-36 lg:px-14">
          <div className="flex items-center gap-4 md:gap-6">
            <Image
              src="/images/kanchi.jpeg"
              alt="Kanchi Bhawalkar"
              width={1024}
              height={1024}
              priority
              className="h-16 w-16 shrink-0 rounded-[18px] shadow-soft md:h-24 md:w-24"
            />
            <div className="min-w-0">
              <h1 className="font-heading text-[2.5rem] font-extrabold leading-[0.95] tracking-[-0.025em] md:text-[clamp(3.25rem,6vw,5rem)]">
                Kanchi Bhawalkar
              </h1>
              <p className="mt-2 text-base text-muted-foreground md:text-xl">Product Design Manager and Principal Designer</p>
            </div>
          </div>

          <div role="search" className="mt-10 md:mt-14">
            <label htmlFor={`${listId}-q`} className="label-micro mb-3 block text-muted-foreground">
              Search my work
            </label>
            <div className="relative flex items-center rounded-[18px] bg-card shadow-soft focus-within:ring-2 focus-within:ring-accent-brand">
              <Search aria-hidden="true" className="pointer-events-none absolute left-4 h-5 w-5 text-muted-foreground md:left-7 md:h-7 md:w-7" />
              <input
                ref={inputRef}
                id={`${listId}-q`}
                type="search"
                role="combobox"
                aria-expanded={!expanded && results.length > 0}
                aria-controls={`${listId}-list`}
                aria-autocomplete="list"
                aria-activedescendant={!expanded && results.length > 0 ? optionId(activeIndex) : undefined}
                autoComplete="off"
                spellCheck={false}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                  setActive(0)
                  if (expanded) setExpanded(null)
                }}
                onKeyDown={onKeyDown}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder={narrow ? 'lineage, agent, 605, access…' : 'Search my work: lineage, agent, 605, access…'}
                className="h-16 w-full min-w-0 rounded-[18px] bg-transparent pl-12 pr-12 font-heading text-lg font-semibold tracking-[-0.01em] outline-none placeholder:font-normal placeholder:text-muted-foreground/80 focus-visible:outline-none md:h-20 md:pl-20 md:pr-20 md:text-[1.75rem] [&::-webkit-search-cancel-button]:appearance-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('')
                    setActive(0)
                    inputRef.current?.focus()
                  }}
                  aria-label="Clear search"
                  {...track('clear')}
                  className="absolute right-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground hover:bg-muted hover:text-foreground md:right-4"
                >
                  <X aria-hidden="true" className="h-5 w-5" />
                </button>
              )}
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              <span aria-live="polite" aria-atomic="true">{countLine}</span>
              <span className="hidden md:inline">. Use ↑ ↓ to move, Enter to open, Esc to clear.</span>
            </p>
          </div>
        </section>

        <section aria-label="Results" className="mx-auto max-w-6xl px-6 pb-24 md:px-10 lg:px-14">
          <div className="grid gap-8 lg:grid-cols-[15rem_minmax(0,1fr)] lg:gap-12">
            <div className="flex min-w-0 flex-col gap-4 lg:sticky lg:gap-5 lg:top-28 lg:self-start">
              <FacetGroup title="Type">
                {TYPES.map((t) => (
                  <Chip key={t} name={`type-${t.toLowerCase().replace(/\s+/g, '-')}`} label={t} count={counts.type[t] ?? 0} pressed={filters.type === t} onClick={() => setFilter('type', t)} />
                ))}
              </FacetGroup>
              <FacetGroup title="Org">
                {ORGS.map((o) => (
                  <Chip key={o} name={`org-${o.toLowerCase()}`} label={o} count={counts.org[o] ?? 0} pressed={filters.org === o} onClick={() => setFilter('org', o)} />
                ))}
              </FacetGroup>
              <FacetGroup title="Year">
                {YEARS.map((y) => (
                  <Chip key={y} name={`year-${y}`} label={String(y)} count={counts.year[y] ?? 0} pressed={filters.year === y} onClick={() => setFilter('year', y)} />
                ))}
              </FacetGroup>
              {anyFilter && (
                <button
                  type="button"
                  onClick={() => setFilters({})}
                  {...track('facet-reset')}
                  className="inline-flex h-11 w-max items-center text-[0.9375rem] font-semibold text-accent-brand underline-offset-4 hover:underline"
                >
                  Clear filters
                </button>
              )}
            </div>

            <div className="min-w-0">
              {expanded?.card ? (
                <article className="rounded-[18px] bg-card p-4 shadow-soft md:p-6">
                  <button
                    type="button"
                    onClick={collapse}
                    {...track(`back-${expanded.card.slug}`)}
                    className="mb-4 inline-flex h-11 items-center gap-2 rounded-full px-3 text-[0.9375rem] font-semibold text-foreground hover:bg-muted"
                  >
                    <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                    Back to results
                  </button>
                  <Cover card={expanded.card} big />
                  <div className="mt-6 px-1 md:px-2">
                    <p className="label-micro text-muted-foreground">
                      {expanded.card.org} · {expanded.card.period} · {expanded.card.role}
                    </p>
                    <h2
                      ref={expandedHeadingRef}
                      tabIndex={-1}
                      className="mt-2 font-heading text-2xl font-semibold leading-tight tracking-[-0.025em] outline-none md:text-[1.875rem]"
                      style={{ viewTransitionName: `vt-title-${expanded.card.slug}` }}
                    >
                      {expanded.card.title}
                    </h2>
                    <p className="mt-3 text-base leading-relaxed text-foreground/85 md:text-[1.0625rem]">{expanded.card.line}</p>
                    <div className="mt-5 rounded-[12px] bg-muted p-4 md:p-5">
                      <p className="font-heading text-2xl font-bold tracking-[-0.02em] text-accent-brand md:text-3xl">{expanded.card.stats[0].value}</p>
                      <p className="mt-1 text-[0.9375rem] text-muted-foreground">{expanded.card.stats[0].label}</p>
                    </div>
                    <a
                      href={expanded.href}
                      {...track(`read-${expanded.card.slug}`)}
                      className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-5 text-[0.9375rem] font-semibold text-background shadow-cta hover:shadow-cta-hover"
                    >
                      Read the case study →
                    </a>
                  </div>
                </article>
              ) : results.length === 0 ? (
                <div className="rounded-[18px] bg-card p-6 shadow-soft md:p-8">
                  <p className="font-heading text-xl font-semibold tracking-[-0.02em]">Nothing matches “{query}”{anyFilter ? ' with these filters' : ''}.</p>
                  <p className="mt-2 text-muted-foreground">Try one of these:</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {SUGGESTIONS.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => {
                          setQuery(s)
                          setFilters({})
                          setActive(0)
                          inputRef.current?.focus()
                        }}
                        {...track(`suggest-${s}`)}
                        className="inline-flex h-11 items-center rounded-full bg-muted px-4 text-[0.9375rem] font-semibold hover:bg-band"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <ul id={`${listId}-list`} role="listbox" aria-label="Results" className="flex flex-col gap-3">
                  {results.map((item, i) => {
                    const isActive = i === activeIndex
                    const showActive = isActive && focused
                    const card = item.card
                    return (
                      <li key={item.id} className="list-none">
                        <a
                          id={optionId(i)}
                          role="option"
                          aria-selected={isActive}
                          tabIndex={-1}
                          href={item.href}
                          data-slug={card?.slug}
                          onMouseMove={() => active !== i && setActive(i)}
                          onClick={(e) => {
                            if (card && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
                              e.preventDefault()
                              open(item)
                            }
                          }}
                          {...track(card ? `expand-${card.slug}` : `result-${item.id}`)}
                          className={`flex min-h-11 gap-4 rounded-[18px] p-4 shadow-soft transition-[box-shadow,background-color] md:p-5 ${
                            showActive ? 'bg-band ring-2 ring-accent-brand' : 'bg-card hover:bg-muted'
                          }`}
                        >
                          {card && (
                            <div className="w-20 shrink-0 md:w-32">
                              <Cover card={card} />
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="label-micro text-muted-foreground">
                              {item.type} · {item.org} · {item.period}
                            </p>
                            <p className="label-micro mt-0.5 truncate text-muted-foreground/80">
                              <Highlight text={item.kicker} tokens={tokens} />
                            </p>
                            <p
                              className={`mt-1.5 font-heading font-semibold leading-tight tracking-[-0.02em] ${
                                item.type === 'Figure' ? 'text-2xl text-accent-brand md:text-[1.75rem]' : 'text-lg md:text-xl'
                              }`}
                              style={card ? { viewTransitionName: `vt-title-${card.slug}` } : undefined}
                            >
                              <Highlight text={item.title} tokens={tokens} />
                            </p>
                            <p className="mt-1.5 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted-foreground md:line-clamp-2">
                              <Highlight text={item.text} tokens={tokens} />
                            </p>
                          </div>
                        </a>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>
        </section>
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}
