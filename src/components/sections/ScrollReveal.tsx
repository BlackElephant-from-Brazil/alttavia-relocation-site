'use client'

import type { ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'

type ScrollRevealProps = {
  children: ReactNode
  className?: string
  id?: string
  variant?: 'fade-up' | 'slide-left' | 'slide-right' | 'scale-soft'
}

export function ScrollReveal({ children, className = '', id, variant = 'fade-up' }: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null)
  const [isReady, setIsReady] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    setIsReady(true)

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return

        setIsVisible(true)
        observer.disconnect()
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <section
      ref={ref}
      id={id}
      data-reveal={variant}
      className={`scroll-reveal ${isReady ? 'is-ready' : ''} ${isVisible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </section>
  )
}
