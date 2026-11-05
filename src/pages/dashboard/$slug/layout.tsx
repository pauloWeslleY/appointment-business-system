import { createFileRoute, Outlet } from '@tanstack/react-router'

import { validateEnsureAuthRoute } from '@/features/authentication/validations/validate-auth-route'
import { validateAuthenticatedContext } from '@/features/authentication/validations/validate-authenticated-context'
import EstablishmentLayout from '@/features/establishment/layout/establishment-layout'
import { establishmentAdminSlugQueryOptions } from '@/features/establishment/queries/establishment.query-options'
import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'

export const Route = createFileRoute('/dashboard/$slug')({
  beforeLoad: async ({ context }) => {
    const [member, ensureAuth] = await Promise.all([
      validateAuthenticatedContext(context.queryClient),
      validateEnsureAuthRoute(),
    ])

    return { member, ensureAuth }
  },
  loader: async ({ context, params }) => {
    const [organizationProfile, establishment] = await Promise.all([
      context.queryClient.query(organizationProfileSummaryQueryOptions()),
      context.queryClient.query(
        establishmentAdminSlugQueryOptions(params.slug),
      ),
    ])

    return { organizationProfile, establishment }
  },
  component: DashboardLayout,
  pendingComponent: () => <div>Loading...</div>,
})

function DashboardLayout() {
  const { establishment, organizationProfile } = Route.useLoaderData()

  return (
    <EstablishmentLayout
      establishment={establishment}
      organizationId={organizationProfile.organizationId}
    >
      <Outlet />
    </EstablishmentLayout>
  )
}
