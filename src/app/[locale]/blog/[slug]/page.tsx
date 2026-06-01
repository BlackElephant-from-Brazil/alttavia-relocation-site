import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { RichText } from '@/components/ui/RichText'
import { getDictionary } from '@/i18n/dictionaries'
import { locales, normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'
import { formatPostDate, getMediaUrl, getPostBySlug } from '@/lib/strapi'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)
  const dict = getDictionary(locale)
  const post = await getPostBySlug(locale, slug).catch(() => null)

  if (!post) {
    return createMetadata(dict.seo.blog.title, dict.seo.blog.description, `/${locale}/blog`)
  }

  return createMetadata(
    post.seoTitle || post.title,
    post.seoDescription || post.excerpt,
    `/${locale}/blog/${post.slug}`,
  )
}

export default async function BlogPostPage({ params }: Props) {
  const { locale: rawLocale, slug } = await params
  const locale = normalizeLocale(rawLocale)
  const dict = getDictionary(locale)
  const post = await getPostBySlug(locale, slug).catch(() => null)

  if (!post) {
    notFound()
  }

  const image = getMediaUrl(post.coverImage)

  return (
    <main className="px-6 pb-24 pt-36 md:pt-44">
      <article className="mx-auto max-w-4xl">
        <Link href={`/${locale}/blog`} className="text-sm font-semibold text-graphite hover:text-ink">
          {dict.blog.back}
        </Link>
        <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-navy/65">
          {formatPostDate(post.publishedAt, locale)}
        </p>
        <h1 className="mt-5 font-serif text-5xl leading-tight text-ink md:text-7xl">{post.title}</h1>
        <p className="mt-6 text-xl leading-9 text-graphite">{post.excerpt}</p>
        <div
          className="mt-12 aspect-[16/9] rounded-[2rem] bg-cover bg-center shadow-glass"
          style={{
            backgroundImage: image
              ? `url(${image})`
              : 'linear-gradient(135deg, rgba(24,33,43,0.85), rgba(216,198,173,0.72))',
          }}
        />
        <div className="mt-12">
          <RichText content={post.content} />
        </div>
        {post.localizations?.length ? (
          <div className="mt-12 flex flex-wrap gap-3 border-t border-ink/10 pt-8">
            {locales
              .filter((item) => item !== locale)
              .map((item) => {
                const localizedSlug = post.localizations?.find((entry) => entry.locale === item)?.slug
                return (
                  <Link
                    key={item}
                    href={localizedSlug ? `/${item}/blog/${localizedSlug}` : `/${item}/blog`}
                    className="rounded-full border border-ink/15 px-4 py-2 text-xs font-semibold uppercase text-ink hover:bg-white"
                  >
                    {item}
                  </Link>
                )
              })}
          </div>
        ) : null}
      </article>
    </main>
  )
}
