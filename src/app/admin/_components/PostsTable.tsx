'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Pencil, Trash2, Eye, EyeOff, Loader2, ExternalLink } from 'lucide-react'
import type { Post } from '@/lib/posts'
import { useToasts, ToastViewport } from './Toast'

export function PostsTable({ initialPosts }: { initialPosts: Post[] }) {
  const router = useRouter()
  const [posts, setPosts] = useState(initialPosts)
  const [loading, setLoading] = useState<string | null>(null)
  const { toasts, addToast } = useToasts()

  async function togglePublished(post: Post) {
    setLoading(`toggle-${post.slug}`)
    try {
      const res = await fetch(`/api/posts/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !post.published }),
      })
      if (!res.ok) throw new Error()
      const updated = await res.json() as Post
      setPosts((prev) => prev.map((p) => (p.slug === post.slug ? updated : p)))
      addToast(
        `"${post.title}" ${!post.published ? 'published' : 'unpublished'}.`,
        'success',
      )
    } catch {
      addToast('Failed to update post status.', 'error')
    } finally {
      setLoading(null)
    }
  }

  async function handleDelete(post: Post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return
    setLoading(`delete-${post.slug}`)
    try {
      const res = await fetch(`/api/posts/${post.slug}`, { method: 'DELETE' })
      if (!res.ok) throw new Error()
      setPosts((prev) => prev.filter((p) => p.slug !== post.slug))
      addToast(`"${post.title}" deleted.`, 'success')
      router.refresh()
    } catch {
      addToast('Failed to delete post.', 'error')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="relative">
      <ToastViewport toasts={toasts} />

      {posts.length === 0 ? (
        <div className="rounded-3xl border border-primary/10 bg-white/70 p-16 text-center shadow-soft">
          <p className="font-serif text-2xl text-ink/40">No posts yet.</p>
          <p className="mt-2 text-sm text-graphite/60">
            <Link href="/admin/posts/new" className="text-secondary underline underline-offset-2">
              Create your first post
            </Link>
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white/80 shadow-soft">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-primary/8 bg-mist/60">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-graphite/70">
                  Title
                </th>
                <th className="hidden px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-graphite/70 md:table-cell">
                  Author
                </th>
                <th className="hidden px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-graphite/70 sm:table-cell">
                  Date
                </th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.18em] text-graphite/70">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-[0.18em] text-graphite/70">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/6">
              {posts.map((post) => {
                const date = new Date(post.date).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
                const isToggling = loading === `toggle-${post.slug}`
                const isDeleting = loading === `delete-${post.slug}`

                return (
                  <tr
                    key={post.slug}
                    className="transition hover:bg-mist/30"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <span className="font-medium text-ink">{post.title}</span>
                        {post.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1">
                            {post.tags.slice(0, 2).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-full bg-secondary/10 px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-secondary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="hidden px-4 py-4 text-graphite md:table-cell">
                      {post.author}
                    </td>
                    <td className="hidden px-4 py-4 text-graphite/70 sm:table-cell">{date}</td>
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.14em] ${
                          post.published
                            ? 'bg-secondary/15 text-secondary'
                            : 'bg-graphite/8 text-graphite/60'
                        }`}
                      >
                        {post.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {post.published && (
                          <a
                            href={`/blog/${post.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-graphite/50 transition hover:bg-mist hover:text-graphite"
                            title="View post"
                          >
                            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        )}

                        <button
                          onClick={() => togglePublished(post)}
                          disabled={isToggling || isDeleting}
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-graphite/50 transition hover:bg-mist hover:text-graphite disabled:opacity-40"
                          title={post.published ? 'Unpublish' : 'Publish'}
                          type="button"
                        >
                          {isToggling ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                          ) : post.published ? (
                            <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
                          ) : (
                            <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                        </button>

                        <Link
                          href={`/admin/posts/${post.slug}/edit`}
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-graphite/50 transition hover:bg-primary/8 hover:text-primary"
                          title="Edit"
                        >
                          <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                        </Link>

                        <button
                          onClick={() => handleDelete(post)}
                          disabled={isDeleting || isToggling}
                          className="inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-graphite/50 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-40"
                          title="Delete"
                          type="button"
                        >
                          {isDeleting ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" aria-hidden="true" />
                          ) : (
                            <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
