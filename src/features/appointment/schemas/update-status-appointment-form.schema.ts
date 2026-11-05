import { z } from 'zod'

import { AppointmentStatusSchema } from '../types/appointment-status.type'

export const UpdateStatusAppointmentSchema = z
  .object({
    status: z.array(AppointmentStatusSchema).length(1),
    cancellationReason: z.string().max(500),
  })
  .superRefine((data, ctx) => {
    if (data.status[0] === 'cancelled' && !data.cancellationReason.trim()) {
      ctx.addIssue({
        code: 'custom',
        path: ['cancellationReason'],
        message: 'Informe o motivo do cancelamento',
      })
    }
  })
