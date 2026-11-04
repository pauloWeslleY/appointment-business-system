import z from 'zod'

export const AddressSummaryApiResponseSchema = z.object({
  countryCode: z.string().trim().length(2),
  postalCode: z.string().trim().min(1).max(32),
  state: z.string().trim().min(1).max(100),
  city: z.string().trim().min(1).max(200),
  neighborhood: z.string().trim().min(1).max(200),
  street: z.string().trim().min(1).max(300),
  number: z.string().trim().min(1).max(50),
  complement: z.string().max(300).nullable(),
  latitude: z.number().min(-90).max(90).nullable(),
  longitude: z.number().min(-180).max(180).nullable(),
})

export const GetAddressByIdApiResponseSchema =
  AddressSummaryApiResponseSchema.extend({
    id: z.uuid(),
    establishmentId: z.uuid(),
    createdAt: z.iso.datetime(),
    updatedAt: z.iso.datetime(),
  })

export const GetAddressByEstablishmentApiResponseSchema =
  GetAddressByIdApiResponseSchema.nullable()

export const GetPublicAddressByEstablishmentApiResponseSchema =
  AddressSummaryApiResponseSchema.omit({ complement: true }).nullable()
