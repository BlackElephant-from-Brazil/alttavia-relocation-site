export type ContactSubmission = {
  name: string
  email: string
  phone: string
  message: string
  language: string
}

export type ContactParseResult =
  | {
      ok: true
      data: ContactSubmission
    }
  | {
      ok: false
      error: string
    }

const invalidMessage = 'Please provide your name, a valid email, and a message.'

function getString(formData: FormData, key: string): string {
  const value = formData.get(key)
  return typeof value === 'string' ? value.trim() : ''
}

const MIN_FILL_TIME_MS = 2000

export function isLikelySpam(formData: FormData): boolean {
  const honeypot = getString(formData, 'company')
  if (honeypot) return true

  const renderedAt = Number(getString(formData, 'renderedAt'))
  if (!renderedAt || Date.now() - renderedAt < MIN_FILL_TIME_MS) return true

  return false
}

export function parseContactForm(formData: FormData): ContactParseResult {
  const data = {
    name: getString(formData, 'name'),
    email: getString(formData, 'email'),
    phone: getString(formData, 'phone'),
    message: getString(formData, 'message'),
    language: getString(formData, 'language') || 'en',
  }

  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)

  if (!data.name || !emailIsValid || !data.message) {
    return {
      ok: false,
      error: invalidMessage,
    }
  }

  return {
    ok: true,
    data,
  }
}
