'use client'

import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { MotionConfig, animate, useMotionValue, useReducedMotion } from 'motion/react'
import { cn } from '@/lib/utils'
import { EASE_OUT } from '@/components/motion-primitives'
import { SiteHeader } from '@/components/site-header'
import { CATALOG_TABS, CatalogHero, CatalogIntroContext, CatalogOpening, Step, type CatalogIntro, CatalogOverviewPanel, type CatalogOverview, type CatalogTab } from '@/components/catalog-hero'
import { CatalogAi } from '@/components/catalog-ai'
import { WorkArcs } from '@/components/work-arcs'
import { TalksRow } from '@/components/talks-row'
import { ManagementSection } from '@/components/management/management-section'

// The homepage as a tabbed catalog entry (14 Nov 2026). The live homepage is
// this page with the band Overview: the description beside the wheel. The header
// and its tab row stay put; each tab swaps the panel under them in place
// (Overview, Design work, Management, Leveraging AI, Talks), and the page fills the screen.
// The tab is kept in the hash, so #work, #management, #ai and #talks (the site nav,
// and the links inside the Overview) open their tab. Contact is a small footer under
// every tab, at the bottom of the screen when the tab is short.
// On a desktop the page opens with the photo and the name large, then plays
// its own transition into the catalog page: the two travel home to the header
// and the rest assembles piece by piece.
// The floating nav stays hidden until the header has scrolled out of view.

/** The opening plays once per page load, not on every return to the page. */
let openingPlayed = false

const tabFromHash = (): CatalogTab => {
  const id = window.location.hash.slice(1)
  return CATALOG_TABS.some((t) => t.id === id) ? (id as CatalogTab) : 'overview'
}

export function CatalogPage({ option }: { option: CatalogOverview }) {
  const [tab, setTab] = useState<CatalogTab>('overview')

  // The opening: on a desktop with motion allowed, the page loads with the
  // photo and the name large, holds for a beat, then plays its own transition
  // into the catalog page (`progress` 0 to 1). No scrolling is needed, and
  // any scroll, key or press skips to the end. It plays once per page load:
  // coming back from a case study, or arriving on a tab or the footer by
  // hash, shows the catalog page straight away. Phones and reduced motion
  // never see it.
  const reduce = useReducedMotion() === true
  const [mounted, setMounted] = useState(false)
  const [introOn, setIntroOn] = useState(false)
  // A return to the page after the opening has played: no timed load-ins.
  const [returning] = useState(() => openingPlayed)
  // Once the opening has run, its layer and listeners are dropped; the
  // load-ins stay skipped.
  const [opened, setOpened] = useState(false)
  const progress = useMotionValue(1)
  useLayoutEffect(() => {
    setMounted(true)
    const wide = window.matchMedia('(min-width: 1024px)').matches
    if (!wide || reduce || openingPlayed || window.location.hash.length > 1) {
      // Never leave the page parked on the opening screen.
      if (progress.get() < 1) progress.set(1)
      setIntroOn(false)
      return
    }
    openingPlayed = true
    progress.set(0)
    setIntroOn(true)
    // Linear here: the travel and each piece ease inside their own stretch.
    let done = false
    const finish = () => {
      done = true
      setOpened(true)
      setIntroOn(false)
    }
    let controls = animate(progress, 1, { duration: 3.6, delay: 1.9, ease: 'linear', onComplete: finish })
    const skip = () => {
      if (progress.get() >= 1) return
      controls.stop()
      controls = animate(progress, 1, { duration: 0.45, ease: EASE_OUT, onComplete: finish })
    }
    const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const
    events.forEach((name) => window.addEventListener(name, skip, { passive: true }))
    return () => {
      controls.stop()
      events.forEach((name) => window.removeEventListener(name, skip))
      // This effect can be torn down and run again before the opening ends
      // (React re-runs effects when the page is reached from another page, and
      // a visitor can leave mid-opening). An opening that was cut short has
      // not played: let the next run start it again instead of finding
      // `openingPlayed` set and leaving the page frozen on the first screen.
      if (!done) openingPlayed = false
    }
  }, [progress, reduce])
  const intro: CatalogIntro = useMemo(
    () => ({ on: introOn, progress, stageId: 'catalog-stage', instant: introOn || returning || opened }),
    [introOn, progress, returning, opened],
  )

  // The hash names the tab: a deep link, the back button, and any link on the
  // page to #work, #management or #talks (the site nav, the queries,
  // the schema rows) land on the matching tab with the header back in view.
  // Links are caught on click because the router changes the hash without a
  // hashchange event.
  useEffect(() => {
    const open = (next: CatalogTab) => {
      setTab(next)
      window.scrollTo({ top: 0 })
      // The router scrolls to the hash target once the panel shows; undo it,
      // and move focus to the tab, since the link pressed may now be hidden.
      window.setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'instant' })
        document.getElementById(`tab-${next}`)?.focus({ preventScroll: true })
      }, 60)
    }
    // #contact is the Resume and LinkedIn buttons in the Overview, so it
    // opens the Overview like any hash that is not a tab's.
    const sync = () => open(tabFromHash())
    // Back and forward: show the entry's tab and return to where the reader
    // was on it (the position is kept on the history entry, below), instead
    // of sending them to the top.
    const restore = () => {
      setTab(tabFromHash())
      const y = (window.history.state as { catalogY?: number } | null)?.catalogY
      if (typeof y === 'number') window.setTimeout(() => window.scrollTo({ top: y, behavior: 'instant' }), 80)
    }
    let saving = 0
    const remember = () => {
      window.clearTimeout(saving)
      saving = window.setTimeout(() => {
        try {
          window.history.replaceState({ ...(window.history.state ?? {}), catalogY: Math.round(window.scrollY) }, '')
        } catch {}
      }, 160)
    }
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null
      if (!a || a.target === '_blank' || a.pathname !== window.location.pathname) return
      const id = a.hash.slice(1)
      if (CATALOG_TABS.some((t) => t.id === id)) open(id as CatalogTab)
      else if (id === 'contact') open('overview')
      // A link to the page itself with no hash (the name in the nav) is home.
      else if (id === '' && !a.getAttribute('href')?.includes('#')) open('overview')
    }
    restore()
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', restore)
    window.addEventListener('scroll', remember, { passive: true })
    document.addEventListener('click', onClick)
    return () => {
      window.clearTimeout(saving)
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', restore)
      window.removeEventListener('scroll', remember)
      document.removeEventListener('click', onClick)
    }
  }, [])

  // A click on the tab row: no scroll, and the hash follows without adding a
  // history entry per tab.
  const selectTab = useCallback((next: CatalogTab) => {
    // The router answers a hash change by scrolling to its target; hold the
    // page exactly where it is.
    const y = window.scrollY
    setTab(next)
    window.history.replaceState(null, '', next === 'overview' ? window.location.pathname : `#${next}`)
    const hold = () => window.scrollTo({ top: y, behavior: 'instant' })
    hold()
    window.setTimeout(hold, 60)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <CatalogIntroContext.Provider value={intro}>
      <SiteHeader hideOver="hero" />
      <div>
        {/* Until the client knows whether the opening plays, a desktop with
            motion allowed shows nothing rather than a flash of the settled page. */}
        <div id="catalog-stage" className={cn('relative flex min-h-dvh flex-col', !mounted && 'lg:motion-safe:invisible')}>
          {/* The ground runs the full height of the page on every tab, so it
              never stops partway behind the footer. */}
          <div aria-hidden="true" className="hero-ground catalog-ground pointer-events-none absolute inset-0" />
          {introOn && <CatalogOpening progress={progress} stageId="catalog-stage" />}
          <main id="main" className="relative flex flex-1 flex-col">
            <CatalogHero tab={tab} onTab={selectTab} intro={intro} />
            {/* The sections under the tabs take the header's width. */}
            <div className="relative flex flex-1 flex-col">
              {/* Every panel is in the page, so its words and links are in
                  the HTML; only the open tab's is shown. */}
              {CATALOG_TABS.map((t) => (
                <div
                  key={t.id}
                  id={`panel-${t.id}`}
                  role="tabpanel"
                  aria-labelledby={`tab-${t.id}`}
                  hidden={t.id !== tab}
                  className="catalog-panel relative flex-1 [&_.max-w-6xl]:max-w-[85rem]"
                >
                  {t.id === 'overview' && <CatalogOverviewPanel overview={option} />}
                  {t.id === 'work' && (
                    <Step at={3}>
                      <WorkArcs heading={false} />
                    </Step>
                  )}
                  {t.id === 'management' && (
                    // The lineage graph measures itself, so it mounts afresh
                    // each time its tab opens.
                    <Step at={3} key={tab === 'management' ? 'open' : 'closed'} className="pt-8">
                      <ManagementSection parts />
                    </Step>
                  )}
                  {t.id === 'ai' && (
                    <Step at={3} className="pt-10">
                      <CatalogAi />
                    </Step>
                  )}
                  {t.id === 'talks' && (
                    <Step at={3} className="pt-12">
                      <TalksRow />
                    </Step>
                  )}
                </div>
              ))}
            </div>
          </main>
          {/* No footer on the homepage (16 Nov 2026): Resume and LinkedIn are
              buttons in the Overview, and that is where #contact lands. */}
        </div>
      </div>
      </CatalogIntroContext.Provider>
    </MotionConfig>
  )
}
