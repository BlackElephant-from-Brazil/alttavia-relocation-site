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
