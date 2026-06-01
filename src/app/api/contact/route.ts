import { NextResponse } from 'next/server'

import { parseContactForm } from '@/lib/contact'

export async function POST(request: Request) {
  const result = parseContactForm(await request.formData())

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  console.info('Contact form submission received', result.data)

  return NextResponse.json({
    ok: true,
  })
}
