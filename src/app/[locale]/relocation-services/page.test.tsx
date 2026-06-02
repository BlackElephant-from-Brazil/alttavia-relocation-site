import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('RelocationServicesPage rebuilt content', () => {
  it('uses the requested sections in the requested order', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/[locale]/relocation-services/page.tsx'), 'utf8')

    const heroIndex = source.indexOf('Relocation Is Complex. With the Right Partner, It Becomes Clear.')
    const includesIndex = source.indexOf('What Our Relocation Service Includes')
    const quoteIndex = source.indexOf('For full relocations, we recommend requesting a personalized quotation')
    const processIndex = source.indexOf('Our Process')
    const avoidIndex = source.indexOf('Avoid Visa Delays, Tax Issues, and Costly Mistakes')
    const whyIndex = source.indexOf('Why Choose Alttavia Relocation')
    const getStartedIndex = source.indexOf('Relocate to Portugal, Spain, or Malta with Confidence')

    expect(heroIndex).toBeGreaterThan(-1)
    expect(includesIndex).toBeGreaterThan(heroIndex)
    expect(quoteIndex).toBeGreaterThan(includesIndex)
    expect(processIndex).toBeGreaterThan(quoteIndex)
    expect(avoidIndex).toBeGreaterThan(processIndex)
    expect(whyIndex).toBeGreaterThan(avoidIndex)
    expect(getStartedIndex).toBeGreaterThan(whyIndex)
  })

  it('contains the required cards, process, CTAs, and removes the old page body', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/[locale]/relocation-services/page.tsx'), 'utf8')

    expect(source).toContain('Visas & Residence Permits')
    expect(source).toContain('Tax Registration & Regularization')
    expect(source).toContain('Company Incorporation')
    expect(source).toContain('Property Search')
    expect(source).toContain('School Placement')
    expect(source).toContain('Transportation of Belongings')
    expect(source).toContain('Expat Integration Support')
    expect(source).toContain('Step 1: Initial Consultation')
    expect(source).toContain('Step 5: Integration Support')
    expect(source).toContain('Complex immigration procedures.')
    expect(source).toContain('A Seamless Process')
    expect(source).toContain('Discover the Alttavia difference')
    expect(source).toContain('Start your Relocation')
    expect(source).toContain('Speak to our Services')
    expect(source).toContain('href={`/${locale}/contact`}')
    expect(source).toContain('href={`/${locale}/why-us`}')
    expect(source).not.toContain('FeatureGrid')
    expect(source).not.toContain('cms?.heroTitle')
    expect(source).not.toContain('dict.services.groups')
  })
})
