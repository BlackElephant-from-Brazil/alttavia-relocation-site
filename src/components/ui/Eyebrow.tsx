export function Eyebrow({ children, className = '' }: { children: string; className?: string }) {
  return (
    <p
      className={`inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-secondary ${className}`}
    >
      <span className="h-px w-9 bg-secondary/80" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
