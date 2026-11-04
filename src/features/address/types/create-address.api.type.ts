import type z from 'zod'

import {
  type CreateAddressApiRequestSchema,
  type CreateAddressApiResponseSchema,
} from '../schemas/create-address.api.schema'

export type CreateAddressApiRequest = z.infer<
  typeof CreateAddressApiRequestSchema
>

export type CreateAddressApiResponse = z.infer<
  typeof CreateAddressApiResponseSchema
>
