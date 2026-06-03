import type { SessionOptions } from 'iron-session'

export type SessionData = {
  user?: { username: string }
  isLoggedIn: boolean
}

export const sessionOptions: SessionOptions = {
  password:
    process.env.SESSION_SECRET ??
    'alttavia-placeholder-secret-change-in-env-minimum-32-chars!!',
  cookieName: 'alttavia-admin-session',
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 8,
  },
}
