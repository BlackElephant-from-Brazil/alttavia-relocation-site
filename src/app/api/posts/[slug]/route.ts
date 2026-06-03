import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { getPostBySlug, updatePost, deletePost } from '@/lib/posts'
import type { Post } from '@/lib/posts'
import type { SessionData } from '@/lib/session'
import { sessionOptions } from '@/lib/session'

type Params = { params: Promise<{ slug: string }> }

async function requireAuth() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  return session.isLoggedIn
}

export async function GET(_req: Request, { params }: Params) {
  if (!(await requireAuth())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(post)
}

export async function PUT(request: Request, { params }: Params) {
  if (!(await requireAuth())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { slug } = await params
  try {
    const body = await request.json() as Partial<Post>
    const post = updatePost(slug, body)
    if (!post) return Response.json({ error: 'Not found' }, { status: 404 })
    return Response.json(post)
  } catch {
    return Response.json({ error: 'Failed to update post.' }, { status: 500 })
  }
}

export async function DELETE(_req: Request, { params }: Params) {
  if (!(await requireAuth())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { slug } = await params
  const deleted = deletePost(slug)
  if (!deleted) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json({ success: true })
}
