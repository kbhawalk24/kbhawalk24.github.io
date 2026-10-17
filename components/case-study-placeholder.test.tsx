import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { CaseStudyPlaceholder } from './case-study-placeholder'
import { CaseStudyIndex } from './case-study-index'
import { CareerTimeline } from './career-timeline'
import { ROLES } from '@/lib/timeline-data'
import { PAGES } from '@/lib/site-content'

// The case studies live in the Work section; each role on the timeline
// only links to its own. While a write-up is in progress its Work card
// says "Coming soon" without linking, and its URL shows a placeholder.

const WITH_CASE_STUDY = ROLES.filter((r) => r.caseStudy)
const COMING_SOON = PAGES.filter((p) => p.status === 'coming-soon')
const PLACEHOLDER_ROLES = WITH_CASE_STUDY.filter((r) =>
  COMING_SOON.some((p) => p.href === r.caseStudy!.href),
)

describe('case study placeholders', () => {
  it('puts each case study under the role it belongs to', () => {
    const byRole = Object.fromEntries(WITH_CASE_STUDY.map((r) => [r.id, r.caseStudy?.href]))
    expect(byRole).toEqual({
      'intuit-manager': '/leadership',
      'intuit-principal': '/work/finding-data',
      'intuit-senior': '/work/trusting-data',
      '605': '/605',
    })
  })

  it('links each timeline role to its case study, and nothing else there carries a case-study card', () => {
    render(<CareerTimeline />)
    for (const role of WITH_CASE_STUDY) {
      const row = document.getElementById(role.id) as HTMLElement
      const link = within(row).getByRole('link', { name: new RegExp(`Case study: ${role.caseStudy!.title}`) })
      expect(link.getAttribute('href')).toBe(role.caseStudy!.href)
      expect(within(row).queryByText('Coming soon')).toBeNull()
      expect(within(row).queryByRole('link', { name: /read the case study/i })).toBeNull()
    }
  })

  it('marks unwritten case studies "Coming soon" in the Work section, with no link', () => {
    render(<CaseStudyIndex />)
    for (const page of PAGES) {
      const heading = screen.getByRole('heading', { name: page.title, level: 3 })
      const card = heading.closest('li') as HTMLElement
      const read = within(card).queryByRole('link', { name: /read the case study/i })
      if (page.status === 'coming-soon') {
        expect(within(card).getByText('Coming soon')).toBeTruthy()
        expect(read).toBeNull()
      } else {
        expect(within(card).queryByText('Coming soon')).toBeNull()
        expect(read?.getAttribute('href')).toBe(page.href)
      }
    }
  })

  it('keeps every highlight of the role in the carousel', () => {
    render(<CareerTimeline />)
    for (const role of WITH_CASE_STUDY) {
      const row = document.getElementById(role.id) as HTMLElement
      expect(within(row).getByRole('heading', { name: role.entries[0].headline, level: 4 })).toBeTruthy()
      expect(within(row).getByText(new RegExp(`1 / ${role.entries.length}$`))).toBeTruthy()
    }
  })

  it.each(PLACEHOLDER_ROLES.map((r) => [r.id, r] as const))(
    'renders the %s page as a title, "Coming soon" and a way back',
    (_id, role) => {
      render(<CaseStudyPlaceholder roleId={role.id} />)
      const main = screen.getByRole('main')
      expect(within(main).getByRole('heading', { name: role.caseStudy!.title, level: 1 })).toBeTruthy()
      expect(within(main).getByText('Coming soon')).toBeTruthy()
      const links = within(main).getAllByRole('link')
      expect(links.map((l) => l.getAttribute('href'))).toEqual([`/#${role.id}`])
      // No metric, date or count: the only digits allowed are a company name.
      expect(main.textContent?.replace(role.company, '').replace(role.caseStudy!.title, '')).not.toMatch(/\d/)
    },
  )
})
