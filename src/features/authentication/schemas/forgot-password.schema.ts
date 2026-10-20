import { z } from 'zod'

export const ForgotPasswordSchema = z.object({
  email: z
    .email({
      error: (issue) =>
        issue.input === undefined ? 'O email é obrigatório' : '',
    })
    .min(5, 'O email deve ter pelo menos 5 caracteres'),
})
