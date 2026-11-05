import z from 'zod'

export const CustomerSearchSchema = z.object({
  sex: z.string().optional(),
  status: z.string().optional(),
  q: z.string().optional(),
})
