import z from 'zod'

export const DeleteAddressApiRequestSchema = z.object({
  addressId: z.uuid({ error: 'O ID do endereço deve ser um UUID válido' }),
  establishmentId: z.uuid({
    error: 'O ID do estabelecimento deve ser um UUID válido',
  }),
})
