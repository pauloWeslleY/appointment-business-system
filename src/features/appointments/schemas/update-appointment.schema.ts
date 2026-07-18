import { z } from 'zod'

export const UpdateAppointmentSchema = z.object({
  date: z.string().min(1, { error: 'Data é obrigatória' }),
  hour: z.array(z.string()).min(1, { error: 'Horário é obrigatório' }),
  status: z.array(z.enum(['concluded', 'confirmed', 'cancelled'])).optional(),
})
