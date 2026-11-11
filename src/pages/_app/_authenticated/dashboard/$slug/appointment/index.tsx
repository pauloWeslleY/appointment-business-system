import { createFileRoute } from '@tanstack/react-router'

import AppointmentPage from '@/features/appointment/pages/appointment.page'
import { AppointmentRouteSearchSchema } from '@/features/appointment/schemas/appointment-route-search.schema'
import { validationAppointmentRouteHome } from '@/features/appointment/validations/validation-appointment.routes'
import { PERMISSION_ACTIONS, RESOURCES } from '@/shared/constants/permission'
import { validateRoutePermission } from '@/shared/validations/validate-route-permission'

export const Route = createFileRoute(
  '/_app/_authenticated/dashboard/$slug/appointment/',
)({
  validateSearch: AppointmentRouteSearchSchema,
  beforeLoad: ({ context, search, params }) => {
    validateRoutePermission(context.member.memberContext, {
      resource: RESOURCES.APPOINTMENT,
      action: PERMISSION_ACTIONS.READ,
    })

    validationAppointmentRouteHome(search, params.slug)
  },
  component: AppointmentPage,
  head: () => ({
    meta: [
      {
        title: 'Agendamentos | Agendros',
      },
    ],
  }),
})
