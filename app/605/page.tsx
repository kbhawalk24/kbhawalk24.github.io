import type { Metadata } from 'next'
import { CaseStudyPlaceholder } from '@/components/case-study-placeholder'

export const metadata: Metadata = { title: 'Work at 605 | Kanchi Bhawalkar' }

export default function Page() {
  return <CaseStudyPlaceholder roleId="605" />
}
