import type { Metadata } from 'next'
import { ShortPageLayout } from '@/components/short-page'
import { SELF_SERVICE_ONBOARDING } from '@/lib/pages/self-service-onboarding'

export const metadata: Metadata = {
  title: `${SELF_SERVICE_ONBOARDING.title} | Kanchi Bhawalkar`,
  description: SELF_SERVICE_ONBOARDING.description,
}

export default function Page() {
  return <ShortPageLayout page={SELF_SERVICE_ONBOARDING} />
}
