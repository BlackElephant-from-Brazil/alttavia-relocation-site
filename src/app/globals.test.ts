import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Global animation CSS', () => {
  it('keeps site animations active instead of disabling them through prefers-reduced-motion', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8')

    expect(source).toContain('.hero-marquee-track')
    expect(source).toContain('.scroll-reveal.is-ready')
    expect(source).not.toContain('@media (prefers-reduced-motion: reduce)')
  })
})
