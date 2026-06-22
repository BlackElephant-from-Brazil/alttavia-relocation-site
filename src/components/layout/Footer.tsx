import Image from 'next/image'
import Link from 'next/link'
import { Facebook, Instagram, Mail, MessageCircle, Phone } from 'lucide-react'

import type { Dictionary } from '@/i18n/dictionaries'
import type { Locale } from '@/i18n/routing'

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/patricia_viana_lawyer' },
  { icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100087269040601' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/351934548395' },
] as const

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const links = [
    [dict.nav.home, `/${locale}`],
    [dict.nav.whyUs, `/${locale}/why-us`],
    [dict.nav.services, `/${locale}/relocation-services`],
    [dict.nav.blog, `/${locale}/blog`],
    [dict.nav.contact, `/${locale}/contact`],
  ]
  const year = new Date().getFullYear()

  return (
    <footer className="relative overflow-hidden bg-primary px-6 pt-16 text-white">
      <div
        className="absolute inset-0 opacity-[0.14]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-secondary" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-12 pb-14 md:grid-cols-[1.3fr_0.85fr_0.85fr]">
        <div>
          <div className="inline-flex rounded-2xl bg-white p-3 shadow-soft">
            <Image src="/logo.svg" alt="Alttavia Relocation" width={128} height={102} className="h-12 w-auto" />
          </div>
          <p className="mt-5 max-w-sm text-base leading-7 text-white/72">{dict.footer.tagline}</p>
          <div className="mt-6 flex gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:-translate-y-0.5 hover:border-secondary/60 hover:text-secondary"
                href={href}
                rel="noreferrer"
                target="_blank"
              >
                <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">{dict.footer.pagesLabel}</p>
          <div className="mt-5 grid gap-3">
            {links.map(([label, href]) => (
              <Link key={href} className="text-sm text-white/75 transition hover:text-white" href={href}>
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            {dict.footer.contactLabel}
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/75">
            <a
              className="inline-flex items-center gap-2 transition hover:text-white"
              href="mailto:info@alttavia-relocation.com"
            >
              <Mail className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
              info@alttavia-relocation.com
            </a>
            <a className="inline-flex items-center gap-2 transition hover:text-white" href="tel:+351934548395">
              <Phone className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden="true" />
              +351 934 548 395
            </a>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/12 py-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 text-xs text-white/55 md:flex-row md:justify-between">
          <p>
            © {year} Alttavia Relocation. {dict.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <Link className="transition hover:text-white" href={`/${locale}/privacy-policy`}>
              {dict.footer.privacyPolicy}
            </Link>
            <span className="h-3 w-px bg-white/15" aria-hidden="true" />
            <Link className="transition hover:text-white" href={`/${locale}/terms-of-use`}>
              {dict.footer.termsOfUse}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
