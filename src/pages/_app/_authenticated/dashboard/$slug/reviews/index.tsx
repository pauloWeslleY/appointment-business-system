import { createFileRoute } from '@tanstack/react-router'

import ReviewsPage from '@/features/reviews/pages/reviews.page'
import { ReviewsRouteSearchSchema } from '@/features/reviews/schemas/reviews-route-search.schema'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/reviews/',
)({
  validateSearch: ReviewsRouteSearchSchema,
  component: ReviewsPage,
})
