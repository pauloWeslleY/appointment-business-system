import { z } from 'zod'

export const subscriptionCheckoutResponseSchema = z.object({
  checkoutUrl: z.url(),
  checkoutSessionId: z.string(),
})
