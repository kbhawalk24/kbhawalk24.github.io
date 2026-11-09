import type { Metadata } from 'next'
import { ShortPageLayout } from '@/components/short-page'
import { LEADING_THE_TEAM } from '@/lib/pages/leading-the-team'

export const metadata: Metadata = {
  title: `${LEADING_THE_TEAM.title} | Kanchi Bhawalkar`,
  description: LEADING_THE_TEAM.description,
}

export default function Page() {
  return <ShortPageLayout page={LEADING_THE_TEAM} />
}
