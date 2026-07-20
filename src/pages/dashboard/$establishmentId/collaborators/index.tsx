import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/$establishmentId/collaborators/',
)({
  component: CollaboratorsPage,
})

function CollaboratorsPage() {
  return <div>Hello "/dashboard/$establishmentId/collaborators/"!</div>
}
