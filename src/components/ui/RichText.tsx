import type { ReactNode } from 'react'

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
  children?: LexicalNode[]
}

function renderNode(node: LexicalNode, index: number): ReactNode {
  if (node.text) {
    let value: ReactNode = node.text

    if (node.bold) {
      value = <strong key={`${index}-bold`}>{value}</strong>
    }

    if (node.italic) {
      value = <em key={`${index}-italic`}>{value}</em>
    }

    if (node.underline) {
      value = <span className="underline">{value}</span>
    }

    return value
  }

  const children = node.children?.map(renderNode) ?? null

  if (node.type === 'heading') {
    const Tag = node.tag === 'h3' || node.tag === 'h4' || node.tag === 'h5' || node.tag === 'h6' ? 'h3' : 'h2'
    return (
      <Tag key={index} className="mt-10 font-serif text-3xl text-ink">
        {children}
      </Tag>
    )
  }

  if (node.type === 'list') {
    return (
      <ul key={index} className="my-6 list-disc space-y-2 pl-6 text-graphite">
        {children}
      </ul>
    )
  }

  if (node.type === 'listitem') {
    return <li key={index}>{children}</li>
  }

  if (node.type === 'quote') {
    return (
      <blockquote key={index} className="my-8 border-l border-sand pl-6 font-serif text-2xl text-ink">
        {children}
      </blockquote>
    )
  }

  if (node.type === 'paragraph') {
    return (
      <p key={index} className="my-5 text-lg leading-8 text-graphite">
        {children}
      </p>
    )
  }

  return <div key={index}>{children}</div>
}

export function RichText({ content }: { content: unknown }) {
  const root = Array.isArray(content)
    ? ({ children: content } as LexicalNode)
    : (content as { root?: LexicalNode } | null)?.root

  if (!root?.children?.length) {
    return null
  }

  return <div className="rich-text">{root.children.map(renderNode)}</div>
}
