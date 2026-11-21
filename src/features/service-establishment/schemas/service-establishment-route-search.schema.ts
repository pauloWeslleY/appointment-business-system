import { z } from 'zod'

import { ServiceEstablishmentViewModeSchema } from '../types/service-establishment-view-mode.type'

export const ServiceEstablishmentRouteSearchSchema = z.object({
  page: z.number().int().min(1).max(1_000_000).optional().default(1),
  page_size: z.number().int().min(1).max(100).optional().default(12),
  q: z.string().max(200).optional(),
  status: z.string().optional(),
  view: ServiceEstablishmentViewModeSchema.optional().catch(undefined),
})
