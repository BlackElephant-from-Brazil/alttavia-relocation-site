import { redirect } from 'next/navigation'

type Props = {
  params: Promise<{ locale: string; slug: string }>
}

export default async function BlogPostRedirect({ params }: Props) {
  const { slug } = await params
  redirect(`/blog/${slug}`)
}
