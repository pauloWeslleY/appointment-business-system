import { queryOptions } from '@tanstack/react-query'

import { getReviewPageService } from '../services/review-page.service'
import type { ReviewPageApiRequest } from '../types/review-page-api.type'
import { reviewsQueryKeys } from './reviews.query-key'

export function reviewPageQueryOptions(input: ReviewPageApiRequest) {
  return queryOptions({
    queryKey: [...reviewsQueryKeys.all(), 'public-page', input],
    queryFn: ({ signal }) => getReviewPageService(input, signal),
  })
}
