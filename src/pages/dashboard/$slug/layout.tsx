import { createFileRoute, Outlet } from '@tanstack/react-router'

import { validateEnsureAuthRoute } from '@/features/authentication/validations/validate-auth-route'
import EstablishmentLayout from '@/features/establishment/layout/establishment-layout'
import { establishmentAdminSlugQueryOptions } from '@/features/establishment/queries/establishment.query-options'
import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'

export const Route = createFileRoute('/dashboard/$slug')({
  beforeLoad: () => validateEnsureAuthRoute(),
  loader: async ({ context, params }) => {
    const [organizationProfile, establishment] = await Promise.all([
      context.queryClient.query(organizationProfileSummaryQueryOptions()),
      context.queryClient.query(
        establishmentAdminSlugQueryOptions(params.slug),
      ),
    ])

    return {
      organizationProfile,
      establishment,
    }
  },
  component: DashboardLayout,
})

function DashboardLayout() {
  const { establishment } = Route.useLoaderData()

  return (
    <EstablishmentLayout establishment={establishment}>
      <Outlet />
    </EstablishmentLayout>
  )
}
