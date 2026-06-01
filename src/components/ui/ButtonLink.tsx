import Link from 'next/link'
import type { ReactNode } from 'react'

type ButtonLinkProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'light'
}

export function ButtonLink({ href, children, variant = 'primary' }: ButtonLinkProps) {
  const styles = {
    primary: 'bg-primary text-white shadow-soft hover:bg-primary/90',
    secondary: 'border border-primary/15 bg-white/55 text-primary hover:border-primary/35 hover:bg-white',
    light: 'bg-white text-primary shadow-soft hover:bg-secondary hover:text-primary',
  }[variant]

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${styles}`}
    >
      {children}
    </Link>
  )
}
