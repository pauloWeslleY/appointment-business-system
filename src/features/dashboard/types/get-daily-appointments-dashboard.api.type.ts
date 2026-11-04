import type z from 'zod'

import type { DailyAppointmentsDashboardApiResponseSchema } from '../schemas/get-daily-appointments-dashboard.api.schema'

export type DailyAppointmentsDashboardApiResponse = z.infer<
  typeof DailyAppointmentsDashboardApiResponseSchema
>
