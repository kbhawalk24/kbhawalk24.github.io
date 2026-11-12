'use client'

import Link from 'next/link'
import { useId, useRef, useState } from 'react'
import { event } from '@/lib/analytics'
import { MANAGEMENT } from '@/lib/home-content'
import { cn } from '@/lib/utils'
import { Reveal } from '@/components/motion-primitives'

// Management on the homepage, from the tabbed landing mock (11 Nov 2026): a
// full-bleed blue band, the heading and one sentence, then three tabs. What I
// led: three statements beside a drawing of where design now joins the work
// and the two roadmap bets. What my team shipped: the certified-data figure
// with its bars, three figures, four area rows. How I managed: five habits,
// the people, one quote. Copy and sources are in lib/home-content.ts.

const M = MANAGEMENT

const TABS = [
  { id: 'led', label: 'What I led' },
  { id: 'shipped', label: 'What my team shipped' },
  { id: 'managed', label: 'How I managed' },
] as const

const CARD = 'rounded-[18px] bg-card shadow-soft'
const STATEMENT = 'font-heading text-[clamp(1.6rem,3vw,2.25rem)] font-bold leading-[1.12] tracking-[-0.02em] text-foreground'

/** Rows with a short mono label on the left, as in the mock's area and habit lists. */
function LabelRows({ rows }: { rows: { label: string; body: React.ReactNode }[] }) {
  return (
    <ul className="flex flex-col gap-2.5">
      {rows.map((r) => (
        <li key={r.label} className="flex gap-4 border-t border-border pt-2.5">
          <span className="w-[92px] flex-none font-mono text-[13px] uppercase text-accent-brand">{r.label}</span>
          <span className="font-sans text-[15px] leading-normal text-foreground">{r.body}</span>
        </li>
      ))}
    </ul>
  )
}

const STAGES: [string, number][] = [
  ['1 · Framing', 105],
  ['2 · Requirements', 315],
  ['3 · Design', 525],
  ['4 · Build', 735],
]

/** Design used to start at stage three; it now joins at stage one. Below, the
 *  2025 roadmap with the two bets design added (query insights, May 2025;
 *  Collections, August 2025). */
function JoinsEarlier() {
  return (
    <figure className={cn(CARD, 'w-full overflow-hidden')}>
      <svg
        role="img"
        aria-label="Four stages: framing, requirements, design and build. Design used to start at design; it now joins at framing. Below, the 2025 roadmap with two bets design added: queries on a table in May 2025 and saved working sets in August 2025."
        viewBox="0 0 840 480"
        className="block h-auto w-full font-sans"
      >
        <text x="24" y="44" fontSize="24" fontWeight="700" fill="var(--accent-brand)">Design joins here now</text>
        <text x="400" y="44" fontSize="24" fill="var(--muted-foreground)">Design used to start here</text>
        <line x1="105" y1="140" x2="735" y2="140" stroke="#dcdcdc" strokeWidth="4" strokeLinecap="round" />
        <path d="M525 112 Q315 62 105 112" fill="none" stroke="var(--accent-brand)" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
        <g fill="#fff" stroke="var(--foreground)" strokeWidth="4">
          {STAGES.map(([label, x]) => (
            <circle key={label} cx={x} cy="140" r="14" />
          ))}
        </g>
        <circle cx="525" cy="140" r="26" fill="none" stroke="var(--accent-brand)" strokeWidth="3" strokeDasharray="6 8" />
        <circle className="joins-marker" cx="105" cy="140" r="20" fill="var(--accent-brand)" />
        {STAGES.map(([label, x], i) => (
          <text key={label} x={x} y="200" fontSize="24" textAnchor="middle" fill={i === 0 ? 'var(--foreground)' : 'var(--muted-foreground)'}>
            {label}
          </text>
        ))}
        <line x1="24" y1="232" x2="816" y2="232" stroke="#e5e5e5" strokeWidth="2" />
        <text x="24" y="270" fontSize="22" letterSpacing="2" fill="var(--muted-foreground)" fontFamily="var(--font-plex-mono), monospace">
          2025 ROADMAP · BETS DESIGN ADDED
        </text>
        <line x1="40" y1="312" x2="800" y2="312" stroke="var(--foreground)" strokeWidth="4" strokeLinecap="round" />
        <text x="24" y="352" fontSize="24" fill="var(--muted-foreground)">Jan</text>
        <text x="816" y="352" fontSize="24" textAnchor="end" fill="var(--muted-foreground)">Dec</text>
        <g stroke="var(--accent-brand)" strokeWidth="3">
          <line x1="325" y1="322" x2="325" y2="372" />
          <line x1="515" y1="322" x2="515" y2="372" />
        </g>
        <circle cx="325" cy="312" r="11" fill="var(--accent-brand)" />
        <circle cx="515" cy="312" r="11" fill="var(--accent-brand)" />
        <rect x="205" y="372" width="240" height="84" rx="14" fill="var(--accent-brand)" />
        <rect x="465" y="372" width="270" height="84" rx="14" fill="var(--accent-brand)" />
        <text x="325" y="406" fontSize="24" fontWeight="700" textAnchor="middle" fill="#fff">Queries on a table</text>
        <text x="325" y="440" fontSize="24" fontWeight="700" textAnchor="middle" fill="#fff">May 2025</text>
        <text x="600" y="406" fontSize="24" fontWeight="700" textAnchor="middle" fill="#fff">Saved working sets</text>
        <text x="600" y="440" fontSize="24" fontWeight="700" textAnchor="middle" fill="#fff">Aug 2025</text>
      </svg>
    </figure>
  )
}

function Bar({ to, after }: { to: number; after?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 624 24" className="block w-full max-w-[624px]">
      <rect width="624" height="24" rx="12" fill="var(--card-soft)" />
      <rect className={after ? 'clean-bar' : undefined} width={to} height="24" rx="12" fill={after ? 'var(--accent-brand)' : 'var(--foreground)'} />
    </svg>
  )
}

function Led() {
  return (
    <div className="flex flex-wrap items-center gap-10">
      <ul className="flex min-w-0 flex-[1_1_340px] flex-col gap-[18px]">
        {M.led.items.map((it) => (
          <li key={it.title} className="flex flex-col gap-1">
            <h3 className="font-heading text-xl font-semibold leading-[1.2] tracking-[-0.015em] text-foreground">{it.title}</h3>
            <p className="font-sans text-[15px] leading-[1.55] text-muted-foreground">{it.text}</p>
          </li>
        ))}
      </ul>
      <div className="hidden w-full max-w-[520px] flex-none sm:block">
        <JoinsEarlier />
      </div>
      {/* Phones: the drawing's labels would render at about 9px, so its two facts are rows. */}
      <div className="w-full sm:hidden">
        <LabelRows
          rows={[
            { label: 'Design', body: 'Used to start at stage three, design. Now joins at stage one, framing.' },
            { label: '2025', body: 'Two bets design added to the roadmap: queries on a table (May) and saved working sets (Aug).' },
          ]}
        />
      </div>
    </div>
  )
}

function Shipped() {
  const s = M.shipped
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap gap-4">
        <div className={cn(CARD, 'flex min-w-0 flex-[1.2_1_360px] flex-col gap-2.5 p-8')}>
          <p className="label-micro text-muted-foreground">{s.lead.label}</p>
          <p className="font-heading text-[56px] font-extrabold leading-[1.05] text-accent-brand">{s.lead.value}</p>
          <p className="font-sans text-[15px] text-muted-foreground">{s.lead.before}</p>
          <Bar to={14} />
          <p className="font-sans text-[15px] text-muted-foreground">{s.lead.after}</p>
          <Bar to={499} after />
          <p className="font-sans text-lg leading-[1.55] text-foreground">{s.lead.text}</p>
        </div>
        <div className="flex min-w-0 flex-[1_1_320px] flex-col gap-3.5">
          {s.figures.map((f) => (
            <div key={f.value} className={cn(CARD, 'flex flex-1 flex-col justify-center gap-2.5 p-6')}>
              <p className="font-heading text-[30px] font-bold leading-[1.1] text-accent-brand">{f.value}</p>
              <p className="font-sans text-[15px] leading-[1.55] text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3.5">
        <h3 className="font-heading text-xl font-semibold leading-[1.2] tracking-[-0.015em] text-foreground">{s.areasHeading}</h3>
        <LabelRows rows={s.areas.map((a) => ({ label: a.label, body: a.text }))} />
      </div>
    </div>
  )
}

function Managed() {
  const m = M.managed
  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-start gap-8">
        <div className="min-w-0 flex-[1.3_1_420px]">
          <LabelRows
            rows={m.habits.map((h, i) => ({
              label: String(i + 1).padStart(2, '0'),
              body: (
                <>
                  <b className="font-bold">{h.lead}</b> {h.text}
                </>
              ),
            }))}
          />
        </div>
        <div className={cn(CARD, 'flex min-w-0 flex-[1_1_280px] flex-col gap-4 p-7')}>
          <p className="label-micro text-accent-brand">People</p>
          <ul className="flex flex-col gap-6">
            {m.people.map((p) => (
              <li key={p.value} className="flex flex-col gap-0.5">
                <p className="font-heading text-[22px] font-bold leading-[1.2] text-accent-brand">{p.value}</p>
                {p.text && <p className="font-sans text-[15px] leading-[1.55] text-muted-foreground">{p.text}</p>}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <blockquote className="flex flex-col gap-2 border-l-4 border-accent-brand pl-5">
        <p className="font-heading text-xl leading-[1.35] text-foreground">{m.quote.text}</p>
        <footer className="font-sans text-sm leading-[1.55] text-muted-foreground">{m.quote.who}</footer>
      </blockquote>
    </div>
  )
}

export function LeadershipSection() {
  const [active, setActive] = useState(0)
  const base = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  function select(i: number, focus = false) {
    const next = (i + TABS.length) % TABS.length
    setActive(next)
    if (focus) tabRefs.current[next]?.focus()
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') select(active + 1, true)
    else if (e.key === 'ArrowLeft') select(active - 1, true)
    else if (e.key === 'Home') select(0, true)
    else if (e.key === 'End') select(TABS.length - 1, true)
    else return
    e.preventDefault()
  }

  const tab = TABS[active]
  const statement = tab.id === 'led' ? M.led.statement : tab.id === 'shipped' ? M.shipped.statement : M.managed.statement

  return (
    <section id="management" className="relative z-10 scroll-mt-20 bg-band">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 lg:px-14">
        <Reveal className="flex flex-col gap-3">
          <h2 className="font-heading text-3xl font-semibold leading-[1.1] tracking-[-0.02em] md:text-[38px]">{M.heading}</h2>
          <p className="font-sans text-lg leading-[1.55] text-[#3a3a37]">{M.text}</p>
        </Reveal>

        <div role="tablist" aria-label="Management" onKeyDown={onKeyDown} className="-mx-6 mt-9 flex gap-2.5 overflow-x-auto px-6 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0">
          {TABS.map((t, i) => {
            const selected = i === active
            return (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                type="button"
                role="tab"
                id={`${base}-tab-${t.id}`}
                aria-selected={selected}
                aria-controls={`${base}-panel-${t.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => select(i)}
                {...event('leadership-tab', { tab: t.id })}
                className={cn(
                  'min-h-12 shrink-0 whitespace-nowrap rounded-full border-2 border-accent-brand px-[22px] font-sans text-[15px] font-bold transition-colors duration-200',
                  selected ? 'bg-accent-brand text-white' : 'bg-card text-foreground hover:bg-card/70',
                )}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`${base}-panel-${tab.id}`}
          aria-labelledby={`${base}-tab-${tab.id}`}
          tabIndex={0}
          className="mt-9 flex flex-col gap-7 rounded-[6px] focus-visible:outline-offset-4"
        >
          <p className={STATEMENT}>{statement}</p>
          {tab.id === 'led' ? <Led /> : tab.id === 'shipped' ? <Shipped /> : <Managed />}
        </div>

        <Link
          href={M.link.href}
          className="mt-9 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand hover:underline"
          {...event('leadership', { via: 'home' })}
        >
          {M.link.label} <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  )
}
