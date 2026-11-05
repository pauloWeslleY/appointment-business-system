import { Box } from '@chakra-ui/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { serviceEstablishmentDetailQueryOptions } from '@/features/service-establishment/queries/service-establishment.query-options'
import { authClient } from '@/lib/auth'

export const Route = createFileRoute(
  '/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)({
  loader: async ({ context, params }) => {
    const { data: session } = await authClient.getSession()
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
