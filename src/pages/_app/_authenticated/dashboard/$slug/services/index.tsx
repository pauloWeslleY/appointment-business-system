import { createFileRoute } from '@tanstack/react-router'

import ServicesPage from '@/features/service-establishment/pages/service-establishment.page'
import { ServiceEstablishmentRouteSearchSchema } from '@/features/service-establishment/schemas/service-establishment-route-search.schema'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/services/',
)({
  head: () => ({
    meta: [{ title: 'Serviços' }],
  }),
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.SERVICE,
      action: PERMISSION_ACTIONS.READ,
    }),
  validateSearch: ServiceEstablishmentRouteSearchSchema,
  component: ServicesPage,
})
