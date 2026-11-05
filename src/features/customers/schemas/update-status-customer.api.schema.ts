import z from 'zod'

export const UpdateStatusCustomerApiRequestSchema = z.object({
  id: z.uuid(),
  status: z.boolean(),
})
