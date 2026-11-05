import { z } from 'zod'

import { AppointmentListApiResponseSchema } from './appointment-api-response.schema'

export const AppointmentListItemSchema =
  AppointmentListApiResponseSchema.shape.appointments.element.extend({
    establishmentId: z.uuid(),
    organizationId: z.string().min(1),
  })
