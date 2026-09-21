import { cn } from '@/lib/utils'

// The small accent dot that follows section headings — a signature from the
// portfolio deck this site's style was matched to.
export function HeadingDot({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn('ml-2 inline-block size-2 rounded-full bg-accent-brand align-middle', className)}
    />
  )
}
