'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { ROLES } from '@/lib/timeline-data'
import { EASE_OUT, Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// The career timeline: each role is a row on the page, separated by a
// hairline, with the role facts on the left and every highlight of the
// role written out as a plain list on the right. No cards, no links: the
// case studies live in the Work section above (components/case-study-index.tsx).

// Falls back to the plain company name if the logo image 404s (or none was
// given), rather than letting a broken-image glyph render.
function CompanyMark({ logo, name }: { logo?: string; name: string }) {
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    if (!logo) return
    let cancelled = false
    const probe = new window.Image()
    probe.onload = () => !cancelled && setErrored(false)
    probe.onerror = () => !cancelled && setErrored(true)
    probe.src = logo
    return () => {
      cancelled = true
    }
  }, [logo])

  if (!logo || errored) {
    return <p className="mt-1 font-sans text-lg font-semibold text-accent-brand">{name}</p>
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo}
      alt={name}
      onError={() => setErrored(true)}
      className="mt-2 inline-block h-5 w-auto"
    />
  )
}


export function CareerTimeline() {

  return (
    <section id="timeline" className="scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-10 md:py-28 lg:px-14">
        <Reveal className="mb-8">
          <h2 className="font-heading text-3xl font-semibold tracking-tight md:text-4xl">
            Career timeline
            <HeadingDot />
          </h2>
        </Reveal>

        <ol className="divide-y divide-border">
          {ROLES.map((role) => {
            return (
              <motion.li
                key={role.id}
                id={role.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, ease: EASE_OUT }}
                className={cn(
                  'py-12 transition-opacity duration-300 first:pt-0 sm:grid sm:grid-cols-[minmax(220px,300px)_1fr] sm:gap-10 md:py-16 lg:gap-14',
                )}
              >
                <div>
                  <p className="label-micro tabular-nums text-muted-foreground">{role.period}</p>
                  <h3 className="mt-3 text-balance font-heading text-2xl font-semibold leading-tight tracking-tight">
                    {role.title}
                  </h3>
                  <CompanyMark logo={role.companyLogo} name={role.company} />
                  <p className="mt-3 label-micro text-muted-foreground">{role.location}</p>
                  <p className="mt-4 max-w-[42ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
                    {role.summary}
                  </p>
                </div>

                <div className="mt-8 min-w-0 sm:mt-0">
                  <p className="label-micro text-muted-foreground">Highlights</p>
                  <ul className="mt-3 divide-y divide-border">
                    {role.entries.map((entry) => (
                      <li key={entry.headline} className="py-5 first:pt-0 last:pb-0">
                        <h4 className="text-pretty font-heading text-lg font-semibold leading-snug tracking-tight">
                          {entry.headline}
                        </h4>
                        <p className="mt-1.5 max-w-[62ch] text-pretty font-sans text-base leading-relaxed text-muted-foreground">
                          {entry.detail}
                        </p>
                        {entry.metrics && entry.metrics.length > 0 && (
                          <p className="mt-2 font-sans text-sm leading-relaxed text-muted-foreground">
                            {entry.metrics.map((m, i) => (
                              <span key={m.label}>
                                {i > 0 && ' · '}
                                <span className="font-semibold tabular-nums text-foreground">{m.value}</span> {m.label}
                              </span>
                            ))}
                          </p>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            )
          })}
        </ol>

        <Reveal className="mt-4 border-t border-border pt-12 md:pt-16">
          <p className="label-micro text-muted-foreground">Education</p>
          <div className="mt-3 grid gap-2 font-sans text-base">
            <p>
              <span className="font-semibold">MS in Information, Human-Computer Interaction</span>{' '}
              <span className="text-muted-foreground">- University of Michigan, Ann Arbor (2017)</span>
            </p>
            <p>
              <span className="font-semibold">BE in Computer Engineering</span>{' '}
              <span className="text-muted-foreground">- University of Pune (2012)</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
