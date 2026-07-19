import type { Metadata } from 'next'
import Image from 'next/image'
import { ArrowRight, BadgeCheck, Globe2, Route } from 'lucide-react'

import { FeaturedIn } from '@/components/sections/FeaturedIn'
import { ScrollReveal } from '@/components/sections/ScrollReveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'

type Props = {
  params: Promise<{ locale: string }>
}

const choiceCards = [
  {
    icon: BadgeCheck,
    title: 'Experience That Matters',
    text:
      'We have successfully handled more than 800 immigration and documentation cases for migrants, expats, entrepreneurs, and families.',
  },
  {
    icon: Route,
    title: 'A Network That Works for You',
    text:
      'Relocation is a sequence of moving parts – visas, tax, company incorporation, housing, schools, and logistics. Our network of trusted partners, institutions, and local contacts makes each step connects seamlessly to the next.',
  },
  {
    icon: Globe2,
    title: 'Personalization Instead of Templates',
    text:
      'No two relocations are the same. That’s why we design personalized plans aligned with your goals, timeline, and family or business needs.',
  },
] as const

const credentials = [
  'Dual-licensed attorney (Portugal & Brazil)',
  'Postgraduate in Administrative & Tax Law, University of Lisbon',
  '800+ personal case completions',
  '200+ dispute resolutions',
  'Fluent in Portuguese, English, and Spanish',
  'Media recognition for immigrant advocacy',
] as const

const outcomes = [
  'You gain a clear relocation roadmap from start to finish.',
  'You avoid bureaucratic pitfalls and delays that cost time and peace of mind.',
  'You benefit from specialist guidance rooted in experience and cultural awareness.',
  'You feel supported in making one of life’s most important transitions.',
] as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale)

  return createMetadata(
    'Why Choose Alttavia Relocation',
    'Our team combines technical expertise, proven experience, and lived expat perspectives.',
    `/${locale}/why-us`,
  )
}

export default async function WhyUsPage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)

  return (
    <main>
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-36 md:pb-20 md:pt-44">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(208,161,43,0.16),transparent_28%),linear-gradient(135deg,#fbfaf7_0%,#f7f4ee_46%,#eef2f4_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <Eyebrow>Why Us</Eyebrow>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.02] text-ink md:text-7xl">
              Why Choose Alttavia Relocation
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite md:text-xl md:leading-9">
              Our team combines technical expertise, proven experience, and lived expat perspectives. Our mission is
              simple: to make moving to Portugal, Spain, or Malta clear, structured, and stress-free.
            </p>
            <div className="mt-8">
              <ButtonLink href={`/${locale}/contact`}>Speak to our Experts</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <FeaturedIn />

      <ScrollReveal className="px-6 py-14 md:py-16" variant="fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Relocation Expertise</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Why Expats Choose Alttavia Relocation
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {choiceCards.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-primary/10 bg-white/75 p-7 shadow-soft transition hover:-translate-y-1 hover:border-secondary/40 hover:bg-white"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-soft">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-7 font-serif text-2xl leading-tight text-ink">{title}</h3>
                <p className="mt-4 leading-7 text-graphite">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-14 md:py-16" variant="slide-left">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-primary shadow-glass">
            <Image
              src="/alttavia-image-3.webp"
              alt="Patrícia Viana, founder of Alttavia Relocation"
              width={900}
              height={1100}
              sizes="(min-width: 1024px) 42vw, calc(100vw - 48px)"
              className="aspect-[4/5] w-full object-cover opacity-95"
              priority={false}
            />
            <div
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,42,71,0)_40%,rgba(14,42,71,0.36)_100%)]"
              aria-hidden="true"
            />
          </div>

          <div>
            <Eyebrow>Founder</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Meet Our Founder: Patrícia Viana
            </h2>
            <p className="mt-6 text-lg leading-8 text-graphite">
              Expert leadership is at the heart of Alttavia Relocation. Every client benefits from the direct
              involvement of Patrícia Viana.
            </p>
            <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-secondary">
              Credentials at a Glance:
            </p>
            <ul className="mt-5 grid gap-3">
              {credentials.map((credential) => (
                <li key={credential} className="flex gap-3 text-base leading-7 text-graphite">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                  <span>{credential}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ButtonLink href={`/${locale}/contact`}>Get started now</ButtonLink>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-14 md:py-16" variant="scale-soft">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-primary/10 bg-white/70 p-7 shadow-soft backdrop-blur-xl md:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <Eyebrow className="justify-center">The Outcome</Eyebrow>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
                The Outcome of Choosing Alttavia Relocation
              </h2>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {outcomes.map((outcome, index) => (
                <div key={outcome} className="flex gap-4 border-t border-primary/10 pt-5">
                  <span className="font-serif text-2xl leading-none text-secondary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="leading-7 text-graphite">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 pb-16 pt-14 md:pb-20 md:pt-16" variant="slide-right">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#0E2A47_0%,#123B63_52%,#D0A12B_140%)] p-8 text-white shadow-glass md:p-12">
          <div
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />
          <div className="relative max-w-3xl">
            <Eyebrow className="text-secondary">GET STARTED</Eyebrow>
            <h2 className="mt-5 font-serif text-4xl leading-tight md:text-5xl">
              Relocate to Portugal, Spain, or Malta with Confidence
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-8 text-white/84">
              <p>You are moving for new opportunities, for your family, for growth.</p>
              <p>
                Alttavia Relocation combines technical expertise with lived expat experience. We know the process, and
                we know how it feels. That combination is what makes our relocation smooth, efficient, and reassuring.
              </p>
            </div>
            <div className="mt-8">
              <ButtonLink href={`/${locale}/contact`} variant="light">
                <span className="inline-flex items-center gap-2">
                  Speak to our Experts
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </ButtonLink>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  )
}
