import type { Locale } from '@/i18n/routing'

export type LocalizedSlug = {
  locale: Locale
  slug: string
}

export type BlogPost = {
  id: string | number
  documentId?: string
  title: string
  slug: string
  excerpt: string
  content?: unknown
  coverImage?: { url?: string; alternativeText?: string | null } | null
  publishedAt?: string
  authorName?: string
  seoTitle?: string
  seoDescription?: string
  localizations?: LocalizedSlug[]
}

export function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== 'object') return null
  const item = media as { url?: string }
  if (!item.url) return null
  return item.url
}

export function formatPostDate(value: string | undefined, locale: Locale): string {
  if (!value) return ''
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}
