import { Eyebrow } from './Eyebrow'

export function SectionHeader({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string
  title: string
  text?: string
}) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      {eyebrow ? <Eyebrow className="mb-3 justify-center">{eyebrow}</Eyebrow> : null}
      <h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">{title}</h2>
      {text ? <p className="mt-5 text-lg leading-8 text-graphite">{text}</p> : null}
    </div>
  )
}
