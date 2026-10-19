import type { Metadata } from 'next'
import { AboutPage } from '@/components/about-page'
import { POSITIONING } from '@/lib/about'

export const metadata: Metadata = {
  title: 'About | Kanchi Bhawalkar',
  description: POSITIONING,
}

export default function Page() {
  return <AboutPage />
}
