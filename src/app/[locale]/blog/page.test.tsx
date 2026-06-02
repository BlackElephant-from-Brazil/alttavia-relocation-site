import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('BlogPage rebuilt content', () => {
  it('uses the requested sections in the requested order', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/[locale]/blog/page.tsx'), 'utf8')

    const heroIndex = source.indexOf('Alttavia Relocation Blog')
    const latestIndex = source.indexOf('Latest Blog Articles')
    const newsletterIndex = source.indexOf('Stay Informed. Stay Ahead.')
    const getStartedIndex = source.indexOf('Relocate to Portugal, Spain, or Malta with Confidence')

    expect(heroIndex).toBeGreaterThan(-1)
    expect(latestIndex).toBeGreaterThan(heroIndex)
    expect(newsletterIndex).toBeGreaterThan(latestIndex)
    expect(getStartedIndex).toBeGreaterThan(newsletterIndex)
  })

  it('limits latest posts to three, renders the signup form and CTA, and removes the old page body', () => {
    const source = readFileSync(join(process.cwd(), 'src/app/[locale]/blog/page.tsx'), 'utf8')

    expect(source).toContain('Immigration updates, relocation strategies, and insider knowledge')
    expect(source).toContain('getPosts(locale, 3)')
    expect(source).toContain('readMore="View more"')
    expect(source).toContain('<NewsletterSignup')
    expect(source).toContain('Regulations and procedures change quickly.')
    expect(source).toContain('GET STARTED')
    expect(source).toContain('Speak to our Experts')
    expect(source).toContain('href={`/${locale}/contact`}')
    expect(source).not.toContain('Hero')
    expect(source).not.toContain('dict.blog.heroTitle')
    expect(source).not.toContain('visualItems')
  })
})
