import type { Metadata } from 'next'
import { CaseStudyPlaceholder } from '@/components/case-study-placeholder'

export const metadata: Metadata = { title: 'Building the data platform | Kanchi Bhawalkar' }

export default function Page() {
  return <CaseStudyPlaceholder roleId="intuit-senior" />
}
