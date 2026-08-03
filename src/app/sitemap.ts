import type { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/posts'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://alttavia-relocation.com').replace(/\/+$/, '')
const locales = ['en', 'pt', 'es'] as const

// Pages that list posts, so their content genuinely changes when one is published.
const postDrivenPages = ['', '/blog'] as const
// Marketing pages with no tracked modification date.
const staticPages = ['/why-us', '/relocation-services', '/contact'] as const
// Legal pages: rarely change and low priority, but should still be discoverable.
const legalPages = ['/privacy-policy', '/terms-of-use'] as const

function alternatesFor(page: string) {
  return {
    languages: Object.fromEntries(
      locales.map((l) => [l, `${siteUrl}/${l}${page}`]),
    ) as Record<string, string>,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const posts = getPublishedPosts()
  // getPublishedPosts() sorts newest first.
  const latestPostDate = posts.length ? new Date(posts[0].date) : undefined

  for (const page of postDrivenPages) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        lastModified: latestPostDate,
        changeFrequency: 'weekly',
        priority: page === '' ? 1.0 : locale === 'en' ? 0.8 : 0.6,
        alternates: alternatesFor(page),
      })
    }
  }

  // lastModified is omitted below: we have no real modification date for these, and
  // reporting "now" on every request teaches Google to distrust the whole sitemap.
  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        changeFrequency: 'monthly',
        priority: locale === 'en' ? 0.8 : 0.6,
        alternates: alternatesFor(page),
      })
    }
  }

  for (const page of legalPages) {
    for (const locale of locales) {
      entries.push({
        url: `${siteUrl}/${locale}${page}`,
        changeFrequency: 'yearly',
        priority: 0.3,
        alternates: alternatesFor(page),
      })
    }
  }

  for (const post of posts) {
    entries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  }

  return entries
}
