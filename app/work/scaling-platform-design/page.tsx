import type { Metadata } from 'next'
import { ShortPageLayout } from '@/components/short-page'
import { SCALING_PLATFORM_DESIGN } from '@/lib/pages/scaling-platform-design'

export const metadata: Metadata = {
  title: `${SCALING_PLATFORM_DESIGN.title} | Kanchi Bhawalkar`,
  description: SCALING_PLATFORM_DESIGN.description,
}

export default function Page() {
  return <ShortPageLayout page={SCALING_PLATFORM_DESIGN} />
}
