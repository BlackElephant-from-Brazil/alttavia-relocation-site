import type { MetadataRoute } from 'next'

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://alttavia-relocation.com').replace(/\/+$/, '')

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
