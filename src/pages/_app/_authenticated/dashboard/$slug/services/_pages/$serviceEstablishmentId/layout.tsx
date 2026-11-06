import { Box } from '@chakra-ui/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { serviceEstablishmentDetailQueryOptions } from '@/features/service-establishment/queries/service-establishment.query-options'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.SERVICE,
      action: PERMISSION_ACTIONS.READ,
    }),
  loader: async ({ context, params }) => {
    const session = context.session
    return context.queryClient.fetchQuery(
      serviceEstablishmentDetailQueryOptions(
        params.serviceEstablishmentId,
        session?.session.activeOrganizationId ?? undefined,
        session?.user.id,
      ),
    )
  },
  component: ServiceEstablishmentLayout,
})

function ServiceEstablishmentLayout() {
  return (
    <Box as="main">
      <Outlet />
    </Box>
  )
}
