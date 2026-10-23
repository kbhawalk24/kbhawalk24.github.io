'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { PageHero } from '@/lib/pages/types'
import { tintPanel } from '@/lib/tint'

// The prototype clip that opens a case study. Muted and looping, it starts
// on its own once it is on screen and stops when it scrolls away. A visitor
// who prefers reduced motion sees the poster frame and starts it themselves.
// The button keeps it pausable either way (WCAG 2.2.2).

export function HeroVideo({ hero, className }: { hero: PageHero; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [userPaused, setUserPaused] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v || reduce || userPaused) return
    // Start at once when it is already on screen; the observer then handles
    // scrolling away and back.
    const r = v.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) v.play().catch(() => {})
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold: 0.25 },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [reduce, userPaused])

  function toggle() {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      setUserPaused(false)
      v.play().catch(() => {})
    } else {
      setUserPaused(true)
      v.pause()
    }
  }

  return (
    <figure className={cn('rounded-[18px] bg-card p-2 shadow-soft sm:p-3', className)}>
      <div className="rounded-[12px] p-[5%]" style={tintPanel(hero.tint)}>
      <div className="relative overflow-hidden rounded-[8px] shadow-[0_24px_48px_-16px_rgb(20_20_20/0.28)] ring-1 ring-foreground/10">
        <video
          ref={ref}
          src={hero.src}
          poster={hero.poster}
          width={hero.width}
          height={hero.height}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={hero.alt}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className="block h-auto w-full bg-card-soft"
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? 'Pause the prototype video' : 'Play the prototype video'}
          className="absolute bottom-3 right-3 inline-flex size-10 items-center justify-center rounded-full bg-foreground/80 text-background shadow-soft transition-[background-color,transform] duration-150 ease-out hover:bg-foreground active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand focus-visible:ring-offset-2"
        >
          {playing ? <Pause className="size-4" aria-hidden="true" /> : <Play className="size-4 translate-x-px" aria-hidden="true" />}
        </button>
      </div>
      </div>
      <figcaption className="px-2 pb-2 pt-3 text-pretty font-sans text-sm leading-relaxed text-muted-foreground">
        {hero.caption}
      </figcaption>
    </figure>
  )
}
