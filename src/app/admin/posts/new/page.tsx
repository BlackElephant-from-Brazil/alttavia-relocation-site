import { PostForm } from '../../_components/PostForm'

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-secondary">
          New Post
        </p>
        <h1 className="mt-2 font-serif text-4xl text-ink">Create Article</h1>
        <p className="mt-1 text-sm text-graphite/70">
          Write and publish a new relocation insight.
        </p>
      </div>
      <PostForm mode="create" />
    </div>
  )
}
