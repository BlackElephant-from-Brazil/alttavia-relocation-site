import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

describe('ButtonLink', () => {
  it('renders the primary button with the primary brand color and white text', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { ButtonLink } = await import('./ButtonLink')

    const markup = renderToStaticMarkup(
      React.createElement(
        ButtonLink,
        { href: '/en/contact' } as React.ComponentProps<typeof ButtonLink>,
        'Speak to our experts',
      ),
    )

    expect(markup).toContain('bg-primary text-white')
  })
})
