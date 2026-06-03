'use client'

import { useRouter } from 'next/navigation'
import { useState, useCallback, useRef } from 'react'
import { Loader2, Eye, PenLine, ImageIcon, Bold, Italic, Quote } from 'lucide-react'
import type { Post } from '@/lib/posts'

type FormValues = {
  title: string
  slug: string
  excerpt: string
  author: string
  date: string
  tags: string
  published: boolean
  content: string
}

function markdownPreview(md: string): string {
  return (
    md
      // FAQ blocks (before other replacements)
      .replace(/<FAQ>([\s\S]*?)<\/FAQ>/g, (_, inner: string) => {
        const items = inner.replace(
          /<FAQItem q="([^"]*)">([\s\S]*?)<\/FAQItem>/g,
          (_m: string, q: string, a: string) =>
            `<details class="preview-faq-item"><summary class="preview-faq-q">${q}</summary><div class="preview-faq-a">${a.trim()}</div></details>`,
        )
        return `<div class="preview-faq">${items}</div>`
      })
      // Images (before links)
      .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="preview-img" />')
      .replace(/^### (.+)$/gm, '<h3>$1</h3>')
      .replace(/^## (.+)$/gm, '<h2>$1</h2>')
      .replace(/^# (.+)$/gm, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      .replace(/^(?!<[h1-6bdi]).+$/gm, (line) => (line.trim() ? `<p>${line}</p>` : ''))
  )
}

const inputClass =
  'w-full rounded-2xl border border-primary/15 bg-white/70 px-4 py-3 text-sm text-ink placeholder:text-graphite/40 transition focus:border-secondary/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20'

const labelClass = 'mb-1.5 block text-xs font-semibold uppercase tracking-[0.16em] text-graphite/70'

function ToolbarBtn({
  children,
  title,
  onClick,
  disabled,
  className = '',
}: {
  children: React.ReactNode
  title: string
  onClick: () => void
  disabled?: boolean
  className?: string
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex cursor-pointer items-center gap-1 rounded-lg px-2 py-1 text-xs font-semibold text-graphite/70 transition hover:bg-primary/8 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 ${className}`}
    >
      {children}
    </button>
  )
}

function ToolbarDivider() {
  return <span className="mx-0.5 h-4 w-px shrink-0 bg-primary/15" />
}

type Props = {
  initialValues?: Partial<Post>
  mode: 'create' | 'edit'
  slug?: string
}

export function PostForm({ initialValues, mode, slug }: Props) {
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [values, setValues] = useState<FormValues>({
    title: initialValues?.title ?? '',
    slug: initialValues?.slug ?? '',
    excerpt: initialValues?.excerpt ?? '',
    author: initialValues?.author ?? 'Alttavia Team',
    date: initialValues?.date ?? new Date().toISOString().split('T')[0],
    tags: (initialValues?.tags ?? []).join(', '),
    published: initialValues?.published ?? false,
    content: initialValues?.content ?? '',
  })

  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [tab, setTab] = useState<'write' | 'preview'>('write')

  function set(field: keyof FormValues, value: string | boolean) {
    setValues((prev) => ({ ...prev, [field]: value }))
  }

  // ── Cursor helpers ────────────────────────────────────────────────────────

  function insertAtCursor(text: string) {
    const el = textareaRef.current
    if (!el) {
      set('content', values.content + text)
      return
    }
    const start = el.selectionStart
    const end = el.selectionEnd
    const next = values.content.slice(0, start) + text + values.content.slice(end)
    set('content', next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + text.length, start + text.length)
    })
  }

  function wrapSelection(before: string, after: string) {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = values.content.slice(start, end)
    const inserted = before + selected + after
    const next = values.content.slice(0, start) + inserted + values.content.slice(end)
    set('content', next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + before.length, start + before.length + selected.length)
    })
  }

  function insertLinePrefix(prefix: string) {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const lineStart = values.content.lastIndexOf('\n', start - 1) + 1
    const next = values.content.slice(0, lineStart) + prefix + values.content.slice(lineStart)
    set('content', next)
    requestAnimationFrame(() => {
      el.focus()
      el.setSelectionRange(start + prefix.length, start + prefix.length)
    })
  }

  function insertFAQTemplate() {
    const template = `\n<FAQ>\n<FAQItem q="Your question here">\nYour answer here.\n</FAQItem>\n<FAQItem q="Another question">\nAnother answer here.\n</FAQItem>\n</FAQ>\n`
    insertAtCursor(template)
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setError('')
    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: formData })
      if (!res.ok) {
        const data = await res.json() as { error?: string }
        throw new Error(data.error ?? 'Upload failed')
      }
      const data = await res.json() as { url: string }
      insertAtCursor(`![](${data.url})`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  // ── Save ──────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      if (!values.title.trim()) {
        setError('Title is required.')
        return
      }

      setSaving(true)
      setError('')
      setSuccess('')

      const payload = {
        ...values,
        tags: values.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }

      try {
        const url = mode === 'edit' ? `/api/posts/${slug}` : '/api/posts'
        const method = mode === 'edit' ? 'PUT' : 'POST'

        const res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const data = await res.json() as { error?: string }
          throw new Error(data.error ?? 'Unknown error')
        }

        const saved = await res.json() as Post
        setSuccess(mode === 'edit' ? 'Post updated.' : 'Post created.')

        if (mode === 'create') {
          router.push(`/admin/posts/${saved.slug}/edit`)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to save post.')
      } finally {
        setSaving(false)
      }
    },
    [values, mode, slug, router],
  )

  const preview = markdownPreview(values.content)

  return (
    <form onSubmit={handleSubmit} className="flex h-full flex-col gap-6">
      {/* Status bar */}
      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {success && (
        <div className="rounded-2xl border border-secondary/30 bg-secondary/10 px-4 py-3 text-sm font-medium text-primary">
          {success}
        </div>
      )}

      {/* Metadata fields */}
      <div className="rounded-3xl border border-primary/10 bg-white/80 p-6 shadow-soft">
        <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-graphite/60">Post Details</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label htmlFor="title" className={labelClass}>
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={values.title}
              onChange={(e) => set('title', e.target.value)}
              placeholder="Your compelling post title"
              className={inputClass}
              required
            />
          </div>

          <div>
            <label htmlFor="slug" className={labelClass}>
              Slug
            </label>
            <input
              id="slug"
              type="text"
              value={values.slug}
              onChange={(e) => set('slug', e.target.value)}
              placeholder="auto-generated-from-title"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="author" className={labelClass}>
              Author
            </label>
            <input
              id="author"
              type="text"
              value={values.author}
              onChange={(e) => set('author', e.target.value)}
              placeholder="Alttavia Team"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="date" className={labelClass}>
              Date
            </label>
            <input
              id="date"
              type="date"
              value={values.date}
              onChange={(e) => set('date', e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="tags" className={labelClass}>
              Tags
            </label>
            <input
              id="tags"
              type="text"
              value={values.tags}
              onChange={(e) => set('tags', e.target.value)}
              placeholder="visa, portugal, relocation"
              className={inputClass}
            />
            <p className="mt-1 text-xs text-graphite/50">Comma-separated</p>
          </div>

          <div className="md:col-span-2">
            <label htmlFor="excerpt" className={labelClass}>
              Excerpt
            </label>
            <textarea
              id="excerpt"
              value={values.excerpt}
              onChange={(e) => set('excerpt', e.target.value)}
              rows={2}
              placeholder="A short summary of the post that appears in listings and SEO..."
              className={`${inputClass} resize-none`}
            />
          </div>

          <div className="flex items-center gap-3 md:col-span-2">
            <button
              type="button"
              role="switch"
              aria-checked={values.published}
              onClick={() => set('published', !values.published)}
              className={`relative inline-flex h-5 w-9 cursor-pointer items-center rounded-full transition ${
                values.published ? 'bg-secondary' : 'bg-primary/20'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                  values.published ? 'translate-x-[1.15rem]' : 'translate-x-0.5'
                }`}
              />
            </button>
            <label
              className="cursor-pointer text-sm font-medium text-ink"
              onClick={() => set('published', !values.published)}
            >
              {values.published ? 'Published' : 'Draft'}
            </label>
          </div>
        </div>
      </div>

      {/* Editor / Preview */}
      <div className="flex-1 overflow-hidden rounded-3xl border border-primary/10 bg-white/80 shadow-soft">
        {/* Tab bar */}
        <div className="flex items-center border-b border-primary/8 bg-mist/40 px-4">
          <button
            type="button"
            onClick={() => setTab('write')}
            className={`flex cursor-pointer items-center gap-1.5 border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${
              tab === 'write'
                ? 'border-secondary text-primary'
                : 'border-transparent text-graphite/60 hover:text-graphite'
            }`}
          >
            <PenLine className="h-3 w-3" aria-hidden="true" />
            Write
          </button>
          <button
            type="button"
            onClick={() => setTab('preview')}
            className={`flex cursor-pointer items-center gap-1.5 border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition ${
              tab === 'preview'
                ? 'border-secondary text-primary'
                : 'border-transparent text-graphite/60 hover:text-graphite'
            }`}
          >
            <Eye className="h-3 w-3" aria-hidden="true" />
            Preview
          </button>
        </div>

        {/* Formatting toolbar */}
        <div className="flex flex-wrap items-center gap-0.5 border-b border-primary/8 bg-mist/20 px-3 py-1.5">
          <ToolbarBtn title="Heading 1" onClick={() => insertLinePrefix('# ')}>
            H1
          </ToolbarBtn>
          <ToolbarBtn title="Heading 2" onClick={() => insertLinePrefix('## ')}>
            H2
          </ToolbarBtn>
          <ToolbarBtn title="Heading 3" onClick={() => insertLinePrefix('### ')}>
            H3
          </ToolbarBtn>

          <ToolbarDivider />

          <ToolbarBtn title="Bold" onClick={() => wrapSelection('**', '**')}>
            <Bold className="h-3 w-3" aria-hidden="true" />
            Bold
          </ToolbarBtn>
          <ToolbarBtn title="Italic" onClick={() => wrapSelection('*', '*')}>
            <Italic className="h-3 w-3" aria-hidden="true" />
            Italic
          </ToolbarBtn>

          <ToolbarDivider />

          <ToolbarBtn title="Blockquote" onClick={() => insertLinePrefix('> ')}>
            <Quote className="h-3 w-3" aria-hidden="true" />
            Quote
          </ToolbarBtn>

          <ToolbarDivider />

          <ToolbarBtn
            title="Insert image"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
          >
            <ImageIcon className="h-3 w-3" aria-hidden="true" />
            {uploading ? 'Uploading…' : 'Image'}
          </ToolbarBtn>

          <ToolbarBtn title="Insert FAQ accordion" onClick={insertFAQTemplate} className="text-secondary/80 hover:text-secondary">
            FAQ
          </ToolbarBtn>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>

        {/* Two-column: both always rendered but toggled via CSS on mobile */}
        <div className="flex min-h-[400px]">
          {/* Editor column */}
          <div
            className={`flex flex-col ${
              tab === 'preview' ? 'hidden md:flex' : 'flex'
            } flex-1 md:border-r md:border-primary/8`}
          >
            <label htmlFor="content" className="sr-only">
              Content (Markdown)
            </label>
            <textarea
              ref={textareaRef}
              id="content"
              value={values.content}
              onChange={(e) => set('content', e.target.value)}
              placeholder={`Write your post in Markdown...\n\n# Start with a heading\n\nA paragraph with **bold** and *italic* text.\n\n> A blockquote for emphasis`}
              className="flex-1 resize-none bg-transparent px-6 py-5 font-mono text-sm leading-7 text-ink placeholder:text-graphite/30 focus:outline-none"
              spellCheck
            />
          </div>

          {/* Preview column */}
          <div
            className={`${tab === 'write' ? 'hidden md:block' : 'block'} flex-1 overflow-y-auto px-8 py-5`}
          >
            {values.content ? (
              <div
                className="preview-content"
                dangerouslySetInnerHTML={{ __html: preview }}
                style={
                  {
                    '--font-display': 'Cormorant Garamond, serif',
                    '--font-sans': 'Manrope, sans-serif',
                  } as React.CSSProperties
                }
              />
            ) : (
              <p className="mt-8 text-center text-sm text-graphite/40">
                Preview will appear here as you write...
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.push('/admin')}
          className="cursor-pointer rounded-full border border-primary/15 px-5 py-3 text-sm font-medium text-graphite transition hover:border-primary/30 hover:text-ink"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-primary/90 disabled:opacity-60"
        >
          {saving && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
          {saving ? 'Saving…' : mode === 'edit' ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  )
}
