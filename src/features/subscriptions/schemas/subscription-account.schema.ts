import { z } from 'zod'

import { billingIntervalSchema } from './subscription-billing.schema'
import { subscriptionDateSchema } from './subscription-date.schema'

export const subscriptionAccountSchema = z.object({
  id: z.uuid(),
  organizationId: z.string(),
  contractorUserId: z.string(),
  billingInterval: billingIntervalSchema,
  paidUntil: subscriptionDateSchema.nullable(),
  paidStartsAt: subscriptionDateSchema.nullable(),
  graceStartsAt: subscriptionDateSchema.nullable(),
  graceEndsAt: subscriptionDateSchema.nullable(),
  cancellationRequested: z.boolean(),
  cancellationRequestedAt: subscriptionDateSchema.nullable(),
  nextBillingInterval: billingIntervalSchema.nullable(),
  nextBillingIntervalEffectiveAt: subscriptionDateSchema.nullable(),
  createdAt: subscriptionDateSchema,
  updatedAt: subscriptionDateSchema,
})
