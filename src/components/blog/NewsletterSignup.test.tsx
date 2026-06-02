import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

describe('NewsletterSignup', () => {
  it('renders a compact contact-backed signup form for blog updates', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { NewsletterSignup } = await import('./NewsletterSignup')

    const markup = renderToStaticMarkup(React.createElement(NewsletterSignup))

    expect(markup).toContain('newsletter-signup-form')
    expect(markup).toContain('name="name"')
    expect(markup).toContain('name="email"')
    expect(markup).toContain('name="message"')
    expect(markup).toContain('Newsletter signup request')
    expect(markup).toContain('Sign up for updates')
    expect(markup).not.toContain('name="phone"')
  })
})
