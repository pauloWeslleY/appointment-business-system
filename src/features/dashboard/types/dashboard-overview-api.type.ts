import type z from 'zod'

import type { DashboardOverviewApiResponseSchema } from '../schemas/dashboard-overview-api.schema'

export type DashboardOverviewApiResponse = z.infer<
  typeof DashboardOverviewApiResponseSchema
>
