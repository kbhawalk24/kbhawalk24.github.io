import type { Metadata } from 'next'
import { TimelinePage } from '@/components/timeline-page'

export const metadata: Metadata = {
  title: 'Career timeline | Kanchi Bhawalkar',
  description:
    'The career drawn as a lineage graph: TIBCO and 605 upstream, the founding years at Intuit, the data platform, and what it fed: Search 2.0, the agent and the team.',
}

export default function Page() {
  return <TimelinePage />
}
