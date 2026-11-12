'use client'

import Image from 'next/image'
import { MotionConfig, motion } from 'motion/react'
import { SiteHeader } from '@/components/site-header'
import { ContactFooter } from '@/components/contact-footer'
import { EASE_OUT } from '@/components/motion-primitives'
import { HERO } from '@/lib/home-content'
import { LineageGraph } from './lineage-graph'
import { LineageList } from './lineage-list'

const DOTS = {
  backgroundImage: 'radial-gradient(circle, color-mix(in oklab, var(--accent-brand) 26%, transparent) 1.3px, transparent 1.6px)',
  backgroundSize: '30px 30px',
  backgroundPosition: '15px 15px',
}

/** Overdrive concept: the homepage as a data-lineage graph of the career. */
export function LineagePage() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Unlayered, so it beats the site-wide :focus-visible outline: SVG
          groups draw their own ring instead. */}
      <style>{`
        .lineage-node:focus-visible { outline: none; }
        .lineage-node:focus-visible .lineage-ring { stroke: var(--ring); }
        .lineage-scroll { scrollbar-width: thin; scrollbar-color: color-mix(in oklab, var(--accent-brand) 30%, transparent) transparent; }
      `}</style>
      <SiteHeader onHome={false} />
      <main id="main" className="overflow-x-clip bg-band" style={DOTS}>
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className="px-6 pt-28 md:px-10 md:pt-32 lg:px-14"
        >
          <div className="flex items-center gap-4 md:gap-5">
            <Image
              src="/images/kanchi.jpeg"
              alt="Kanchi Bhawalkar"
              width={1024}
              height={1024}
              priority
              className="size-16 shrink-0 rounded-[18px] shadow-soft md:size-20"
            />
            <div>
              <h1 className="font-heading text-[clamp(2.25rem,5vw,3.75rem)] font-extrabold leading-[0.95] tracking-[-0.025em]">
                Kanchi Bhawalkar
              </h1>
              <p className="mt-1.5 font-heading text-lg font-semibold tracking-tight text-muted-foreground md:text-xl">
                Product Design Manager and Principal Designer
              </p>
            </div>
          </div>
          <p className="mt-5 font-sans text-[17px] leading-relaxed md:text-lg">
            {HERO.intro[0].map((part, i) => (
              <span key={i} className={'accent' in part && part.accent ? 'font-semibold text-accent-brand' : undefined}>
                {part.text}
              </span>
            ))}
          </p>
          <div className="mt-8 hidden items-center gap-5 md:flex">
            <p className="label-micro text-muted-foreground">Hover or tab to a node to trace its lineage · Drag or scroll sideways · Case studies open on click</p>
            <Legend />
          </div>
        </motion.header>

        <section aria-label="Career lineage" className="pb-16 pt-4 md:pb-20">
          <div className="hidden md:block">
            <LineageGraph />
          </div>
          <div className="px-6 pt-4 md:hidden">
            <LineageList />
          </div>
        </section>
      </main>
      <ContactFooter />
    </MotionConfig>
  )
}

function Legend() {
  const items = [
    { label: 'Role', cls: 'bg-foreground' },
    { label: 'Case study', cls: 'bg-accent-brand' },
    { label: 'Product area', cls: 'bg-track-ic' },
    { label: 'Figure', cls: 'bg-card shadow-[inset_0_0_0_2px_var(--accent-brand)]' },
  ]
  return (
    <ul aria-label="Legend" className="ml-auto flex items-center gap-4">
      {items.map((i) => (
        <li key={i.label} className="label-micro flex items-center gap-1.5 text-muted-foreground">
          <span aria-hidden="true" className={'size-2.5 rounded-full ' + i.cls} />
          {i.label}
        </li>
      ))}
    </ul>
  )
}
