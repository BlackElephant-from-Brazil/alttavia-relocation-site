import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

describe('FeaturedIn', () => {
  it('renders the same publication links used across marketing pages', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { FeaturedIn } = await import('./FeaturedIn')

    const markup = renderToStaticMarkup(React.createElement(FeaturedIn))

    expect(markup).toContain('As Featured In')
    expect(markup).toContain('SIC Notícias')
    expect(markup).toContain('Publico')
    expect(markup).toContain('/sicnot.svg')
    expect(markup).toContain('publico-jornal.webp')
  })
})
