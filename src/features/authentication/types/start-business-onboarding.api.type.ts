import type z from 'zod'

import type { StartBusinessOnboardingResponseSchema } from '../schemas/start-business-onboarding-api.response.schema'

export type StartBusinessOnboardingApiResponse = z.infer<
  typeof StartBusinessOnboardingResponseSchema
>
