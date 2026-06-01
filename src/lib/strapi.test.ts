import { afterEach, describe, expect, it, vi } from 'vitest'

import { buildStrapiUrl, getMediaUrl, getPosts } from './strapi'

describe('strapi client', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    vi.restoreAllMocks()
  })

  it('builds API URLs with a normalized Strapi base URL', () => {
    vi.stubEnv('NEXT_PUBLIC_STRAPI_URL', 'http://localhost:1337/')

    expect(buildStrapiUrl('/api/posts', { locale: 'pt', 'filters[slug][$eq]': 'hello world' })).toBe(
      'http://localhost:1337/api/posts?locale=pt&filters%5Bslug%5D%5B%24eq%5D=hello+world',
    )
  })

  it('normalizes published posts from the Strapi REST response', async () => {
    vi.stubEnv('NEXT_PUBLIC_STRAPI_URL', 'http://localhost:1337')
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => ({
        ok: true,
        json: async () => ({
          data: [
            {
              id: 7,
              documentId: 'post-doc-id',
              title: 'Moving to Portugal',
              slug: 'moving-to-portugal',
              excerpt: 'A practical relocation checklist.',
              content: [{ type: 'paragraph', children: [{ type: 'text', text: 'Start early.' }] }],
              coverImage: {
                url: '/uploads/cover.jpg',
                alternativeText: 'Lisbon street',
              },
              publishedAt: '2026-05-01T10:00:00.000Z',
              authorName: 'Alttavia',
              seoTitle: 'Moving to Portugal',
              seoDescription: 'Plan your move.',
              localizations: [{ locale: 'pt', slug: 'mudar-para-portugal' }],
            },
          ],
        }),
      })),
    )

    await expect(getPosts('en', 3)).resolves.toEqual([
      {
        id: 7,
        documentId: 'post-doc-id',
        title: 'Moving to Portugal',
        slug: 'moving-to-portugal',
        excerpt: 'A practical relocation checklist.',
        content: [{ type: 'paragraph', children: [{ type: 'text', text: 'Start early.' }] }],
        coverImage: {
          url: 'http://localhost:1337/uploads/cover.jpg',
          alternativeText: 'Lisbon street',
        },
        publishedAt: '2026-05-01T10:00:00.000Z',
        authorName: 'Alttavia',
        seoTitle: 'Moving to Portugal',
        seoDescription: 'Plan your move.',
        localizations: [{ locale: 'pt', slug: 'mudar-para-portugal' }],
      },
    ])
  })

  it('returns null for missing media and absolute URLs for media paths', () => {
    vi.stubEnv('NEXT_PUBLIC_STRAPI_URL', 'http://localhost:1337')

    expect(getMediaUrl(null)).toBeNull()
    expect(getMediaUrl({ url: '/uploads/image.jpg' })).toBe('http://localhost:1337/uploads/image.jpg')
  })
})
