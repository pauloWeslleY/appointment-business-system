import { z } from 'zod'

import { SubscriptionStatusSchema } from '../types/subscription-status.type'
import { subscriptionDateSchema } from './subscription-date.schema'

export const subscriptionAccessSchema = z.object({
  status: SubscriptionStatusSchema,
  canRead: z.boolean(),
  canWrite: z.boolean(),
  canCreateAppointments: z.boolean(),
  canManageSubscription: z.boolean(),
  operationalUntil: subscriptionDateSchema.nullable(),
})
