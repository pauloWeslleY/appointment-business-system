import { z } from 'zod'

import { ChangePasswordApiRequestSchema } from './change-password-api.schema'

const ChangePasswordFormFieldsSchema = ChangePasswordApiRequestSchema.extend({
  confirmPassword: z.string().min(1, 'Confirme a nova senha'),
})

const PasswordConfirmationFieldsSchema = ChangePasswordFormFieldsSchema.pick({
  newPassword: true,
  confirmPassword: true,
})

const PasswordReuseFieldsSchema = ChangePasswordFormFieldsSchema.pick({
  currentPassword: true,
  newPassword: true,
})

export const ChangePasswordFormSchema = ChangePasswordFormFieldsSchema.refine(
  (data) => data.newPassword === data.confirmPassword,
  {
    path: ['confirmPassword'],
    message: 'As senhas não coincidem',
    when: (payload) =>
      PasswordConfirmationFieldsSchema.safeParse(payload.value).success,
  },
).refine((data) => data.newPassword !== data.currentPassword, {
  path: ['newPassword'],
  message: 'A nova senha deve ser diferente da senha atual',
  when: (payload) => PasswordReuseFieldsSchema.safeParse(payload.value).success,
})
