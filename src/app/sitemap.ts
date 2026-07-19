import type { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/posts'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://alttavia-relocation.com').replace(/\/+$/, '')
const locales = ['en', 'pt', 'es'] as const
const pages = ['', '/why-us', '/relocation-services', '/blog', '/contact'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const page of pages) {
    for (const locale of locales) {
      const url = `${siteUrl}/${locale}${page}`
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : locale === 'en' ? 0.8 : 0.6,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${siteUrl}/${l}${page}`]),
          ) as Record<string, string>,
        },
      })
    }
  }

  for (const post of getPublishedPosts()) {
    entries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
