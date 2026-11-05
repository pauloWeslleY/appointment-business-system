import { z } from 'zod'

export const CreateServiceEstablishmentApiRequestSchema = z.object({
  establishmentId: z.uuid(),
  name: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.union([z.url(), z.null()]),
  servicePriceInCents: z.number().int().min(0).max(2147483647),
  durationInMinutes: z
    .union([z.number().int().gt(0).max(2147483647), z.null()])
    .optional(),
  slug: z.union([z.string().min(1), z.null()]).optional(),
})

export const UpdateServiceEstablishmentApiRequestSchema =
  CreateServiceEstablishmentApiRequestSchema.omit({
    establishmentId: true,
  }).extend({ id: z.uuid() })
export const StatusServiceEstablishmentApiRequestSchema = z.object({
  id: z.uuid(),
  status: z.boolean(),
})
