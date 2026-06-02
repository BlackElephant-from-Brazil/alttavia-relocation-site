import type { Metadata } from 'next'
import { ArrowRight } from 'lucide-react'

import { BlogCard } from '@/components/blog/BlogCard'
import { NewsletterSignup } from '@/components/blog/NewsletterSignup'
import { ScrollReveal } from '@/components/sections/ScrollReveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'
import { getPosts } from '@/lib/strapi'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale)

  return createMetadata(
    'Alttavia Relocation Blog',
    'Immigration updates, relocation strategies, and insider knowledge from relocations and immigration experts.',
    `/${locale}/blog`,
  )
}

export default async function BlogPage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)
  const posts = await getPosts(locale, 3).catch(() => [])

  return (
    <main>
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-36 md:pb-20 md:pt-44">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(208,161,43,0.16),transparent_28%),linear-gradient(135deg,#fbfaf7_0%,#f7f4ee_46%,#eef2f4_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <Eyebrow>Blog</Eyebrow>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.03] text-ink md:text-7xl">
              Alttavia Relocation Blog
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite md:text-xl md:leading-9">
              Immigration updates, relocation strategies, and insider knowledge from relocations and immigration
              experts.
            </p>
          </div>
        </div>
      </section>

      <ScrollReveal className="px-6 py-14 md:py-16" variant="fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Latest Insights</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">Latest Blog Articles</h2>
            </div>
          </div>

          {posts.length ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} locale={locale} readMore="View more" />
              ))}
            </div>
          ) : (
            <div className="mt-10 rounded-3xl border border-primary/10 bg-white/70 p-10 text-center text-graphite shadow-soft">
              New articles are being prepared.
            </div>
          )}
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-14 md:py-16" variant="scale-soft">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#0E2A47_0%,#123B63_52%,#D0A12B_140%)] p-8 text-white shadow-glass md:p-12">
          <div
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />
          <div className="relative max-w-4xl">
            <Eyebrow className="text-secondary">Updates</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">Stay Informed. Stay Ahead.</h2>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-white/84">
              Regulations and procedures change quickly. Don’t miss updates that could affect your relocation plans.
              Join our mailing list to stay up to date.
            </p>
            <NewsletterSignup />
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 pb-16 pt-14 md:pb-20 md:pt-16" variant="slide-right">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-primary/10 bg-white/75 p-8 shadow-glass backdrop-blur-xl md:p-12">
          <div
            className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-secondary/80 to-transparent"
            aria-hidden="true"
          />
          <div className="max-w-3xl">
            <Eyebrow>GET STARTED</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Relocate to Portugal, Spain, or Malta with Confidence
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-graphite">
              <p>You are moving for new opportunities, for your family, for growth.</p>
              <p>
                Alttavia Relocation combines technical expertise with lived expat experience. We know the process, and
                we know how it feels. That combination is what makes our relocation smooth, efficient, and reassuring.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href={`/${locale}/contact`}>
                <span className="inline-flex items-center gap-2">
                  Speak to our Experts
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  )
}
