import { createFileRoute } from '@tanstack/react-router'

import OpeningHoursPage from '@/features/opening-hours/pages/opening-hours.page'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/opening-hours/',
)({
  beforeLoad: ({ context }) =>
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.OPENING_HOURS,
      action: PERMISSION_ACTIONS.READ,
    }),
  component: OpeningHoursPage,
  head: () => ({
    meta: [{ title: 'Horários de Funcionamento | Agendros' }],
  }),
})
