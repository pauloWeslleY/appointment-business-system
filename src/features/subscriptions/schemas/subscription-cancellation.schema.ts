import { z } from 'zod'

import { subscriptionDateSchema } from './subscription-date.schema'

export const subscriptionCancellationResponseSchema = z.object({
  cancellationScheduled: z.boolean(),
  effectiveAt: subscriptionDateSchema,
})
