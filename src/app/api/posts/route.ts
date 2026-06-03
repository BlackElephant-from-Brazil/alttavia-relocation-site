import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { getAllPosts, createPost } from '@/lib/posts'
import type { Post } from '@/lib/posts'
import type { SessionData } from '@/lib/session'
import { sessionOptions } from '@/lib/session'

async function requireAuth() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  return session.isLoggedIn
}

export async function GET() {
  if (!(await requireAuth())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }
  return Response.json(getAllPosts())
}

export async function POST(request: Request) {
  if (!(await requireAuth())) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json() as Partial<Post>
    if (!body.title) {
      return Response.json({ error: 'Title is required.' }, { status: 400 })
    }
    const post = createPost({
      title: body.title,
      date: body.date || new Date().toISOString().split('T')[0],
      excerpt: body.excerpt || '',
      author: body.author || 'Alttavia Team',
      published: body.published ?? false,
      tags: body.tags || [],
      content: body.content || '',
      slug: body.slug,
    })
    return Response.json(post, { status: 201 })
  } catch {
    return Response.json({ error: 'Failed to create post.' }, { status: 500 })
  }
}
