import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import LoaderFull from '@/components/loader-full'
import EstablishmentLayout from '@/features/establishment/layout/establishment-layout'
import { establishmentAdminSlugQueryOptions } from '@/features/establishment/queries/establishment.query-options'
import { organizationProfileSummaryQueryOptions } from '@/features/organization-profile/queries/organization-profile-query-options'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute('/_app/_authenticated/dashboard/$slug')({
  pendingComponent: LoaderFull,
  beforeLoad: ({ context }) => {
    validateRoutePermission(context.memberContext, {
      resource: RESOURCES.ESTABLISHMENT,
      action: PERMISSION_ACTIONS.READ,
    })

    return {
      member: {
        session: context.session,
        memberContext: context.memberContext,
      },
      ensureAuth: context.session,
    }
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
})

function DashboardLayout() {
  const { organizationProfile } = Route.useLoaderData()
  const slug = Route.useParams({ select: (params) => params.slug })
  const establishment = useSuspenseQuery(
    establishmentAdminSlugQueryOptions(slug),
  )

  return (
    <EstablishmentLayout
      establishment={establishment.data}
      organizationId={organizationProfile.organizationId}
    >
      <Outlet />
    </EstablishmentLayout>
  )
}
