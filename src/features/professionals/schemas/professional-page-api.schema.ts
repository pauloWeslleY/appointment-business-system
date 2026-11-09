import z from 'zod'

import { ProfessionalListApiResponseSchema } from './professional-response.api.schema'

export const ProfessionalPageApiRequestSchema = z.object({
  establishmentId: z.uuid(),
  page: z.number().int().min(1).max(1_000_000),
  pageSize: z.number().int().min(1).max(100),
  q: z.string().max(200).optional(),
})
export const ProfessionalPageApiResponseSchema =
  ProfessionalListApiResponseSchema.extend({
    total: z.number().int().nonnegative(),
    summary: z.object({
      total: z.number().int().nonnegative(),
      specialties: z.number().int().nonnegative(),
    }),
  })
