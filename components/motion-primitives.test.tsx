import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import { AnimatedStat } from './motion-primitives'

// AnimatedStat renders its counted-up digits synchronously as "0" on first
// paint (the spring animates them upward after mount), so we assert on the
// static prefix/suffix split around that initial "0" rather than the
// post-animation settled value.
describe('AnimatedStat', () => {
  it('splits a plain number with a suffix', () => {
    const { container } = render(<AnimatedStat value="12+" />)
    expect(container.textContent).toBe('0+')
  })

  it('splits a comma-grouped number with a suffix', () => {
    const { container } = render(<AnimatedStat value="6,000+" />)
    expect(container.textContent).toBe('0+')
  })

  it('splits a currency-prefixed number with a suffix', () => {
    const { container } = render(<AnimatedStat value="$20M+" />)
    expect(container.textContent).toBe('$0M+')
  })

  it('only animates the first number, treating the rest as a static suffix', () => {
    // "350 → 7,000+" contains two numbers; only the first ("350") is wired
    // to the spring — the arrow and second number render as plain text.
    const { container } = render(<AnimatedStat value="350 → 7,000+" />)
    expect(container.textContent).toBe('0 → 7,000+')
  })

  it('renders the raw string unchanged when it has no digits', () => {
    const { container } = render(<AnimatedStat value="N/A" />)
    expect(container.textContent).toBe('N/A')
  })
})
