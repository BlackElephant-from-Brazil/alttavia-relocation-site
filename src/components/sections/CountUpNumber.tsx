'use client'

import { useEffect, useRef, useState } from 'react'

type CountUpNumberProps = {
  value: number
  suffix?: string
}

export function CountUpNumber({ value, suffix = '' }: CountUpNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const [currentValue, setCurrentValue] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      setCurrentValue(value)
      return
    }

    let frame = 0
    let started = false

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return

        started = true
        observer.disconnect()

        const start = performance.now()
        const duration = 1400

        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 3)

          setCurrentValue(Math.round(value * eased))

          if (progress < 1) {
            frame = window.requestAnimationFrame(animate)
          }
        }

        frame = window.requestAnimationFrame(animate)
      },
      { threshold: 0.45 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
      window.cancelAnimationFrame(frame)
    }
  }, [value])

  return (
    <span ref={ref}>
      {currentValue}
      {suffix}
    </span>
  )
}
