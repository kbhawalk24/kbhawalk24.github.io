import type { CaseStudy } from '@/lib/case-study'
import { FINDING_DATA } from './finding-data'
import { BUILDING_THE_PLATFORM } from './building-the-platform'
import { MY_TEAMS_WORK } from './my-teams-work'
import { SIX_O_FIVE } from './605'

/** The four case studies in the order the homepage grid shows them. */
export const CASE_STUDIES: CaseStudy[] = [FINDING_DATA, BUILDING_THE_PLATFORM, MY_TEAMS_WORK, SIX_O_FIVE]

export function caseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((s) => s.slug === slug)
}
