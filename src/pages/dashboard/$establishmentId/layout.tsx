import { createFileRoute, Outlet } from '@tanstack/react-router'

import { validateEnsureAuthRoute } from '@/features/authentication/validations/validate-auth-route'
import EstablishmentLayout from '@/features/establishment/layout/establishment-layout'

export const Route = createFileRoute('/dashboard/$establishmentId')({
  beforeLoad: () => validateEnsureAuthRoute(),
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <EstablishmentLayout>
      <Outlet />
    </EstablishmentLayout>
  )
}
