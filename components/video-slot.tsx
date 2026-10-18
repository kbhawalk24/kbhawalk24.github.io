'use client'

import { useReducedMotion } from '@/lib/use-reduced-motion'

/** A short muted looping clip with a poster. Under reduced motion only the
 *  poster renders. */
export function VideoSlot({ src, poster, alt }: { src: string; poster?: string; alt: string }) {
  const reduced = useReducedMotion()

  if (reduced && poster) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={alt} loading="lazy" className="w-full rounded-[14px] bg-card shadow-soft" />
  }
  return (
    <video
      src={src}
      poster={poster}
      muted
      loop
      autoPlay
      playsInline
      preload="metadata"
      aria-label={alt}
      className="w-full rounded-[14px] bg-card shadow-soft"
    />
  )
}
