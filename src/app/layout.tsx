import type { Metadata } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import type { ReactNode } from 'react'

import './globals.css'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
})

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: {
    default: 'Alttavia Relocation',
    template: '%s | Alttavia Relocation',
  },
  description: 'Premium relocation services for international families and professionals.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
