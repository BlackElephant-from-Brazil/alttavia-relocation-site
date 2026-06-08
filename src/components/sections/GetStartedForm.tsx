'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

import type { Dictionary } from '@/i18n/dictionaries'

const inputClass =
  'w-full rounded-xl border border-primary/15 bg-white/90 px-4 py-3.5 text-base text-ink outline-none ring-1 ring-transparent transition-all duration-200 placeholder:text-graphite/45 hover:border-primary/25 hover:bg-white focus:border-secondary/60 focus:bg-white focus:ring-2 focus:ring-secondary/15 focus:shadow-[0_0_0_4px_rgba(208,161,43,0.08)]'

export function GetStartedForm({
  dict,
  locale = 'en',
  idPrefix = 'get-started',
  variant = 'solid',
  className = '',
}: {
  dict: Dictionary
  locale?: string
  idPrefix?: string
  variant?: 'solid' | 'glass'
  className?: string
}) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const nameId = `${idPrefix}-name`
  const emailId = `${idPrefix}-email`
  const messageId = `${idPrefix}-message`

  const shellClass =
    variant === 'glass'
      ? 'border border-white/18 bg-white/10 shadow-glass backdrop-blur-2xl'
      : 'border border-white/12 bg-[linear-gradient(145deg,#1A436A,#153858)] shadow-[0_22px_70px_rgba(0,0,0,0.22)]'

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
      className={`mt-10 max-w-2xl rounded-2xl p-6 text-white sm:p-7 ${shellClass} ${className}`.trim()}
    >
      <input type="hidden" name="language" value={locale} />

      <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
        <div>
          <label
            className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor={nameId}
          >
            {dict.contact.form.name}
          </label>
          <input
            autoComplete="name"
            className={inputClass}
            id={nameId}
            name="name"
            placeholder={dict.contact.form.name}
            required
          />
        </div>

        <div>
          <label
            className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor={emailId}
          >
            {dict.contact.form.email}
          </label>
          <input
            autoComplete="email"
            className={inputClass}
            id={emailId}
            name="email"
            placeholder={dict.contact.form.email}
            required
            type="email"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="mb-2 block text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-secondary"
            htmlFor={messageId}
          >
            {dict.contact.form.message}
          </label>
          <textarea
            className={`${inputClass} min-h-[7.5rem] resize-none leading-7`}
            id={messageId}
            name="message"
            placeholder={dict.contact.form.message}
            required
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-primary shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary hover:shadow-[0_8px_24px_rgba(208,161,43,0.3)] focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit"
          disabled={status === 'loading'}
          type="submit"
        >
          Speak to our Experts
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {status === 'success' ? (
        <div className="mt-4 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white/90 backdrop-blur-sm">
          {dict.contact.form.success}
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="mt-4 rounded-xl border border-red-400/30 bg-red-500/15 px-4 py-3 text-sm text-red-200">
          {dict.contact.form.error}
        </div>
      ) : null}
    </form>
  )
}
