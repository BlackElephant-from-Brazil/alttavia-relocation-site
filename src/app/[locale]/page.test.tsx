import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { describe, expect, it } from 'vitest'

describe('HomePage challenge section', () => {
  it('places the challenge intro above the new image and the styled questions below it', () => {
    const markup = readFileSync(join(process.cwd(), 'src/app/[locale]/page.tsx'), 'utf8')
    const questionsMarkup = readFileSync(
      join(process.cwd(), 'src/components/sections/ChallengeQuestions.tsx'),
      'utf8',
    )

    const introIndex = markup.indexOf('The Questions Most Expats Struggle With')
    const imageIndex = markup.indexOf('/imagem-2.jpg')
    const questionsIndex = markup.indexOf('<ChallengeQuestions', imageIndex)

    expect(introIndex).toBeGreaterThan(-1)
    expect(imageIndex).toBeGreaterThan(introIndex)
    expect(questionsIndex).toBeGreaterThan(imageIndex)
    expect(markup).toContain('Top Visa Paths')
    expect(markup).toContain('Tax Timing')
    expect(markup).toContain('challenge-image-shell')
    expect(markup).toContain('challenge-image-frame')
    expect(markup).toContain('challenge-floating-tag')
    expect(markup).toContain('challenge-tag-dot')
    expect(questionsMarkup).toContain('challenge-question-row')
    expect(questionsMarkup).toContain('challenge-question-list')
    expect(questionsMarkup).toContain('challenge-question-number')
  })
})

describe('HomePage conversion sections', () => {
  it('uses count-up stats, polished CTA labels, and a get started form target', () => {
    const markup = readFileSync(join(process.cwd(), 'src/app/[locale]/page.tsx'), 'utf8')

    expect(markup).toContain("import { CountUpNumber }")
    expect(markup).toContain("import { getGoogleReviews }")
    expect(markup).toContain("import { GoogleReviewsSection }")
    expect(markup).toContain("import { ScrollReveal }")
    expect(markup).toContain('<CountUpNumber')
    expect(markup).toContain('const googleReviews = await getGoogleReviews().catch(() => [])')
    expect(markup).toContain('<GoogleReviewsSection reviews={googleReviews} />')
    expect(markup).toContain(
      'aside={<GetStartedForm dict={dict} idPrefix="hero-contact" variant="glass" className="!mt-0 !max-w-none" />}',
    )
    expect(markup).toContain('<ScrollReveal')
    expect(markup).toContain('variant="fade-up"')
    expect(markup).toContain('variant="slide-left"')
    expect(markup).toContain('variant="scale-soft"')
    expect(markup).toContain('primaryHref="#get-started"')
    expect(markup).toContain('primaryIcon={<Compass')
    expect(markup).toContain('id="get-started"')
    expect(markup).toContain('Learn more about us')
    expect(markup).toContain('See all articles')
    expect(markup).toContain('<GetStartedForm')
    expect(markup).not.toContain('learn more about us')
    expect(markup).not.toContain('see all articles')
  })

  it('places Google reviews between challenge and our numbers', () => {
    const markup = readFileSync(join(process.cwd(), 'src/app/[locale]/page.tsx'), 'utf8')

    const challengeIndex = markup.indexOf('THE CHALLENGE')
    const reviewsIndex = markup.indexOf('<GoogleReviewsSection reviews={googleReviews} />')
    const numbersIndex = markup.indexOf('our numbers')

    expect(challengeIndex).toBeGreaterThan(-1)
    expect(reviewsIndex).toBeGreaterThan(challengeIndex)
    expect(numbersIndex).toBeGreaterThan(reviewsIndex)
  })

  it('standardizes requested home section vertical spacing to 20px', () => {
    const markup = readFileSync(join(process.cwd(), 'src/app/[locale]/page.tsx'), 'utf8')

    expect(markup).toContain('className="px-6 py-5"')
    expect(markup).not.toContain('<ScrollReveal className="px-6 py-14"')
    expect(markup).not.toContain('<ScrollReveal className="px-6 py-16"')
    expect(markup).not.toContain('<ScrollReveal className="px-6 py-20"')
    expect(markup).not.toContain('<ScrollReveal className="px-6 py-8"')
  })
})
