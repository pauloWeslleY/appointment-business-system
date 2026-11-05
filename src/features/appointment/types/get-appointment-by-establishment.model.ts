import type { z } from 'zod'

import type { AppointmentListItemSchema } from '../schemas/appointment-list-item.schema'

export type GetAppointmentByEstablishmentModel = z.infer<
  typeof AppointmentListItemSchema
>
