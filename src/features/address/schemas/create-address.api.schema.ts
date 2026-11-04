import z from 'zod'

import { AddressSummaryApiResponseSchema } from './address-response.api.schema'
import { AddressFormDataSchema } from './form-address.schema'

export const CreateAddressApiRequestSchema = z.object({
  ...AddressFormDataSchema.shape,
  establishmentId: z.uuid({
    error: 'O ID do estabelecimento deve ser um UUID válido',
  }),
})

export const CreateAddressApiResponseSchema = z.object({
  id: z.uuid({ error: 'O ID do endereço deve ser um UUID válido' }),
  establishmentId: z.uuid({
    error: 'O ID do estabelecimento deve ser um UUID válido',
  }),
  address: AddressSummaryApiResponseSchema,
})
