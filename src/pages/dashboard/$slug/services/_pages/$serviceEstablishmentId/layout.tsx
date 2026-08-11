import { Box } from '@chakra-ui/react'
import { createFileRoute, Outlet } from '@tanstack/react-router'

import { serviceEstablishmentDetailQueryOptions } from '@/features/service-establishment/queries/service-establishment-query-options'

export const Route = createFileRoute(
  '/dashboard/$slug/services/_pages/$serviceEstablishmentId',
)({
  loader: ({ context, params }) =>
    context.queryClient.ensureQueryData(
      serviceEstablishmentDetailQueryOptions(params.serviceEstablishmentId),
    ),
  component: ServiceEstablishmentLayout,
})

function ServiceEstablishmentLayout() {
  return (
    <Box as="main">
      <Outlet />
    </Box>
  )
}
