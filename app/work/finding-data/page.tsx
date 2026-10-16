import type { Metadata } from 'next'
import { CaseStudyLayout } from '@/components/case-study-layout'
import { FINDING_DATA } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Finding data | Kanchi Bhawalkar',
  description: FINDING_DATA.claim,
}

export default function Page() {
  return <CaseStudyLayout page={FINDING_DATA} />
}
