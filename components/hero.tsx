'use client'

import { Code, Database, Sparkles, type LucideIcon } from 'lucide-react'
import { motion } from 'motion/react'

import { HeroWheel } from '@/components/hero-wheel'
import { EASE_OUT } from '@/components/motion-primitives'
import { HERO } from '@/lib/home-content'
import { cn } from '@/lib/utils'

// The hero: who I am in one line of pills, three lines of history, the
// buttons, and the lifecycle wheel beside it. Still, two columns from `md`
// up, the wheel under the words on a phone.

const ICONS: Record<string, LucideIcon> = { sparkles: Sparkles, database: Database, code: Code }

const OUTLINE_BUTTON =
  'inline-flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-foreground ring-1 ring-foreground/10 transition-[background-color,box-shadow] hover:bg-secondary hover:ring-foreground/25'

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE_OUT },
})

export function Hero() {
  return (
    <section id="hero" className="relative">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-12 pt-28 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] md:gap-16 md:px-10 md:pb-16 md:pt-36 lg:px-14">
        <div>
          <motion.p {...rise(0)} className="label-micro max-w-[34rem] text-muted-foreground">
            {HERO.eyebrow}
          </motion.p>

          <motion.h1 {...rise(0.08)} className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-3 font-heading text-[clamp(1.75rem,2.9vw,2.5rem)] font-bold leading-none tracking-tight text-foreground">
            <span className="font-semibold">{HERO.lead}</span>
            {HERO.fields.map((f, i) => {
              const Icon = ICONS[f.icon]
              return (
                <span key={f.label} className="contents">
                  <span
                    className={cn(
                      'inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 sm:whitespace-nowrap',
                      f.filled ? 'bg-track-management/12 text-track-management' : 'ring-2 ring-foreground',
                    )}
                  >
                    <Icon className="size-[0.7em] shrink-0" strokeWidth={2.25} aria-hidden="true" />
                    {f.label}
                  </span>
                  {i === HERO.fields.length - 2 && <span className="font-semibold">&amp;</span>}
                </span>
              )
            })}
          </motion.h1>

          <motion.p {...rise(0.16)} className="mt-7 max-w-[34rem] text-pretty font-sans text-lg leading-[1.6] text-foreground">
            {HERO.paragraph}
          </motion.p>

          <motion.ul {...rise(0.24)} className="mt-8 flex flex-col gap-3 border-t border-border pt-8 font-sans text-base leading-[1.6] text-foreground">
            {HERO.history.map((h) => (
              <li key={h.org}>
                <span className="font-semibold">
                  <span translate="no">{h.org}</span> · {h.period}.
                </span>{' '}
                <span className="text-foreground/85">{h.text}</span>
                {'pills' in h &&
                  h.pills?.map((p, i, all) => (
                    <span key={p.label}>
                      {' '}
                      <a
                        href={p.href}
                        className="inline-flex items-center gap-1 rounded-full bg-track-management/10 px-2.5 py-0.5 font-medium text-track-management transition-colors hover:bg-track-management/20"
                      >
                        {p.label} <span aria-hidden="true">↓</span>
                      </a>
                      {i < all.length - 1 && <span className="text-foreground/85"> and</span>}
                    </span>
                  ))}
                {'strong' in h && <span className="font-semibold"> {h.strong}</span>}
                {'tail' in h && <span className="text-foreground/85">{h.tail}</span>}
              </li>
            ))}
          </motion.ul>

          <motion.div {...rise(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-cta transition-[box-shadow,transform] hover:shadow-cta-hover active:scale-[0.98]"
            >
              Work <span aria-hidden="true">↓</span>
            </a>
            <a href="/kanchi-bhawalkar-resume.pdf" target="_blank" rel="noopener noreferrer" className={OUTLINE_BUTTON}>
              Resume <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="https://linkedin.com/in/kanchib" target="_blank" rel="noopener noreferrer" className={OUTLINE_BUTTON}>
              LinkedIn <span aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </motion.div>

          <motion.p {...rise(0.4)} className="mt-7 flex items-center gap-2.5 font-sans text-base text-foreground">
            <span className="size-2 shrink-0 rounded-full bg-track-ic" aria-hidden="true" />
            <span>
              <span className="font-semibold">{HERO.exploring.label}</span> {HERO.exploring.text}
            </span>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT }}
          className="w-full md:justify-self-end"
        >
          <HeroWheel />
        </motion.div>
      </div>
    </section>
  )
}
