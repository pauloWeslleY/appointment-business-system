import z from 'zod'

export const ConnectionGoogleCalendarApiResponseSchema = z.object({
  connected: z.boolean(),
  calendarId: z.string().nullable(),
  inviteCustomers: z.boolean(),
  lastError: z.string().nullable(),
})
