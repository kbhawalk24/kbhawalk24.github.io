import type { Metadata } from 'next'
import { CaseStudyPlaceholder } from '@/components/case-study-placeholder'

export const metadata: Metadata = { title: 'My team’s work | Kanchi Bhawalkar' }

export default function Page() {
  return <CaseStudyPlaceholder roleId="intuit-manager" />
}
