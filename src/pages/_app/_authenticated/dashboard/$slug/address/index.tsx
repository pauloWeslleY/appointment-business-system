import { createFileRoute } from '@tanstack/react-router'

import AddressPage from '@/features/address/pages/address.page'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/address/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.ADDRESS,
      action: PERMISSION_ACTIONS.READ,
    }),
  component: AddressPage,
  head: () => ({
    meta: [{ title: 'Endereço' }],
  }),
})
