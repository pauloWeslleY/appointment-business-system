import { useQuery } from '@tanstack/react-query'
import { getRouteApi } from '@tanstack/react-router'
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs'

import { useDebouncedSearch } from '@/shared/hooks/use-debounced-search'

import { reviewPageQueryOptions } from '../queries/review-page.query-options'

const dashboardRoute = getRouteApi('/_app/_authenticated/dashboard/$slug')

export function useReviewPage() {
  const { establishment } = dashboardRoute.useLoaderData()
  const [search] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    page_size: parseAsInteger.withDefault(10),
    q: parseAsString.withDefault(''),
    notes: parseAsInteger.withDefault(0),
  })
  const query = useDebouncedSearch(search.q)
  return useQuery({
    ...reviewPageQueryOptions({
      establishmentId: establishment.id,
      page: search.page,
      pageSize: search.page_size,
      q: query,
      rating: search.notes || undefined,
    }),
    enabled: query === search.q,
  })
}
