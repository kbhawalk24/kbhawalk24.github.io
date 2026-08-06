'use client'

import { motion } from 'motion/react'
import { STATS } from '@/lib/timeline-data'
import { AnimatedStat, Reveal } from '@/components/motion-primitives'

export function ImpactSection() {
  return (
    <section
      id="impact"
      aria-labelledby="impact-heading"
      className="border-b border-border scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <Reveal>
          <p className="font-sans text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Impact
          </p>
          <h2
            id="impact-heading"
            className="mt-3 font-serif text-3xl tracking-tight md:text-4xl"
          >
            Outcomes, in numbers
          </h2>

          <motion.dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-card p-5 transition-colors hover:bg-secondary md:p-6"
              >
                <dd className="font-serif text-3xl tracking-tight md:text-4xl">
                  <AnimatedStat value={stat.value} />
                </dd>
                <dt className="mt-2 block text-xs leading-relaxed text-muted-foreground md:text-sm">
                  {stat.label}
                </dt>
              </div>
            ))}
          </motion.dl>
        </Reveal>
      </div>
    </section>
  )
}
