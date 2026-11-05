import { z } from 'zod'

export const ReviewEstablishmentApiResponseSchema = z.object({
  id: z.uuid(),
  rating: z.number().min(1).max(5),
  comment: z.union([z.string(), z.null()]),
  createdAt: z.iso.datetime({ offset: true }),
  user: z.object({
    name: z.string(),
    image: z.union([z.string(), z.null()]),
  }),
  updatedAt: z.union([z.iso.datetime({ offset: true }), z.null()]),
  establishment: z.object({
    id: z.uuid(),
    name: z.string(),
  }),
})
