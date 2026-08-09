import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom doesn't implement IntersectionObserver; motion's useInView (used by
// AnimatedStat, Reveal, etc.) only needs a no-op stub for it to mount safely
// in tests — we don't rely on it ever firing "in view" callbacks.
class MockIntersectionObserver {
  readonly root = null
  readonly rootMargin = ''
  readonly thresholds: ReadonlyArray<number> = []
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

vi.stubGlobal('IntersectionObserver', MockIntersectionObserver)
