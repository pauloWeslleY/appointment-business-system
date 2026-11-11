import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

import { useAppSession } from '@/features/authentication/hooks/use-app-session'
import { useDebouncedSearch } from '@/shared/hooks/use-debounced-search'

import { reviewPageQueryOptions } from '../queries/review-page.query-options'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useReviewPage() {
  const { establishment } = dashboardRoute.useLoaderData()
  const { data: session } = useAppSession()
  const [search] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    page_size: parseAsInteger.withDefault(10),
    q: parseAsString.withDefault(''),
    notes: parseAsInteger.withDefault(0),
  })
  const debouncedReviewsSearch = useDebouncedSearch(search.q)
  const {
    data: reviewsPageData,
    error: reviewsError,
    isLoading: isLoadingReviews,
    refetch: refetchReviews,
  } = useQuery({
    ...reviewPageQueryOptions({
      establishmentId: establishment.id,
      page: search.page,
      pageSize: search.page_size,
      q: debouncedReviewsSearch,
      rating: search.notes || undefined,
    }),
    enabled: debouncedReviewsSearch === search.q,
  })

  const reviews = reviewsPageData?.reviews ?? []
  const totalReviews = reviewsPageData?.total ?? 0
  const reviewsSummary = reviewsPageData?.summary
  const reviewsScopeKey = `${session?.user.id ?? ''}:${session?.session.activeOrganizationId ?? ''}:${establishment.id}`

  const retryReviews = () => refetchReviews()

  return {
    reviews,
    totalReviews,
    reviewsSummary,
    reviewsError,
    isLoadingReviews,
    retryReviews,
    reviewsScopeKey,
  }
}
