import { z } from 'zod'

export const UpdateStatusAppointmentSchema = z.object({
  status: z
    .array(z.enum(['concluded', 'confirmed', 'cancelled']))
    .min(1, { error: 'Status é obrigatório' }),
})
