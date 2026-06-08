import { getIronSession } from 'iron-session'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { isLocale } from '@/i18n/routing'
import type { SessionData } from '@/lib/session'
import { sessionOptions } from '@/lib/session'

// Maps any translated/localized slug variant back to the canonical English slug.
// This prevents Google from indexing URLs created by Chrome's auto-translation.
const translatedSlugMap: Record<string, string> = {
  // Portuguese
  'por-que-nos': 'why-us',
  'servicos-de-relocation': 'relocation-services',
  'servicos': 'relocation-services',
  'contato': 'contact',
  // Spanish
  'por-que-nosotros': 'why-us',
  'por-que-elegimos': 'why-us',
  'servicios-de-relocation': 'relocation-services',
  'servicios': 'relocation-services',
  'contacto': 'contact',
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect translated slug variants to the canonical English slug URL.
  // E.g. /pt/por-que-nos → /pt/why-us
  const segments = pathname.split('/').filter(Boolean)
  if (segments.length >= 2) {
    const [locale, slug] = segments
    if (isLocale(locale) && translatedSlugMap[slug]) {
      const rest = segments.slice(2)
      const canonical = `/${locale}/${translatedSlugMap[slug]}${rest.length ? '/' + rest.join('/') : ''}`
      return NextResponse.redirect(new URL(canonical, request.url), { status: 301 })
    }
  }

  // Admin route protection
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  if (pathname.startsWith('/admin')) {
    const response = NextResponse.next()
    const session = await getIronSession<SessionData>(request, response, sessionOptions)

    if (!session.isLoggedIn) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|pdf)).*)',],
}
