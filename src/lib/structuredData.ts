import type { Post } from '@/lib/posts'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://alttavia-relocation.com'

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Alttavia Relocation',
    url: siteUrl,
    logo: `${siteUrl}/logo.svg`,
    email: 'info@alttavia-relocation.com',
    telephone: '+351934548395',
    sameAs: [
      'https://www.instagram.com/patricia_viana_lawyer',
      'https://www.facebook.com/profile.php?id=100087269040601',
    ],
  }
}

export function articleJsonLd(post: Post) {
  const url = `${siteUrl}/blog/${post.slug}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: `${siteUrl}/alttavia-image-3.webp`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Alttavia Relocation',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  }
}

const faqItemPattern = /<FAQItem q="([^"]*)">([\s\S]*?)<\/FAQItem>/g

export function extractFaqItems(content: string): { question: string; answer: string }[] {
  return Array.from(content.matchAll(faqItemPattern)).map((match) => ({
    question: match[1].trim(),
    answer: match[2]
      .replace(/[*_`]/g, '')
      .replace(/\s+/g, ' ')
      .trim(),
  }))
}

export function faqPageJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  }
}
