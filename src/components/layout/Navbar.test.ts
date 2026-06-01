import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { getNavbarChromeClass } from './navbarChrome'

describe('getNavbarChromeClass', () => {
  it('applies liquid glass while the navbar is over the hero', () => {
    const className = getNavbarChromeClass(true)

    expect(className).toContain('bg-white/15')
    expect(className).toContain('backdrop-blur-2xl')
    expect(className).toContain('backdrop-saturate-150')
    expect(className).toContain('shadow-glass')
    expect(className).not.toContain('backdrop-blur-0')
  })

  it('applies transparent liquid glass after the hero', () => {
    const className = getNavbarChromeClass(false)

    expect(className).toContain('bg-white/10')
    expect(className).toContain('backdrop-blur-2xl')
    expect(className).toContain('backdrop-saturate-150')
    expect(className).toContain('shadow-glass')
  })
})

describe('Navbar brand asset', () => {
  it('uses the minimal logo and visible company name in the navbar', () => {
    const source = readFileSync(new URL('./Navbar.tsx', import.meta.url), 'utf8')

    expect(source).toContain('src="/logo-min.svg"')
    expect(source).toContain('className="h-8 w-auto"')
    expect(source).toContain('>Alttavia</span>')
  })
})
