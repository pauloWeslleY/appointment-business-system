import type z from 'zod'

import type { subscriptionSchema } from '../schemas/subscription.schema'
import type { subscriptionContextSchema } from '../schemas/subscription-context.schema'

export type SubscriptionSnapshot = z.infer<typeof subscriptionSchema>
export type SubscriptionContext = z.infer<typeof subscriptionContextSchema>
