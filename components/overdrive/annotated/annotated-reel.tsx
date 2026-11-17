'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'
import { Pause, Play } from 'lucide-react'

import { event } from '@/lib/analytics'

// The hero's product stage on the annotated landing option (16 Nov 2026):
// four clips of the rebuilt data discovery prototype, one frame. The four
// labels pinned around the frame are its controls: each plays its clip, and
// the reel moves to the next one when a clip ends. It plays only while on
// screen; with reduced motion it shows the still and waits for Play.
// The clips are recordings of the prototype with sample data; the account
// picture in its top bar is covered.

const CLIPS = [
  { id: 'search-lineage', file: '1-search-lineage', label: 'search and lineage', at: [7, 30], alt: 'The prototype: a search for “tax” across data products, tables and topics, then a table’s lineage.' },
  { id: 'data-map', file: '2-data-map', label: 'data map', at: [93, 30], alt: 'The prototype: a data product’s page in the Data Map, with its tables, attributes and topics.' },
  { id: 'data-management', file: '3-data-management', label: 'data management', at: [7, 64], alt: 'The prototype: a data owner’s list of assets with the gaps to fix highlighted.' },
  { id: 'data-copilot', file: '4-data-copilot', label: 'data copilot', at: [93, 64], alt: 'The prototype: a plain question about a table answered with SQL by the data copilot.' },
] as const

const DOTS = {
  backgroundImage: 'radial-gradient(circle, currentColor 38%, transparent 44%)',
  backgroundSize: '5px 4px',
  backgroundRepeat: 'repeat-x',
  backgroundPosition: '0 100%',
}

export function AnnotatedReel() {
  const reduce = useReducedMotion() === true
  const [i, setI] = useState(0)
  const [wanted, setWanted] = useState(true)
  const [playing, setPlaying] = useState(false)
  const [inView, setInView] = useState(false)
  const frame = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const clip = CLIPS[i]

  useEffect(() => {
    if (reduce) setWanted(false)
  }, [reduce])

  useEffect(() => {
    const el = frame.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (wanted && inView) v.play().catch(() => {})
    else v.pause()
  }, [wanted, inView, i])

  const select = (next: number) => {
    setI(next)
    setWanted(true)
  }

  const tag = (n: number, extra: string, style?: React.CSSProperties) => {
    const c = CLIPS[n]
    const on = n === i
    return (
      <button
        key={c.id}
        type="button"
        aria-pressed={on}
        onClick={() => select(n)}
        {...event('overdrive', { page: 'annotated', item: `clip-${c.id}` })}
        style={style}
        className={`min-h-11 whitespace-nowrap rounded-lg border-2 border-[#161c28] px-3 font-sans text-[17px] font-bold shadow-[3px_3px_0_#161c28] transition-[background-color,color,translate,box-shadow] duration-150 active:translate-x-px active:translate-y-px active:shadow-[2px_2px_0_#161c28] ${
          on ? 'bg-[#161c28] text-white' : 'bg-white text-[#161c28] hover:bg-[#f6d95a]'
        } ${extra}`}
      >
        <span className={`pb-1 ${on ? 'text-white' : 'text-[#2a62c9]'}`} style={DOTS}>
          <span className={on ? 'text-white' : 'text-[#161c28]'}>{c.label}</span>
        </span>
      </button>
    )
  }

  return (
    <div className="pb-10 xl:pb-14">
      {/* Below xl the labels sit in a row over the frame. */}
      <div role="group" aria-label="Prototype clips" className="mb-4 flex flex-wrap gap-2.5 xl:hidden">
        {CLIPS.map((_, n) => tag(n, ''))}
      </div>
      <div className="relative">
        <div ref={frame} className="relative overflow-hidden rounded-2xl border-2 border-[#161c28] bg-white xl:mx-[14.1%] xl:shadow-[8px_8px_0_#161c28]">
          <video
            key={clip.id}
            ref={video}
            src={`/work/dde-rebuild/${clip.file}.mp4`}
            poster={`/work/dde-rebuild/${clip.file}.jpg`}
            muted
            playsInline
            preload="none"
            aria-label={clip.alt}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => setI((n) => (n + 1) % CLIPS.length)}
            className="block aspect-[3200/1744] h-auto w-full"
          />
          {/* Covers the account picture in the prototype's top bar. */}
          <span aria-hidden="true" className="absolute left-[98.2%] top-[3.35%] aspect-square w-[2.5%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9ced8]" />
        </div>
        {/* From xl up the labels are pinned around the frame, each on a line. */}
        <svg aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute inset-0 hidden size-full xl:block">
          {CLIPS.map((c) => (
            <line key={c.id} x1={c.at[0]} y1={c.at[1]} x2={c.at[0] < 50 ? 17 : 83} y2={c.at[1]} stroke="#161c28" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {CLIPS.map((c) => (
          <span
            key={c.id}
            aria-hidden="true"
            className="absolute hidden size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#161c28] xl:block"
            style={{ left: `${c.at[0] < 50 ? 17 : 83}%`, top: `${c.at[1]}%` }}
          />
        ))}
        <div role="group" aria-label="Prototype clips" className="hidden xl:block">
          {CLIPS.map((c, n) => tag(n, 'absolute -translate-x-1/2 -translate-y-1/2', { left: `${c.at[0]}%`, top: `${c.at[1]}%` }))}
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4 xl:mx-[14.1%]">
        <button
          type="button"
          onClick={() => setWanted(!playing)}
          {...event('clip', { card: `annotated-${clip.id}`, action: playing ? 'pause' : 'play' })}
          className="inline-flex min-h-11 items-center gap-2 font-sans text-[15px] font-bold text-[#161c28] hover:text-accent-brand"
        >
          {playing ? <Pause aria-hidden="true" className="size-4" /> : <Play aria-hidden="true" className="size-4" />}
          {playing ? 'Pause' : 'Play'}
        </button>
        <p className="font-sans text-[15px] tabular-nums text-[#161c28]/70" aria-live="polite">
          {i + 1} of {CLIPS.length}: {clip.label}
        </p>
      </div>
    </div>
  )
}
