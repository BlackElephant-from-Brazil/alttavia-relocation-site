'use client'

import { useCallback, useEffect, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'

export type ToastType = 'success' | 'error'
export type ToastItem = { id: number; message: string; type: ToastType }

const STORAGE_KEY = 'admin-pending-toast'

/** Queues a toast to be shown on the next page load (e.g. after a redirect). */
export function queueToast(message: string, type: ToastType) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ message, type }))
  } catch {
    // sessionStorage unavailable — toast just won't survive the navigation
  }
}

export function useToasts() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = Date.now() + Math.random()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3500)
  }, [])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY)
      if (!raw) return
      sessionStorage.removeItem(STORAGE_KEY)
      const pending = JSON.parse(raw) as { message: string; type: ToastType }
      addToast(pending.message, pending.type)
    } catch {
      // ignore malformed/unavailable storage
    }
  }, [addToast])

  return { toasts, addToast }
}

export function ToastViewport({ toasts }: { toasts: ToastItem[] }) {
  return (
    <div className="fixed right-6 top-20 z-[60] flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-3 rounded-2xl border px-4 py-3 shadow-glass backdrop-blur-xl transition ${
            toast.type === 'success'
              ? 'border-primary/30 bg-primary/10 text-primary'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
          ) : (
            <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
          )}
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
