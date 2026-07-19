import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BadgeCheck, Compass, Scale, ShieldCheck } from 'lucide-react'

import { ChallengeQuestions } from '@/components/sections/ChallengeQuestions'
import { CountUpNumber } from '@/components/sections/CountUpNumber'
import { FeaturedIn } from '@/components/sections/FeaturedIn'
import { GetStartedForm } from '@/components/sections/GetStartedForm'
import { GoogleReviewsSection } from '@/components/sections/GoogleReviewsSection'
import { Hero } from '@/components/sections/Hero'
import { ScrollReveal } from '@/components/sections/ScrollReveal'
import { ServiceCards } from '@/components/sections/ServiceCards'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { homeHeroContent } from '@/content/homeHero'
import { getDictionary } from '@/i18n/dictionaries'
import { normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'
import { getGoogleReviews } from '@/lib/googleReviews'
import { getPublishedPosts, type Post } from '@/lib/posts'
import { faqPageJsonLd } from '@/lib/structuredData'

export const revalidate = 3600

type Props = {
  params: Promise<{ locale: string }>
}

const challengeQuestions = [
  {
    q: 'Which visa pathway fits your situation?',
    a: 'D7, D8, D2, or Golden Visa: the right path depends on your income type, whether you plan to work, and your long-term goals. We assess your profile first and build the strategy around it, not the other way around.',
  },
  {
    q: 'How do you handle tax systems before costly mistakes?',
    a: 'Portugal and your home country tax rules interact in ways that are easy to get wrong. We structure your tax residency and income timing early, so double taxation and compliance issues are avoided from day one.',
  },
  {
    q: 'Should you incorporate before or after residency?',
    a: "It depends on where your business is based, how it's taxed, and your visa pathway. Getting the sequence wrong can trigger unnecessary tax exposure or delay your residency application.",
  },
  {
    q: 'Which government office handles what documents?',
    a: 'AIMA, Finanças, Segurança Social, and municipal registries each play a different role, and requirements change often. We coordinate directly with each entity so nothing falls through the cracks.',
  },
  {
    q: 'How do you figure out visa rules when sources contradict?',
    a: 'Immigration rules change faster than most online guides can keep up with. As licensed attorneys working directly with Portuguese authorities, we rely on current legal text, not outdated forum posts.',
  },
] as const

const stats = [
  { value: 200, suffix: '+', label: 'litigations' },
  { value: 500, suffix: '+', label: 'Extrajudicial cases' },
  { value: 800, suffix: '+', label: 'Happy Clients' },
] as const

const services = [
  {
    title: 'Immigration & Documentation',
    text: 'Visa applications, residence permits, and all required government filings handled directly by our attorneys.',
    details: [
      'D7, D8, D2, and Golden Visa applications',
      'Residence permit issuance and renewals',
      'NIF (Portuguese tax number) registration',
      'NISS (social security number) registration',
      'Non-resident bank account setup as part of your D7 application',
    ],
  },
  {
    title: 'Business Formation & Tax Services',
    text: 'Company incorporation and tax regularization managed from start to finish with no outsourcing.',
    details: [
      'Company incorporation in Portugal',
      'Offshore company structuring and taxation',
      'Tax regularization and ongoing compliance',
      'Alignment between your business structure and your residency status',
    ],
  },
  {
    title: 'Family Relocation Support',
    text: 'Property search, school placement, healthcare registration, and cultural integration assistance.',
    details: [
      'Trusted real estate partners for renting or buying a home',
      'School search and enrollment support for your children',
      'Healthcare registration, public and private',
      'Ongoing support for everyday settling-in needs',
    ],
  },
  {
    title: 'Administrative Management',
    text: 'Document drafting, government applications, and liaison with public and private entities.',
    details: [
      'Direct follow-up on applications filed with the Portuguese Consulate',
      'Liaison with AIMA, Finanças, and other public entities',
      'Administrative litigation when applications are delayed or wrongly denied',
    ],
  },
  {
    title: 'Logistics Coordination',
    text: 'Transportation of belongings and practical relocation support.',
    details: [
      'International container shipping for household belongings',
      'Customs documentation and clearance coordination',
      'Door-to-door delivery with trusted moving partners',
      'Scheduling aligned with your move-in date and visa timeline',
    ],
  },
] as const

const whyUs = [
  {
    icon: Scale,
    title: 'Direct Attorney Involvement',
    text:
      'Your relocation is managed directly by our specialists. We do not hand your case over to external contractors or intermediaries.',
  },
  {
    icon: BadgeCheck,
    title: 'Proven Experience',
    text: 'Over 800 successful cases handled by expats who understand both the process and the challenges.',
  },
  {
    icon: ShieldCheck,
    title: 'Expert Leadership You Can Trust',
    text:
      'Led by Patrícia Viana, dual-licensed in Portugal and Brazil, known for results and advocacy in immigration and public administration.',
  },
] as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)
  return createMetadata(dict.seo.home.title, dict.seo.home.description, `/${locale}`)
}

export default async function HomePage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)
  const posts: Post[] = getPublishedPosts().slice(0, 3)
  const googleReviews = await getGoogleReviews().catch(() => [])

  const faqJsonLd = faqPageJsonLd(
    challengeQuestions.map(({ q, a }) => ({ question: q, answer: a })),
  )

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Hero
        eyebrow={homeHeroContent.eyebrow}
        title={homeHeroContent.title}
        subtitle={homeHeroContent.subtitle}
        primaryHref="#get-started"
        primaryLabel={homeHeroContent.primaryLabel}
        primaryIcon={<Compass className="h-4 w-4" aria-hidden="true" />}
        visualItems={dict.common.visualItems}
        visualTitle={dict.common.visualTitle}
        imageSrc={homeHeroContent.imageSrc}
        aside={<GetStartedForm dict={dict} locale={locale} idPrefix="hero-contact" variant="glass" className="!mt-0 !max-w-none" />}
      />

      <FeaturedIn />

      <ScrollReveal className="px-6 py-5" variant="slide-left">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">THE CHALLENGE</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              The Questions Most Expats Struggle With
            </h2>
            <p className="mt-5 text-lg leading-8 text-graphite">
              Moving to Portugal, Spain, or Malta involves critical decisions that determine whether your relocation
              succeeds or becomes an expensive nightmare.
            </p>
          </div>

          <div className="challenge-image-shell relative mx-auto mt-12 max-w-5xl">
            <div className="absolute -inset-x-5 top-10 h-40 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
            <div className="challenge-image-frame relative overflow-hidden rounded-[1.75rem] border border-primary/10 bg-[#fdfbf7] p-2 shadow-[0_28px_80px_rgba(14,42,71,0.13)] md:p-3">
              <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-[1.25rem] bg-primary">
                <Image
                  src="/imagem-2.jpg"
                  alt="Relocation planning meeting with Alttavia advisors"
                  width={5782}
                  height={3707}
                  sizes="(min-width: 1024px) 960px, calc(100vw - 48px)"
                  className="aspect-[16/9] w-full object-cover opacity-95 saturate-[1.02]"
                />
                <div
                  className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,42,71,0.02),rgba(14,42,71,0.18))]"
                  aria-hidden="true"
                />
                <div className="challenge-floating-tag challenge-float-a absolute left-3 top-3 flex items-center gap-2 rounded-full border border-white/70 bg-white/[0.82] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary shadow-[0_16px_40px_rgba(14,42,71,0.13)] backdrop-blur-xl md:left-6 md:top-6 md:px-4">
                  <span
                    className="challenge-tag-dot h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_0_4px_rgba(208,161,43,0.16)]"
                    aria-hidden="true"
                  />
                  <span>Top Visa Paths</span>
                </div>
                <div className="challenge-floating-tag challenge-float-b absolute bottom-3 right-3 flex items-center gap-2 rounded-full border border-white/20 bg-primary/[0.82] px-3 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_18px_44px_rgba(14,42,71,0.22)] backdrop-blur-xl md:bottom-6 md:right-6 md:px-4">
                  <span
                    className="challenge-tag-dot h-1.5 w-1.5 rounded-full bg-secondary shadow-[0_0_0_4px_rgba(208,161,43,0.18)]"
                    aria-hidden="true"
                  />
                  <span>Tax Timing</span>
                </div>
              </div>
            </div>
          </div>

          <ChallengeQuestions items={challengeQuestions} />
          <p className="mx-auto mt-8 max-w-3xl text-center text-lg leading-8 text-graphite">
            These decisions determine whether your relocation feels seamless or becomes months of bureaucratic delays
            costing thousands in additional fees.
          </p>
        </div>
      </ScrollReveal>

      <GoogleReviewsSection reviews={googleReviews} />

      <ScrollReveal className="px-6 py-5" variant="scale-soft">
        <div className="mx-auto max-w-6xl border-y border-primary/10 py-12">
          <div className="text-center">
            <Eyebrow className="justify-center">our numbers</Eyebrow>
          </div>
          <div className="mt-10 grid gap-8 md:grid-cols-3 md:gap-0">
            {stats.map(({ value, suffix, label }) => (
              <div
                key={label}
                className="relative px-6 py-4 text-center md:border-l md:border-primary/10 md:first:border-l-0"
              >
                <p className="font-serif text-5xl leading-none text-primary md:text-6xl">
                  <CountUpNumber value={value} suffix={suffix} />
                </p>
                <div className="mx-auto mt-4 h-px w-12 bg-secondary" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-graphite/70">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-5" variant="slide-right">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="our services"
            title="How Alttavia Relocation Can Help You Relocate"
            text="Successful relocation requires managing multiple government processes simultaneously. We provide consultancy and direct support across Portugal, Spain, and Malta for:"
          />
          <ServiceCards services={services} />
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-5" variant="scale-soft">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#0E2A47_0%,#123B63_48%,#D0A12B_135%)] p-8 text-center shadow-glass md:p-10">
          <div
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />
          <p className="relative max-w-2xl text-lg leading-8 text-white">
            We handle everything directly as licensed attorneys. This means no outsourcing, middlemen, or delays.
          </p>
          <div className="relative">
            <ButtonLink href={`/${locale}/relocation-services`} variant="light">
              Explore our Services
            </ButtonLink>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-5" variant="fade-up">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="why us" title="Why Clients Choose Alttavia Relocation" />
          <div className="grid gap-4 md:grid-cols-3">
            {whyUs.map(({ icon: Icon, title, text }, index) => (
              <article
                key={title}
                className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white/80 p-7 shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:border-secondary/45 hover:bg-white"
              >
                <div className="mb-8 flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-secondary/30 bg-secondary/10 text-primary">
                    <Icon className="h-6 w-6 stroke-[1.7]" aria-hidden="true" />
                  </span>
                  <span className="font-serif text-3xl leading-none text-primary/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="font-serif text-2xl leading-tight text-ink">{title}</h3>
                <p className="mt-4 leading-7 text-graphite">{text}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <ButtonLink href={`/${locale}/why-us`}>Learn more about us</ButtonLink>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-5" variant="slide-left">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="blog"
            title="Insights & Articles"
            text="Relocation is more than a checklist. It requires foresight. That's why we publish insights designed to guide expats and entrepreneurs making the move to Portugal, Spain, and Malta."
          />
          <div className="mb-10 text-center">
            <ButtonLink href={`/${locale}/blog`} variant="secondary">
              See all articles
            </ButtonLink>
          </div>
          {posts.length ? (
            <div className="grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="group relative overflow-hidden rounded-3xl border border-primary/10 bg-white/80 shadow-soft backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-white hover:shadow-glass"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <Link href={`/blog/${post.slug}`} className="block cursor-pointer p-7">
                    <div className="mb-4 flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-secondary/30 bg-secondary/8 px-2.5 py-0.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-serif text-2xl leading-tight text-ink transition group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-base leading-7 text-graphite">{post.excerpt}</p>
                    <div className="mt-6 flex items-center justify-between border-t border-primary/8 pt-5">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold text-ink/70">{post.author}</span>
                        <span className="text-xs text-graphite/60">
                          {new Date(post.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary transition group-hover:gap-2.5">
                        {dict.common.readMore}
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-white/70 bg-white/70 p-10 text-center text-graphite shadow-soft">
              {dict.blog.empty}
            </div>
          )}
        </div>
      </ScrollReveal>

      <section id="get-started" className="relative overflow-hidden bg-primary px-6 py-20 text-white">
        <div
          className="absolute inset-0 opacity-[0.18]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(135deg, rgba(208,161,43,.7) 1px, transparent 1px), linear-gradient(45deg, rgba(255,255,255,.28) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
        <div className="absolute inset-x-0 top-0 h-px bg-secondary" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-secondary" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl">
          <div>
            <Eyebrow>get started</Eyebrow>
            <h2 className="mt-5 max-w-3xl font-serif text-4xl leading-tight text-white md:text-6xl">
              Relocate to Portugal, Spain, or Malta with Confidence
            </h2>
            <div className="mt-6 max-w-2xl space-y-5 text-lg leading-8 text-white/78">
              <p>You are moving for new opportunities, for your family, for growth.</p>
              <p>
                Alttavia Relocation combines technical expertise with lived expat experience. We know the process, and
                we know how it feels.
              </p>
            </div>
            <GetStartedForm dict={dict} locale={locale} />
          </div>
        </div>
      </section>
    </main>
  )
}
