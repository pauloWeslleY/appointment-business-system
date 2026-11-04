import type z from 'zod'

import type { TopClientsAppointmentsDashboardApiResponseSchema } from '../schemas/get-top-clients-appointments-dashboard.api.schema'

export type TopClientsAppointmentsDashboardApiResponse = z.infer<
  typeof TopClientsAppointmentsDashboardApiResponseSchema
>
