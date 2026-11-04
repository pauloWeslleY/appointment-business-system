import type z from 'zod'

import type {
  DashboardAppointmentStatusSchema,
  DashboardQueryApiRequestSchema,
} from '../schemas/dashboard-query.api.schema'

export type DashboardQueryApiRequest = z.infer<
  typeof DashboardQueryApiRequestSchema
>

export type DashboardAppointmentStatus = z.infer<
  typeof DashboardAppointmentStatusSchema
>
