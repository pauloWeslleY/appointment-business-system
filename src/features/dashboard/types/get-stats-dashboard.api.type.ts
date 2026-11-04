import type z from 'zod'

import type { StatsDashboardApiResponseSchema } from '../schemas/get-stats-dashboard.api.schema'

export type StatsDashboardApiResponse = z.infer<
  typeof StatsDashboardApiResponseSchema
>
