import type z from 'zod'

import type {
  AddressSummaryApiResponseSchema,
  GetAddressByEstablishmentApiResponseSchema,
  GetAddressByIdApiResponseSchema,
  GetPublicAddressByEstablishmentApiResponseSchema,
} from '../schemas/address-response.api.schema'

export type AddressSummaryApiResponse = z.infer<
  typeof AddressSummaryApiResponseSchema
>

export type GetAddressByIdApiResponse = z.infer<
  typeof GetAddressByIdApiResponseSchema
>

export type GetAddressByEstablishmentApiResponse = z.infer<
  typeof GetAddressByEstablishmentApiResponseSchema
>

export type GetPublicAddressByEstablishmentApiResponse = z.infer<
  typeof GetPublicAddressByEstablishmentApiResponseSchema
>
