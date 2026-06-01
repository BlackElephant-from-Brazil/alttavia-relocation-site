import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="font-serif text-6xl text-ink">404</p>
        <h1 className="mt-4 font-serif text-4xl text-ink">Page not found</h1>
        <Link className="mt-8 inline-flex rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white" href="/en">
          Return home
        </Link>
      </div>
    </main>
  )
}
