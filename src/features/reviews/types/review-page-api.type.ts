import type z from 'zod'

import type {
  ReviewPageApiRequestSchema,
  ReviewPageApiResponseSchema,
} from '../schemas/review-page-api.schema'
export type ReviewPageApiRequest = z.infer<typeof ReviewPageApiRequestSchema>
export type ReviewPageApiResponse = z.infer<typeof ReviewPageApiResponseSchema>
