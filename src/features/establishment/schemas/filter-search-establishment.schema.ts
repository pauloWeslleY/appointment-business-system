import z from 'zod'

export const filterSearchEstablishmentSchema = z.object({
  page: z.number().optional().default(1),
  page_size: z.number().optional().default(4),
  q: z.string().optional(),
  status: z.string().optional(),
  opening: z.coerce.string().optional(),
})
