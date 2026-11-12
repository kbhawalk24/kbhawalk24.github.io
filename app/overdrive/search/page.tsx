import type { Metadata } from 'next'
import { SearchPage } from '@/components/overdrive/search/search-page'

export const metadata: Metadata = {
  title: 'Search · Overdrive · Kanchi Bhawalkar',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <SearchPage />
}
