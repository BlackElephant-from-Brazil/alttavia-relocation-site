export type GoogleReview = {
  authorName: string
  profilePhotoUrl?: string
  rating: number
  relativeTimeDescription: string
  text: string
  time: number
  authorUrl?: string
}

type GooglePlaceCandidate = {
  place_id?: string
}

type GooglePlaceReview = {
  author_name?: string
  author_url?: string
  profile_photo_url?: string
  rating?: number
  relative_time_description?: string
  text?: string
  time?: number
}

type FindPlaceResponse = {
  status?: string
  candidates?: GooglePlaceCandidate[]
}

type PlaceDetailsResponse = {
  status?: string
  result?: {
    reviews?: GooglePlaceReview[]
  }
}

const googlePlacesBaseUrl = 'https://maps.googleapis.com/maps/api/place'
const defaultPlaceQuery = 'Alttavia Relocation'

function getApiKey() {
  return process.env.GOOGLE_PLACES_API_KEY?.trim()
}

function getConfiguredPlaceId() {
  return process.env.GOOGLE_PLACE_ID?.replace(/^places\//, '').trim()
}

function getPlaceQuery() {
  return process.env.GOOGLE_PLACE_QUERY?.trim() || defaultPlaceQuery
}

async function fetchGoogleJson<T>(url: string): Promise<T | null> {
  const response = await fetch(url, { cache: 'no-store' })

  if (!response.ok) {
    return null
  }

  const payload = (await response.json()) as T
  const status = (payload as { status?: string }).status

  return status === 'OK' ? payload : null
}

async function findPlaceId(apiKey: string): Promise<string | null> {
  const params = new URLSearchParams({
    input: getPlaceQuery(),
    inputtype: 'textquery',
    fields: 'place_id,name',
    key: apiKey,
  })

  const payload = await fetchGoogleJson<FindPlaceResponse>(`${googlePlacesBaseUrl}/findplacefromtext/json?${params}`)

  return payload?.candidates?.[0]?.place_id ?? null
}

function normalizeReview(review: GooglePlaceReview): GoogleReview | null {
  if (review.rating !== 5 || !review.text || !review.author_name || !review.time) {
    return null
  }

  return {
    authorName: review.author_name,
    authorUrl: review.author_url,
    profilePhotoUrl: review.profile_photo_url,
    rating: review.rating,
    relativeTimeDescription: review.relative_time_description ?? '',
    text: review.text,
    time: review.time,
  }
}

export async function getGoogleReviews(limit = 10): Promise<GoogleReview[]> {
  const apiKey = getApiKey()

  if (!apiKey) {
    return []
  }

  const placeId = getConfiguredPlaceId() || (await findPlaceId(apiKey))

  if (!placeId) {
    return []
  }

  const params = new URLSearchParams({
    place_id: placeId,
    fields: 'name,rating,user_ratings_total,reviews,url',
    reviews_sort: 'newest',
    reviews_no_translations: 'true',
    key: apiKey,
  })
  const payload = await fetchGoogleJson<PlaceDetailsResponse>(`${googlePlacesBaseUrl}/details/json?${params}`)

  return (payload?.result?.reviews ?? [])
    .map(normalizeReview)
    .filter((review): review is GoogleReview => Boolean(review))
    .sort((a, b) => b.time - a.time)
    .slice(0, limit)
}
