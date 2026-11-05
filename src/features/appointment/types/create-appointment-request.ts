import type { z } from 'zod'

import type { CreateAppointmentApiRequestSchema } from '../schemas/appointment-api-request.schema'

export type CreateAppointmentRequest = z.infer<
  typeof CreateAppointmentApiRequestSchema
>
