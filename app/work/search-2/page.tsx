import type { Metadata } from 'next'
import { ShortPageLayout } from '@/components/short-page'
import { SEARCH_2 } from '@/lib/pages/search-2'

export const metadata: Metadata = {
  title: `${SEARCH_2.title} | Kanchi Bhawalkar`,
  description: SEARCH_2.description,
}

export default function Page() {
  return <ShortPageLayout page={SEARCH_2} />
}
