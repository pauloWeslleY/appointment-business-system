import z from 'zod'

export const ConnectGoogleCalendarApiRequestSchema = z.object({
  establishmentId: z
    .uuid('O ID do estabelecimento deve ser um UUID válido')
    .trim()
    .min(1, 'O ID do estabelecimento é obrigatório'),
  calendarId: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'O ID do calendário é obrigatório'
          : 'O ID do calendário deve ser uma string válida',
    })
    .trim(),
  inviteCustomers: z.boolean(),
})

export const ConnectGoogleCalendarFormSchema =
  ConnectGoogleCalendarApiRequestSchema.omit({
    establishmentId: true,
    calendarId: true,
  })

export const ConnectGoogleCalendarApiResponseSchema = z.object({
  authorizationUrl: z
    .url('A URL de autorização deve ser uma URL válida')
    .trim()
    .min(1, 'A URL de autorização é obrigatória'),
})
