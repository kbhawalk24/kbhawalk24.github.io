import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FindingDataViz } from './finding-data-viz'
import { PlatformViz } from './platform-viz'
import { TeamViz, TW_TOTAL_MS } from './team-viz'
import { SixOFiveViz } from './six-o-five-viz'
import { StatStrip } from '@/components/stat-strip'
import * as timing from './timing'
import fd from '@/content/impact/finding-data.json'
import bp from '@/content/impact/building-the-platform.json'
import tw from '@/content/impact/my-teams-work.json'
import s6 from '@/content/impact/605.json'

// The brief's motion rules (section 4.2 and 7): with prefers-reduced-motion
// every viz renders its end state and labels; nothing runs longer than
// 2.5 s; nothing loops; every number is real text in the DOM.
vi.mock('@/lib/use-reduced-motion', () => ({ useReducedMotion: () => true }))

function settled(container: HTMLElement) {
  return container.querySelector('[data-impact-viz]')?.getAttribute('data-settled')
}

describe('impact visualizations under reduced motion', () => {
  it('FindingDataViz renders its end state', () => {
    const { container } = render(<FindingDataViz data={fd} />)
    expect(settled(container)).toBe('true')
    for (const text of ['45 min', '4 min', '96%', '89.24%', '711', '45 min']) {
      expect(screen.getAllByText(text, { exact: false }).length).toBeGreaterThan(0)
    }
    expect(screen.getByText('From 45 minutes to 4 minutes.')).toBeTruthy()
  })

  it('PlatformViz renders its end state with the log scale labelled', () => {
    const { container } = render(<PlatformViz data={bp} />)
    expect(settled(container)).toBe('true')
    for (const text of ['45 days', '20 days', '14.2 hours', '9.4 hours', '4 minutes', '1,886', '2,664', '6,673', 'log scale']) {
      expect(screen.getAllByText(text, { exact: false }).length).toBeGreaterThan(0)
    }
  })

  it('TeamViz renders its end state', () => {
    const { container } = render(<TeamViz data={tw} />)
    expect(settled(container)).toBe('true')
    for (const text of ['2–3 weeks', '3 days', '9 days', 'near-instant', '14.2 hours', '9.4 hours', '41%', '61%', '17', '0', '<1%', '80%']) {
      expect(screen.getAllByText(text, { exact: false }).length).toBeGreaterThan(0)
    }
    // The 17 incident dots are all out.
    const dots = container.querySelectorAll('i.size-3')
    expect(dots.length).toBe(17)
    expect([...dots].every((d) => d.className.includes('bg-foreground/[8%]'))).toBe(true)
  })

  it('SixOFiveViz renders its end state', () => {
    const { container } = render(<SixOFiveViz data={s6} />)
    expect(settled(container)).toBe('true')
    for (const text of ['32 reports', '2 pages', '3–4 minutes', '1–1.5 minutes', '30 minutes', '1–2 hours', 'one report']) {
      expect(screen.getAllByText(text, { exact: false }).length).toBeGreaterThan(0)
    }
  })

  it('the homepage stat strip renders the end values', () => {
    render(<StatStrip />)
    for (const text of ['45 days', 'under 4 min', '2,664', '6,673', '17', '0', '<1%', '80%']) {
      expect(screen.getAllByText(text, { exact: false }).length).toBeGreaterThan(0)
    }
  })

  it('every number is selectable text, not a path', () => {
    const { container } = render(<PlatformViz data={bp} />)
    expect(container.querySelectorAll('path').length).toBe(0)
    expect(container.querySelectorAll('canvas').length).toBe(0)
  })
})

describe('motion limits', () => {
  const dir = join(__dirname)
  const sources = [
    ...readdirSync(dir)
      .filter((f) => /\.(tsx?|ts)$/.test(f) && !f.endsWith('.test.tsx'))
      .map((f) => readFileSync(join(dir, f), 'utf8')),
    readFileSync(join(dir, '..', 'stat-strip.tsx'), 'utf8'),
  ]

  it('keeps every timeline within 2.5 s', () => {
    expect(timing.TOTAL_MS).toBeLessThanOrEqual(timing.MAX_TOTAL_MS)
    expect(TW_TOTAL_MS).toBeLessThanOrEqual(timing.MAX_TOTAL_MS)
    for (const src of sources) {
      for (const m of src.matchAll(/([A-Z_]+_MS)\s*=\s*(\d+)/g)) {
        expect(Number(m[2]), m[1]).toBeLessThanOrEqual(2500)
      }
    }
  })

  it('holds the before state for about 600 ms before the change', () => {
    expect(timing.HOLD_MS).toBeGreaterThanOrEqual(500)
    expect(timing.HOLD_MS).toBeLessThanOrEqual(700)
    expect(timing.TOTAL_MS).toBeGreaterThanOrEqual(1500)
  })

  it('never loops', () => {
    for (const src of sources) {
      expect(src).not.toMatch(/repeat:\s*Infinity/)
      expect(src).not.toMatch(/repeatType/)
      expect(src).not.toMatch(/\binfinite\b/)
      expect(src).not.toMatch(/setInterval/)
    }
  })
})
