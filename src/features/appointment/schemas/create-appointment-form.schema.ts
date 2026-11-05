import { z } from 'zod'

export const CreateAppointmentSchema = z.object({
  customerId: z.array(z.uuid()).length(1, { error: 'Selecione o cliente' }),
  serviceId: z.array(z.uuid()).length(1, { error: 'Selecione o serviço' }),
  professionalId: z.array(z.uuid()).max(1),
  date: z.iso.date({ error: 'Informe uma data válida' }),
  hour: z
    .array(z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/))
    .length(1, { error: 'Selecione um horário' }),
  notes: z
    .string()
    .max(500, { error: 'As observações devem ter no máximo 500 caracteres' }),
})
