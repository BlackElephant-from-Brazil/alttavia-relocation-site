import type { Metadata } from 'next'

import { FeatureGrid } from '@/components/sections/FeatureGrid'
import { Hero } from '@/components/sections/Hero'
import { SectionHeader } from '@/components/ui/SectionHeader'
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
  const cms = await getPageByKey(locale, 'why-us').catch(() => null)
  return createMetadata(
    cms?.seoTitle || dict.seo.whyUs.title,
    cms?.seoDescription || dict.seo.whyUs.description,
    `/${locale}/why-us`,
  )
}

export default async function WhyUsPage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)
  const cms = await getPageByKey(locale, 'why-us').catch(() => null)

  return (
    <main>
      <Hero
        eyebrow={dict.nav.whyUs}
        title={cms?.heroTitle || dict.whyUs.heroTitle}
        subtitle={cms?.heroSubtitle || dict.whyUs.heroSubtitle}
        primaryHref={`/${locale}/contact`}
        primaryLabel={dict.common.getInTouch}
        visualItems={dict.common.visualItems}
        visualTitle={dict.common.visualTitle}
      />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <FeatureGrid items={dict.whyUs.pillars} columns={2} />
        </div>
      </section>
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/70 bg-white/62 p-8 text-center shadow-glass backdrop-blur-xl md:p-12">
          <SectionHeader title={dict.whyUs.proofTitle} text={dict.whyUs.proofText} />
        </div>
      </section>
    </main>
  )
}
