import { createFileRoute, Outlet } from '@tanstack/react-router'

import { validateEnsureAuthRoute } from '@/features/authentication/validations/validate-auth-route'
import EstablishmentLayout from '@/features/establishment/layout/establishment-layout'
import { establishmentSlugQueryOptions } from '@/features/establishment/queries/establishment-query-options'

export const Route = createFileRoute('/dashboard/$slug')({
  beforeLoad: () => validateEnsureAuthRoute(),
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      establishmentSlugQueryOptions(params.slug),
    ),
  component: DashboardLayout,
})

function DashboardLayout() {
  const establishment = Route.useLoaderData()

  return (
    <EstablishmentLayout establishment={establishment}>
      <Outlet />
    </EstablishmentLayout>
  )
}
