import { describe, expect, it } from 'vitest'

import { buildLocalizedPath, isLocale } from './routing'

describe('i18n routing', () => {
  it('recognizes only supported locales', () => {
    expect(isLocale('en')).toBe(true)
    expect(isLocale('pt')).toBe(true)
    expect(isLocale('es')).toBe(true)
    expect(isLocale('fr')).toBe(false)
  })

  it('switches locale while preserving the equivalent page path', () => {
    expect(buildLocalizedPath('/en/relocation-services', 'pt')).toBe('/pt/relocation-services')
    expect(buildLocalizedPath('/pt/blog/moving-to-lisbon', 'es')).toBe('/es/blog')
    expect(buildLocalizedPath('/admin', 'en')).toBe('/en')
  })
})
