'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

import type { Dictionary } from '@/i18n/dictionaries'

const inputClass =
  'w-full rounded-xl border border-primary/12 bg-porcelain/70 px-4 py-3.5 text-sm text-ink outline-none ring-1 ring-transparent transition-all duration-200 placeholder:text-graphite/35 hover:border-primary/25 hover:bg-white/90 focus:border-secondary/55 focus:bg-white focus:ring-2 focus:ring-secondary/15 focus:shadow-[0_0_0_4px_rgba(208,161,43,0.07)]'

export function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('loading')

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: new FormData(event.currentTarget),
    })

    setStatus(response.ok ? 'success' : 'error')

    if (response.ok) {
      event.currentTarget.reset()
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-primary/8 bg-white/85 p-7 shadow-glass backdrop-blur-xl md:p-8"
    >
      <div className="grid gap-5">
        <div>
          <label
            className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor="contact-name"
          >
            {dict.contact.form.name}
          </label>
          <input
            autoComplete="name"
            className={inputClass}
            id="contact-name"
            name="name"
            placeholder={dict.contact.form.name}
            required
          />
        </div>

        <div>
          <label
            className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor="contact-email"
          >
            {dict.contact.form.email}
          </label>
          <input
            autoComplete="email"
            className={inputClass}
            id="contact-email"
            name="email"
            placeholder={dict.contact.form.email}
            required
            type="email"
          />
        </div>

        <div>
          <label
            className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor="contact-phone"
          >
            {dict.contact.form.phone}
          </label>
          <input
            autoComplete="tel"
            className={inputClass}
            id="contact-phone"
            name="phone"
            placeholder={dict.contact.form.phone}
          />
        </div>

        <div>
          <label
            className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor="contact-message"
          >
            {dict.contact.form.message}
          </label>
          <textarea
            className={`${inputClass} min-h-36 resize-none leading-7`}
            id="contact-message"
            name="message"
            placeholder={dict.contact.form.message}
            required
          />
        </div>
      </div>

      <button
        className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:text-primary hover:shadow-[0_8px_24px_rgba(208,161,43,0.28)] focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={status === 'loading'}
        type="submit"
      >
        {dict.contact.form.submit}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>

      {status === 'success' ? (
        <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {dict.contact.form.success}
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="mt-4 rounded-xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-700">
          {dict.contact.form.error}
        </div>
      ) : null}
    </form>
  )
}
