import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { getDictionary } from '../../i18n/dictionaries'

describe('Footer', () => {
  it('uses the company logo and omits the CMS sitemap', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { Footer } = await import('./Footer')

    const markup = renderToStaticMarkup(
      React.createElement(Footer, {
        locale: 'en',
        dict: getDictionary('en'),
      } as React.ComponentProps<typeof Footer>),
    )

    expect(markup).toContain('src="/logo.svg"')
    expect(markup).not.toContain('Alttavia Relocation</p>')
    expect(markup).not.toContain('CMS')
    expect(markup).not.toContain('Strapi Admin')
  })
})
