import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { getNavbarChromeClass } from './navbarChrome'

describe('getNavbarChromeClass', () => {
  it('applies frosted white glass while the navbar is over the hero or get-started section', () => {
    const className = getNavbarChromeClass(true)

    expect(className).toContain('bg-white/80')
    expect(className).toContain('border-white/20')
    expect(className).toContain('backdrop-blur-2xl')
    expect(className).toContain('backdrop-saturate-150')
    expect(className).toContain('shadow-glass')
    expect(className).not.toContain('backdrop-blur-0')
  })

  it('applies transparent liquid glass over other sections', () => {
    const className = getNavbarChromeClass(false)

    expect(className).toContain('bg-white/10')
    expect(className).toContain('border-white/15')
    expect(className).toContain('backdrop-blur-2xl')
    expect(className).toContain('backdrop-saturate-150')
    expect(className).toContain('shadow-glass')
  })
})

describe('Navbar brand asset', () => {
  it('uses the minimal logo and an uppercase company name in the navbar', () => {
    const source = readFileSync(new URL('./Navbar.tsx', import.meta.url), 'utf8')

    expect(source).toContain('src="/logo-min.svg"')
    expect(source).toContain('className="h-8 w-auto"')
    expect(source).toContain('uppercase')
    expect(source).toContain('>Alttavia</span>')
  })
})
