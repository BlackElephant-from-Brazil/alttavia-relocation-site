export const locales = ['en', 'pt', 'es'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale)
}

export function buildLocalizedPath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean)

  if (!isLocale(segments[0])) {
    return `/${targetLocale}`
  }

  if (segments[1] === 'blog' && segments[2]) {
    return `/${targetLocale}/blog`
  }

  return `/${[targetLocale, ...segments.slice(1)].join('/')}`
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale
}
