'use client'

import { Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import type { Dictionary } from '@/i18n/dictionaries'
import { buildLocalizedPath, type Locale, locales } from '@/i18n/routing'
import { getNavbarChromeClass } from './navbarChrome'

const navItems = [
  { key: 'home', href: '' },
  { key: 'whyUs', href: '/why-us' },
  { key: 'services', href: '/relocation-services' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const

export function Navbar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [isOverHero, setIsOverHero] = useState(true)

  useEffect(() => {
    const updateChrome = () => {
      const heroThreshold = Math.max(window.innerHeight - 96, 0)
      setIsOverHero(window.scrollY < heroThreshold)
    }

    updateChrome()
    window.addEventListener('scroll', updateChrome, { passive: true })
    window.addEventListener('resize', updateChrome)

    return () => {
      window.removeEventListener('scroll', updateChrome)
      window.removeEventListener('resize', updateChrome)
    }
  }, [pathname])

  const linkClass = isOverHero
    ? 'text-primary hover:bg-white/45 hover:text-primary'
    : 'text-graphite hover:bg-mist hover:text-ink'
  const menuButtonClass = isOverHero ? 'border-primary/10 text-primary' : 'border-ink/10 text-ink'
  const brandTextClass = isOverHero ? 'text-primary' : 'text-ink'

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full border px-4 py-3 transition-all duration-500 ${getNavbarChromeClass(
          isOverHero,
        )}`}
      >
        <Link href={`/${locale}`} className="inline-flex items-end gap-3" aria-label="Alttavia Relocation home">
          <Image src="/logo-min.svg" alt="Alttavia Relocation" width={85} height={68} className="h-8 w-auto" priority />
          <span className={`font-sans text-base font-bold tracking-[0.10em] ${brandTextClass}`}>Alttavia</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${linkClass}`}
            >
              {dict.nav[item.key]}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-1 rounded-full border border-ink/10 bg-mist/70 p-1 md:flex">
          {locales.map((item) => (
            <Link
              key={item}
              href={buildLocalizedPath(pathname, item)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold uppercase transition ${
                item === locale ? 'bg-ink text-white' : 'text-graphite hover:bg-white'
              }`}
            >
              {item}
            </Link>
          ))}
        </div>

        <button
          aria-label="Toggle menu"
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition ${menuButtonClass} md:hidden`}
          onClick={() => setOpen((value) => !value)}
          type="button"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <div className="mx-auto mt-3 max-w-5xl rounded-3xl border border-white/80 bg-white/95 p-4 shadow-glass backdrop-blur-2xl md:hidden">
          <div className="grid gap-2">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={`/${locale}${item.href}`}
                className="rounded-2xl px-4 py-3 text-sm font-medium text-graphite hover:bg-mist"
                onClick={() => setOpen(false)}
              >
                {dict.nav[item.key]}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {locales.map((item) => (
              <Link
                key={item}
                href={buildLocalizedPath(pathname, item)}
                className={`flex-1 rounded-full px-3 py-2 text-center text-xs font-semibold uppercase ${
                  item === locale ? 'bg-ink text-white' : 'bg-mist text-graphite'
                }`}
                onClick={() => setOpen(false)}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
