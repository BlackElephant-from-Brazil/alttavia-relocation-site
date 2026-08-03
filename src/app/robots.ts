import type { MetadataRoute } from 'next'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://alttavia-relocation.com').replace(/\/+$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // No trailing slash: robots.txt matches on prefix, so "/admin" also covers
        // the bare "/admin" URL, which "/admin/" would miss.
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
