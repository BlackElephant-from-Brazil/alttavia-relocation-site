import type { GoogleReview } from '@/lib/googleReviews'
import { Eyebrow } from '../ui/Eyebrow'

const googleReviewsUrl = process.env.GOOGLE_REVIEWS_SOURCE_URL || 'https://share.google/OBdFa5ruoNI45MEys'

function Stars() {
  return (
    <span className="inline-flex text-secondary" aria-label="5 out of 5 stars">
      {'★★★★★'}
    </span>
  )
}

function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="google-review-card flex min-h-[15rem] w-[82vw] max-w-[22rem] shrink-0 flex-col justify-between rounded-3xl border border-primary/10 bg-white/82 p-6 text-left shadow-soft backdrop-blur-xl md:w-[22rem]">
      <div>
        <div className="mb-5 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-secondary/30 bg-secondary/10 font-serif text-lg text-primary">
              {review.authorName.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-ink">{review.authorName}</p>
              <p className="text-xs uppercase tracking-[0.16em] text-graphite/60">{review.relativeTimeDescription}</p>
            </div>
          </div>
          <Stars />
        </div>
        <p className="line-clamp-5 text-base leading-7 text-graphite">{review.text}</p>
      </div>
      {review.authorUrl ? (
        <a
          href={review.authorUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-5 text-sm font-semibold text-primary underline decoration-secondary/60 underline-offset-4"
        >
          Google profile
        </a>
      ) : null}
    </article>
  )
}

export function GoogleReviewsSection({ reviews }: { reviews: GoogleReview[] }) {
  const marqueeReviews = reviews.length ? reviews : []

  return (
    <section className="google-reviews-section px-6 py-5">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center gap-4 text-center">
          <div>
            <Eyebrow className="justify-center">Client Reviews</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-tight text-ink md:text-5xl">
              Latest 5-star Google reviews
            </h2>
          </div>
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold uppercase tracking-[0.18em] text-primary underline decoration-secondary/60 underline-offset-4"
          >
            View on Google
          </a>
        </div>

        {marqueeReviews.length ? (
          <div className="google-reviews-scroll -mx-6 overflow-x-auto px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0">
            <div className="google-reviews-track flex w-max min-w-full gap-4">
              {marqueeReviews.map((review) => (
                <ReviewCard key={`${review.authorName}-${review.time}`} review={review} />
              ))}
            </div>
          </div>
        ) : (
          <div className="rounded-3xl border border-primary/10 bg-white/70 p-8 text-center text-graphite shadow-soft backdrop-blur-xl">
            Google reviews will appear here when the Google Places integration is configured.
          </div>
        )}
      </div>
    </section>
  )
}
