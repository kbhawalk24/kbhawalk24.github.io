'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { ROLES, TRACKS, type Track } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { EASE_OUT, Reveal } from '@/components/motion-primitives'
import { HeadingDot } from '@/components/heading-dot'

// The career timeline: each role is a row on the page, separated by a
// hairline, with the role facts on the left and every highlight of the
// role written out on the right. No links from here: the
// case studies live in the Work section above (components/case-study-index.tsx).
// Within a role the highlights are grouped by track (management, strategy,
// IC craft) as white cards, two across, with the stat in the track colour.

const TRACK_ORDER: Track[] = ['management', 'strategy', 'ic']

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

                <div className="mt-8 min-w-0 grid gap-8 sm:mt-0">
                  {TRACK_ORDER.map((track) => {
                    const entries = role.entries.filter((e) => e.track === track)
                    if (entries.length === 0) return null
                    return (
                      <div key={track}>
                        <p className={cn('label-micro', trackStyles[track].accentText)}>
                          {TRACKS[track].label} highlights
                        </p>
                        <ul className="mt-3 grid gap-4 md:grid-cols-2">
                          {entries.map((entry) => (
                            <li key={entry.headline} className="rounded-[14px] bg-card p-5 shadow-soft sm:p-6">
                              <h4 className="text-pretty font-heading text-lg font-semibold leading-snug tracking-tight">
                                {entry.headline}
                              </h4>
                              <p className="mt-1.5 text-pretty font-sans text-base leading-relaxed text-muted-foreground">
                                {entry.detail}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
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
