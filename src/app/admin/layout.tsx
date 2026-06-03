import type { ReactNode } from 'react'
import { headers } from 'next/headers'
import { AdminHeader } from './_components/AdminHeader'

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const headerStore = await headers()
  const pathname = headerStore.get('x-invoke-path') ?? '/admin'

  return (
    <div className="min-h-screen bg-porcelain">
      <AdminHeader currentPath={pathname} />
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  )
}
