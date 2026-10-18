import { cn } from '@/lib/utils'

/** The external-link glyph plus the screen-reader note, for every link that
 *  opens in a new tab. */
export function ExternalGlyph({ className }: { className?: string }) {
  return (
    <>
      <span aria-hidden="true" className={cn('text-[0.85em] leading-none', className)}>
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  )
}

export function ExternalLink({
  href,
  className,
  children,
}: {
  href: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ExternalGlyph />
    </a>
  )
}
