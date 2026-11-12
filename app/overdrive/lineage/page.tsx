import type { Metadata } from 'next'
import { LineagePage } from '@/components/overdrive/lineage/lineage-page'

export const metadata: Metadata = {
  title: 'Lineage · Overdrive · Kanchi Bhawalkar',
  robots: { index: false, follow: false },
}

export default function Page() {
  return <LineagePage />
}
