import type { z } from 'zod'

import type { UpdateStatusAppointmentApiRequestSchema } from '../schemas/appointment-api-request.schema'

export type UpdateStatusAppointmentRequest = z.infer<
  typeof UpdateStatusAppointmentApiRequestSchema
>
