import { z } from 'zod'

import { subscriptionDateSchema } from './subscription-date.schema'

// Retained compatibility contracts: these notice endpoints are not in docs/api-1.json.

export const subscriptionNoticeSchema = z.object({
  id: z.uuid(),
  kind: z.string(),
  subject: z.string(),
  text: z.string(),
  publishedAt: subscriptionDateSchema,
  readAt: subscriptionDateSchema.nullable(),
  obsoleteAt: subscriptionDateSchema.nullable(),
})

export const noticesSchema = z.object({
  notices: z.array(subscriptionNoticeSchema),
})

export const subscriptionNoticePathSchema = z.object({ deliveryId: z.uuid() })

export const subscriptionReadNoticeResponseSchema = z.object({
  read: z.boolean(),
})
