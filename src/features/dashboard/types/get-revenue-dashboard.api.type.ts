import type z from 'zod'

import type { RevenueDashboardApiResponseSchema } from '../schemas/get-revenue-dashboard.api.schema'

export type RevenueDashboardApiResponse = z.infer<
  typeof RevenueDashboardApiResponseSchema
>
