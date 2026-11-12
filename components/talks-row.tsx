'use client'

import { TALKS } from '@/lib/home-content'
import { Reveal } from '@/components/motion-primitives'

// Two talks the work was shown in, as one card under the case studies.
// PLACEHOLDERS (11 Nov 2026): the thumbnails are drawn and nothing links yet.
// When the video links and thumbnails arrive, each item becomes an <a> with
// event('talk', { talk }) and a real image; until then this is not shippable.

export function TalksRow() {
  return (
    <section aria-label="Talks" className="relative z-10">
      <div className="mx-auto max-w-6xl px-6 pb-20 md:px-10 lg:px-14">
        <Reveal>
          <ul className="flex flex-wrap gap-x-12 gap-y-7 rounded-[18px] bg-card px-8 py-7 shadow-soft">
            {TALKS.map((t) => (
              <li key={t.title} className="flex min-w-0 flex-[1_1_26rem] flex-wrap items-center gap-5">
                <div
                  role="img"
                  aria-label={`Video thumbnail for ${t.title}, to come`}
                  className="relative aspect-video w-52 flex-none overflow-hidden rounded-[12px] bg-gradient-to-br from-accent-brand to-[#142f5c]"
                >
                  <span className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white">
                    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18">
                      <path d="M5 2.5 L15 9 L5 15.5 Z" fill="var(--accent-brand)" />
                    </svg>
                  </span>
                  <span className="absolute bottom-2 left-2.5 font-mono text-xs tracking-[0.08em] text-white">Video thumbnail</span>
                </div>
                <div className="flex min-w-0 flex-[1_1_11rem] flex-col gap-1.5">
                  <p className="label-micro text-muted-foreground">{t.kicker}</p>
                  <p className="font-heading text-[22px] font-semibold leading-[1.2] tracking-[-0.015em] text-foreground">{t.title}</p>
                  <p className="font-sans text-base leading-normal text-muted-foreground">
                    {t.text} <span className="font-bold text-accent-brand">Watch →</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
