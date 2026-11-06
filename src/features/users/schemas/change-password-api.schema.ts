import { z } from 'zod'

export const ChangePasswordApiRequestSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Informe sua senha atual')
    .max(128, 'A senha atual deve ter no máximo 128 caracteres'),
  newPassword: z
    .string()
    .min(10, 'A nova senha deve ter pelo menos 10 caracteres')
    .max(128, 'A nova senha deve ter no máximo 128 caracteres'),
  revokeOtherSessions: z.boolean(),
})

export const ChangePasswordApiResponseSchema = z.object({
  token: z.string().nullable(),
  user: z.object({ id: z.string().min(1) }),
})
