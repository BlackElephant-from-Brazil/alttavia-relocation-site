'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LayoutDashboard, FileText, LogOut, Loader2 } from 'lucide-react'

export function AdminHeader({ currentPath }: { currentPath: string }) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'DELETE' })
      router.push('/admin/login')
    } catch {
      setLoggingOut(false)
    }
  }

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/posts/new', label: 'New Post', icon: FileText },
  ]

  return (
    <header className="sticky top-0 z-50 border-b border-primary/10 bg-porcelain/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo-min.svg"
            alt="Alttavia"
            width={85}
            height={68}
            className="h-7 w-auto opacity-90"
            priority
          />
          <div className="flex items-center gap-2">
            <span className="h-4 w-px bg-primary/20" aria-hidden="true" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-graphite/70">
              Admin
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = currentPath === href
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? 'bg-primary text-white'
                    : 'text-graphite hover:bg-primary/8 hover:text-ink'
                }`}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                {label}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-primary/15 px-4 py-2 text-sm font-medium text-graphite transition hover:border-primary/30 hover:text-ink disabled:opacity-50"
          type="button"
        >
          {loggingOut ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
          ) : (
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          <span className="hidden sm:inline">Sign out</span>
        </button>
      </div>
    </header>
  )
}
