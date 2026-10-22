import type { Metadata } from 'next'
import { TimelinePage } from '@/components/timeline-page'

export const metadata: Metadata = {
  title: 'Career timeline | Kanchi Bhawalkar',
  description:
    'Every role, with the work that mattered under it: the data platform at Intuit as founding designer, principal and design manager, and three products at 605 before that.',
}

export default function Page() {
  return <TimelinePage />
}
