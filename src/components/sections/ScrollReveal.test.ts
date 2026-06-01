import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('ScrollReveal mobile animation behavior', () => {
  it('does not short-circuit scroll-triggered motion through prefers-reduced-motion', () => {
    const source = readFileSync(join(process.cwd(), 'src/components/sections/ScrollReveal.tsx'), 'utf8')

    expect(source).toContain('IntersectionObserver')
    expect(source).toContain('rootMargin')
    expect(source).not.toContain('prefers-reduced-motion')
  })
})
