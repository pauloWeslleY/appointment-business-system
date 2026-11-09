import z from 'zod'

export const CustomerSearchSchema = z.object({
  sex: z.string().optional(),
  status: z.string().optional(),
  q: z.string().max(200).optional(),
  page: z.number().int().min(1).max(1_000_000).default(1),
  page_size: z.number().int().min(1).max(100).default(10),
})
