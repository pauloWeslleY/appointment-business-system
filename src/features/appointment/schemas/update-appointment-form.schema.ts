import { z } from 'zod'

export const UpdateAppointmentSchema = z.object({
  date: z.iso.date({ error: 'Informe uma data válida' }),
  hour: z
    .array(z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/))
    .length(1, { error: 'Selecione um horário' }),
  notes: z.string().max(1000).nullish(),
})
