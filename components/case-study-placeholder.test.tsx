import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { CaseStudyPlaceholder } from './case-study-placeholder'
import { CaseStudyIndex } from './case-study-index'
import { CareerTimeline } from './career-timeline'
import { ROLES } from '@/lib/timeline-data'
import { PAGES } from '@/lib/site-content'

// The case studies live in the Work section; the timeline is plain text
// with every highlight written out and nothing to click. While a write-up
// is in progress its Work card says "Coming soon" without linking, and its
// URL shows a placeholder.

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

  it('keeps the timeline to plain text: no links and no "Coming soon" in any role row', () => {
    render(<CareerTimeline />)
    for (const role of ROLES) {
      const row = document.getElementById(role.id) as HTMLElement
      expect(within(row).queryAllByRole('link')).toEqual([])
      expect(within(row).queryByText('Coming soon')).toBeNull()
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

  it('lists every highlight of every role, written out', () => {
    render(<CareerTimeline />)
    for (const role of ROLES) {
      const row = document.getElementById(role.id) as HTMLElement
      for (const entry of role.entries) {
        expect(within(row).getByRole('heading', { name: entry.headline, level: 4 })).toBeTruthy()
        expect(within(row).getByText(entry.detail)).toBeTruthy()
      }
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
