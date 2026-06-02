import { afterEach, describe, expect, it, vi } from 'vitest'

import { getGoogleReviews } from './googleReviews'

describe('google reviews client', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('returns no reviews when Google Places credentials are missing', async () => {
    vi.stubEnv('GOOGLE_PLACES_API_KEY', '')
    vi.stubGlobal('fetch', vi.fn())

    await expect(getGoogleReviews()).resolves.toEqual([])
    expect(fetch).not.toHaveBeenCalled()
  })

  it('fetches newest Google reviews, keeps only five-star entries, and caps results at 10', async () => {
    vi.stubEnv('GOOGLE_PLACES_API_KEY', 'test-key')
    vi.stubEnv('GOOGLE_PLACE_ID', 'place-123')

    const reviews = Array.from({ length: 12 }, (_, index) => ({
      author_name: `Client ${index + 1}`,
      profile_photo_url: `https://example.com/photo-${index + 1}.jpg`,
      rating: index === 3 ? 4 : 5,
      relative_time_description: `${index + 1} days ago`,
      text: `Review ${index + 1}`,
      time: 1_800_000_000 - index,
    }))

    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          status: 'OK',
          result: {
            reviews,
          },
        }),
      })),
    )

    const result = await getGoogleReviews()

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('reviews_sort=newest'),
      expect.objectContaining({ cache: 'no-store' }),
    )
    expect(result).toHaveLength(10)
    expect(result.every((review) => review.rating === 5)).toBe(true)
    expect(result.map((review) => review.authorName)).not.toContain('Client 4')
  })

  it('can resolve a place id from the configured Google query before fetching details', async () => {
    vi.stubEnv('GOOGLE_PLACES_API_KEY', 'test-key')
    vi.stubEnv('GOOGLE_PLACE_ID', '')
    vi.stubEnv('GOOGLE_PLACE_QUERY', 'Alttavia Relocation')

    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            status: 'OK',
            candidates: [{ place_id: 'resolved-place-id' }],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            status: 'OK',
            result: {
              reviews: [
                {
                  author_name: 'Client',
                  rating: 5,
                  relative_time_description: 'a week ago',
                  text: 'Great support.',
                  time: 1_800_000_000,
                },
              ],
            },
          }),
        }),
    )

    await expect(getGoogleReviews()).resolves.toHaveLength(1)
    expect(fetch).toHaveBeenNthCalledWith(1, expect.stringContaining('findplacefromtext'), expect.any(Object))
    expect(fetch).toHaveBeenNthCalledWith(2, expect.stringContaining('place_id=resolved-place-id'), expect.any(Object))
  })
})
