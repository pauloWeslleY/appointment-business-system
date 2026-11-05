import type { z } from 'zod'

import type { AppointmentApiResponseSchema } from '../schemas/appointment-api-response.schema'

export type AppointmentModel = z.infer<typeof AppointmentApiResponseSchema>
