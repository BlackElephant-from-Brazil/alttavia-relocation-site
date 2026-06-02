import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import { dictionaries } from '../../i18n/dictionaries'

describe('GetStartedForm', () => {
  it('renders a clean minimal contact form for the get started section', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { GetStartedForm } = await import('./GetStartedForm')

    const markup = renderToStaticMarkup(React.createElement(GetStartedForm, { dict: dictionaries.en }))

    expect(markup).toContain('get-started-form-shell')
    expect(markup).toContain('border border-white/10')
    expect(markup).toContain('bg-[linear-gradient(145deg,#1A436A,#153858)]')
    expect(markup).toContain('rounded-2xl')
    expect(markup).toContain('shadow-[0_22px_70px_rgba(0,0,0,0.18)]')
    expect(markup).toContain('get-started-form-grid')
    expect(markup).toContain('get-started-form-field')
    expect(markup).toContain('bg-white/30')
    expect(markup).toContain('border border-white/10')
    expect(markup).toContain('rounded-xl')
    expect(markup).toContain('focus:ring-2')
    expect(markup).toContain('get-started-form-submit')
    expect(markup).toContain('Name')
    expect(markup).toContain('Email')
    expect(markup).toContain('Message')
    expect(markup).not.toContain('border-y')
    expect(markup).not.toContain('border-b border-white/25')
    expect(markup).not.toContain('bg-white/70')
    expect(markup).not.toContain('shadow-glass')
    expect(markup).not.toContain('Private relocation intake')
    expect(markup).not.toContain('Portugal, Spain, Malta and selected European destinations.')
  })

  it('can use a custom id prefix when rendered more than once on the same page', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { GetStartedForm } = await import('./GetStartedForm')

    const markup = renderToStaticMarkup(
      React.createElement(GetStartedForm, { dict: dictionaries.en, idPrefix: 'hero-contact' }),
    )

    expect(markup).toContain('id="hero-contact-name"')
    expect(markup).toContain('for="hero-contact-name"')
    expect(markup).toContain('id="hero-contact-email"')
    expect(markup).toContain('id="hero-contact-message"')
    expect(markup).not.toContain('id="get-started-name"')
  })

  it('renders a glass shell variant for use over the hero image', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { GetStartedForm } = await import('./GetStartedForm')

    const markup = renderToStaticMarkup(React.createElement(GetStartedForm, { dict: dictionaries.en, variant: 'glass' }))

    expect(markup).toContain('bg-white/12')
    expect(markup).toContain('backdrop-blur-2xl')
    expect(markup).toContain('shadow-glass')
    expect(markup).toContain('border-white/25')
    expect(markup).not.toContain('bg-[linear-gradient(145deg,#1A436A,#153858)]')
  })
})
