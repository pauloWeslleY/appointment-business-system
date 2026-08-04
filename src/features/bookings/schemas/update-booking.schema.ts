import { z } from 'zod'

export const UpdateBookingSchema = z.object({
  date: z.string().min(1, { error: 'Data é obrigatória' }),
  hour: z.array(z.string()).min(1, { error: 'Horário é obrigatório' }),
  notes: z.string().nullish(),
})
