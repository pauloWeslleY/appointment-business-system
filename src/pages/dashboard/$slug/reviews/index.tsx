import { createFileRoute } from '@tanstack/react-router'

import ReviewsPage from '@/features/reviews/pages/reviews.page'
import { ReviewsRouteSearchSchema } from '@/features/reviews/schemas/reviews-route-search.schema'

export const Route = createFileRoute('/dashboard/$slug/reviews/')({
  validateSearch: ReviewsRouteSearchSchema,
  component: ReviewsPage,
})
