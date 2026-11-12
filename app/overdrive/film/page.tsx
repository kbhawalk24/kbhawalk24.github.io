import type { Metadata } from 'next'
import { FilmPage } from '@/components/overdrive/film/film-page'

export const metadata: Metadata = {
  title: 'Film · Overdrive · Kanchi Bhawalkar',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <FilmPage />
}
