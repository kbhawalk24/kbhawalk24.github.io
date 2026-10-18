import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { CaseStudyPage } from '@/components/case-study-page'
import { MY_TEAMS_WORK } from '@/content/work/my-teams-work'

export const metadata: Metadata = {
  title: MY_TEAMS_WORK.title,
  description: MY_TEAMS_WORK.summary.what,
}

export default function Page() {
  return (
    <SiteShell>
      <CaseStudyPage study={MY_TEAMS_WORK} />
    </SiteShell>
  )
}
