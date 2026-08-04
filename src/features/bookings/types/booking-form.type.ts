import type z from 'zod'

import type { UpdateBookingSchema } from '../schemas/update-booking.schema'
import type { UpdateStatusBookingSchema } from '../schemas/update-status-booking.schema'

export type UpdateBookingFormType = z.infer<typeof UpdateBookingSchema>

export type UpdateStatusBookingFormType = z.infer<
  typeof UpdateStatusBookingSchema
>
