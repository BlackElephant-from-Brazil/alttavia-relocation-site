import { describe, expect, it } from 'vitest'

import { homeHeroContent } from './homeHero'

describe('homeHeroContent', () => {
  it('defines the approved home hero copy and image', () => {
    expect(homeHeroContent).toEqual({
      eyebrow: 'Alttavia relocation',
      title: 'Expert Immigration Services & Relocation Consultancy',
      subtitle:
        'Our team guides professionals, entrepreneurs, and families through every stage of moving to Portugal, Spain, or Malta. From visas and residence permits to company incorporation. We make it precise, efficient, and stress-free.',
      primaryLabel: 'Speak to our Experts',
      imageSrc: '/patricia.webp',
    })
  })
})
