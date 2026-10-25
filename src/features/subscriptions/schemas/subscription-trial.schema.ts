import { z } from 'zod'

import { subscriptionDateSchema } from './subscription-date.schema'

export const subscriptionTrialUsageSchema = z.object({ used: z.boolean() })

export const subscriptionTrialSchema = subscriptionTrialUsageSchema.extend({
  contractorUserId: z.string(),
  organizationId: z.string().nullable(),
  startsAt: subscriptionDateSchema.nullable(),
  endsAt: subscriptionDateSchema.nullable(),
})

export const subscriptionTrialResponseSchema = z.object({
  trial: subscriptionTrialSchema,
})
