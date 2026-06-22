import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

import type { LegalDocument } from '@/content/legal'
import type { Locale } from '@/i18n/routing'

export function LegalPage({
  document,
  locale,
  backLabel,
}: {
  document: LegalDocument
  locale: Locale
  backLabel: string
}) {
  return (
    <main>
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-36 md:pb-20 md:pt-44">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(208,161,43,0.16),transparent_28%),linear-gradient(135deg,#fbfaf7_0%,#f7f4ee_46%,#eef2f4_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-3xl">
          <Link
            className="inline-flex items-center gap-2 text-sm font-medium text-graphite transition hover:text-primary"
            href={`/${locale}`}
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            {backLabel}
          </Link>
          <h1 className="mt-6 font-serif text-4xl leading-[1.05] text-ink md:text-6xl">{document.title}</h1>
          <p className="mt-4 text-sm font-medium uppercase tracking-[0.16em] text-graphite/60">{document.updated}</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite">{document.intro}</p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl divide-y divide-primary/10 border-t border-primary/10">
          {document.sections.map((section) => (
            <article key={section.heading} className="py-10">
              <h2 className="font-serif text-2xl leading-tight text-ink md:text-3xl">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="text-base leading-7 text-graphite md:text-lg md:leading-8">
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
