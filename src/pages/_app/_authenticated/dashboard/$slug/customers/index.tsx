import { createFileRoute } from '@tanstack/react-router'

import CustomersPage from '@/features/customers/pages/customers.page'
import { CustomerSearchSchema } from '@/features/customers/schemas/customer-search.schema'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/customers/',
)({
  head: () => ({
    meta: [{ title: 'Clientes | Agendros' }],
  }),
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.CUSTOMER,
      action: PERMISSION_ACTIONS.READ,
    }),
  validateSearch: CustomerSearchSchema,
  component: CustomersPage,
})
