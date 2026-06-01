'use client'

import { Send } from 'lucide-react'
import { useState } from 'react'

import type { Dictionary } from '@/i18n/dictionaries'

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
    <form onSubmit={onSubmit} className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-glass backdrop-blur-xl">
      <div className="grid gap-4">
        <label className="sr-only" htmlFor="contact-name">
          {dict.contact.form.name}
        </label>
        <input
          autoComplete="name"
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-navy"
          id="contact-name"
          name="name"
          placeholder={dict.contact.form.name}
          required
        />
        <label className="sr-only" htmlFor="contact-email">
          {dict.contact.form.email}
        </label>
        <input
          autoComplete="email"
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-navy"
          id="contact-email"
          name="email"
          placeholder={dict.contact.form.email}
          required
          type="email"
        />
        <label className="sr-only" htmlFor="contact-phone">
          {dict.contact.form.phone}
        </label>
        <input
          autoComplete="tel"
          className="rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-navy"
          id="contact-phone"
          name="phone"
          placeholder={dict.contact.form.phone}
        />
        <label className="sr-only" htmlFor="contact-message">
          {dict.contact.form.message}
        </label>
        <textarea
          className="min-h-40 rounded-2xl border border-ink/10 bg-white px-4 py-3 outline-none focus:border-navy"
          id="contact-message"
          name="message"
          placeholder={dict.contact.form.message}
          required
        />
      </div>
      <button
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:bg-navy disabled:opacity-70"
        disabled={status === 'loading'}
        type="submit"
      >
        <Send size={16} />
        {dict.contact.form.submit}
      </button>
      {status === 'success' ? (
        <p className="mt-4 text-sm text-emerald-700">{dict.contact.form.success}</p>
      ) : null}
      {status === 'error' ? <p className="mt-4 text-sm text-red-700">{dict.contact.form.error}</p> : null}
    </form>
  )
}
