import type { Metadata } from 'next'
import { BadgeCheck, Facebook, Globe2, Instagram, Mail, MapPin, MessageCircle, Phone, Scale } from 'lucide-react'

import { GetStartedForm } from '@/components/sections/GetStartedForm'
import { ScrollReveal } from '@/components/sections/ScrollReveal'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { getDictionary } from '@/i18n/dictionaries'
import { normalizeLocale } from '@/i18n/routing'
import { createMetadata } from '@/lib/metadata'

type Props = {
  params: Promise<{ locale: string }>
}

const contactMethods = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+351 934 548 395',
    href: 'tel:+351934548395',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@alttavia-relocation.com',
    href: 'mailto:info@alttavia-relocation.com',
  },
] as const

const socialLinks = [
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://www.instagram.com/patricia_viana_lawyer',
  },
  {
    icon: Facebook,
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=100087269040601',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/351934548395',
  },
] as const

const whyContactCards = [
  {
    icon: BadgeCheck,
    title: 'Expert Guidance',
    text: 'More than 800 successful immigration and documentation cases.',
  },
  {
    icon: Scale,
    title: 'In-House Expertise',
    text: 'We do not outsource legal or bureaucratic services – your case stays with us.',
  },
  {
    icon: Globe2,
    title: 'Expat Perspective',
    text: 'We know the challenges because we’ve lived them ourselves.',
  },
  {
    icon: MapPin,
    title: 'Personalized Solutions',
    text: 'Every relocation plan is adapted to your goals and priorities.',
  },
] as const

const mapUrl =
  'https://www.google.com/maps?cid=18213837893098137463&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAMYASAF&hl=en&gl=US&source=embed'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = normalizeLocale((await params).locale)

  return createMetadata(
    'Contact Alttavia Relocation',
    'Planning to move to Portugal, Spain, or Malta? Our team is here to guide you every step of the way.',
    `/${locale}/contact`,
  )
}

export default async function ContactPage({ params }: Props) {
  const locale = normalizeLocale((await params).locale)
  const dict = getDictionary(locale)

  return (
    <main>
      <section className="relative isolate overflow-hidden px-6 pb-16 pt-36 text-white md:pb-20 md:pt-44">
        <div
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_18%,rgba(208,161,43,0.18),transparent_30%),linear-gradient(135deg,#071523_0%,#0E2A47_50%,#123B63_100%)]"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 -z-10 opacity-20"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.12) 1px, transparent 1px)',
            backgroundSize: '38px 38px',
          }}
        />
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,0.58fr)_minmax(20rem,0.42fr)] lg:items-end">
          <div>
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.03] md:text-7xl">
              Contact Alttavia Relocation
            </h1>
            <div className="mt-6 max-w-2xl space-y-5 text-lg leading-8 text-white/82 md:text-xl md:leading-9">
              <p>
                Planning to move to Portugal, Spain, or Malta? Have questions about visas, residence permits, tax
                registration, or company incorporation? Our team is here to guide you every step of the way.
              </p>
              <p>
                Tell us a little about your plans, and one of our specialists will get back to you promptly.
              </p>
            </div>
          </div>

          <GetStartedForm dict={dict} locale={locale} idPrefix="contact-hero" variant="glass" className="!mt-0 !max-w-none" />
        </div>
      </section>

      <ScrollReveal className="px-6 py-14 md:py-16" variant="fade-up">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Connect</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Different ways to Connect
            </h2>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="grid gap-4">
              {contactMethods.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  className="group rounded-3xl border border-primary/10 bg-white/75 p-6 shadow-soft transition hover:-translate-y-1 hover:border-secondary/40 hover:bg-white"
                  href={href}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary transition group-hover:border-secondary/50 group-hover:text-secondary">
                    <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-secondary">{label}</p>
                  <p className="mt-2 text-lg font-medium text-ink">{value}</p>
                </a>
              ))}

              <div className="rounded-3xl border border-primary/10 bg-white/75 p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-secondary">Social Media</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {socialLinks.map(({ icon: Icon, label, href }) => (
                    <a
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-4 py-3 text-sm font-semibold text-primary shadow-soft transition hover:-translate-y-0.5 hover:border-secondary/45 hover:text-secondary"
                      href={href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icon className="h-4 w-4" strokeWidth={1.7} aria-hidden="true" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-3xl border border-primary/10 bg-white/60 p-2 shadow-glass backdrop-blur-xl">
              <iframe
                allowFullScreen
                className="h-[28rem] w-full rounded-[1.3rem] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={mapUrl}
                title="Alttavia Relocation on Google Maps"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal className="px-6 pb-16 pt-14 md:pb-20 md:pt-16" variant="slide-left">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">Why Reach Out</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Why Contact Alttavia Relocation?
            </h2>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {whyContactCards.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="rounded-3xl border border-primary/10 bg-white/75 p-6 shadow-soft transition hover:-translate-y-1 hover:border-secondary/40 hover:bg-white"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/15 text-primary">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-7 font-serif text-2xl leading-tight text-ink">{title}</h3>
                <p className="mt-4 leading-7 text-graphite">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </main>
  )
}
