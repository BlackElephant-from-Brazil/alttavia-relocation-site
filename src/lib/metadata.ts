import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

const ogLocaleMap: Record<string, string> = {
  en: 'en_US',
  pt: 'pt_BR',
  es: 'es_ES',
}

const localeList = ['en', 'pt', 'es'] as const

export function createMetadata(title: string, description: string, path = '/en'): Metadata {
  const url = new URL(path, siteUrl)
  const locale = path.split('/')[1] ?? 'en'
  const ogLocale = ogLocaleMap[locale] ?? 'en_US'
  const ogImage = `${siteUrl}/alttavia-image-3.webp`

  // Strip locale prefix to get the page path (e.g. "/en/why-us" → "/why-us")
  const pagePath = path.replace(/^\/(en|pt|es)/, '') || '/'

  const languageAlternates = Object.fromEntries(
    localeList.map((l) => [l, `${siteUrl}/${l}${pagePath === '/' ? '' : pagePath}`]),
  ) as Record<string, string>

  return {
    title,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: url.toString(),
      languages: {
        ...languageAlternates,
        'x-default': `${siteUrl}/en${pagePath === '/' ? '' : pagePath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: url.toString(),
      siteName: 'Alttavia Relocation',
      type: 'website',
      locale: ogLocale,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}
