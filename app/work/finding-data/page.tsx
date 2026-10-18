import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { CaseStudyPage } from '@/components/case-study-page'
import { FINDING_DATA } from '@/content/work/finding-data'

export const metadata: Metadata = {
  title: FINDING_DATA.title,
  description: FINDING_DATA.summary.what,
}

export default function Page() {
  return (
    <SiteShell>
      <CaseStudyPage study={FINDING_DATA} />
    </SiteShell>
  )
}
