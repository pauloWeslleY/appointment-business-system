import z from 'zod'

import { AddressSummaryApiResponseSchema } from './address-response.api.schema'
import { AddressFormDataSchema } from './form-address.schema'

export const UpdateAddressApiRequestSchema = z.object({
  addressId: z.uuid({ error: 'O ID do endereço deve ser um UUID válido' }),
  establishmentId: z.uuid(),
  address: AddressFormDataSchema.partial()
    .strict()
    .refine(
      (value) => Object.keys(value).length > 0,
      'Informe pelo menos um campo alterado',
    ),
})

export const UpdateAddressApiResponseSchema = z.object({
  id: z.uuid({ error: 'O ID do endereço deve ser um UUID válido' }),
  address: AddressSummaryApiResponseSchema,
})
