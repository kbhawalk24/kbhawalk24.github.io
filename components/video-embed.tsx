'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

// A YouTube video that loads nothing from YouTube until it is played: the
// still frame is the video's own thumbnail, and a click swaps in the
// player (privacy-enhanced domain, starting at `start` seconds).

export function VideoEmbed({ id, start = 0, title }: { id: string; start?: number; title: string }) {
  const [playing, setPlaying] = useState(false)
  const src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&start=${start}&rel=0`
  return (
    <div className="relative overflow-hidden rounded-[12px] bg-foreground/5" style={{ aspectRatio: '16 / 9' }}>
      {playing ? (
        <iframe
          src={src}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play: ${title}`}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- a remote thumbnail; the site's images are unoptimized anyway */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-foreground/10 transition-colors group-hover:bg-foreground/20" aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex size-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-cta transition-transform duration-150 ease-out motion-safe:group-hover:scale-105"
          >
            <Play className="ml-0.5 size-6" fill="currentColor" />
          </span>
        </button>
      )}
    </div>
  )
}
