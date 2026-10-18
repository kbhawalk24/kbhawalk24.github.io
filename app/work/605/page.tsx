import type { Metadata } from 'next'
import { SiteShell } from '@/components/site-shell'
import { CaseStudyPage } from '@/components/case-study-page'
import { SIX_O_FIVE } from '@/content/work/605'

export const metadata: Metadata = {
  title: SIX_O_FIVE.title,
  description: SIX_O_FIVE.summary.what,
}

export default function Page() {
  return (
    <SiteShell>
      <CaseStudyPage study={SIX_O_FIVE} />
    </SiteShell>
  )
}
