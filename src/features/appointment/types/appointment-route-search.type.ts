import type z from 'zod'

import type { AppointmentRouteSearchSchema } from '../schemas/appointment-route-search.schema'

export type AppointmentRouteSearchType = z.infer<
  typeof AppointmentRouteSearchSchema
>
