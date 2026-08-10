import { trackStyles } from '@/lib/track-styles'
import { cn } from '@/lib/utils'
import type { Track } from '@/lib/timeline-data'

export type MockVariant = 'dashboard' | 'list' | 'flow'

// Abstract, monochrome line-art placeholders in the same restrained style as
// the hero illustration — a stand-in for a real screenshot/diagram until one
// exists. One accent shape per card picks up the entry's track color; the
// rest is neutral so a page of these doesn't turn into a color soup.
function DashboardMock() {
  return (
    <svg viewBox="0 0 240 130" fill="none" className="h-full w-full">
      <rect x="8" y="8" width="224" height="114" rx="10" className="stroke-border" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="2.5" className="fill-muted-foreground/40" />
      <circle cx="31" cy="22" r="2.5" className="fill-muted-foreground/40" />
      <circle cx="40" cy="22" r="2.5" className="fill-muted-foreground/40" />
      <line x1="8" y1="32" x2="232" y2="32" className="stroke-border" strokeWidth="1.5" />
      <rect x="20" y="46" width="24" height="60" rx="4" className="stroke-muted-foreground/50" strokeWidth="1.5" />
      <rect x="52" y="60" width="24" height="46" rx="4" className="stroke-muted-foreground/50" strokeWidth="1.5" />
      <rect x="84" y="38" width="24" height="68" rx="4" strokeWidth="1.5" style={{ stroke: 'currentColor' }} />
      <rect x="116" y="52" width="24" height="54" rx="4" className="stroke-muted-foreground/50" strokeWidth="1.5" />
      <path
        d="M20 96 L44 82 L68 90 L92 60 L116 74 L140 58"
        className="stroke-muted-foreground/40"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="164" y1="46" x2="220" y2="46" className="stroke-muted-foreground/40" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="164" y1="58" x2="212" y2="58" className="stroke-muted-foreground/30" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="164" y1="70" x2="216" y2="70" className="stroke-muted-foreground/30" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="164" y="86" width="56" height="20" rx="10" style={{ stroke: 'currentColor' }} strokeWidth="1.5" />
    </svg>
  )
}

function ListMock() {
  return (
    <svg viewBox="0 0 240 130" fill="none" className="h-full w-full">
      <rect x="8" y="8" width="224" height="114" rx="10" className="stroke-border" strokeWidth="1.5" />
      <rect x="20" y="20" width="140" height="16" rx="8" className="stroke-muted-foreground/50" strokeWidth="1.5" />
      <circle cx="132" cy="28" r="3" className="fill-muted-foreground/40" />
      <circle cx="144" cy="28" r="3" className="fill-muted-foreground/40" />
      {[52, 70, 88, 106].map((y, i) => (
        <g key={y}>
          <circle
            cx="26"
            cy={y}
            r="4"
            strokeWidth="1.5"
            style={i === 1 ? { stroke: 'currentColor' } : undefined}
            className={i === 1 ? undefined : 'stroke-muted-foreground/40'}
          />
          <line
            x1="38"
            y1={y}
            x2={200 - i * 18}
            y2={y}
            strokeWidth="1.5"
            strokeLinecap="round"
            className={i === 1 ? undefined : 'stroke-muted-foreground/30'}
            style={i === 1 ? { stroke: 'currentColor', opacity: 0.7 } : undefined}
          />
        </g>
      ))}
    </svg>
  )
}

function FlowMock() {
  return (
    <svg viewBox="0 0 240 130" fill="none" className="h-full w-full">
      <rect x="8" y="8" width="224" height="114" rx="10" className="stroke-border" strokeWidth="1.5" />
      <line x1="60" y1="65" x2="118" y2="38" className="stroke-muted-foreground/35" strokeWidth="1.5" />
      <line x1="60" y1="65" x2="118" y2="92" className="stroke-muted-foreground/35" strokeWidth="1.5" />
      <line x1="118" y1="38" x2="178" y2="65" strokeWidth="1.5" style={{ stroke: 'currentColor', opacity: 0.7 }} />
      <line x1="118" y1="92" x2="178" y2="65" className="stroke-muted-foreground/35" strokeWidth="1.5" />
      <circle cx="60" cy="65" r="9" className="stroke-muted-foreground/50" strokeWidth="1.5" />
      <circle cx="118" cy="38" r="7" className="stroke-muted-foreground/50" strokeWidth="1.5" />
      <circle cx="118" cy="92" r="7" className="stroke-muted-foreground/50" strokeWidth="1.5" />
      <circle cx="178" cy="65" r="11" strokeWidth="1.5" style={{ stroke: 'currentColor' }} />
      <circle cx="178" cy="65" r="3" style={{ fill: 'currentColor' }} />
    </svg>
  )
}

const VARIANTS: Record<MockVariant, () => React.JSX.Element> = {
  dashboard: DashboardMock,
  list: ListMock,
  flow: FlowMock,
}

export function MockPlaceholder({
  track,
  variant,
  className,
}: {
  track: Track
  variant: MockVariant
  className?: string
}) {
  const Variant = VARIANTS[variant]
  return (
    <div
      aria-hidden="true"
      className={cn(
        'flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-md border border-border/60 bg-background p-3',
        trackStyles[track].accentText,
        className,
      )}
    >
      <Variant />
    </div>
  )
}
