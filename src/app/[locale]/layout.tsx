import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'

import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { getDictionary } from '@/i18n/dictionaries'
import { isLocale, locales } from '@/i18n/routing'

type Props = {
  children: ReactNode
  params: Promise<{
    locale: string
  }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!isLocale(locale)) {
    notFound()
  }

  const dict = getDictionary(locale)

  return (
    <>
      <Navbar locale={locale} dict={dict} />
      {children}
      <Footer locale={locale} dict={dict} />
    </>
  )
}
