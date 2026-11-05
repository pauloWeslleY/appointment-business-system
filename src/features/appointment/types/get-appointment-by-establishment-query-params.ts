import type { z } from 'zod'

import type { AppointmentListApiRequestSchema } from '../schemas/appointment-api-request.schema'

export type GetAppointmentByEstablishmentQueryParams = z.infer<
  typeof AppointmentListApiRequestSchema
>
