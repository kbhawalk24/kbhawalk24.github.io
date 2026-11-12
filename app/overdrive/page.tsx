import type { Metadata } from 'next'
import { OverdriveIndex } from '@/components/overdrive/overdrive-index'

// Three experimental takes on the homepage (Impeccable overdrive, 11 Nov
// 2026). Not linked from the nav and kept out of search.

export const metadata: Metadata = {
  title: 'Overdrive | Kanchi Bhawalkar',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <OverdriveIndex />
}
