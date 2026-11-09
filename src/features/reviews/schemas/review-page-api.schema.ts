import z from 'zod'

import { ReviewEstablishmentApiResponseSchema } from './reviews-api-response.schema'

export const ReviewPageApiRequestSchema = z.object({
  establishmentId: z.uuid(),
  page: z.number().int().min(1).max(1_000_000),
  pageSize: z.number().int().min(1).max(100),
  q: z.string().max(200).optional(),
  rating: z.number().int().min(1).max(5).optional(),
})
export const ReviewPageApiResponseSchema = z.object({
  reviews: z.array(ReviewEstablishmentApiResponseSchema),
  total: z.number().int().nonnegative(),
  summary: z.object({
    total: z.number().int().nonnegative(),
    average: z.number().min(0).max(5),
  }),
})
