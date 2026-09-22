import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import Page from '@/app/page'
import { PAGES } from '@/lib/site-content'
import { ROLES, TRACKS } from '@/lib/timeline-data'

beforeEach(() => {
  window.localStorage.clear()
  window.history.replaceState(null, '', '/')
})

const switchTo = (label: 'A' | 'B' | 'C') => {
  const group = screen.getByRole('group', { name: 'Home page layout' })
  fireEvent.click(within(group).getByRole('button', { name: `Layout ${label}` }))
}

describe('home layout switch', () => {
  it('starts on A: the career timeline, no case-study index', () => {
    render(<Page />)
    expect(document.getElementById('timeline')).not.toBeNull()
    expect(document.getElementById('case-studies')).toBeNull()
    expect(screen.getByRole('link', { name: 'Timeline' }).getAttribute('href')).toBe('#timeline')
  })

  it('B puts the four case studies first, then every role as an experience row', () => {
    render(<Page />)
    switchTo('B')

    expect(document.getElementById('timeline')).toBeNull()
    const index = document.getElementById('case-studies') as HTMLElement
    expect(index).not.toBeNull()
    const links = within(index).getAllByRole('link', { name: /read the case study/i })
    expect(links.map((l) => l.getAttribute('href'))).toEqual(PAGES.map((p) => p.href))

    const experience = document.getElementById('experience') as HTMLElement
    expect(experience).not.toBeNull()
    ROLES.forEach((role) => {
      expect(within(experience).getByRole('heading', { name: role.title, level: 3 })).toBeTruthy()
    })
    // The highlights that lived in the carousel now sit in the role's list.
    const [first] = ROLES
    first.entries.forEach((e) => {
      expect(within(experience).getByText(e.headline)).toBeTruthy()
    })
    expect(within(experience).queryByLabelText('Featured highlights')).toBeNull()

    expect(screen.getByRole('link', { name: 'Case studies' }).getAttribute('href')).toBe('#case-studies')
    expect(screen.getByRole('link', { name: 'Experience' }).getAttribute('href')).toBe('#experience')
  })

  it('C keeps the case studies and lists highlights as rows grouped by track', () => {
    render(<Page />)
    switchTo('C')

    expect(document.getElementById('case-studies')).not.toBeNull()
    const experience = document.getElementById('experience') as HTMLElement
    const [first] = ROLES
    const row = within(experience).getByRole('heading', { name: first.title, level: 3 }).closest('li') as HTMLElement
    // Track headings instead of badges; every highlight present with its stat.
    const tracks = new Set(first.entries.map((e) => e.track))
    tracks.forEach((t) => expect(within(row).getByRole('heading', { name: TRACKS[t].label, level: 4 })).toBeTruthy())
    first.entries.forEach((e) => {
      expect(within(row).getByRole('link', { name: e.headline })).toBeTruthy()
      if (e.metrics?.[0]) expect(within(row).getByText(e.metrics[0].value)).toBeTruthy()
    })
    expect(within(row).queryByText(first.entries[0].detail)).toBeNull()
  })

  it('opens with the hero and the overview on every layout', () => {
    render(<Page />)
    for (const label of ['A', 'B', 'C'] as const) {
      switchTo(label)
      expect(document.getElementById('overview')).not.toBeNull()
      const hero = document.getElementById('hero') as HTMLElement
      expect(within(hero).getByRole('link', { name: /resume/i })).toBeTruthy()
      expect(within(hero).getByRole('link', { name: /linkedin/i })).toBeTruthy()
      expect(within(hero).getByRole('link', { name: /work/i }).getAttribute('href')).toBe(
        label === 'A' ? '#timeline' : '#case-studies',
      )
    }
  })

  it('no longer shows the IC / Manager lens switch', () => {
    render(<Page />)
    expect(screen.queryByRole('group', { name: 'Show the work for' })).toBeNull()
  })

  it('remembers the choice in the URL and localStorage', () => {
    render(<Page />)
    switchTo('B')
    expect(window.localStorage.getItem('layout')).toBe('b')
    expect(new URL(window.location.href).searchParams.get('layout')).toBe('b')
    switchTo('A')
    expect(window.localStorage.getItem('layout')).toBe('a')
  })
})
