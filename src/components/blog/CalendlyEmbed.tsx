'use client'

import Script from 'next/script'

export function CalendlyEmbed({ url }: { url: string }) {
  return (
    <div className="not-prose my-10">
      <Script src="https://assets.calendly.com/assets/external/widget.js" strategy="lazyOnload" />
      <div
        className="calendly-inline-widget overflow-hidden rounded-3xl border border-primary/10 shadow-soft"
        data-url={url}
        style={{ minWidth: '320px', height: '700px' }}
      />
    </div>
  )
}
