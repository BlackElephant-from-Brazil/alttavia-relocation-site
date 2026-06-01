import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('CountUpNumber mobile trigger behavior', () => {
  it('uses a permissive observer and viewport fallback so mobile layouts start the count-up', () => {
    const source = readFileSync(join(process.cwd(), 'src/components/sections/CountUpNumber.tsx'), 'utf8')

    expect(source).toContain('rootMargin')
    expect(source).toContain('threshold: [0, 0.12]')
    expect(source).toContain('getBoundingClientRect')
    expect(source).toContain('window.setTimeout')
    expect(source).not.toContain('prefers-reduced-motion')
  })
})
