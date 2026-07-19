import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { getPostBySlug, getPublishedPosts } from '@/lib/posts'
import { createMetadata } from '@/lib/metadata'
import { articleJsonLd, extractFaqItems, faqPageJsonLd } from '@/lib/structuredData'
import { FAQ, FAQItem } from '@/components/blog/FAQ'
import type { ComponentPropsWithoutRef } from 'react'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post || !post.published) return {}
  return createMetadata(
    post.title,
    post.excerpt,
    `/blog/${post.slug}`,
  )
}

const mdxComponents = {
  h1: (props: ComponentPropsWithoutRef<'h1'>) => (
    <h1 {...props} className="mt-10 mb-4 font-serif text-4xl leading-tight text-ink md:text-5xl" />
  ),
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2 {...props} className="mt-10 mb-3 font-serif text-3xl leading-tight text-ink md:text-4xl" />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 {...props} className="mt-8 mb-2 font-serif text-2xl leading-tight text-ink" />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p {...props} className="my-5 text-lg leading-8 text-graphite" />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul {...props} className="my-5 list-disc space-y-2 pl-6 text-lg text-graphite" />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol {...props} className="my-5 list-decimal space-y-2 pl-6 text-lg text-graphite" />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li {...props} className="leading-7" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      {...props}
      className="my-8 border-l-2 border-secondary pl-6 font-serif text-2xl italic leading-relaxed text-ink"
    />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong {...props} className="font-semibold text-ink" />
  ),
  a: (props: ComponentPropsWithoutRef<'a'>) => (
    <a
      {...props}
      className="text-secondary underline underline-offset-2 transition hover:text-primary"
    />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      {...props}
      className="rounded bg-mist px-1.5 py-0.5 font-mono text-sm text-primary"
    />
  ),
  pre: (props: ComponentPropsWithoutRef<'pre'>) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-2xl bg-primary/5 p-5 font-mono text-sm"
    />
  ),
  hr: () => <hr className="my-10 border-primary/10" />,
  img: (props: ComponentPropsWithoutRef<'img'>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      {...props}
      alt={props.alt ?? ''}
      className="my-8 w-full rounded-2xl object-cover shadow-soft"
    />
  ),
  FAQ,
  FAQItem,
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post || !post.published) notFound()

  const date = new Date(post.date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const faqItems = extractFaqItems(post.content)

  return (
    <main className="px-6 pb-24 pt-36 md:pt-44">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(post)) }}
      />
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd(faqItems)) }}
        />
      )}
      <div className="mx-auto max-w-4xl">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-graphite transition hover:text-ink"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Back to Blog
        </Link>

        {/* Post header */}
        <div className="mt-10 border-b border-primary/10 pb-10">
          {post.tags.length > 0 && (
            <div className="mb-5 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-secondary/30 bg-secondary/8 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-secondary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-serif text-4xl leading-tight text-ink md:text-6xl">{post.title}</h1>
          <p className="mt-5 text-xl leading-9 text-graphite">{post.excerpt}</p>

          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/15 bg-primary/8">
                <span className="font-serif text-sm font-semibold text-primary">
                  {post.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">{post.author}</p>
                <p className="text-xs text-graphite/60">{date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* MDX Content */}
        <div className="mt-10">
          <MDXRemote source={post.content} components={mdxComponents} />
        </div>

        {/* Footer CTA */}
        <div className="mt-16 rounded-3xl border border-primary/10 bg-white/70 p-8 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
            Alttavia Relocation
          </p>
          <p className="mt-3 font-serif text-2xl text-ink">
            Ready to take the next step?
          </p>
          <p className="mt-3 text-base leading-7 text-graphite">
            Our team is available to guide you through the relocation process from start to finish.
          </p>
          <div className="mt-6">
            <Link
              href="/en/contact"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-white shadow-soft transition hover:bg-primary/90"
            >
              Get in touch
              <ArrowLeft className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
