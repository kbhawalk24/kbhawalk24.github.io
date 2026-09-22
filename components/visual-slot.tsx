import type { Visual } from '@/lib/site-content'

/** A chapter's image/video: a real asset once one exists, a labeled dashed
 *  placeholder until then. Shared by the case-study pages and the timeline's
 *  inline chapter expansion so both stay visually identical. */
export function VisualSlot({ visual }: { visual: Visual }) {
  if (visual.src) {
    return (
      <figure className="overflow-hidden rounded-[14px] bg-card">
        <div>
          {visual.kind === 'video' ? (
            <video src={visual.src} controls muted playsInline className="w-full" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={visual.src} alt={visual.caption} className="w-full" />
          )}
          <figcaption className="px-4 py-3 text-xs text-muted-foreground">{visual.caption}</figcaption>
        </div>
      </figure>
    )
  }
  return (
    <figure className="flex min-h-40 flex-col justify-end rounded-[14px] border border-dashed border-border bg-card p-4">
      <p className="label-micro text-muted-foreground">
        {visual.kind === 'video' ? 'Video needed' : 'Image needed'}
      </p>
      <figcaption className="mt-1 text-sm text-muted-foreground">{visual.caption}</figcaption>
    </figure>
  )
}
