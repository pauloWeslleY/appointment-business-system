import type z from 'zod'

import type { ConnectionGoogleCalendarApiResponseSchema } from '../schemas/get-connection-google-calendar-api.response.schema'

export type ConnectionGoogleCalendarApiResponse = z.infer<
  typeof ConnectionGoogleCalendarApiResponseSchema
>
