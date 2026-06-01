import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

describe('Hero', () => {
  it('can use a supplied image as the visual background without changing hero copy', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { Hero } = await import('./Hero')

    const markup = renderToStaticMarkup(
      React.createElement(Hero, {
        eyebrow: 'Alttavia relocation',
        title: 'Expert Immigration Services & Relocation Consultancy',
        subtitle: 'A precise relocation partner.',
        primaryHref: '/en/contact',
        primaryLabel: 'Speak to our experts',
        visualItems: ['Portugal', 'Spain'],
        visualTitle: 'Private advisory',
        imageSrc: '/patricia.webp',
      } as React.ComponentProps<typeof Hero>),
    )

    expect(markup).toContain('Alttavia relocation')
    expect(markup).toContain('Expert Immigration Services &amp; Relocation Consultancy')
    expect(markup).toContain('Speak to our experts')
    expect(markup).toContain('/patricia.webp')
  })

  it('uses supplied image as the hero background instead of a side visual panel', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { Hero } = await import('./Hero')

    const markup = renderToStaticMarkup(
      React.createElement(Hero, {
        eyebrow: 'Alttavia relocation',
        title: 'Expert Immigration Services & Relocation Consultancy',
        subtitle: 'A precise relocation partner.',
        primaryHref: '/en/contact',
        primaryLabel: 'Speak to our experts',
        visualItems: ['Portugal', 'Spain'],
        visualTitle: 'Private advisory',
        imageSrc: '/patricia.webp',
      } as React.ComponentProps<typeof Hero>),
    )

    expect(markup).toContain('background-image:linear-gradient')
    expect(markup).toContain('/patricia.webp')
    expect(markup).toContain('min-h-screen')
    expect(markup).toContain('items-end')
    expect(markup).toContain('md:items-center')
    expect(markup).toContain('text-[2.25rem]')
    expect(markup).toContain('text-secondary')
    expect(markup).toContain('bg-primary text-white')
    expect(markup).toContain('text-white">A precise relocation partner.')
    expect(markup).toContain('Portugal Visa Advisory')
    expect(markup).toContain('Golden Visa Investments')
    expect(markup).toContain('International Business Expansion')
    expect(markup).toContain('Tax &amp; Banking Planning')
    expect(markup).toContain('hero-marquee-track')
    expect(markup).toContain('hero-marquee-group')
    expect(markup).toContain('will-change-transform')
    expect(markup).toContain('max-w-[calc(100vw-3rem)]')
    expect(markup).toContain('text-white"')
    expect(markup).toContain('aria-hidden="true">•')
    expect(markup).not.toContain('Private advisory')
    expect(markup).not.toContain('Spain')
  })

  it('renders an optional primary icon inside the hero CTA', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { Compass } = await import('lucide-react')
    const { Hero } = await import('./Hero')

    const markup = renderToStaticMarkup(
      React.createElement(Hero, {
        eyebrow: 'Alttavia relocation',
        title: 'Expert Immigration Services & Relocation Consultancy',
        subtitle: 'A precise relocation partner.',
        primaryHref: '#get-started',
        primaryLabel: 'Speak to our Experts',
        primaryIcon: React.createElement(Compass, { size: 16 }),
        visualItems: ['Portugal', 'Spain'],
        visualTitle: 'Private advisory',
        imageSrc: '/patricia.webp',
      } as React.ComponentProps<typeof Hero>),
    )

    expect(markup).toContain('href="#get-started"')
    expect(markup).toContain('Speak to our Experts')
    expect(markup).toContain('<svg')
  })
})
