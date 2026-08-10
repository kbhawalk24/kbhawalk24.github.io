import { TRACKS, type Track } from '@/lib/timeline-data'
import { trackStyles } from '@/lib/track-styles'
import { cn } from '@/lib/utils'

export function TrackBadge({
  track,
  className,
}: {
  track: Track
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-widest',
        trackStyles[track].badge,
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn('size-1.5 rounded-full', trackStyles[track].dot)}
      />
      {TRACKS[track].label}
    </span>
  )
}
