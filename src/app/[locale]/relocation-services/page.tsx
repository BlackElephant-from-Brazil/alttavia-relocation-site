import type { Metadata } from 'next'

import { FeatureGrid } from '@/components/sections/FeatureGrid'
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
  const cms = await getPageByKey(locale, 'relocation-services').catch(() => null)
  return createMetadata(
    cms?.seoTitle || dict.seo.services.title,
    cms?.seoDescription || dict.seo.services.description,
    `/${locale}/relocation-services`,
  )
}

export default async function ServicesPage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)
  const cms = await getPageByKey(locale, 'relocation-services').catch(() => null)

  return (
    <main>
      <Hero
        eyebrow={dict.nav.services}
        title={cms?.heroTitle || dict.services.heroTitle}
        subtitle={cms?.heroSubtitle || dict.services.heroSubtitle}
        primaryHref={`/${locale}/contact`}
        primaryLabel={dict.common.getInTouch}
        secondaryHref={`/${locale}/why-us`}
        secondaryLabel={dict.nav.whyUs}
        visualItems={dict.common.visualItems}
        visualTitle={dict.common.visualTitle}
      />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <FeatureGrid items={dict.services.groups} columns={2} />
        </div>
      </section>
    </main>
  )
}
