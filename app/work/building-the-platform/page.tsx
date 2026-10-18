import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { CaseStudyPage } from '@/components/case-study-page'
import { BUILDING_THE_PLATFORM } from '@/content/work/building-the-platform'

export const metadata: Metadata = {
  title: BUILDING_THE_PLATFORM.title,
  description: BUILDING_THE_PLATFORM.summary.what,
}

export default function Page() {
  return (
    <SiteShell>
      <CaseStudyPage study={BUILDING_THE_PLATFORM} />
    </SiteShell>
  )
}
