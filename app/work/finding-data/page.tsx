import type { Metadata } from 'next'
import { CaseStudyPlaceholder } from '@/components/case-study-placeholder'

export const metadata: Metadata = { title: 'The evolution of data search | Kanchi Bhawalkar' }

export default function Page() {
  return <CaseStudyPlaceholder roleId="intuit-principal" />
}
