import { z } from 'zod'

import { BillingIntervalSchema } from '../types/billing-interval.type'
import { subscriptionDateSchema } from './subscription-date.schema'

export const billingIntervalSchema = BillingIntervalSchema

export const subscriptionBillingRequestSchema = z.object({
  billingInterval: billingIntervalSchema,
})

export const subscriptionIntervalResponseSchema = z.object({
  billingInterval: billingIntervalSchema,
  effectiveAt: subscriptionDateSchema,
})
