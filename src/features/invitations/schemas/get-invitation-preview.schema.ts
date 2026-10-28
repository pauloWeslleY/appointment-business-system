import z from 'zod'

export const GetInvitationPreviewApiSchema = z.object({
  organization: z.object({
    name: z.string().trim().min(1, 'Organização é obrigatória'),
  }),
})
