import { cn } from '@/lib/utils'
import { VideoSlot } from '@/components/video-slot'

export interface VisualSlotProps {
  id: string
  /** Required. What the image will show, for readers without images; the
   *  build check fails a slot without it. */
  alt: string
  caption?: string
  /** CSS aspect ratio, e.g. "16 / 9". */
  aspect?: string
  status?: 'placeholder' | 'final'
  /** For status="final": the file under public/work/<slug>/. */
  src?: string
  /** Video only: the still shown before play and under reduced motion. */
  poster?: string
  kind?: 'image' | 'video' | 'viz'
  className?: string
  /** Smaller caption and no outer margin, for the card covers. */
  compact?: boolean
}

/** A figure on a page: a neutral box carrying the caption and alt text while
 *  the slot is a placeholder, the lazy-loaded image or muted looping video
 *  once it is final. The page must read correctly with images disabled, so
 *  alt and caption carry the content in both states. */
export function VisualSlot({
  id,
  alt,
  caption,
  aspect = '16 / 9',
  status = 'placeholder',
  src,
  poster,
  kind = 'image',
  className,
  compact = false,
}: VisualSlotProps) {
  const captionClass = cn('text-muted-foreground', compact ? 'mt-2 text-xs' : 'mt-3 text-sm')
  const isFinal = status === 'final' && src

  return (
    <figure
      data-visual-slot={id}
      data-status={isFinal ? 'final' : 'placeholder'}
      data-kind={kind}
      data-alt={alt}
      className={cn(!compact && 'my-8', className)}
    >
      {isFinal ? (
        kind === 'video' ? (
          <VideoSlot src={src} poster={poster} alt={alt} />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="w-full rounded-[14px] bg-card shadow-soft"
            style={{ aspectRatio: aspect, objectFit: 'cover' }}
          />
        )
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="placeholder-stripes flex items-end overflow-hidden rounded-[14px] bg-card-soft"
          style={{ aspectRatio: aspect }}
        >
          <p
            aria-hidden="true"
            className={cn(
              'm-3 line-clamp-3 rounded-[8px] bg-card/90 px-3 py-2 font-sans text-muted-foreground',
              compact ? 'text-xs' : 'text-sm',
            )}
          >
            {alt}
          </p>
        </div>
      )}
      {caption && <figcaption className={captionClass}>{caption}</figcaption>}
    </figure>
  )
}
