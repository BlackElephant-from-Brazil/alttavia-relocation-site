import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('ContactPage rebuilt content', () => {
  it('uses the requested sections in the requested order', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/[locale]/contact/page.tsx'), 'utf8')

    const heroIndex = source.indexOf('Contact Alttavia Relocation')
    const formIndex = source.indexOf('<GetStartedForm')
    const connectIndex = source.indexOf('Different ways to Connect')
    const mapIndex = source.indexOf('src={mapUrl}')
    const whyIndex = source.indexOf('Why Contact Alttavia Relocation?')

    expect(heroIndex).toBeGreaterThan(-1)
    expect(formIndex).toBeGreaterThan(heroIndex)
    expect(connectIndex).toBeGreaterThan(formIndex)
    expect(mapIndex).toBeGreaterThan(connectIndex)
    expect(whyIndex).toBeGreaterThan(mapIndex)
  })

  it('contains the required contact details, social links, cards, and removes the old page body', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/[locale]/contact/page.tsx'), 'utf8')

    expect(source).toContain('Planning to move to Portugal, Spain, or Malta?')
    expect(source).toContain('+351 934 548 395')
    expect(source).toContain('info@alttavia-relocation.com')
    expect(source).toContain('Instagram')
    expect(source).toContain('Facebook')
    expect(source).toContain('WhatsApp')
    expect(source).toContain('Expert Guidance')
    expect(source).toContain('In-House Expertise')
    expect(source).toContain('Expat Perspective')
    expect(source).toContain('Personalized Solutions')
    expect(source).toContain('idPrefix="contact-hero"')
    expect(source).toContain('variant="glass"')
    expect(source).not.toContain('ContactForm')
    expect(source).not.toContain('Hero')
    expect(source).not.toContain('cms?.heroTitle')
    expect(source).not.toContain('getPageByKey')
    expect(source).not.toContain('hello@example.com')
  })
})
