import type z from 'zod'

import type { UpdateAppointmentSchema } from '../schemas/update-appointment.schema'
import type { UpdateStatusAppointmentSchema } from '../schemas/update-status-appointment.schema'

export type UpdateAppointmentFormType = z.infer<typeof UpdateAppointmentSchema>

export type UpdateStatusAppointmentFormType = z.infer<
  typeof UpdateStatusAppointmentSchema
>
