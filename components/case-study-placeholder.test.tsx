import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { CaseStudyPlaceholder } from './case-study-placeholder'
import { CareerTimeline } from './career-timeline'
import { ROLES } from '@/lib/timeline-data'

// While the case studies are being written, each one is a placeholder in
// two places: the featured slot of its role on the home page, and its own
// URL. Neither may carry a number or link to the other.

const WITH_CASE_STUDY = ROLES.filter((r) => r.caseStudy)

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

  it('shows a "Coming soon" card in the featured slot, with no link and no stat', () => {
    render(<CareerTimeline />)
    for (const role of WITH_CASE_STUDY) {
      const row = document.getElementById(role.id) as HTMLElement
      const heading = within(row).getByRole('heading', { name: role.caseStudy!.title, level: 4 })
      const card = heading.closest('.shadow-soft') as HTMLElement
      expect(within(card).getByText('Coming soon')).toBeTruthy()
      expect(within(card).queryByRole('link')).toBeNull()
      // No stat: the only digits allowed are the ones in the title itself.
      expect(card.textContent?.replace(role.caseStudy!.title, '')).not.toMatch(/\d/)
      expect(within(row).queryByRole('link', { name: /read the case study/i })).toBeNull()
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

  it('still features the first entry of a role that has no case study', () => {
    render(<CareerTimeline />)
    const role = ROLES.find((r) => !r.caseStudy)!
    const row = document.getElementById(role.id) as HTMLElement
    expect(within(row).getByRole('heading', { name: role.entries[0].headline, level: 4 })).toBeTruthy()
    expect(within(row).queryByText('Coming soon')).toBeNull()
  })

  it.each(WITH_CASE_STUDY.map((r) => [r.id, r] as const))(
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
