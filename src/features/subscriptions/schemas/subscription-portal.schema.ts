import { z } from 'zod'

export const subscriptionPortalResponseSchema = z.object({ portalUrl: z.url() })
