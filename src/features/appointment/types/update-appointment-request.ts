import type { z } from 'zod'

import type { UpdateAppointmentApiRequestSchema } from '../schemas/appointment-api-request.schema'

export type UpdateAppointmentRequest = z.infer<
  typeof UpdateAppointmentApiRequestSchema
>
