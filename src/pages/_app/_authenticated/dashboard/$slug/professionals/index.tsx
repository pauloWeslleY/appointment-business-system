import { createFileRoute } from '@tanstack/react-router'

import ProfessionalsPage from '@/features/professionals/pages/professionals.page'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/professionals/',
)({
  head: () => ({
    meta: [{ title: 'Profissionais' }],
  }),
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.PROFESSIONAL,
      action: PERMISSION_ACTIONS.READ,
    }),
  component: ProfessionalsPage,
})
