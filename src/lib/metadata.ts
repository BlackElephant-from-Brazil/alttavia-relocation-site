import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export function createMetadata(title: string, description: string, path = '/en'): Metadata {
  const url = new URL(path, siteUrl)

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url.toString(),
    },
    openGraph: {
      title,
      description,
      url: url.toString(),
      siteName: 'Alttavia Relocation',
      type: 'website',
    },
  }
}
