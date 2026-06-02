import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('WhyUsPage rebuilt content', () => {
  it('uses the requested sections in the requested order', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/[locale]/why-us/page.tsx'), 'utf8')

    const heroIndex = source.indexOf('Why Choose Alttavia Relocation')
    const featuredIndex = source.indexOf('<FeaturedIn')
    const cardsIndex = source.indexOf('Why Expats Choose Alttavia Relocation')
    const founderIndex = source.indexOf('Meet Our Founder: Patrícia Viana')
    const outcomeIndex = source.indexOf('The Outcome of Choosing Alttavia Relocation')
    const getStartedIndex = source.indexOf('Relocate to Portugal, Spain, or Malta with Confidence')

    expect(heroIndex).toBeGreaterThan(-1)
    expect(featuredIndex).toBeGreaterThan(heroIndex)
    expect(cardsIndex).toBeGreaterThan(featuredIndex)
    expect(founderIndex).toBeGreaterThan(cardsIndex)
    expect(outcomeIndex).toBeGreaterThan(founderIndex)
    expect(getStartedIndex).toBeGreaterThan(outcomeIndex)
  })

  it('contains the required founder image, cards, CTAs, and removes the old page body', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/[locale]/why-us/page.tsx'), 'utf8')

    expect(source).toContain('Our team combines technical expertise, proven experience, and lived expat perspectives.')
    expect(source).toContain('Experience That Matters')
    expect(source).toContain('A Network That Works for You')
    expect(source).toContain('Personalization Instead of Templates')
    expect(source).toContain('/alttavia-image-3.webp')
    expect(source).toContain('Dual-licensed attorney (Portugal & Brazil)')
    expect(source).toContain('800+ personal case completions')
    expect(source).toContain('Get started now')
    expect(source).toContain('Speak to our Experts')
    expect(source).toContain('href={`/${locale}/contact`}')
    expect(source).not.toContain('FeatureGrid')
    expect(source).not.toContain('cms?.heroTitle')
    expect(source).not.toContain('dict.whyUs.pillars')
  })
})
