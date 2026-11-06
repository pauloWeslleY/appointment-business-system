import { z } from 'zod'

import { ChangePasswordApiRequestSchema } from './change-password-api.schema'

export const ChangePasswordFormSchema = ChangePasswordApiRequestSchema.extend({
  confirmPassword: z.string().min(1, 'Confirme a nova senha'),
})
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    path: ['newPassword'],
    message: 'A nova senha deve ser diferente da senha atual',
  })
