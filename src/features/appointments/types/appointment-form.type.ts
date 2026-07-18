import type z from 'zod'

import type { UpdateAppointmentSchema } from '../schemas/update-appointment.schema'

export type UpdateAppointmentFormType = z.infer<typeof UpdateAppointmentSchema>
