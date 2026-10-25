import { z } from 'zod'

import { subscriptionAccessSchema } from './subscription-access.schema'
import { subscriptionAccountSchema } from './subscription-account.schema'
import { subscriptionTrialUsageSchema } from './subscription-trial.schema'

export const subscriptionSchema = z.object({
  access: subscriptionAccessSchema,
  trial: subscriptionTrialUsageSchema.nullable(),
  subscription: subscriptionAccountSchema.nullable(),
})
