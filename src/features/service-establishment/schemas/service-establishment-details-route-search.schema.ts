import { z } from 'zod'

export const ServiceEstablishmentDetailsRouteSearchSchema = z.object({
  page: z.number().optional().default(1),
  page_size: z.number().optional().default(5),
})
