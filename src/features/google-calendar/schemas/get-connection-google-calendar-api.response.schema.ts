import z from 'zod'

export const ConnectionGoogleCalendarApiResponseSchema = z.object({
  connected: z.boolean(),
  calendarId: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'O ID do calendário é obrigatório'
          : 'O ID do calendário deve ser uma string válida',
    })
    .trim(),
  inviteCustomers: z.boolean(),
  lastError: z.string().nullish(),
})
