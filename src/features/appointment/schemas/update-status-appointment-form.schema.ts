import { z } from 'zod'

import {
  AppointmentStatus,
  AppointmentStatusSchema,
} from '../types/appointment-status.type'

export const UpdateStatusAppointmentSchema = z
  .object({
    status: z.array(AppointmentStatusSchema).length(1),
    cancellationReason: z
      .string()
      .max(500, 'O motivo do cancelamento pode ter até 500 caracteres.'),
  })
  .superRefine((data, ctx) => {
    const isCancellationWithoutReason =
      data.status[0] === AppointmentStatus.CANCELLED &&
      !data.cancellationReason.trim()

    if (isCancellationWithoutReason) {
      ctx.addIssue({
        code: 'custom',
        path: ['cancellationReason'],
        message:
          'Informe o motivo do cancelamento. Ele fica registrado no histórico do agendamento.',
      })
    }
  })
