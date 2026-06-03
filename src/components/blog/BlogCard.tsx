import Link from 'next/link'

import type { Locale } from '@/i18n/routing'
import { formatPostDate, getMediaUrl, type BlogPost } from '@/lib/blog'

export function BlogCard({
  post,
  locale,
  readMore,
}: {
  post: BlogPost
  locale: Locale
  readMore: string
}) {
  const image = getMediaUrl(post.coverImage)

  return (
    <article className="overflow-hidden rounded-3xl border border-white/70 bg-white/65 shadow-soft backdrop-blur-xl">
      <Link href={`/${locale}/blog/${post.slug}`} className="block">
        <div
          className="h-56 bg-cover bg-center"
          style={{
            backgroundImage: image
              ? `url(${image})`
              : 'linear-gradient(135deg, rgba(24,33,43,0.85), rgba(216,198,173,0.72))',
          }}
        />
        <div className="p-7">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-navy/65">
            {formatPostDate(post.publishedAt, locale)}
          </p>
          <h2 className="mt-4 font-serif text-3xl leading-tight text-ink">{post.title}</h2>
          <p className="mt-4 leading-7 text-graphite">{post.excerpt}</p>
          <span className="mt-6 inline-flex text-sm font-semibold text-ink">{readMore}</span>
        </div>
      </Link>
    </article>
  )
}
