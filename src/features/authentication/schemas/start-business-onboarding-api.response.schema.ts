import { z } from 'zod'

export const StartBusinessOnboardingResponseSchema = z.object({
  canStartBusinessOnboarding: z.literal(true),
})
