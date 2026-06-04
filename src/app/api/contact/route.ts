import { NextResponse } from 'next/server'

import { parseContactForm } from '@/lib/contact'

export async function POST(request: Request) {
  const result = parseContactForm(await request.formData())

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 })
  }

  const webhookUrl = process.env.N8N_CONTACT_WEBHOOK
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
    } catch (err) {
      console.error('n8n contact webhook error', err)
    }
  }

  return NextResponse.json({ ok: true })
}
