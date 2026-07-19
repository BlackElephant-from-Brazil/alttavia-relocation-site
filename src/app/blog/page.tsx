import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getPublishedPosts } from '@/lib/posts'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { createMetadata } from '@/lib/metadata'

export const metadata: Metadata = createMetadata(
  'Relocation Insights & Articles',
  'Immigration updates, relocation strategies, and insider knowledge from attorneys and expat experts.',
  '/blog',
)

export const revalidate = 3600

function PostCard({ post }: { post: ReturnType<typeof getPublishedPosts>[number] }) {
  const date = new Date(post.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white/80 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-white hover:shadow-glass">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

      <Link href={`/blog/${post.slug}`} className="block p-7 cursor-pointer">
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-secondary/30 bg-secondary/8 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        <h2 className="font-serif text-2xl leading-tight text-ink transition group-hover:text-primary md:text-3xl">
          {post.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-base leading-7 text-graphite">{post.excerpt}</p>

        <div className="mt-6 flex items-center justify-between border-t border-primary/8 pt-5">
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-semibold text-ink/70">{post.author}</span>
            <span className="text-xs text-graphite/60">{date}</span>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary transition group-hover:gap-2.5">
            Read article
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </div>
      </Link>
    </article>
  )
}

export default function BlogPage() {
  const posts = getPublishedPosts()

  return (
    <main>
      {/* Hero */}
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
          <div className="max-w-3xl">
            <Eyebrow>Insights & Articles</Eyebrow>
            <h1 className="mt-6 font-serif text-5xl leading-[1.03] text-ink md:text-7xl">
              Relocation Insights
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite md:text-xl md:leading-9">
              Immigration updates, relocation strategies, and insider knowledge from attorneys and
              expat experts who have lived the process.
            </p>
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto max-w-6xl">
          {posts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-primary/10 bg-white/70 p-16 text-center shadow-soft">
              <p className="font-serif text-2xl text-ink/50">New articles are on their way.</p>
              <p className="mt-3 text-sm text-graphite/60">
                Subscribe to our newsletter to be notified when we publish.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA strip */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#0E2A47_0%,#123B63_52%,#D0A12B_140%)] p-8 text-white shadow-glass md:p-12">
            <div
              className="absolute inset-0 opacity-20"
              aria-hidden="true"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)',
                backgroundSize: '34px 34px',
              }}
            />
            <div className="relative max-w-2xl">
              <Eyebrow className="text-secondary">Get Started</Eyebrow>
              <h2 className="mt-5 font-serif text-3xl leading-tight md:text-4xl">
                Ready to start your relocation?
              </h2>
              <p className="mt-5 text-base leading-7 text-white/80">
                Our team of licensed attorneys handles everything directly — no outsourcing, no
                middlemen.
              </p>
              <div className="mt-8">
                <ButtonLink href="/en/contact" variant="light">
                  Speak to our experts
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
