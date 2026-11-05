import { queryOptions, skipToken } from '@tanstack/react-query'

import { getReviewsEstablishmentService } from '../services/reviews.service'
import { reviewsQueryKeys } from './reviews.query-key'

export function reviewsEstablishmentQueryOptions(establishmentId?: string) {
  return queryOptions({
    queryKey: reviewsQueryKeys.establishments(establishmentId),
    queryFn: establishmentId
      ? () => getReviewsEstablishmentService(establishmentId)
      : skipToken,
  })
}
