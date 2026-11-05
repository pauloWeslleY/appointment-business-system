import { createFileRoute } from '@tanstack/react-router'

import AppointmentPage from '@/features/appointment/pages/appointment.page'
import { AppointmentRouteSearchSchema } from '@/features/appointment/schemas/appointment-route-search.schema'
import { validationAppointmentRouteHome } from '@/features/appointment/validations/validation-appointment.routes'

export const Route = createFileRoute('/dashboard/$slug/appointment/')({
  validateSearch: AppointmentRouteSearchSchema,
  beforeLoad: ({ search, params }) =>
    validationAppointmentRouteHome(search, params.slug),
  component: AppointmentPage,
  head: () => ({
    meta: [{ title: 'Agendamentos' }],
  }),
})
