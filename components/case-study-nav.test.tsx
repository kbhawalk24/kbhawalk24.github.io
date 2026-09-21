import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { CaseStudyLayout, nextStory } from './case-study-layout'
import { PAGES } from '@/lib/site-content'

const [FINDING_DATA, TRUSTING_DATA] = PAGES
const LAST = PAGES[PAGES.length - 1]

describe('nextStory', () => {
  it('follows the narrative order of PAGES', () => {
    expect(nextStory(FINDING_DATA)).toBe(TRUSTING_DATA)
    PAGES.slice(0, -1).forEach((p, i) => expect(nextStory(p)).toBe(PAGES[i + 1]))
  })

  it('returns null on the last page, so the reader is not sent in a circle', () => {
    expect(nextStory(LAST)).toBeNull()
  })
})

describe('chapter navigation', () => {
  it('links every chapter to its neighbours', () => {
    render(<CaseStudyLayout page={FINDING_DATA} />)
    const ids = FINDING_DATA.chapters.map((c) => c.id)

    ids.forEach((id, i) => {
      const section = document.getElementById(id)
      expect(section, `chapter #${id} should render`).not.toBeNull()
      const pager = within(section as HTMLElement).queryByRole('navigation', { name: 'Chapter' })
      if (ids.length === 1) return
      const links = pager ? within(pager).queryAllByRole('link') : []
      const hrefs = links.map((l) => l.getAttribute('href'))

      // First chapter has no Previous, last has no Next; everything else
      // points at the adjacent chapter's id.
      if (i > 0) expect(hrefs).toContain(`#${ids[i - 1]}`)
      else expect(hrefs).not.toContain(`#${ids[ids.length - 1]}`)
      if (i < ids.length - 1) expect(hrefs).toContain(`#${ids[i + 1]}`)
    })
  })

  it('points "Next story" at the following page', () => {
    render(<CaseStudyLayout page={FINDING_DATA} />)
    const link = screen.getByText('Next story').closest('a')
    expect(link?.getAttribute('href')).toBe(TRUSTING_DATA.href)
  })

  it('shows no "Next story" on the last page', () => {
    render(<CaseStudyLayout page={LAST} />)
    expect(screen.queryByText('Next story')).toBeNull()
  })

  it('keeps the chapter dock unmounted until the reader reaches the chapters', () => {
    // jsdom's IntersectionObserver never fires, so `inRange` stays false and
    // the fixed dock must not be in the DOM (nothing invisible in the tab
    // order or the accessibility tree).
    render(<CaseStudyLayout page={FINDING_DATA} />)
    expect(screen.queryByRole('navigation', { name: 'Chapters' })).toBeNull()
  })

  it('gives chapter anchors scroll margin that clears the fixed dock', () => {
    render(<CaseStudyLayout page={FINDING_DATA} />)
    const first = document.getElementById(FINDING_DATA.chapters[0].id)
    expect(first?.className).toMatch(/scroll-mt-/)
  })
})
