import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)({
  component: ServiceEstablishmentLayout,
})

function ServiceEstablishmentLayout() {
  return (
    <main>
      <Outlet />
    </main>
  )
}
