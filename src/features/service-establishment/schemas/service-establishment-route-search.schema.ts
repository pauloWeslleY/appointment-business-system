import { z } from 'zod'

export const ServiceEstablishmentRouteSearchSchema = z.object({
  page: z.number().optional().default(1),
  page_size: z.number().optional().default(12),
  q: z.string().optional(),
  status: z.string().optional(),
})
