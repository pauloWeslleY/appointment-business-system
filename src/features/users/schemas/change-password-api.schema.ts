import { z } from 'zod'

import { hasMetAllPasswordRequirements } from '@/shared/helpers/verify-password'
import {
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
} from '@/shared/utils/regex-password-requirement'

export const ChangePasswordApiRequestSchema = z.object({
  currentPassword: z
    .string()
    .min(1, 'Informe sua senha atual')
    .max(
      PASSWORD_MAX_LENGTH,
      `A senha atual deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres`,
    ),
  newPassword: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `A nova senha deve ter pelo menos ${PASSWORD_MIN_LENGTH} caracteres`,
    )
    .max(
      PASSWORD_MAX_LENGTH,
      `A nova senha deve ter no máximo ${PASSWORD_MAX_LENGTH} caracteres`,
    )
    .refine(hasMetAllPasswordRequirements, {
      message: 'Cumpra todos os requisitos da nova senha',
    }),
  revokeOtherSessions: z.boolean(),
})

export const ChangePasswordApiResponseSchema = z.object({
  token: z.string().nullable(),
  user: z.object({ id: z.string().min(1) }),
})
