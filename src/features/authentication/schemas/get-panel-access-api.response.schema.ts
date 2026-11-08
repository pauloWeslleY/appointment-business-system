import { z } from 'zod'

export const GetPanelAccessApiResponseSchema = z.object({
  canAccessAdmin: z.boolean(),
  canStartBusinessOnboarding: z.boolean(),
  organizations: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      slug: z.string(),
      role: z.string(),
    }),
  ),
})
