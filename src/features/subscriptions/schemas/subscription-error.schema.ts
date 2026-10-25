import { z } from 'zod'

export const subscriptionErrorResponseSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
})
