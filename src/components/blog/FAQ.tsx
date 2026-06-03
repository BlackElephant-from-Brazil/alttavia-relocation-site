'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export function FAQ({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-8 divide-y divide-primary/10 overflow-hidden rounded-3xl border border-primary/10 bg-white/80 shadow-soft">
      {children}
    </div>
  )
}

export function FAQItem({ q, children }: { q: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-primary/[0.03]"
        aria-expanded={open}
      >
        <span className="font-serif text-lg leading-snug text-ink">{q}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-secondary transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        className={`grid transition-all duration-200 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-5 text-base leading-7 text-graphite">{children}</div>
        </div>
      </div>
    </div>
  )
}
