import type { Metadata } from 'next'

import { LegalPage } from '@/components/legal/LegalPage'
import { privacyPolicyContent } from '@/content/legal'
import { getDictionary } from '@/i18n/dictionaries'
import { normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale)
  const content = privacyPolicyContent[locale]
  return createMetadata(content.title, content.intro, `/${locale}/privacy-policy`)
}

export default async function PrivacyPolicyPage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)

  return <LegalPage backLabel={dict.nav.home} document={privacyPolicyContent[locale]} locale={locale} />
}
