import type z from 'zod'

import type {
  ServicePageApiRequestSchema,
  ServicePageApiResponseSchema,
} from '../schemas/service-page-api.schema'

export type ServicePageApiRequest = z.infer<typeof ServicePageApiRequestSchema>
export type ServicePageApiResponse = z.infer<
  typeof ServicePageApiResponseSchema
>
