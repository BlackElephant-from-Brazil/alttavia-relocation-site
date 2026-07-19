'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

type Service = {
  title: string
  text: string
  details: readonly string[]
}

export function ServiceCards({ services }: { services: readonly Service[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="-mx-6 overflow-x-auto px-6 pb-4 [scrollbar-width:thin] [scrollbar-color:#D0A12B_transparent] md:mx-0 md:overflow-visible md:px-0 md:pb-0">
      <div className="flex w-max items-start gap-4 md:grid md:w-auto md:grid-cols-2 lg:grid-cols-3">
        {services.map(({ title, text, details }, index) => {
          const open = openIndex === index
          return (
            <article
              key={title}
              className="group relative w-[82vw] max-w-[22rem] shrink-0 overflow-hidden rounded-3xl border border-primary/10 bg-white/80 p-7 text-left shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:border-secondary/45 hover:bg-white md:w-auto md:max-w-none"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/70 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="mb-8 inline-flex h-9 w-9 items-center justify-center rounded-full border border-secondary/35 bg-secondary/10 text-xs font-semibold text-primary">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-serif text-2xl leading-tight text-ink">{title}</h3>
              <p className="mt-4 leading-7 text-graphite">{text}</p>

              <button
                type="button"
                onClick={() => setOpenIndex(open ? null : index)}
                aria-expanded={open}
                className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-secondary transition hover:gap-2.5"
              >
                {open ? 'Show less' : 'Learn more'}
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>

              <div className={`grid transition-all duration-200 ${open ? 'grid-rows-[1fr] mt-4' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                  <ul className="space-y-2.5 border-t border-primary/8 pt-4">
                    {details.map((detail) => (
                      <li key={detail} className="flex gap-2.5 text-sm leading-6 text-graphite">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
