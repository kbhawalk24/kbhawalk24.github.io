'use client'

import Link from 'next/link'
import { MotionConfig } from 'motion/react'
import { event } from '@/lib/analytics'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'

// The overdrive index: one row per experimental homepage, each a link to its
// own page. Experiments, not the site; the homepage stays at /.

const VERSIONS = [
  {
    id: 'search',
    href: '/overdrive/search',
    title: 'Search your work',
    text: 'The hero is a working search over the portfolio: case studies, figures, the seven areas and roles, filtered as you type.',
  },
  {
    id: 'lineage',
    href: '/overdrive/lineage',
    title: 'Lineage graph',
    text: 'The career drawn as a data-lineage graph, 2017 to 2026: roles, products and figures as nodes, upstream to downstream.',
  },
  {
    id: 'cozy',
    href: '/overdrive/cozy',
    title: 'Cosy, illustrated',
    text: 'The homepage in a warm paper palette, with a drawn room around the hero and an evening desk in the footer.',
  },
  {
    id: 'hero',
    href: '/overdrive/hero/develop/',
    title: 'Three hero effects',
    text: 'The live homepage with one effect on the hero: the photo develops out of the dot grid, the grid answers the cursor, or a lineage line draws to the photo.',
  },
  {
    id: 'film',
    href: '/overdrive/film',
    title: 'Scroll-driven case film',
    text: 'Each case study plays as a scene as you scroll: the product zooms in, the figure lands, then a cut to the next.',
  },
] as const

export function OverdriveIndex() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader onHome={false} />
      <main id="main" className="mx-auto max-w-6xl px-6 pb-20 pt-32 md:px-10 lg:px-14">
        <p className="label-micro text-muted-foreground">Experiments</p>
        <h1 className="mt-3 font-heading text-4xl font-extrabold leading-[1.02] tracking-[-0.025em] md:text-6xl">Other homepages</h1>
        <p className="mt-5 font-sans text-lg leading-[1.6] text-foreground">
          The same copy and work, pushed in other directions. The live homepage is unchanged.
        </p>
        <ol className="mt-12 grid gap-4">
          {VERSIONS.map((v, i) => (
            <li key={v.id}>
              <Link
                href={v.href}
                {...event('overdrive', { page: 'index', item: v.id })}
                className="group flex flex-wrap items-baseline gap-x-6 gap-y-2 rounded-[18px] bg-card p-6 shadow-soft transition-shadow hover:shadow-float md:p-8"
              >
                <span className="font-mono text-[13px] text-accent-brand">{String(i + 1).padStart(2, '0')}</span>
                <span className="min-w-0 flex-[1_1_28rem]">
                  <span className="block font-heading text-2xl font-semibold leading-tight tracking-[-0.02em] text-foreground md:text-3xl">{v.title}</span>
                  <span className="mt-2 block font-sans text-base leading-relaxed text-muted-foreground">{v.text}</span>
                </span>
                <span aria-hidden="true" className="font-sans text-base font-semibold text-accent-brand transition-transform group-hover:translate-x-1">
                  Open →
                </span>
              </Link>
            </li>
          ))}
        </ol>
        <Link
          href="/"
          {...event('overdrive', { page: 'index', item: 'home' })}
          className="mt-8 inline-flex min-h-11 items-center gap-2 font-sans text-base font-semibold text-accent-brand hover:underline"
        >
          ← Back to the homepage
        </Link>
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}
