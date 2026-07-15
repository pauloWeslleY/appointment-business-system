import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$establishmentId/reviews/')({
  component: ReviewsPage,
})

function ReviewsPage() {
  return <div>Hello "/dashboard/$establishmentId/reviews/"!</div>
}
