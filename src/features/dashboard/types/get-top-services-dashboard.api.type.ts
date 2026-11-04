import type z from 'zod'

import type { TopServicesDashboardApiResponseSchema } from '../schemas/get-top-services-dashboard.api.schema'

export type TopServicesDashboardApiResponse = z.infer<
  typeof TopServicesDashboardApiResponseSchema
>
