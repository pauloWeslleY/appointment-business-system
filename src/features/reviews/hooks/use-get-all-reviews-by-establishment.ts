import { useQuery } from '@tanstack/react-query'

import { reviewsQueryKeys } from '../queries/reviews-query-key'
import { getReviewsEstablishmentService } from '../services/reviews.service'

export function useGetAllReviewsByEstablishment(establishmentId?: string) {
  return useQuery({
    queryKey: reviewsQueryKeys.establishments(establishmentId),
    queryFn: () => getReviewsEstablishmentService(establishmentId),
    enabled: !!establishmentId,
  })
}
