import type { ReactNode } from 'react'
import { Footer } from '@/components/layout/Footer'
import { Navbar } from '@/components/layout/Navbar'
import { getDictionary } from '@/i18n/dictionaries'

export default function BlogLayout({ children }: { children: ReactNode }) {
  const dict = getDictionary('en')
  return (
    <>
      <Navbar locale="en" dict={dict} />
      {children}
      <Footer locale="en" dict={dict} />
    </>
  )
}
