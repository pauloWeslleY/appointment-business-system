import type z from 'zod'

import type { CreateAppointmentSchema } from '../schemas/create-appointment-form.schema'
import type { UpdateAppointmentSchema } from '../schemas/update-appointment-form.schema'
import type { UpdateStatusAppointmentSchema } from '../schemas/update-status-appointment-form.schema'

export type CreateAppointmentFormType = z.infer<typeof CreateAppointmentSchema>

export type UpdateAppointmentFormType = z.infer<typeof UpdateAppointmentSchema>

export type UpdateStatusAppointmentFormType = z.infer<
  typeof UpdateStatusAppointmentSchema
>
