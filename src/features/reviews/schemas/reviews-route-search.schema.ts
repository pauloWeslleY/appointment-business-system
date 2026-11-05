import { z } from 'zod'

export const ReviewsRouteSearchSchema = z.object({
  q: z.string().optional(),
  notes: z.coerce.number().min(0).max(5).optional(),
})
