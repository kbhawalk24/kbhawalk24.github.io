'use client'

import { HOW_I_LEAD } from '@/lib/home-content'
import { Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// "How I lead": the framing sentence and four numbered habits, two per row
// on wide screens.

export function HowILead() {
  return (
    <section id="how-i-lead" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pt-20 md:px-10 md:pt-28 lg:px-14">
        <Reveal className="max-w-3xl">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            {HOW_I_LEAD.heading}
            <HeadingDot />
          </h2>
          <p className="mt-3 font-sans text-lg text-muted-foreground">{HOW_I_LEAD.subtitle}</p>
          <p className="mt-6 max-w-[62ch] text-pretty font-sans text-lg leading-[1.6] text-foreground">
            {HOW_I_LEAD.framing}
          </p>
        </Reveal>
        <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
          {HOW_I_LEAD.habits.map((habit, i) => (
            <Reveal key={habit.title} as="li" delay={Math.min(i, 3) * 0.06} className="max-w-[62ch]">
              <p className="label-micro text-accent-brand">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-2 text-balance font-heading text-xl font-semibold leading-tight tracking-tight">
                {habit.title}
              </h3>
              <p className="mt-2 text-pretty font-sans text-base leading-[1.6] text-foreground">{habit.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
