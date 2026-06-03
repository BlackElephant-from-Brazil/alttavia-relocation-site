'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2, Lock } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username || !password) {
      setError('Please enter your username and password.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Login failed.')
      }

      router.push('/admin')
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(208,161,43,0.12),transparent_40%),linear-gradient(135deg,#fbfaf7,#f7f4ee)] px-6">
      {/* Decorative grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.025]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(#0E2A47 1px, transparent 1px), linear-gradient(90deg, #0E2A47 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Glow */}
        <div
          className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-secondary/8 blur-2xl"
          aria-hidden="true"
        />

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-white/80 bg-white/90 shadow-glass backdrop-blur-xl">
          {/* Header */}
          <div className="flex flex-col items-center border-b border-primary/8 bg-mist/50 px-8 py-8">
            <Image
              src="/logo.svg"
              alt="Alttavia Relocation"
              width={128}
              height={102}
              className="h-12 w-auto"
              priority
            />
            <div className="mt-5 flex items-center gap-2">
              <span className="h-px w-8 bg-secondary/50" aria-hidden="true" />
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-graphite/60">
                Admin Portal
              </span>
              <span className="h-px w-8 bg-secondary/50" aria-hidden="true" />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5 px-8 py-8">
            {error && (
              <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-graphite/70"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                placeholder="admin"
                className="w-full rounded-2xl border border-primary/15 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-graphite/35 transition focus:border-secondary/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20"
                required
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.18em] text-graphite/70"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-primary/15 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-graphite/35 transition focus:border-secondary/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-sm font-medium text-white shadow-soft transition hover:bg-primary/90 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              ) : (
                <Lock className="h-4 w-4" aria-hidden="true" />
              )}
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-graphite/40">
          Alttavia Relocation · Secure Admin
        </p>
      </div>
    </div>
  )
}
