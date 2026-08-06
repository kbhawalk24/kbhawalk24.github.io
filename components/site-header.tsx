'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'

export function SiteHeader() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const hero = document.getElementById('hero')
    if (!hero) return

    // Cache trigger position — recompute only on resize, not every scroll tick
    let trigger = hero.offsetTop + hero.offsetHeight * 0.42

    const onScroll = () => setVisible(window.scrollY >= trigger)
    const onResize = () => {
      trigger = hero.offsetTop + hero.offsetHeight * 0.42
      onScroll()
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <motion.header
      initial={false}
      animate={{ y: visible ? 0 : '-100%' }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-baseline gap-3 px-6 py-4 md:px-10 lg:px-14">
        <p className="font-sans text-lg font-semibold tracking-tight">
          Kanchi Bhawalkar
        </p>
        <p className="hidden font-sans text-xs text-muted-foreground sm:block">
          Product Design Leader · Enterprise Data
        </p>
      </div>
      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-foreground"
      />
    </motion.header>
  )
}
