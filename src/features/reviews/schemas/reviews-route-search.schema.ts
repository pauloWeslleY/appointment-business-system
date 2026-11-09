import { z } from 'zod'

export const ReviewsRouteSearchSchema = z.object({
  q: z.string().max(200).optional(),
  page: z.number().int().min(1).max(1_000_000).default(1),
  page_size: z.number().int().min(1).max(100).default(10),
  notes: z.coerce.number().min(0).max(5).optional(),
})
