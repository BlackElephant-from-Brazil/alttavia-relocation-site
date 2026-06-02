import { ButtonLink } from '../ui/ButtonLink'
import { Eyebrow } from '../ui/Eyebrow'
import type { ReactNode } from 'react'

const heroMarqueeItems = [
  'Portugal Visa Advisory',
  'Golden Visa Investments',
  'International Business Expansion',
  'Tax & Banking Planning',
] as const

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryHref,
  primaryLabel,
  primaryIcon,
  secondaryHref,
  secondaryLabel,
  visualItems,
  visualTitle,
  imageSrc,
  aside,
}: {
  eyebrow?: string
  title: string
  subtitle: string
  primaryHref?: string
  primaryLabel?: string
  primaryIcon?: ReactNode
  secondaryHref?: string
  secondaryLabel?: string
  visualItems: readonly string[]
  visualTitle: string
  imageSrc?: string
  aside?: ReactNode
}) {
  const hasImage = Boolean(imageSrc)
  const hasAside = Boolean(aside)
  const heroBackground = imageSrc
    ? `linear-gradient(90deg, rgba(24, 33, 43, 0.86), rgba(24, 33, 43, 0.68) 42%, rgba(24, 33, 43, 0.22) 72%), url(${imageSrc})`
    : undefined
  const mobileBackground = imageSrc
    ? `linear-gradient(180deg, rgba(24, 33, 43, 0.50), rgba(24, 33, 43, 0.78) 58%, rgba(24, 33, 43, 0.92)), url(${imageSrc})`
    : undefined
  const visualBackground = imageSrc
    ? `linear-gradient(145deg, rgba(24, 33, 43, 0.36), rgba(23, 42, 70, 0.18)), url(${imageSrc})`
    : undefined

  return (
    <section
      className={`relative isolate flex min-h-screen overflow-hidden px-6 ${
        hasImage
          ? 'items-end pb-10 pt-28 md:items-end md:pb-14 md:pt-36'
          : 'items-center pb-20 pt-36 md:pb-28 md:pt-44'
      }`}
    >
      <div className="absolute inset-0 z-0">
        {imageSrc ? (
          <>
            <div
              className="absolute inset-0 bg-cover bg-[center_top] md:hidden"
              style={{ backgroundImage: mobileBackground }}
            />
            <div
              className="absolute inset-0 hidden bg-cover bg-[center_28%] md:block"
              style={{ backgroundImage: heroBackground }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(216,198,173,0.22),transparent_32%)] md:hidden" />
          </>
        ) : null}
        <div
          className={`absolute left-1/2 top-12 h-[520px] w-[min(1040px,92vw)] -translate-x-1/2 bg-[linear-gradient(115deg,rgba(216,198,173,0.34),rgba(255,255,255,0.12)_42%,rgba(23,42,70,0.12))] blur-3xl ${
            hasImage ? 'hidden' : ''
          }`}
        />
      </div>
      <div
        className={`relative z-10 mx-auto grid w-full items-end gap-12 ${
          hasAside
            ? 'max-w-7xl lg:grid-cols-[minmax(0,3fr)_minmax(20rem,2fr)] lg:gap-10 xl:gap-14'
            : `max-w-6xl ${hasImage ? '' : 'lg:grid-cols-[1.15fr_0.85fr]'}`
        }`}
      >
        <div className={`hero-copy-column ${hasAside ? 'lg:max-w-[min(100%,52rem)]' : ''}`}>
          {eyebrow ? <Eyebrow className="mb-5">{eyebrow}</Eyebrow> : null}
          <h1
            className={`max-w-4xl font-serif text-[2.25rem] leading-[1.04] sm:text-[3.05rem] md:text-7xl md:leading-[0.96] ${
              hasImage ? 'text-white' : 'text-ink'
            }`}
          >
            {title}
          </h1>
          <p
            className={`mt-6 max-w-2xl text-base leading-7 md:text-xl md:leading-8 ${
              hasImage ? 'text-white' : 'text-graphite'
            }`}
          >
            {subtitle}
          </p>
          {primaryHref && primaryLabel ? (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={primaryHref}>
                <span className="inline-flex items-center gap-2">
                  {primaryLabel}
                  {primaryIcon}
                </span>
              </ButtonLink>
              {secondaryHref && secondaryLabel ? (
                <ButtonLink href={secondaryHref} variant="secondary">
                  {secondaryLabel}
                </ButtonLink>
              ) : null}
            </div>
          ) : null}
          <div className="mt-5 w-full max-w-[calc(100vw-3rem)] overflow-hidden border-y border-white/16 py-3 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] md:mt-8 md:max-w-3xl md:py-4">
            <div className="hero-marquee-track flex w-max min-w-full will-change-transform">
              {[0, 1].map((loop) => (
                <div
                  key={loop}
                  className="hero-marquee-group flex shrink-0 items-center gap-5 pr-5 whitespace-nowrap text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white md:gap-6 md:pr-6 md:text-xs md:tracking-[0.2em]"
                  aria-hidden={loop === 1 ? 'true' : undefined}
                >
                  {heroMarqueeItems.map((item) => (
                    <span key={`${item}-${loop}`} className="inline-flex items-center gap-5 md:gap-6">
                      <span>{item}</span>
                      <span className="text-secondary" aria-hidden="true">
                        •
                      </span>
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        {hasAside ? <div className="hero-form-column hidden lg:block">{aside}</div> : null}
        {!hasImage && !hasAside ? (
          <div className="rounded-[2rem] border border-white/70 bg-white/50 p-4 shadow-glass backdrop-blur-2xl">
            <div
              className="aspect-[4/5] rounded-[1.45rem] bg-[linear-gradient(145deg,rgba(24,33,43,0.86),rgba(23,42,70,0.68)),url('/relocation-placeholder.svg')] bg-cover bg-center p-8 text-white"
              style={visualBackground ? { backgroundImage: visualBackground } : undefined}
            >
              <div className="flex h-full flex-col justify-between">
                <p className="max-w-xs font-serif text-3xl leading-tight">{visualTitle}</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {visualItems.map((item) => (
                    <span key={item} className="rounded-2xl bg-white/16 px-4 py-3 backdrop-blur">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  )
}
