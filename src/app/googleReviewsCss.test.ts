import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('Google reviews CSS', () => {
  it('does not animate reviews automatically so the row remains manually scrollable', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/globals.css'), 'utf8')

    expect(source).toContain('.google-reviews-scroll')
    expect(source).not.toContain('google-reviews-marquee')
    expect(source).not.toContain('@keyframes google-reviews')
  })
})
