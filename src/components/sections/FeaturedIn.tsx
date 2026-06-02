import Image from 'next/image'

import { ScrollReveal } from './ScrollReveal'

const featuredLinks = [
  {
    href: 'https://sicnoticias.pt/pais/2025-04-04-video-advogados-protestam-contra-dificuldades-no-acesso-aos-processos-da-aima-5cfae453',
    src: '/sicnot.svg',
    alt: 'SIC Notícias',
    width: 250,
    height: 34,
  },
  {
    href: 'https://www.publico.pt/2025/06/23/publico-brasil/noticia/advogados-imigracao-unem-entraves-aima-irn-seguranca-social-2137561#',
    src: '/publico-jornal.webp',
    alt: 'Publico',
    width: 132,
    height: 132,
  },
] as const

export function FeaturedIn() {
  return (
    <ScrollReveal className="px-6 py-5" variant="fade-up">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-serif text-4xl leading-tight text-ink md:text-5xl">As Featured In</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {featuredLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="group flex min-h-36 items-center justify-center rounded-3xl border border-white/70 bg-white/70 p-8 shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:bg-white"
              aria-label={`Read Alttavia coverage in ${item.alt}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                className="max-h-28 w-auto object-contain transition group-hover:scale-[1.03]"
              />
            </a>
          ))}
        </div>
      </div>
    </ScrollReveal>
  )
}
