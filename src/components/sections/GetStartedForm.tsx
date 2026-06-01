'use client'

import { Compass } from 'lucide-react'
import { useState } from 'react'

import type { Dictionary } from '@/i18n/dictionaries'

export function GetStartedForm({ dict }: { dict: Dictionary }) {
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
      className="get-started-form-shell mt-10 max-w-2xl rounded-2xl border border-white/10 bg-[linear-gradient(145deg,#1A436A,#153858)] p-5 text-white shadow-[0_22px_70px_rgba(0,0,0,0.18)] sm:p-6"
    >
      <div className="get-started-form-grid grid gap-x-6 gap-y-5 sm:grid-cols-2">
        <div className="get-started-form-field">
          <label
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor="get-started-name"
          >
            {dict.contact.form.name}
          </label>
          <input
            autoComplete="name"
            className="w-full rounded-xl border border-white/10 bg-white/30 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/58 focus:bg-white/38 focus:ring-2 focus:ring-secondary/45"
            id="get-started-name"
            name="name"
            placeholder={dict.contact.form.name}
            required
          />
        </div>
        <div className="get-started-form-field">
          <label
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor="get-started-email"
          >
            {dict.contact.form.email}
          </label>
          <input
            autoComplete="email"
            className="w-full rounded-xl border border-white/10 bg-white/30 px-4 py-3 text-base text-white outline-none transition placeholder:text-white/58 focus:bg-white/38 focus:ring-2 focus:ring-secondary/45"
            id="get-started-email"
            name="email"
            placeholder={dict.contact.form.email}
            required
            type="email"
          />
        </div>
        <div className="get-started-form-field sm:col-span-2">
          <label
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor="get-started-message"
          >
            {dict.contact.form.message}
          </label>
          <textarea
            className="min-h-32 w-full resize-none rounded-xl border border-white/10 bg-white/30 px-4 py-3 text-base leading-7 text-white outline-none transition placeholder:text-white/58 focus:bg-white/38 focus:ring-2 focus:ring-secondary/45"
            id="get-started-message"
            name="message"
            placeholder={dict.contact.form.message}
            required
          />
        </div>
      </div>
      <div className="mt-7 flex justify-start">
        <button
          className="get-started-form-submit inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:opacity-70 sm:w-fit"
          disabled={status === 'loading'}
          type="submit"
        >
          Speak to our Experts
          <Compass className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      {status === 'success' ? <p className="mt-4 text-sm text-white">{dict.contact.form.success}</p> : null}
      {status === 'error' ? <p className="mt-4 text-sm text-red-100">{dict.contact.form.error}</p> : null}
    </form>
  )
}
