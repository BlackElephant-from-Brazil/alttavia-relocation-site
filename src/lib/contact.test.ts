import { describe, expect, it } from 'vitest'

import { parseContactForm } from './contact'

describe('parseContactForm', () => {
  it('returns a normalized contact submission for valid form data', () => {
    const formData = new FormData()
    formData.set('name', '  Alex Morgan ')
    formData.set('email', 'alex@example.com')
    formData.set('phone', '+351 900 000 000')
    formData.set('message', 'We are relocating next quarter.')

    expect(parseContactForm(formData)).toEqual({
      ok: true,
      data: {
        name: 'Alex Morgan',
        email: 'alex@example.com',
        phone: '+351 900 000 000',
        message: 'We are relocating next quarter.',
      },
    })
  })

  it('rejects incomplete or invalid submissions', () => {
    const formData = new FormData()
    formData.set('name', 'Alex')
    formData.set('email', 'not-an-email')
    formData.set('message', '')

    expect(parseContactForm(formData)).toEqual({
      ok: false,
      error: 'Please provide your name, a valid email, and a message.',
    })
  })
})
