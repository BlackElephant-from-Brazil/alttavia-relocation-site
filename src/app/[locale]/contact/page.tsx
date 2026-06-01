import type { Metadata } from 'next'
import { Mail, MapPin, MessageCircle } from 'lucide-react'

import { ContactForm } from '@/components/contact/ContactForm'
import { Hero } from '@/components/sections/Hero'
import { getDictionary } from '@/i18n/dictionaries'
import { normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'
import { getPageByKey } from '@/lib/strapi'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)
  const cms = await getPageByKey(locale, 'contact').catch(() => null)
  return createMetadata(
    cms?.seoTitle || dict.seo.contact.title,
    cms?.seoDescription || dict.seo.contact.description,
    `/${locale}/contact`,
  )
}

export default async function ContactPage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)
  const cms = await getPageByKey(locale, 'contact').catch(() => null)

  return (
    <main>
      <Hero
        eyebrow={dict.nav.contact}
        title={cms?.heroTitle || dict.contact.heroTitle}
        subtitle={cms?.heroSubtitle || dict.contact.heroSubtitle}
        visualItems={dict.common.visualItems}
        visualTitle={dict.common.visualTitle}
      />
      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1fr]">
          <div className="rounded-3xl border border-white/70 bg-white/62 p-8 shadow-soft backdrop-blur-xl">
            <h2 className="font-serif text-4xl text-ink">{dict.contact.detailsTitle}</h2>
            <p className="mt-5 leading-8 text-graphite">{dict.contact.details}</p>
            <div className="mt-8 grid gap-4 text-sm text-graphite">
              <span className="flex items-center gap-3">
                <Mail size={17} /> {dict.contact.emailLabel}: hello@example.com
              </span>
              <span className="flex items-center gap-3">
                <MessageCircle size={17} /> {dict.contact.whatsapp}
              </span>
              <span className="flex items-center gap-3">
                <MapPin size={17} /> {dict.contact.location}
              </span>
            </div>
          </div>
          <ContactForm dict={dict} />
        </div>
      </section>
    </main>
  )
}
