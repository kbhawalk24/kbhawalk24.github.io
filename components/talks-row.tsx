'use client'

import { TALKS } from '@/lib/home-content'
import { event } from '@/lib/analytics'
import { Reveal } from '@/components/motion-primitives'

// Two talks the work was shown in, as one card under the case studies. Each
// opens the YouTube video at Intuit's segment in a new tab (12 Nov 2026; the
// videos used to be embedded inside the catalog and data-agent case studies).

export function TalksRow() {
  return (
    <section id="talks" aria-label="Talks" className="relative z-10 scroll-mt-28">
      <div className="mx-auto max-w-6xl px-6 pb-20 md:px-10 lg:px-14">
        <Reveal>
          <ul className="flex flex-wrap gap-x-12 gap-y-7 rounded-[18px] bg-card px-8 py-7 shadow-soft">
            {TALKS.map((t) => (
              <li key={t.id} className="flex min-w-0 flex-[1_1_26rem]">
                <a
                  href={t.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...event('talk', { talk: t.id })}
                  className="group flex min-w-0 flex-1 flex-wrap items-center gap-5 rounded-[14px]"
                >
                  <span className="relative aspect-video w-52 flex-none overflow-hidden rounded-[12px] bg-accent-brand">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`https://i.ytimg.com/vi/${t.youtube}/hqdefault.jpg`}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-soft">
                      <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M5 2.5 L15 9 L5 15.5 Z" fill="var(--accent-brand)" />
                      </svg>
                    </span>
                  </span>
                  <span className="flex min-w-0 flex-[1_1_11rem] flex-col gap-1.5">
                    <span className="label-micro text-muted-foreground">{t.kicker}</span>
                    <span className="font-heading text-[22px] font-semibold leading-[1.2] tracking-[-0.015em] text-foreground">{t.title}</span>
                    <span className="font-sans text-base leading-normal text-muted-foreground">
                      {t.text}{' '}
                      <span className="font-bold text-accent-brand group-hover:underline">
                        Watch <span aria-hidden="true">↗</span>
                      </span>
                      <span className="sr-only"> (opens YouTube in a new tab)</span>
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
