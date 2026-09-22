import { beforeEach, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import Page from '@/app/page'
import { PAGES } from '@/lib/site-content'
import { ROLES } from '@/lib/timeline-data'

beforeEach(() => {
  window.localStorage.clear()
  window.history.replaceState(null, '', '/')
})

const switchTo = (label: 'A' | 'B') => {
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

  it('remembers the choice in the URL and localStorage', () => {
    render(<Page />)
    switchTo('B')
    expect(window.localStorage.getItem('layout')).toBe('b')
    expect(new URL(window.location.href).searchParams.get('layout')).toBe('b')
    switchTo('A')
    expect(window.localStorage.getItem('layout')).toBe('a')
  })
})
