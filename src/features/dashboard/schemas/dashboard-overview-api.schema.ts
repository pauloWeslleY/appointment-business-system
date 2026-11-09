import z from 'zod'

import { DailyAppointmentsDashboardApiResponseSchema } from './get-daily-appointments-dashboard.api.schema'
import { RevenueDashboardApiResponseSchema } from './get-revenue-dashboard.api.schema'
import { StatsDashboardApiResponseSchema } from './get-stats-dashboard.api.schema'
import { TopClientsAppointmentsDashboardApiResponseSchema } from './get-top-clients-appointments-dashboard.api.schema'
import { TopServicesDashboardApiResponseSchema } from './get-top-services-dashboard.api.schema'

export const DashboardOverviewApiResponseSchema = z.object({
  stats: StatsDashboardApiResponseSchema.nullable(),
  revenue: RevenueDashboardApiResponseSchema.nullable(),
  dailyAppointments: DailyAppointmentsDashboardApiResponseSchema,
  topServices: TopServicesDashboardApiResponseSchema,
  topClients: TopClientsAppointmentsDashboardApiResponseSchema,
})
