import z from 'zod'

export const GetAddressByEstablishmentApiRequestSchema = z.object({
  establishmentId: z.uuid(),
})

export const GetAddressByIdApiRequestSchema =
  GetAddressByEstablishmentApiRequestSchema.extend({
    addressId: z.uuid(),
  })
