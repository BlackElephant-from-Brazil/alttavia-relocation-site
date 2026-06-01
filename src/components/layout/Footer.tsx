import Image from 'next/image'
import Link from 'next/link'

import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/routing'

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    [dict.nav.home, `/${locale}`],
    [dict.nav.whyUs, `/${locale}/why-us`],
    [dict.nav.services, `/${locale}/relocation-services`],
    [dict.nav.blog, `/${locale}/blog`],
    [dict.nav.contact, `/${locale}/contact`],
  ]

  return (
    <footer className="border-t border-ink/10 bg-white/55 px-6 py-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr]">
        <div>
          <Image src="/logo.svg" alt="Alttavia Relocation" width={128} height={102} className="h-14 w-auto" />
          <p className="mt-4 max-w-sm text-sm leading-6 text-graphite">{dict.footer.tagline}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-navy/70">
            {dict.footer.pagesLabel}
          </p>
          <div className="mt-4 grid gap-2">
            {links.map(([label, href]) => (
              <Link key={href} className="text-sm text-graphite hover:text-ink" href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
