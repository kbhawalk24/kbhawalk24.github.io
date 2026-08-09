'use client'

import { useEffect, useRef } from 'react'

// ── Canvas sizing ──────────────────────────────────────────────────────────
// Called once per run to stamp the canvas resolution.
function stampCanvas(canvas: HTMLCanvasElement) {
  const dpr = window.devicePixelRatio || 1
  const w   = window.innerWidth
  const h   = window.innerHeight
  canvas.width  = w * dpr
  canvas.height = h * dpr
  const ctx = canvas.getContext('2d')!
  ctx.scale(dpr, dpr)
  return { ctx, w, h }
}

// ── Scrolling sparklines (very slow) ────────────────────────────────────────
function runSparkline(canvas: HTMLCanvasElement): () => void {
  const { ctx, w, h } = stampCanvas(canvas)

  const LINES = [
    { freq: 0.007, amp: 0.14, speed: 0.05, phase: 0,   opacity: 0.22 },
    { freq: 0.013, amp: 0.09, speed: 0.08, phase: 1.8, opacity: 0.16 },
    { freq: 0.004, amp: 0.20, speed: 0.03, phase: 3.5, opacity: 0.28 },
    { freq: 0.018, amp: 0.06, speed: 0.12, phase: 5.1, opacity: 0.12 },
    { freq: 0.009, amp: 0.11, speed: 0.06, phase: 2.3, opacity: 0.18 },
  ]

  function noise(x: number, seed: number) {
    return Math.sin(x * 0.031 + seed) * 0.5 + Math.sin(x * 0.057 + seed * 1.3) * 0.5
  }

  let t = 0, raf = 0

  function tick() {
    ctx.clearRect(0, 0, w, h)
    t += 0.12

    for (let li = 0; li < LINES.length; li++) {
      const ln = LINES[li]
      ctx.beginPath()
      ctx.strokeStyle = `rgba(14,165,233,${ln.opacity})`
      ctx.lineWidth   = 1.5
      for (let x = 0; x <= w; x += 3) {
        const y = h / 2
          + Math.sin(x * ln.freq + t * ln.speed + ln.phase) * h * ln.amp
          + noise(x + t * ln.speed * 0.4, li) * h * 0.025
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()
    }

    raf = requestAnimationFrame(tick)
  }

  tick()
  return () => cancelAnimationFrame(raf)
}

// ── Component ──────────────────────────────────────────────────────────────
export function BackgroundViz() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let cleanup: (() => void) | undefined

    // Defer one frame so window dimensions are stable
    const raf = requestAnimationFrame(() => {
      cleanup = runSparkline(canvas)
    })

    return () => { cancelAnimationFrame(raf); cleanup?.() }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-[3]"
      style={{ width: '100%', height: '100%' }}
    />
  )
}
