import type z from 'zod'

import {
  type ConnectGoogleCalendarApiRequestSchema,
  type ConnectGoogleCalendarApiResponseSchema,
  type ConnectGoogleCalendarFormSchema,
} from '../schemas/connect-google-calendar.api.schema'

export type ConnectGoogleCalendarApiRequest = z.infer<
  typeof ConnectGoogleCalendarApiRequestSchema
>

export type ConnectGoogleCalendarFormType = z.infer<
  typeof ConnectGoogleCalendarFormSchema
>

export type ConnectGoogleCalendarApiResponse = z.infer<
  typeof ConnectGoogleCalendarApiResponseSchema
>
