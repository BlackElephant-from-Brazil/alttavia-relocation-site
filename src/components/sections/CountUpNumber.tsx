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

    if (!('IntersectionObserver' in window)) {
      setCurrentValue(value)
      return
    }

    let frame = 0
    let fallbackTimer = 0
    let started = false
    let observer: IntersectionObserver | null = null

    const startAnimation = () => {
      if (started) return

      started = true
      observer?.disconnect()

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
    }

    const startIfInViewport = () => {
      const rect = element.getBoundingClientRect()

      if (rect.top < window.innerHeight && rect.bottom > 0) {
        startAnimation()
      }
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry || (!entry.isIntersecting && entry.intersectionRatio <= 0)) return

        startAnimation()
      },
      { rootMargin: '0px 0px -10% 0px', threshold: [0, 0.12] },
    )

    observer.observe(element)
    fallbackTimer = window.setTimeout(startIfInViewport, 150)

    return () => {
      observer?.disconnect()
      window.clearTimeout(fallbackTimer)
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
