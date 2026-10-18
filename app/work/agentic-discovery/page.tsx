import type { Metadata } from 'next'
import { ShortPageLayout } from '@/components/short-page'
import { AGENTIC_DISCOVERY } from '@/lib/pages/agentic-discovery'

export const metadata: Metadata = {
  title: `${AGENTIC_DISCOVERY.title} | Kanchi Bhawalkar`,
  description: AGENTIC_DISCOVERY.description,
}

export default function Page() {
  return <ShortPageLayout page={AGENTIC_DISCOVERY} />
}
