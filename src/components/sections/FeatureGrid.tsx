export function FeatureGrid({
  items,
  columns = 3,
}: {
  items: string[][]
  columns?: 2 | 3
}) {
  return (
    <div className={`grid gap-4 ${columns === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
      {items.map(([title = '', text = '']) => (
        <article
          key={title}
          className="rounded-3xl border border-white/70 bg-white/62 p-7 shadow-soft backdrop-blur-xl"
        >
          <h3 className="font-serif text-2xl text-ink">{title}</h3>
          <p className="mt-4 leading-7 text-graphite">{text}</p>
        </article>
      ))}
    </div>
  )
}
