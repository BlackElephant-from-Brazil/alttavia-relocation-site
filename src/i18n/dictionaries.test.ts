import { describe, expect, it } from 'vitest'

import { dictionaries } from './dictionaries'
import { locales } from './routing'

describe('dictionaries', () => {
  it('provides localized labels for shared visual and layout copy', () => {
    for (const locale of locales) {
      const dict = dictionaries[locale]

      expect(dict.common.visualTitle).toBeTruthy()
      expect(dict.common.visualItems).toHaveLength(4)
      expect(dict.footer.pagesLabel).toBeTruthy()
      expect(dict.contact.emailLabel).toBeTruthy()
      expect(dict.contact.whatsapp).toBeTruthy()
    }

    expect(dictionaries.pt.contact.whatsapp).not.toBe(dictionaries.en.contact.whatsapp)
    expect(dictionaries.es.contact.whatsapp).not.toBe(dictionaries.en.contact.whatsapp)
  })
})
