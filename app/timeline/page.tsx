import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { CareerTimeline } from '@/components/career-timeline'

export const metadata: Metadata = {
  title: 'Timeline',
  description: 'The chronological history: Intuit from 2021, 605 from 2017, by IC design, strategy and team delivery.',
}

export default function Page() {
  return (
    <SiteShell>
      <CareerTimeline />
    </SiteShell>
  )
}
