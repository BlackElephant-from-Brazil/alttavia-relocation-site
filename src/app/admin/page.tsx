import Link from 'next/link'
import { FileText, Globe, FileEdit, Plus } from 'lucide-react'
import { getAllPosts } from '@/lib/posts'
import { PostsTable } from './_components/PostsTable'

export const dynamic = 'force-dynamic'

export default function AdminDashboard() {
  const posts = getAllPosts()
  const published = posts.filter((p) => p.published).length
  const drafts = posts.length - published

  const stats = [
    { label: 'Total Posts', value: posts.length, icon: FileText },
    { label: 'Published', value: published, icon: Globe },
    { label: 'Drafts', value: drafts, icon: FileEdit },
  ]

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
            Dashboard
          </p>
          <h1 className="mt-2 font-serif text-4xl text-ink">Blog Posts</h1>
          <p className="mt-1 text-sm text-graphite/70">
            Manage your relocation insights and articles.
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">New Post</span>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="overflow-hidden rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-soft"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-graphite/60">
                  {label}
                </p>
                <p className="mt-2 font-serif text-4xl text-ink">{value}</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-secondary/25 bg-secondary/10">
                <Icon className="h-5 w-5 text-secondary" aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Posts table */}
      <PostsTable initialPosts={posts} />
    </div>
  )
}
