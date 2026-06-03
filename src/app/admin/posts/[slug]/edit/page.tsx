import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/lib/posts'
import { PostForm } from '../../../_components/PostForm'

type Props = { params: Promise<{ slug: string }> }

export default async function EditPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) notFound()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
          Editing
        </p>
        <h1 className="mt-2 font-serif text-4xl text-ink">{post.title}</h1>
        <p className="mt-1 text-sm text-graphite/70">
          Last updated: {new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'medium' })}
        </p>
      </div>
      <PostForm mode="edit" slug={slug} initialValues={post} />
    </div>
  )
}
