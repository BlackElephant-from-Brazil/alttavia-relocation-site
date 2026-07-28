import type { Metadata } from 'next'
import Script from 'next/script'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import type { ReactNode } from 'react'

import './globals.css'
import { organizationJsonLd } from '@/lib/structuredData'

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const googleSiteVerificationCodes = (process.env.GOOGLE_SITE_VERIFICATION ?? '')
  .split(',')
  .map((code) => code.trim())
  .filter(Boolean)

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
  ...(googleSiteVerificationCodes.length > 0 && {
    verification: { google: googleSiteVerificationCodes },
  }),
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        {gaMeasurementId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
