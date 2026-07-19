import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/LegalPage'
import { termsOfUseContent } from '@/content/legal'
import { getDictionary } from '@/i18n/dictionaries'
import { normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale)
  const content = termsOfUseContent[locale]
  return createMetadata(content.title, content.intro, `/${locale}/terms-of-use`)
}

export default async function TermsOfUsePage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)

  return <LegalPage backLabel={dict.nav.home} document={termsOfUseContent[locale]} locale={locale} />
}
