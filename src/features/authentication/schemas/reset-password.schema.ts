import { z } from 'zod'

export const ResetPasswordSchema = z.object({
  newPassword: z
    .string({
      error: (issue) =>
        issue.input === undefined ? 'A nova senha é obrigatória' : '',
    })
    .min(10, 'A nova senha deve ter pelo menos 10 caracteres'),
})
