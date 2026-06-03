import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import { validateCredentials } from '@/lib/auth'
import type { SessionData } from '@/lib/session'
import { sessionOptions } from '@/lib/session'

export async function POST(request: Request) {
  try {
    const body = await request.json() as { username?: string; password?: string }
    const { username, password } = body

    if (!username || !password) {
      return Response.json({ error: 'Username and password are required.' }, { status: 400 })
    }

    const valid = await validateCredentials(username, password)
    if (!valid) {
      return Response.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
    session.user = { username }
    session.isLoggedIn = true
    await session.save()

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: 'Internal server error.' }, { status: 500 })
  }
}
