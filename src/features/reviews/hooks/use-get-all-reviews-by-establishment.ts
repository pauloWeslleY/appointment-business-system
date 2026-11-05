import { useQuery } from '@tanstack/react-query'

import { reviewsEstablishmentQueryOptions } from '../queries/reviews.query-options'

export function useGetAllReviewsByEstablishment(establishmentId?: string) {
  return useQuery(reviewsEstablishmentQueryOptions(establishmentId))
}
