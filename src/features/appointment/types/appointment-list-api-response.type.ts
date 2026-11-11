import type { z } from 'zod'

import type { AppointmentListApiResponseSchema } from '../schemas/appointment-api-response.schema'

export type AppointmentListApiResponse = z.infer<
  typeof AppointmentListApiResponseSchema
>
