import type { Metadata } from 'next'
import { ShortPageLayout } from '@/components/short-page'
import { SIX_O_FIVE } from '@/lib/pages/605-tv-analytics'

export const metadata: Metadata = {
  title: `${SIX_O_FIVE.title} | Kanchi Bhawalkar`,
  description: SIX_O_FIVE.description,
}

export default function Page() {
  return <ShortPageLayout page={SIX_O_FIVE} />
}
