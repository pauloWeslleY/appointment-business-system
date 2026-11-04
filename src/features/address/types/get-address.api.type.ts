import type z from 'zod'

import type {
  GetAddressByEstablishmentApiRequestSchema,
  GetAddressByIdApiRequestSchema,
} from '../schemas/get-address.api.schema'

export type GetAddressByEstablishmentApiRequest = z.infer<
  typeof GetAddressByEstablishmentApiRequestSchema
>

export type GetAddressByIdApiRequest = z.infer<
  typeof GetAddressByIdApiRequestSchema
>
