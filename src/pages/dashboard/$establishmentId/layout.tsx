import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import EstablishmentLayout from '@/features/establishment/layout/establishment-layout'

export const Route = createFileRoute('/dashboard/$establishmentId')({
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <EstablishmentLayout>
      <Outlet />
    </EstablishmentLayout>
  )
}
