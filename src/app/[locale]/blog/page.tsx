import type { Metadata } from 'next'

import { BlogCard } from '@/components/blog/BlogCard'
import { Hero } from '@/components/sections/Hero'
import { getDictionary } from '@/i18n/dictionaries'
import { normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'
import { getPosts } from '@/lib/strapi'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)
  return createMetadata(dict.seo.blog.title, dict.seo.blog.description, `/${locale}/blog`)
}

export default async function BlogPage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)
  const posts = await getPosts(locale).catch(() => [])

  return (
    <main>
      <Hero
        eyebrow={dict.nav.blog}
        title={dict.blog.heroTitle}
        subtitle={dict.blog.heroSubtitle}
        visualItems={dict.common.visualItems}
        visualTitle={dict.common.visualTitle}
      />
      <section className="px-6 py-20">
        <div className="mx-auto max-w-6xl">
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} readMore={dict.common.readMore} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/70 bg-white/70 p-10 text-center text-graphite shadow-soft">
              {dict.blog.empty}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
