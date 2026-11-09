import type z from 'zod'

import type {
  CustomerPageApiRequestSchema,
  CustomerPageApiResponseSchema,
} from '../schemas/customer-page-api.schema'

export type CustomerPageApiRequest = z.infer<
  typeof CustomerPageApiRequestSchema
>
export type CustomerPageApiResponse = z.infer<
  typeof CustomerPageApiResponseSchema
>
