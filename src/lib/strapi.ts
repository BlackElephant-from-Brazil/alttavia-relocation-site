import type { Locale } from '@/i18n/routing'

export type PageKey = 'home' | 'why-us' | 'relocation-services' | 'contact'

export type LocalizedSlug = {
  locale: Locale
  slug: string
}

export type StrapiMedia = {
  url?: string
  alternativeText?: string | null
}

export type PageContent = {
  id?: string | number
  documentId?: string
  pageKey: PageKey
  title?: string
  heroTitle?: string
  heroSubtitle?: string
  body?: unknown
  sections?: unknown
  seoTitle?: string
  seoDescription?: string
}

export type BlogPost = {
  id: string | number
  documentId?: string
  title: string
  slug: string
  excerpt: string
  content?: unknown
  coverImage?: StrapiMedia | null
  publishedAt?: string
  authorName?: string
  seoTitle?: string
  seoDescription?: string
  localizations?: LocalizedSlug[]
}

type StrapiEntity = Record<string, unknown> & {
  id?: string | number
  documentId?: string
  attributes?: Record<string, unknown>
}

const defaultStrapiUrl = 'http://localhost:1337'

function getStrapiBaseUrl() {
  return (process.env.NEXT_PUBLIC_STRAPI_URL || defaultStrapiUrl).replace(/\/+$/, '')
}

function unwrapEntity<T extends Record<string, unknown>>(entity: StrapiEntity): T {
  return {
    id: entity.id,
    documentId: entity.documentId,
    ...(entity.attributes ?? entity),
  } as unknown as T
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' ? value : undefined
}

function withAuthHeaders(): HeadersInit {
  return process.env.STRAPI_API_TOKEN
    ? {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      }
    : {}
}

export function buildStrapiUrl(path: string, params: Record<string, string | number | boolean | undefined> = {}) {
  const url = new URL(path.startsWith('/') ? path : `/${path}`, getStrapiBaseUrl())

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      url.searchParams.set(key, String(value))
    }
  })

  return url.toString()
}

async function fetchStrapi<T>(path: string, params?: Record<string, string | number | boolean | undefined>) {
  const response = await fetch(buildStrapiUrl(path, params), {
    headers: withAuthHeaders(),
    next: {
      revalidate: 60,
    },
  })

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`)
  }

  return (await response.json()) as T
}

export function getMediaUrl(media: unknown): string | null {
  if (!media || typeof media !== 'object') {
    return null
  }

  const item = unwrapEntity(media as StrapiEntity) as StrapiMedia
  if (!item.url) {
    return null
  }

  return item.url.startsWith('http') ? item.url : `${getStrapiBaseUrl()}${item.url}`
}

function normalizeMedia(media: unknown): StrapiMedia | null {
  const url = getMediaUrl(media)
  if (!url || !media || typeof media !== 'object') {
    return null
  }

  const item = unwrapEntity(media as StrapiEntity) as StrapiMedia
  return {
    url,
    alternativeText: item.alternativeText ?? null,
  }
}

function normalizeLocalizations(value: unknown): LocalizedSlug[] {
  const list = Array.isArray(value)
    ? value
    : Array.isArray((value as { data?: unknown[] } | null)?.data)
      ? ((value as { data: unknown[] }).data)
      : []

  return list
    .map((entry) => unwrapEntity(entry as StrapiEntity))
    .map((entry) => ({
      locale: asString(entry.locale) as Locale,
      slug: asString(entry.slug) ?? '',
    }))
    .filter((entry): entry is LocalizedSlug => Boolean(entry.locale && entry.slug))
}

function normalizePost(entity: StrapiEntity): BlogPost {
  const post = unwrapEntity<Record<string, unknown>>(entity)

  return {
    id: post.id as string | number,
    documentId: asString(post.documentId),
    title: asString(post.title) ?? '',
    slug: asString(post.slug) ?? '',
    excerpt: asString(post.excerpt) ?? '',
    content: post.content,
    coverImage: normalizeMedia(post.coverImage),
    publishedAt: asString(post.publishedAt),
    authorName: asString(post.authorName),
    seoTitle: asString(post.seoTitle),
    seoDescription: asString(post.seoDescription),
    localizations: normalizeLocalizations(post.localizations),
  }
}

function normalizePage(entity: StrapiEntity): PageContent {
  const page = unwrapEntity<Record<string, unknown>>(entity)

  return {
    id: page.id as string | number | undefined,
    documentId: asString(page.documentId),
    pageKey: page.pageKey as PageKey,
    title: asString(page.title),
    heroTitle: asString(page.heroTitle),
    heroSubtitle: asString(page.heroSubtitle),
    body: page.body,
    sections: page.sections,
    seoTitle: asString(page.seoTitle),
    seoDescription: asString(page.seoDescription),
  }
}

export async function getPosts(locale: Locale, limit = 12): Promise<BlogPost[]> {
  const result = await fetchStrapi<{ data: StrapiEntity[] }>('/api/posts', {
    locale,
    'filters[publishedAt][$notNull]': true,
    'pagination[pageSize]': limit,
    'sort[0]': 'publishedAt:desc',
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'populate[localizations][fields][0]': 'slug',
    'populate[localizations][fields][1]': 'locale',
  })

  return result.data.map(normalizePost).filter((post) => post.slug && post.title)
}

export async function getPostBySlug(locale: Locale, slug: string): Promise<BlogPost | null> {
  const result = await fetchStrapi<{ data: StrapiEntity[] }>('/api/posts', {
    locale,
    'filters[slug][$eq]': slug,
    'filters[publishedAt][$notNull]': true,
    'pagination[pageSize]': 1,
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'populate[localizations][fields][0]': 'slug',
    'populate[localizations][fields][1]': 'locale',
  })

  return result.data[0] ? normalizePost(result.data[0]) : null
}

export async function getPageByKey(locale: Locale, pageKey: PageKey): Promise<PageContent | null> {
  const result = await fetchStrapi<{ data: StrapiEntity[] }>('/api/pages', {
    locale,
    'filters[pageKey][$eq]': pageKey,
    'pagination[pageSize]': 1,
  })

  return result.data[0] ? normalizePage(result.data[0]) : null
}

export async function getLocalizedSlugs(locale: Locale, slug: string): Promise<LocalizedSlug[]> {
  const post = await getPostBySlug(locale, slug)
  return post?.localizations ?? []
}

export function formatPostDate(value: string | undefined, locale: Locale): string {
  if (!value) {
    return ''
  }

  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}
