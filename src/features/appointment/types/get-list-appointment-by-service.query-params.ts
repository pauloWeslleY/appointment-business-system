import type { z } from 'zod'

import type { AppointmentServiceListRequestSchema } from '../schemas/appointment-service-list-api-request.schema'

export type GetListAppointmentByServiceQueryParams = z.infer<
  typeof AppointmentServiceListRequestSchema
>
