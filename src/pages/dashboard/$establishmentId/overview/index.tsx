import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/$establishmentId/overview/')({
  component: OverviewPage,
})

function OverviewPage() {
  return <div>Hello "/_dashboard/_pages/overview/"!</div>
}
