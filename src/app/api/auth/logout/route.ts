import { cookies } from 'next/headers'
import { getIronSession } from 'iron-session'
import type { SessionData } from '@/lib/session'
import { sessionOptions } from '@/lib/session'

export async function DELETE() {
  const session = await getIronSession<SessionData>(await cookies(), sessionOptions)
  session.destroy()
  return Response.json({ success: true })
}
