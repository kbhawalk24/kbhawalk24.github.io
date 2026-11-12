'use client'

import type { CSSProperties } from 'react'
import { MotionConfig } from 'motion/react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { ARCS, HERO, MANAGEMENT, type WorkCard } from '@/lib/home-content'
import { tintPanel } from '@/lib/tint'
import { event } from '@/lib/analytics'
import './film.css'

// Overdrive concept: the homepage as a scroll-driven film. The opening shot
// (name and headshot), one pinned scene per case study, a clip-path cut
// between scenes, then Management and the footer. All motion is CSS scroll
// timelines (film.css); browsers without them, reduced motion and phones
// under 768px get the same markup as a plain stacked page of cards.

const CARDS: WorkCard[] = ARCS.flatMap((arc) => arc.cards)
const TOTAL = String(CARDS.length).padStart(2, '0')

/** Where each zoom lands: the part of the screenshot that carries the case. */
const FOCUS: Record<string, string> = {
  'search-2': '38% 30%',
  'agentic-discovery': '30% 40%',
  'catalog-data-map-lineage': '45% 35%',
  '605-tv-analytics': '40% 35%',
}

function Figure({ value }: { value: string }) {
  const [before, after] = value.split(' → ')
  if (!after) {
    return (
      <p className="film-figure">
        <span className="film-before">{value}</span>
      </p>
    )
  }
  return (
    <p className="film-figure">
      <span className="film-before">{before}</span>{' '}
      <span className="film-after">
        <span className="film-arrow">→</span> {after}
      </span>
    </p>
  )
}

function Rail({ index }: { index: number }) {
  return (
    <div className="film-rail" aria-hidden="true">
      <span className="label-micro">{String(index + 1).padStart(2, '0')}</span>
      <span className="film-rail-track">
        <span className="film-rail-fill" />
      </span>
      <span className="label-micro film-rail-total">/ {TOTAL}</span>
      <span className="film-rail-ticks">
        {CARDS.map((c, i) => (
          <span key={c.slug} className={i === index ? 'is-on' : undefined} />
        ))}
      </span>
    </div>
  )
}

function Scene({ card, index }: { card: WorkCard; index: number }) {
  const cover = card.cover
  return (
    <section
      id={card.slug}
      aria-labelledby={`${card.slug}-title`}
      className="film-scene"
      style={{ zIndex: index + 2 } as CSSProperties}
    >
      <div className="film-stage">
        <div className="film-cut">
          <article className="film-card">
            {cover && (
              <div className="film-panel" style={tintPanel(cover.tint)}>
                <div className="film-shot">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cover.src}
                    alt={cover.alt}
                    width={cover.width ?? 1440}
                    height={cover.height ?? 1020}
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    style={{ '--focus': FOCUS[card.slug] ?? '50% 35%' } as CSSProperties}
                  />
                </div>
              </div>
            )}
            <div className="film-copy">
              <p className="label-micro film-meta">
                <span className="film-meta-index">
                  {String(index + 1).padStart(2, '0')} / {TOTAL}
                </span>
                {card.org} · {card.period}
              </p>
              <h2 id={`${card.slug}-title`} className="film-title">
                {card.title}
              </h2>
              <p className="film-line">{card.line}</p>
              <div className="film-stat">
                <Figure value={card.stats[0].value} />
                <p className="film-stat-label">{card.stats[0].label}</p>
              </div>
              {card.href && (
                <a href={`${card.href}/`} className="film-cta" {...event('overdrive', { page: 'film', item: `case-${card.slug}` })}>
                  Read the case study <span aria-hidden="true">→</span>
                </a>
              )}
            </div>
          </article>
          <Rail index={index} />
        </div>
      </div>
    </section>
  )
}

function Opening() {
  const intro = HERO.intro[0].map((p) => p.text).join('')
  return (
    <section className="film-open" aria-labelledby="film-name">
      <div className="film-open-stage">
        <div className="film-open-text">
          <p className="label-micro film-open-label">Portfolio · 2017–2026</p>
          <h1 id="film-name" className="film-name" translate="no">
            Kanchi <br />
            Bhawalkar
          </h1>
          <div className="film-open-sub">
            <p className="film-open-role">Product Design Manager and Principal Designer</p>
            <p className="film-open-intro">{intro}</p>
          </div>
        </div>
        <div className="film-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/kanchi.jpeg" alt="Kanchi Bhawalkar" width={1024} height={1024} />
        </div>
        <p className="label-micro film-hint" aria-hidden="true">
          Scroll <span>↓</span>
        </p>
      </div>
    </section>
  )
}

function Management() {
  return (
    <section id="management" className="film-mgmt" aria-labelledby="film-mgmt-title" style={{ zIndex: CARDS.length + 2 }}>
      <div className="film-stage">
        <div className="film-cut film-cut-band">
          <div className="film-mgmt-inner">
            <p className="label-micro film-mgmt-label">Management · 2024–2026</p>
            <h2 id="film-mgmt-title" className="film-mgmt-title">
              {MANAGEMENT.heading}
            </h2>
            <p className="film-mgmt-text">{MANAGEMENT.text}</p>
            <p className="film-mgmt-text film-mgmt-statement">{MANAGEMENT.shipped.statement}</p>
            <a
              href={`${MANAGEMENT.link.href}/`}
              className="film-cta film-mgmt-cta"
              {...event('overdrive', { page: 'film', item: 'management' })}
            >
              {MANAGEMENT.link.label} <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function FilmPage() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader onHome={false} />
      <main id="main" className="film">
        <Opening />
        <div id="work">
          {CARDS.map((card, i) => (
            <Scene key={card.slug} card={card} index={i} />
          ))}
        </div>
        <Management />
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}
