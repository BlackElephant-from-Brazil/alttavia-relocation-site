import type { Metadata } from 'next'
import {
  ArrowRight,
  Building2,
  ClipboardCheck,
  FileText,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Truck,
  Users,
} from 'lucide-react'

import { ScrollReveal } from '@/components/sections/ScrollReveal'
import { ButtonLink } from '@/components/ui/ButtonLink'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ locale: string }>
}

const serviceCards = [
  {
    icon: FileText,
    title: 'Visas & Residence Permits',
    text:
      'Guidance through application, submission, and renewals. We verify every requirement is met so approvals are efficient and hassle-free.',
  },
  {
    icon: Landmark,
    title: 'Tax Registration & Regularization',
    text: 'Align with local tax obligations from day one and avoid costly mistakes.',
  },
  {
    icon: Building2,
    title: 'Company Incorporation',
    text:
      'Establish your business abroad with confidence. Structure, compliance, and operational readiness are handled.',
  },
  {
    icon: Home,
    title: 'Property Search',
    text: 'Identification of housing options that fit your needs and priorities.',
  },
  {
    icon: GraduationCap,
    title: 'School Placement',
    text: 'Support with admissions and placements that provide continuity for your children.',
  },
  {
    icon: Truck,
    title: 'Transportation of Belongings',
    text: 'Safe, reliable coordination of your move, including customs procedures.',
  },
  {
    icon: HeartPulse,
    title: 'Expat Integration Support',
    text: 'Healthcare registration, orientation, and access to local services that make daily life easier.',
  },
] as const

const processSteps = [
  {
    icon: MessageCircle,
    title: 'Step 1: Initial Consultation',
    text: 'Healthcare registration, orientation, and access to local services that make daily life easier.',
  },
  {
    icon: ClipboardCheck,
    title: 'Step 2: Custom Plan',
    text: 'We create a relocation roadmap that covers legal, logistical, and family priorities.',
  },
  {
    icon: FileText,
    title: 'Step 3: Document Preparation & Submissions',
    text: 'We create a relocation roadmap that covers legal, logistical, and family priorities.',
  },
  {
    icon: MapPinned,
    title: 'Step 4: Settlement Services',
    text: 'Housing, schooling, and logistics are organized in parallel.',
  },
  {
    icon: ShieldCheck,
    title: 'Step 5: Integration Support',
    text: 'Once you arrive, we ensure your family and business are positioned for long-term success.',
  },
] as const

const complexityPoints = [
  'Complex immigration procedures.',
  'Uncertainty around visa requirements and tax rules.',
  'Long waits caused by administrative bottlenecks.',
  'Risk of costly mistakes when handling it all alone.',
  'Disruption to family and professional life.',
] as const

const whyChooseCards = [
  {
    icon: ClipboardCheck,
    title: 'A Seamless Process',
    text:
      'From visas and residence permits to tax registration, company incorporation, housing, and schools – you have clarity at every stage.',
  },
  {
    icon: Users,
    title: 'Peace of Mind for Your Family',
    text: 'Secure housing, school placement, and supported integration into your new community.',
  },
  {
    icon: ShieldCheck,
    title: 'Guided by Experts Who Understand',
    text:
      'As expats ourselves, we know the challenges firsthand and how to resolve them quickly and effectively.',
  },
] as const

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale)

  return createMetadata(
    'Relocation Services',
    'Our team guides professionals, entrepreneurs, and families through every stage of moving to Portugal, Spain, or Malta.',
    `/${locale}/relocation-services`,
  )
}

export default async function ServicesPage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)

  return (
    <main>
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-36 md:pb-20 md:pt-44">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_18%,rgba(208,161,43,0.16),transparent_28%),linear-gradient(135deg,#fbfaf7_0%,#f7f4ee_46%,#eef2f4_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-primary/15 to-transparent"
          aria-hidden="true"
        />
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl">
            <Eyebrow>Relocation Services</Eyebrow>
            <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[1.03] text-ink md:text-7xl">
              Relocation Is Complex. With the Right Partner, It Becomes Clear.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-graphite md:text-xl md:leading-9">
              Our team guides professionals, entrepreneurs, and families through every stage of moving to Portugal,
              Spain, or Malta. From visas and residence permits to company incorporation – we make it precise,
              efficient, and stress-free.
            </p>
            <div className="mt-8">
              <ButtonLink href={`/${locale}/contact`}>Speak to our Experts</ButtonLink>
            </div>
          </div>
        </div>
      </section>

      <ScrollReveal className="px-6 py-14 md:py-16" variant="fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-3xl">
            <Eyebrow>What We Manage</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              What Our Relocation Service Includes
            </h2>
            <p className="mt-5 text-lg leading-8 text-graphite">
              Relocating to Portugal, Spain, or Malta is not a single service – it is a sequence of critical steps. At
              Alttavia Relocation, we manage each with precision and care.
            </p>
          </div>

          <div className="-mx-6 mt-10 overflow-x-auto px-6 pb-5 [scrollbar-width:thin] [scrollbar-color:#D0A12B_transparent]">
            <div className="flex w-max gap-4">
              {serviceCards.map(({ icon: Icon, title, text }) => (
                <article
                  key={title}
                  className="group flex min-h-[21rem] w-[18.5rem] shrink-0 flex-col rounded-2xl border border-primary/10 bg-white/70 p-6 shadow-soft backdrop-blur-xl transition hover:-translate-y-1 hover:border-secondary/45 hover:bg-white md:w-[21rem]"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary transition group-hover:border-secondary/50 group-hover:text-secondary">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-7 font-serif text-2xl leading-tight text-ink">{title}</h3>
                  <p className="mt-4 leading-7 text-graphite">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-10 md:py-12" variant="scale-soft">
        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 overflow-hidden rounded-3xl border border-white/15 bg-[linear-gradient(135deg,#0E2A47_0%,#123B63_56%,#D0A12B_145%)] p-8 text-center text-white shadow-glass md:p-10">
          <div
            className="absolute inset-0 opacity-20"
            aria-hidden="true"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.16) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.16) 1px, transparent 1px)',
              backgroundSize: '34px 34px',
            }}
          />
          <p className="relative max-w-2xl text-lg leading-8 text-white/88">
            For full relocations, we recommend requesting a personalized quotation so we can create a package specific
            to your needs.
          </p>
          <div className="relative">
            <ButtonLink href={`/${locale}/contact`} variant="light">
              Start your Relocation
            </ButtonLink>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-14 md:py-16" variant="slide-left">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Our Process</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">Our Process</h2>
          </div>

          <div className="mt-12 divide-y divide-primary/10 border-y border-primary/10">
            {processSteps.map(({ icon: Icon, title, text }, index) => (
              <article key={title} className="grid gap-5 py-7 md:grid-cols-[4.5rem_1fr] md:items-start md:py-8">
                <div className="flex items-center gap-4 md:block">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/15 bg-white/60 text-primary shadow-soft">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="font-serif text-2xl leading-none text-secondary md:mt-4 md:block">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div>
                  <h3 className="font-serif text-3xl leading-tight text-ink">{title}</h3>
                  <p className="mt-3 max-w-2xl leading-7 text-graphite">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-14 md:py-16" variant="slide-right">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <Eyebrow>Risk Reduction</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Avoid Visa Delays, Tax Issues, and Costly Mistakes
            </h2>
            <p className="mt-5 text-lg leading-8 text-graphite">Relocation often feels overwhelming because of:</p>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-white/70 p-7 shadow-soft backdrop-blur-xl md:p-9">
            <ul className="grid gap-4">
              {complexityPoints.map((point) => (
                <li key={point} className="flex gap-3 leading-7 text-graphite">
                  <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
            <p className="mt-7 leading-7 text-graphite">
              Alttavia Relocation eliminates this complexity. With us, the path is clear, predictable, and managed by
              specialists who have handled more than 800 cases.
            </p>
            <div className="mt-8">
              <ButtonLink href={`/${locale}/contact`}>Speak to our Experts</ButtonLink>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 py-14 md:py-16" variant="fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Why Us</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Why Choose Alttavia Relocation
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {whyChooseCards.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-primary/10 bg-white/75 p-7 shadow-soft transition hover:-translate-y-1 hover:border-secondary/40 hover:bg-white"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-7 font-serif text-2xl leading-tight text-ink">{title}</h3>
                <p className="mt-4 leading-7 text-graphite">{text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <ButtonLink href={`/${locale}/why-us`} variant="secondary">
              Discover the Alttavia difference
            </ButtonLink>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 pb-16 pt-14 md:pb-20 md:pt-16" variant="scale-soft">
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
                  Speak to our Services
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
