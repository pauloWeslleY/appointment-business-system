import { z } from 'zod'

export const UpdateStatusBookingSchema = z.object({
  status: z
    .array(z.enum(['concluded', 'confirmed', 'cancelled']))
    .min(1, { error: 'Status é obrigatório' }),
})
