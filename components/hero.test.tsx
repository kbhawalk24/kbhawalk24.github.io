import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Hero } from './hero'

// The static hero (11 Nov 2026, the landing mock): name, title, the short
// intro, and the four buttons, each tagged for analytics.

describe('Hero', () => {
  it('shows the name, the title and the intro', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Kanchi Bhawalkar')
    expect(screen.getByText('Product Design Manager and Principal Designer')).toBeTruthy()
    const text = document.body.textContent ?? ''
    expect(text).toContain('I’m a product design leader for data and AI tools, with 12+ years')
    for (const area of ['discovery', 'access', 'lineage', 'observability', 'data maturity', 'instrumentation', 'pipeline authoring']) {
      expect(text).toContain(area)
    }
  })

  it('tags every button with the hero-button event', () => {
    render(<Hero />)
    const tagged = document.querySelectorAll('[data-umami-event="hero-button"]')
    expect(tagged.length).toBe(4)
  })
})
