import type z from 'zod'

import {
  type UpdateAddressApiRequestSchema,
  type UpdateAddressApiResponseSchema,
} from '../schemas/update-address.api.schema'

export type UpdateAddressApiRequest = z.infer<
  typeof UpdateAddressApiRequestSchema
>

export type UpdateAddressApiResponse = z.infer<
  typeof UpdateAddressApiResponseSchema
>
