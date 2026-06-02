import * as React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'

import type { GoogleReview } from '@/lib/googleReviews'

describe('GoogleReviewsSection', () => {
  it('renders centered heading and a manually scrollable row of Google reviews', async () => {
    ;(globalThis as typeof globalThis & { React: typeof React }).React = React
    const { GoogleReviewsSection } = await import('./GoogleReviewsSection')

    const reviews: GoogleReview[] = [
      {
        authorName: 'Maria',
        rating: 5,
        relativeTimeDescription: '2 weeks ago',
        text: 'Excellent and precise support.',
        time: 1_800_000_000,
      },
      {
        authorName: 'Joao',
        rating: 5,
        relativeTimeDescription: '1 month ago',
        text: 'Highly recommended.',
        time: 1_799_000_000,
      },
    ]

    const markup = renderToStaticMarkup(React.createElement(GoogleReviewsSection, { reviews }))

    expect(markup).toContain('google-reviews-section')
    expect(markup).toContain('google-reviews-scroll')
    expect(markup).toContain('google-reviews-track')
    expect(markup).toContain('text-center')
    expect(markup).toContain('justify-center')
    expect(markup).toContain('Client Reviews')
    expect(markup).toContain('Latest 5-star Google reviews')
    expect(markup.indexOf('Latest 5-star Google reviews')).toBeLessThan(markup.indexOf('View on Google'))
    expect(markup).toContain('Excellent and precise support.')
    expect(markup).not.toContain('google-reviews-marquee-track')
    expect(markup).not.toContain('class="flex shrink-0 gap-4 pr-4" aria-hidden="true"')
  })
})
