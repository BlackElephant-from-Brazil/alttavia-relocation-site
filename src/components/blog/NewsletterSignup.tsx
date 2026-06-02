'use client'

import { Mail } from 'lucide-react'
import { useState } from 'react'

export function NewsletterSignup() {
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
    <form onSubmit={onSubmit} className="newsletter-signup-form mt-8 grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
      <input name="message" type="hidden" value="Newsletter signup request" />
      <label className="sr-only" htmlFor="newsletter-name">
        Name
      </label>
      <input
        autoComplete="name"
        className="min-h-12 rounded-full border border-white/15 bg-white/18 px-5 text-white outline-none transition placeholder:text-white/58 focus:bg-white/25 focus:ring-2 focus:ring-secondary/45"
        id="newsletter-name"
        name="name"
        placeholder="Name"
        required
      />
      <label className="sr-only" htmlFor="newsletter-email">
        Email
      </label>
      <input
        autoComplete="email"
        className="min-h-12 rounded-full border border-white/15 bg-white/18 px-5 text-white outline-none transition placeholder:text-white/58 focus:bg-white/25 focus:ring-2 focus:ring-secondary/45"
        id="newsletter-email"
        name="email"
        placeholder="Email"
        required
        type="email"
      />
      <button
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 disabled:opacity-70"
        disabled={status === 'loading'}
        type="submit"
      >
        Sign up for updates
        <Mail className="h-4 w-4" aria-hidden="true" />
      </button>
      {status === 'success' ? <p className="text-sm text-white sm:col-span-3">Thanks. We will keep you updated.</p> : null}
      {status === 'error' ? (
        <p className="text-sm text-red-100 sm:col-span-3">Please check your details and try again.</p>
      ) : null}
    </form>
  )
}
