import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Page from '@/app/page'
import { PAGES } from '@/lib/site-content'
import { ROLES, TRACKS } from '@/lib/timeline-data'

describe('home page', () => {
  it('opens with the hero: resume, work, and LinkedIn links', () => {
    render(<Page />)
    const hero = document.getElementById('hero') as HTMLElement
    expect(within(hero).getByRole('link', { name: /resume/i })).toBeTruthy()
    expect(within(hero).getByRole('link', { name: /linkedin/i })).toBeTruthy()
    expect(within(hero).getByRole('link', { name: /work/i }).getAttribute('href')).toBe('#case-studies')
  })

  it('lists the four case studies, each linking to its page', () => {
    render(<Page />)
    const index = document.getElementById('case-studies') as HTMLElement
    const links = within(index).getAllByRole('link', { name: /read the case study/i })
    expect(links.map((l) => l.getAttribute('href'))).toEqual(PAGES.map((p) => p.href))
  })

  it('lists every role, with highlights as resume rows grouped by track', () => {
    render(<Page />)
    const experience = document.getElementById('experience') as HTMLElement
    ROLES.forEach((role) => {
      expect(within(experience).getByRole('heading', { name: role.title, level: 3 })).toBeTruthy()
    })
    const [first] = ROLES
    const row = within(experience)
      .getByRole('heading', { name: first.title, level: 3 })
      .closest('li') as HTMLElement
    const tracks = new Set(first.entries.map((e) => e.track))
    tracks.forEach((t) =>
      expect(within(row).getByRole('heading', { name: TRACKS[t].label, level: 4 })).toBeTruthy(),
    )
    first.entries.forEach((e) => {
      expect(within(row).getByRole('link', { name: e.headline })).toBeTruthy()
      expect(within(row).getByText(e.detail, { exact: false })).toBeTruthy()
      if (e.metrics?.[0]) expect(within(row).getByText(e.metrics[0].value)).toBeTruthy()
    })
  })

  it('header links go to the case studies, experience, and contact', () => {
    render(<Page />)
    expect(screen.getByRole('link', { name: 'Case studies' }).getAttribute('href')).toBe('#case-studies')
    expect(screen.getByRole('link', { name: 'Experience' }).getAttribute('href')).toBe('#experience')
    expect(screen.getByRole('link', { name: 'Contact' }).getAttribute('href')).toBe('#contact')
    expect(screen.queryByRole('group', { name: 'Home page layout' })).toBeNull()
    expect(screen.queryByRole('group', { name: 'Show the work for' })).toBeNull()
  })
})
