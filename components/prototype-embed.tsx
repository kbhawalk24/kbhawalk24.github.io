'use client'

import { useState } from 'react'
import { MousePointerClick } from 'lucide-react'

// A Figma prototype that loads nothing from Figma until it is asked for. The
// still frame is the prototype's first screen, and a click swaps in the live
// embed. Only used when the file is shared publicly; otherwise the page shows
// the still alone, so nobody meets a Figma login.

export function PrototypeEmbed({
  embed,
  poster,
  width,
  height,
  alt,
}: {
  embed: string
  poster: string
  width: number
  height: number
  alt: string
}) {
  const [live, setLive] = useState(false)
  return (
    <div className="relative overflow-hidden rounded-[10px] bg-card-soft" style={{ aspectRatio: `${width} / ${height}` }}>
      {live ? (
        <iframe src={embed} title={alt} allowFullScreen className="absolute inset-0 h-full w-full border-0" />
      ) : (
        <button
          type="button"
          onClick={() => setLive(true)}
          className="group absolute inset-0 h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-brand"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={poster} alt={alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          <span className="absolute bottom-4 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-4 py-2.5 font-sans text-sm font-semibold text-background shadow-soft transition-transform duration-150 ease-out group-hover:-translate-y-0.5 group-active:scale-95">
            <MousePointerClick className="size-4" aria-hidden="true" />
            Try the prototype
          </span>
        </button>
      )}
    </div>
  )
}
