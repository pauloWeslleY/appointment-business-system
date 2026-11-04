import type z from 'zod'

import type { ReconciliationDashboardApiResponseSchema } from '../schemas/get-reconciliation-dashboard.api.schema'

export type ReconciliationDashboardApiResponse = z.infer<
  typeof ReconciliationDashboardApiResponseSchema
>
